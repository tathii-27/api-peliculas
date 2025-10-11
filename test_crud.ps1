# -------------------------------------------------------------------------
# SCRIPT DE PRUEBA: test_crud.ps1
# Verifica el funcionamiento de las funciones CRUD del módulo MovieManager.psm1
# -------------------------------------------------------------------------

$ModuleName = ".\MovieManager.psm1"
$ModulePath = (Resolve-Path $ModuleName -ErrorAction SilentlyContinue)

Write-Host "--- 1. Importando el Módulo '$ModuleName' ---" -ForegroundColor Cyan

if (-not $ModulePath) {
    Write-Host "❌ ERROR CRÍTICO: No se encontró el archivo 'MovieManager.psm1'." -ForegroundColor Red
    exit 1
}

try {
    Import-Module $ModulePath -Force -ErrorAction Stop
    Write-Host "✅ Módulo '$ModuleName' importado con éxito." -ForegroundColor Green
} catch {
    Write-Host "❌ ERROR CRÍTICO: No se pudo importar el módulo." -ForegroundColor Red
    Write-Host "Razón: $($_.Exception.Message)"
    exit 1
}

# --- PRUEBA 1: LECTURA (Get-Media) ---
Write-Host "`n--- 2. Probando LECTURA (Get-Media) ---"
$InitialCount = (Get-Media | Measure-Object).Count
Write-Host "-> Total de medios cargados inicialmente: $InitialCount (Debería ser 4)"

$SpecificMedia = Get-Media -Serial "M003"
if ($SpecificMedia -and $SpecificMedia.titulo -eq "Dune") {
    Write-Host "    ✅ Lectura específica (M003) correcta: $($SpecificMedia.titulo)" -ForegroundColor Green
} else {
    Write-Host "    ❌ Fallo al leer medio M003." -ForegroundColor Red
}

# --- PRUEBA 2: CREACIÓN (Add-Media) ---
Write-Host "`n--- 3. Probando CREACIÓN (Add-Media) ---"

$NewTitle = "Interestelar"
$NewMovieParams = @{ Titulo = $NewTitle; Sinopsis = "Viaje a través de un agujero de gusano para salvar a la humanidad."; AnioEstreno = 2014; GeneroId = "g002"; DirectorId = "d003"; ProductoraId= "p003"; TipoId = "t001" }

Write-Host "-> Intentando agregar: '$NewTitle'..."
$AddedMedia = Add-Media @NewMovieParams

if ($AddedMedia -is [System.Management.Automation.PSCustomObject]) {
    Write-Host "    ✅ Creado con éxito. Serial asignado: $($AddedMedia.serial)" -ForegroundColor Green
    $NewSerial = $AddedMedia.serial
} else {
    Write-Host "    ❌ Falló la creación." -ForegroundColor Red
    $NewSerial = $null
}

# --- PRUEBA 3: ACTUALIZACIÓN (Update-Media) ---
Write-Host "`n--- 4. Probando ACTUALIZACIÓN (Update-Media) ---"

if ($NewSerial) {
    $UpdateTitle = "INTERESTELAR (Corte Extendido)"
    $UpdateParams = @{ titulo = $UpdateTitle; estado = "Inactivo" }

    Write-Host "-> Actualizando '$NewSerial'..."
    $UpdatedMedia = Update-Media -Serial $NewSerial -UpdateParams $UpdateParams

    $CheckUpdate = Get-Media -Serial $NewSerial
    if ($CheckUpdate -and $CheckUpdate.titulo -eq $UpdateTitle -and $CheckUpdate.estado -eq "Inactivo") {
        Write-Host "    ✅ Actualización de título y estado exitosa." -ForegroundColor Green
    } else {
        Write-Host "    ❌ Falló la verificación de la actualización." -ForegroundColor Red
        Write-Host "    (Valor actual: $($CheckUpdate.titulo) | Estado actual: $($CheckUpdate.estado))"
    }
} else {
    Write-Host "    Omitiendo prueba de actualización (la creación falló)."
}

# --- PRUEBA 4: ELIMINACIÓN (Remove-Media) ---
Write-Host "`n--- 5. Probando ELIMINACIÓN (Remove-Media) ---"

if ($NewSerial) {
    Write-Host "-> Eliminando el medio recién creado: '$NewSerial'..."
    $IsRemoved = Remove-Media -Serial $NewSerial

    $CheckDeleted = Get-Media -Serial $NewSerial
    if ($IsRemoved -and (-not $CheckDeleted)) {
        Write-Host "    ✅ Eliminación exitosa. El medio ya no existe." -ForegroundColor Green
    } else {
        Write-Host "    ❌ Falló la eliminación o el medio aún existe." -ForegroundColor Red
    }
} else {
    Write-Host "    Omitiendo prueba de eliminación (la creación falló)."
}

# --- VERIFICACIÓN FINAL ---
Write-Host "`n--- 6. Verificación Final de Conteo ---"
$FinalMediaCount = (Get-Media | Measure-Object).Count
Write-Host "Total final de medios cargados: $FinalMediaCount (Debería ser 4)" -ForegroundColor Yellow
Write-Host "`n--- Fin de las Pruebas ---"
