import { useState, useEffect } from 'react';
import { getMedias, createMedia, updateMedia, deleteMedia } from '../services/mediaService';

export default function Media() {
  const [medias, setMedias] = useState([]);
  const [form, setForm] = useState({
    serial: '', titulo: '', sinopsis: '', url: '', imagen: '',
    anio: '', generoId: '', directorId: '', productoraId: '', tipoId: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { loadMedias(); }, []);

  const loadMedias = async () => {
    const res = await getMedias();
    setMedias(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editingId) await updateMedia(editingId, form);
    else await createMedia(form);
    setForm({ serial: '', titulo: '', sinopsis: '', url: '', imagen: '', anio: '', generoId: '', directorId: '', productoraId: '', tipoId: '' });
    setEditingId(null);
    loadMedias();
  };

  const handleEdit = (m) => { setForm(m); setEditingId(m.id); };
  const handleDelete = async (id) => { await deleteMedia(id); loadMedias(); };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Media</h1>
      <form onSubmit={handleSubmit}>
        <input value={form.serial} onChange={e => setForm({...form, serial: e.target.value})} placeholder="Serial" required />
        <input value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} placeholder="Título" required />
        <textarea value={form.sinopsis} onChange={e => setForm({...form, sinopsis: e.target.value})} placeholder="Sinopsis" />
        <input value={form.url} onChange={e => setForm({...form, url: e.target.value})} placeholder="URL" />
        <input value={form.imagen} onChange={e => setForm({...form, imagen: e.target.value})} placeholder="Imagen" />
        <input value={form.anio} onChange={e => setForm({...form, anio: e.target.value})} placeholder="Año de estreno" />
        <input value={form.generoId} onChange={e => setForm({...form, generoId: e.target.value})} placeholder="ID Género" />
        <input value={form.directorId} onChange={e => setForm({...form, directorId: e.target.value})} placeholder="ID Director" />
        <input value={form.productoraId} onChange={e => setForm({...form, productoraId: e.target.value})} placeholder="ID Productora" />
        <input value={form.tipoId} onChange={e => setForm({...form, tipoId: e.target.value})} placeholder="ID Tipo" />
        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Serial</th><th>Título</th><th>URL</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medias.map(m => (
            <tr key={m.id}>
              <td>{m.serial}</td>
              <td>{m.titulo}</td>
              <td>{m.url}</td>
              <td>
                <button onClick={() => handleEdit(m)}>Editar</button>
                <button onClick={() => handleDelete(m.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}





