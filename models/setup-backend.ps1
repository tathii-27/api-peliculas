```powershell
# Script de configuración backend
# Guardar como setup-backend.ps1 en la raíz del proyecto (C:\Users\ThinkPad\Downloads\api-peliculas)

Write-Host "==== Limpiando dependencias anteriores ===="
if (Test-Path "backend\node_modules") { Remove-Item -Recurse -Force "backend\node_modules" }
if (Test-Path "backend\package-lock.json") { Remove-Item -Force "backend\package-lock.json" }

Write-Host "==== Instalando dependencias del backend ===="
cd backend
npm init -y
npm install express sequelize mysql2 cors dotenv
npm install --save-dev nodemon

Write-Host "==== Creando carpetas de backend (si no existen) ===="
if (!(Test-Path "models")) { New-Item -ItemType Directory models }
if (!(Test-Path "routes")) { New-Item -ItemType Directory routes }

Write-Host "==== Creando modelos Sequelize ===="

# Media.js
@"
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Media = sequelize.define('Media', {
  title: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  directorId: { type: DataTypes.INTEGER, allowNull: true },  // 🔹 Se permite NULL
  producerId: { type: DataTypes.INTEGER, allowNull: true },
  genreId: { type: DataTypes.INTEGER, allowNull: true },
  typeId: { type: DataTypes.INTEGER, allowNull: true }
});

module.exports = Media;
"@ | Out-File -Encoding UTF8 "models\Media.js"

# Director.js
@"
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Director = sequelize.define('Director', {
  name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Director;
"@ | Out-File -Encoding UTF8 "models\Director.js"

# Producer.js
@"
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producer = sequelize.define('Producer', {
  name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Producer;
"@ | Out-File -Encoding UTF8 "models\Producer.js"

# Genre.js
@"
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genre = sequelize.define('Genre', {
  name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Genre;
"@ | Out-File -Encoding UTF8 "models\Genre.js"

# Type.js
@"
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Type = sequelize.define('Type', {
  name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Type;
"@ | Out-File -Encoding UTF8 "models\Type.js"

Write-Host "==== Configuración completa ===="
Write-Host "Ahora puedes correr el backend con: npm run dev"
```
