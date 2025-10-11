# ----------------------------------------
# Setup completo React con HTTPS y archivos
# ----------------------------------------

# Carpeta para certificados
$certPath = "C:\certs"
if (-Not (Test-Path $certPath)) {
    New-Item -ItemType Directory -Path $certPath
}

# Archivos de certificado y clave
$certFile = "$certPath\cert.pem"
$keyFile = "$certPath\key.pem"

# Generar certificado autofirmado usando OpenSSL
Write-Host "Generando certificado autofirmado..."
openssl req -x509 -newkey rsa:4096 -nodes -keyout $keyFile -out $certFile -days 365 -subj "/C=CO/ST=Antioquia/L=Medellin/O=LocalDev/OU=Dev/CN=localhost"

# Instalar certificado en Windows como confiable
Write-Host "Instalando certificado en almacén de confianza..."
$cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2
$cert.Import($certFile)
$store = New-Object System.Security.Cryptography.X509Certificates.X509Store "Root","CurrentUser"
$store.Open("ReadWrite")
$store.Add($cert)
$store.Close()

# Carpeta del proyecto
$projectPath = "C:\Users\ThinkPad\Downloads\api-peliculas"
$frontendPath = "$projectPath\frontend"

# Crear carpeta frontend si no existe
if (-Not (Test-Path $frontendPath)) {
    Write-Host "Creando carpeta frontend dentro del proyecto..."
    New-Item -ItemType Directory -Path $frontendPath
}

# Crear subcarpetas típicas de React
$folders = @("public","src","src\components","src\pages","src\styles")
foreach ($folder in $folders) {
    $path = Join-Path $frontendPath $folder
    if (-Not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path
    }
}

# Crear archivo .env en frontend
$envFile = "$frontendPath\.env"
@"
HTTPS=true
SSL_CRT_FILE=$certFile
SSL_KEY_FILE=$keyFile
PORT=3001
"@ | Out-File -Encoding UTF8 $envFile -Force

Write-Host "? Setup completo terminado. Ahora ejecuta:"
Write-Host "cd $frontendPath"
Write-Host "npm start"
