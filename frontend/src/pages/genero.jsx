import { useState, useEffect } from 'react';
import { getGeneros, createGenero, updateGenero, deleteGenero } from '../services/generoService';

export default function Genero() {
  const [generos, setGeneros] = useState([]);
  const [form, setForm] = useState({ nombre: '', estado: 'Activo', descripcion: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { loadGeneros(); }, []);

  const loadGeneros = async () => {
    const res = await getGeneros();
    setGeneros(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) await updateGenero(editingId, form);
    else await createGenero(form);
    setForm({ nombre: '', estado: 'Activo', descripcion: '' });
    setEditingId(null);
    loadGeneros();
  };

  const handleEdit = (g) => { setForm(g); setEditingId(g.id); };
  const handleDelete = async (id) => { await deleteGenero(id); loadGeneros(); };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Géneros</h1>
      <form onSubmit={handleSubmit}>
        <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} placeholder="Nombre" required />
        <select value={form.estado} onChange={e => setForm({...form, estado: e.target.value})}>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <textarea value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} placeholder="Descripción" />
        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
        <thead>
          <tr><th>Nombre</th><th>Estado</th><th>Descripción</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {generos.map(g => (
            <tr key={g.id}>
              <td>{g.nombre}</td>
              <td>{g.estado}</td>
              <td>{g.descripcion}</td>
              <td>
                <button onClick={() => handleEdit(g)}>Editar</button>
                <button onClick={() => handleDelete(g.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

