@echo off
REM ===============================
REM Script para crear frontend completo avanzado con React
REM ===============================

REM Crear carpetas src, components, pages
if not exist src mkdir src
cd src
if not exist components mkdir components
if not exist pages mkdir pages

REM ===============================
REM App.jsx
REM ===============================
(
echo import React from "react";
echo import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
echo import GenresPage from "./pages/GenresPage";
echo import DirectorsPage from "./pages/DirectorsPage";
echo import ProducersPage from "./pages/ProducersPage";
echo import TypesPage from "./pages/TypesPage";
echo import MediaPage from "./pages/MediaPage";
echo import "./App.css";
echo.
echo function App() {
echo     return (
echo         <Router>
echo             <div>
echo                 <nav className="navbar">
echo                     <Link to="/genres">Géneros</Link>
echo                     <Link to="/directors">Directores</Link>
echo                     <Link to="/producers">Productoras</Link>
echo                     <Link to="/types">Tipos</Link>
echo                     <Link to="/media">Media</Link>
echo                 </nav>
echo                 <div className="content">
echo                     <Routes>
echo                         <Route path="/genres" element={<GenresPage />} />
echo                         <Route path="/directors" element={<DirectorsPage />} />
echo                         <Route path="/producers" element={<ProducersPage />} />
echo                         <Route path="/types" element={<TypesPage />} />
echo                         <Route path="/media" element={<MediaPage />} />
echo                         <Route path="/" element={<h1>Bienvenido al Frontend de Películas</h1>} />
echo                     </Routes>
echo                 </div>
echo             </div>
echo         </Router>
echo     );
echo }
echo export default App;
) > App.jsx

REM ===============================
REM App.css
REM ===============================
(
echo .navbar { background-color:#222; padding:10px; }
echo .navbar a { color:white; margin-right:10px; text-decoration:none; }
echo .content { padding:20px; font-family:Arial, sans-serif; }
echo input, select { margin:5px; padding:5px; }
echo button { margin:5px; padding:5px; }
) > App.css

REM ===============================
REM index.js
REM ===============================
(
echo import React from "react";
echo import ReactDOM from "react-dom/client";
echo import App from "./App";
echo const root = ReactDOM.createRoot(document.getElementById("root"));
echo root.render(<App />);
) > index.js

REM ===============================
REM api.js
REM ===============================
(
echo export let genresData = [{id:1,name:"Acción",status:"Activo"},{id:2,name:"Drama",status:"Activo"}];
echo export let directorsData = [{id:1,name:"Steven Spielberg",status:"Activo"},{id:2,name:"Christopher Nolan",status:"Activo"}];
echo export let producersData = [{id:1,name:"Warner Bros",status:"Activo",slogan:"Entertainment",description:"Productora grande"}];
echo export let typesData = [{id:1,name:"Película",description:"Producción cinematográfica"},{id:2,name:"Serie",description:"Producción de serie"}];
echo export let mediaData = [{id:1,serial:"001",title:"Inception",synopsis:"Sueños dentro de sueños",url:"http://example.com/inception",image:"http://example.com/inception.jpg",releaseYear:2010,genre:"Acción",director:"Christopher Nolan",producer:"Warner Bros",type:"Película"}];
) > api.js

cd components

REM ===============================
REM DirectorForm.jsx
REM ===============================
(
echo import React,{useState} from "react";
echo import { directorsData } from "../api";
echo const DirectorForm=()=>{ const [name,setName]=useState(""); const [status,setStatus]=useState("Activo"); const handleSubmit=e=>{e.preventDefault(); directorsData.push({id:directorsData.length+1,name,status}); setName(""); setStatus("Activo");}; return (<form onSubmit={handleSubmit}><input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} /><select value={status} onChange={e=>setStatus(e.target.value)}><option>Activo</option><option>Inactivo</option></select><button type="submit">Agregar</button></form>);};
echo export default DirectorForm;
) > DirectorForm.jsx

REM DirectorList.jsx
(
echo import React,{useState} from "react";
echo import { directorsData } from "../api";
echo const DirectorList=()=>{ const [,setRefresh]=useState(0); const handleDelete=id=>{ const index=directorsData.findIndex(d=>d.id===id); if(index>-1) directorsData.splice(index,1); setRefresh(r=>r+1);}; return (<ul>{directorsData.map(d=>(<li key={d.id}>{d.name} ({d.status}) <button onClick={()=>handleDelete(d.id)}>Eliminar</button></li>))}</ul>);};
echo export default DirectorList;
) > DirectorList.jsx

REM ProducerForm.jsx
(
echo import React,{useState} from "react";
echo import { producersData } from "../api";
echo const ProducerForm=()=>{ const [name,setName]=useState(""); const [status,setStatus]=useState("Activo"); const [slogan,setSlogan]=useState(""); const [description,setDescription]=useState(""); const handleSubmit=e=>{e.preventDefault(); producersData.push({id:producersData.length+1,name,status,slogan,description}); setName(""); setStatus("Activo"); setSlogan(""); setDescription("");}; return (<form onSubmit={handleSubmit}><input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)}/><select value={status} onChange={e=>setStatus(e.target.value)}><option>Activo</option><option>Inactivo</option></select><input placeholder="Slogan" value={slogan} onChange={e=>setSlogan(e.target.value)}/><input placeholder="Descripción" value={description} onChange={e=>setDescription(e.target.value)}/><button type="submit">Agregar</button></form>);};
echo export default ProducerForm;
) > ProducerForm.jsx

REM ProducerList.jsx
(
echo import React,{useState} from "react";
echo import { producersData } from "../api";
echo const ProducerList=()=>{ const [,setRefresh]=useState(0); const handleDelete=id=>{ const index=producersData.findIndex(p=>p.id===id); if(index>-1) producersData.splice(index,1); setRefresh(r=>r+1);}; return (<ul>{producersData.map(p=>(<li key={p.id}>{p.name} ({p.status}) - {p.slogan} <button onClick={()=>handleDelete(p.id)}>Eliminar</button></li>))}</ul>);};
echo export default ProducerList;
) > ProducerList.jsx

REM TypeForm.jsx
(
echo import React,{useState} from "react";
echo import { typesData } from "../api";
echo const TypeForm=()=>{ const [name,setName]=useState(""); const [description,setDescription]=useState(""); const handleSubmit=e=>{e.preventDefault(); typesData.push({id:typesData.length+1,name,description}); setName(""); setDescription("");}; return (<form onSubmit={handleSubmit}><input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)}/><input placeholder="Descripción" value={description} onChange={e=>setDescription(e.target.value)}/><button type="submit">Agregar</button></form>);};
echo export default TypeForm;
) > TypeForm.jsx

REM TypeList.jsx
(
echo import React,{useState} from "react";
echo import { typesData } from "../api";
echo const TypeList=()=>{ const [,setRefresh]=useState(0); const handleDelete=id=>{ const index=typesData.findIndex(t=>t.id===id); if(index>-1) typesData.splice(index,1); setRefresh(r=>r+1);}; return (<ul>{typesData.map(t=>(<li key={t.id}>{t.name} ({t.description}) <button onClick={()=>handleDelete(t.id)}>Eliminar</button></li>))}</ul>);};
echo export default TypeList;
) > TypeList.jsx

REM GenreForm.jsx
(
echo import React,{useState} from "react";
echo import { genresData } from "../api";
echo const GenreForm=()=>{ const [name,setName]=useState(""); const [status,setStatus]=useState("Activo"); const handleSubmit=e=>{e.preventDefault(); genresData.push({id:genresData.length+1,name,status}); setName(""); setStatus("Activo");}; return (<form onSubmit={handleSubmit}><input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)}/><select value={status} onChange={e=>setStatus(e.target.value)}><option>Activo</option><option>Inactivo</option></select><button type="submit">Agregar</button></form>);};
echo export default GenreForm;
) > GenreForm.jsx

REM GenreList.jsx
(
echo import React,{useState} from "react";
echo import { genresData } from "../api";
echo const GenreList=()=>{ const [,setRefresh]=useState(0); const handleDelete=id=>{ const index=genresData.findIndex(g=>g.id===id); if(index>-1) genresData.splice(index,1); setRefresh(r=>r+1);}; return (<ul>{genresData.map(g=>(<li key={g.id}>{g.name} ({g.status}) <button onClick={()=>handleDelete(g.id)}>Eliminar</button></li>))}</ul>);};
echo export default GenreList;
) > GenreList.jsx

REM MediaForm.jsx
(
echo import React,{useState} from "react";
echo import { mediaData, genresData, directorsData, producersData, typesData } from "../api";
echo const MediaForm=()=>{ const [serial,setSerial]=useState(""); const [title,setTitle]=useState(""); const [synopsis,setSynopsis]=useState(""); const [url,setUrl]=useState(""); const [image,setImage]=useState(""); const [releaseYear,setReleaseYear]=useState(""); const [genre,setGenre]=useState(genresData[0]?.name||""); const [director,setDirector]=useState(directorsData[0]?.name||""); const [producer,setProducer]=useState(producersData[0]?.name||""); const [type,setType]=useState(typesData[0]?.name||"");
echo const handleSubmit=e=>{e.preventDefault(); mediaData.push({id:mediaData.length+1,serial,title,synopsis,url,image,releaseYear,genre,director,producer,type}); setSerial(""); setTitle(""); setSynopsis(""); setUrl(""); setImage(""); setReleaseYear("");};
echo return (<form onSubmit={handleSubmit}><input placeholder="Serial" value={serial} onChange={e=>setSerial(e.target.value)}/><input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)}/><input placeholder="Sinopsis" value={synopsis} onChange={e=>setSynopsis(e.target.value)}/><input placeholder="URL" value={url} onChange={e=>setUrl(e.target.value)}/><input placeholder="Imagen" value={image} onChange={e=>setImage(e.target.value)}/><input placeholder="Año" value={releaseYear} onChange={e=>setReleaseYear(e.target.value)}/><select value={genre} onChange={e=>setGenre(e.target.value)}>{genresData.map(g=><option key={g.id}>{g.name}</option>)}</select><select value={director} onChange={e=>setDirector(e.target.value)}>{directorsData.map(d=><option key={d.id}>{d.name}</option>)}</select><select value={producer} onChange={e=>setProducer(e.target.value)}>{producersData.map(p=><option key={p.id}>{p.name}</option>)}</select><select value={type} onChange={e=>setType(e.target.value)}>{typesData.map(t=><option key={t.id}>{t.name}</option>)}</select><button type="submit">Agregar</button></form>);
echo };
echo export default MediaForm;
) > MediaForm.jsx

REM MediaList.jsx
(
echo import React,{useState} from "react";
echo import { mediaData } from "../api";
echo const MediaList=()=>{ const [,setRefresh]=useState(0); const handleDelete=id=>{ const index=mediaData.findIndex(m=>m.id===id); if(index>-1) mediaData.splice(index,1); setRefresh(r=>r+1);}; return (<ul>{mediaData.map(m=>(<li key={m.id}>{m.title} ({m.type}) - {m.genre} <button onClick={()=>handleDelete(m.id)}>Eliminar</button></li>))}</ul>);};
echo export default MediaList;
) > MediaList.jsx

cd ..

cd pages

REM ===============================
REM Pages
REM ===============================
(
echo import React from "react";
echo import GenreForm from "../components/GenreForm";
echo import GenreList from "../components/GenreList";
echo const GenresPage=()=> (<div><h2>Géneros</h2><GenreForm /><GenreList /></div>);
echo export default GenresPage;
) > GenresPage.jsx

(
echo import React from "react";
echo import DirectorForm from "../components/DirectorForm";
echo import DirectorList from "../components/DirectorList";
echo const DirectorsPage=()=> (<div><h2>Directores</h2><DirectorForm /><DirectorList /></div>);
echo export default DirectorsPage;
) > DirectorsPage.jsx

(
echo import React from "react";
echo import ProducerForm from "../components/ProducerForm";
echo import ProducerList from "../components/ProducerList";
echo const ProducersPage=()=> (<div><h2>Productoras</h2><ProducerForm /><ProducerList /></div>);
echo export default ProducersPage;
) > ProducersPage.jsx

(
echo import React from "react";
echo import TypeForm from "../components/TypeForm";
echo import TypeList from "../components/TypeList";
echo const TypesPage=()=> (<div><h2>Tipos</h2><TypeForm /><TypeList /></div>);
echo export default TypesPage;
) > TypesPage.jsx

(
echo import React from "react";
echo import MediaForm from "../components/MediaForm";
echo import MediaList from "../components/MediaList";
echo const MediaPage=()=> (<div><h2>Media (Películas y Series)</h2><MediaForm /><MediaList /></div>);
echo export default MediaPage;
) > MediaPage.jsx

cd ..

echo ======================================
echo ✅ ¡Frontend avanzado creado con éxito!
echo ======================================
pause

