# auto-fix-server.ps1

# Ruta del server.js
$serverFile = "backend\server.js"

if (-Not (Test-Path $serverFile)) {
    Write-Host "❌ No se encontró el archivo server.js en backend/"
    exit
}

# Buscar database.js dentro de backend/config
$dbFile = Get-ChildItem -Path "backend\config" -Filter "*.js" | Where-Object { $_.Name -match "database|db" } | Select-Object -First 1

if (-Not $dbFile) {
    Write-Host "❌ No se encontró database.js o db.js en backend/config"
    exit
}

# Obtener la ruta relativa desde server.js
$relativePath = ".\config\" + $dbFile.Name

# Leer server.js y reemplazar cualquier import viejo de db
(Get-Content $serverFile) |
    ForEach-Object {
        if ($_ -match "import\s+.*from\s+['""]\.\/config\/.*['""]") {
            "import sequelize from '$relativePath'"
        } else {
            $_
        }
    } | Set-Content $serverFile -Encoding utf8

Write-Host "✅ Import de database.js actualizado automáticamente en server.js"
Write-Host "Ruta usada: $relativePath"
