# Script para iniciar backend y frontend simultáneamente

# Iniciar Backend
Start-Process powershell -ArgumentList "npm run dev" -WorkingDirectory ".\backend"

# Iniciar Frontend
Start-Process powershell -ArgumentList "npm start" -WorkingDirectory ".\frontend"
