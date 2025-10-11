# Nombre del archivo de salida
$OutputFile = "peliculas.json"

# --- Definición de IDs de Módulos (Simulación de Lookups) ---
$ID_ACCION = "g001"
$ID_CIENCIA_FICCION = "g002"
$ID_DRAMA = "g003"
$ID_COMEDIA_DRAMATICA = "g004"
$ID_JACKSON = "d001"
$ID_COPPOLA = "d002"
$ID_NOLAN = "d003"
$ID_VILLENEUVE = "d004"
$ID_TARANTINO = "d005"
$ID_NEW_LINE = "p001"
$ID_PARAMOUNT = "p002"
$ID_WARNER_BROS = "p003"
$ID_MIRAMAX = "p004"
$ID_PELICULA = "t001"
$ID_SERIE_TV = "t003"
$ID_CORTOMETRAJE = "t002"

# Crear el array de medios (películas y series) - Cadenas limpias de saltos de línea
$PeliculasData = @(
    [PSCustomObject]@{ serial = 'M001'; titulo = 'El Señor de los Anillos: La Comunidad del Anillo'; sinopsis = 'Un hobbit hereda un anillo mágico y emprende un viaje épico.'; url = 'http://enlace.a.lotr1.com/video'; imagen = 'LOTR1.jpg'; anio_estreno = 2001; genero = $ID_ACCION; director = $ID_JACKSON; productora = $ID_NEW_LINE; tipo = $ID_PELICULA; estado = 'Activo'; fecha_creacion = (Get-Date -Format "yyyy-MM-dd HH:mm:ss"); fecha_actualizacion = (Get-Date -Format "yyyy-MM-dd HH:mm:ss") },
    [PSCustomObject]@{ serial = 'M002'; titulo = 'The Godfather'; sinopsis = 'El patriarca de una dinastía del crimen debe pasar el poder a su hijo.'; url = 'http://enlace.a.godfather.com/video'; imagen = 'TheGodfather.jpg'; anio_estreno = 1972; genero = $ID_DRAMA; director = $ID_COPPOLA; productora = $ID_PARAMOUNT; tipo = $ID_PELICULA; estado = 'Activo'; fecha_creacion = (Get-Date -Format "yyyy-MM-dd HH:mm:ss"); fecha_actualizacion = (Get-Date -Format "yyyy-MM-dd HH:mm:ss") },
    [PSCustomObject]@{ serial = 'M003'; titulo = 'Dune'; sinopsis = 'Un joven brillante debe viajar por el desierto para asegurar el futuro de su casa.'; url = 'http://enlace.a.dune.com/video'; imagen = 'Dune.jpg'; anio_estreno = 2021; genero = $ID_CIENCIA_FICCION; director = $ID_VILLENEUVE; productora = $ID_WARNER_BROS; tipo = $ID_PELICULA; estado = 'Activo'; fecha_creacion = (Get-Date -Format "yyyy-MM-dd HH:mm:ss"); fecha_actualizacion = (Get-Date -Format "yyyy-MM-dd HH:mm:ss") },
    [PSCustomObject]@{ serial = 'M005'; titulo = 'Dark'; sinopsis = 'Una saga familiar con un giro sobrenatural que abarca varias generaciones y el tiempo.'; url = 'http://enlace.a.dark.com/video'; imagen = 'Dark.jpg'; anio_estreno = 2017; genero = $ID_CIENCIA_FICCION; director = $ID_NOLAN; productora = $ID_WARNER_BROS; tipo = $ID_SERIE_TV; estado = 'Activo'; fecha_creacion = (Get-Date -Format "yyyy-MM-dd HH:mm:ss"); fecha_actualizacion = (Get-Date -Format "yyyy-MM-dd HH:mm:ss") }
)

$PeliculasData | ConvertTo-Json -Depth 4 | Out-File $OutputFile -Encoding UTF8 -Force
Write-Host "Archivo '$OutputFile' generado exitosamente."
