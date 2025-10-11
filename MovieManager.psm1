# --- Variables Globales y Rutas ---
# $PSScriptRoot es la ruta de donde se importa el módulo.
$ModuleRoot = $PSScriptRoot
if ([string]::IsNullOrEmpty($ModuleRoot)) { $ModuleRoot = (Get-Location).Path } # Fallback para asegurar que la ruta no sea nula

$script:PeliculasFilePath = (Join-Path $ModuleRoot "peliculas.json")
$script:MediaData = @()

# --- Funciones de Utilidad (CORRECCIÓN CRÍTICA EN Load-MediaData) ---
function Load-MediaData {
    if (Test-Path $script:PeliculasFilePath) {
        try {
            # FIX ROBUSTO: Leer el contenido como string raw primero, NO usar el pipeline en la conversión.
            # Esto previene el error donde PowerShell envuelve el array JSON en un único objeto.
            $jsonString = Get-Content $script:PeliculasFilePath -Raw -Encoding UTF8
            $script:MediaData = @(ConvertFrom-Json $jsonString)
        } catch {
            Write-Error "Error al leer o parsear el archivo JSON: $($_.Exception.Message)";
            $script:MediaData = @()
        }
    } else { $script:MediaData = @() }
}

function Save-MediaData {
    try { $script:MediaData | ConvertTo-Json -Depth 4 | Out-File $script:PeliculasFilePath -Encoding UTF8 -Force; return $true } catch { Write-Error "Error al guardar los datos en JSON: $($_.Exception.Message)"; return $false }
}

function Get-NextMediaSerial {
    # Esta función ahora funcionará correctamente porque $script:MediaData será un array de objetos.
    Load-MediaData # Asegura que los datos estén cargados antes de calcular el serial
    $maxSerial = $script:MediaData | Select-Object -ExpandProperty serial | Sort-Object | Select-Object -Last 1
    if (-not $maxSerial) { return "M001" }
    $maxNumber = [int]($maxSerial -replace 'M', ''); $nextNumber = $maxNumber + 1
    return "M{0:D3}" -f $nextNumber
}

# --- Funciones CRUD ---
function Get-Media {
    [CmdletBinding()] param([string]$Serial)
    Load-MediaData

    if ([string]::IsNullOrEmpty($Serial)) { $script:MediaData } else { $script:MediaData | Where-Object { $_.serial -ceq $Serial } }
}

function Add-Media {
    [CmdletBinding()] param([Parameter(Mandatory=$true)][string]$Titulo, [Parameter(Mandatory=$true)][string]$Sinopsis, [Parameter(Mandatory=$true)][int]$AnioEstreno, [Parameter(Mandatory=$true)][string]$GeneroId, [Parameter(Mandatory=$true)][string]$DirectorId, [Parameter(Mandatory=$true)][string]$ProductoraId, [Parameter(Mandatory=$true)][string]$TipoId, [string]$Url, [string]$Imagen, [string]$Estado = 'Activo')

    Load-MediaData; $newSerial = Get-NextMediaSerial

    if ($script:MediaData | Where-Object { $_.titulo -ceq $Titulo }) { Write-Error "El título '$Titulo' ya existe."; return }

    $newMedia = [PSCustomObject]@{ serial = $newSerial; titulo = $Titulo; sinopsis = $Sinopsis; url = $Url; imagen = $Imagen; anio_estreno = $AnioEstreno; genero = $GeneroId; director = $DirectorId; productora = $ProductoraId; tipo = $TipoId; estado = $Estado; fecha_creacion = (Get-Date -Format "yyyy-MM-dd HH:mm:ss"); fecha_actualizacion = (Get-Date -Format "yyyy-MM-dd HH:mm:ss") }

    # Ahora que MediaData es un array correcto, += funciona.
    $script:MediaData += $newMedia
    if (Save-MediaData) { Write-Host "✅ Medio '$Titulo' agregado con éxito. Serial: $newSerial"; return $newMedia }
}

function Update-Media {
    [CmdletBinding()] param([Parameter(Mandatory=$true, Position=0)][string]$Serial, [Parameter(Mandatory=$true)][hashtable]$UpdateParams)

    Load-MediaData; $mediaToUpdate = $script:MediaData | Where-Object { $_.serial -ceq $Serial } | Select-Object -First 1
    if (-not $mediaToUpdate) { Write-Error "Medio con Serial '$Serial' no encontrado."; return }

    foreach ($key in $UpdateParams.Keys) { if ($mediaToUpdate.PSObject.Properties.Name -contains $key) { $mediaToUpdate.$key = $UpdateParams[$key] } }
    
    # FIX: La propiedad existe porque los objetos se cargaron correctamente.
    $mediaToUpdate.fecha_actualizacion = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")

    if (Save-MediaData) { Write-Host "✅ Medio '$Serial' actualizado con éxito."; return $mediaToUpdate }
}

function Remove-Media {
    [CmdletBinding()] param([Parameter(Mandatory=$true, Position=0)][string]$Serial)

    Load-MediaData
    $initialCount = $script:MediaData.Count; $script:MediaData = $script:MediaData | Where-Object { $_.serial -ne $Serial }

    if ($script:MediaData.Count -eq $initialCount) { Write-Warning "Medio con Serial '$Serial' no encontrado."; return $false }
    if (Save-MediaData) { Write-Host "✅ Medio '$Serial' eliminado con éxito."; return $true }
    return $false
}

Export-ModuleMember -Function Get-Media, Add-Media, Update-Media, Remove-Media
