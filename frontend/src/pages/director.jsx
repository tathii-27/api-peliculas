import { useState, useEffect } from 'react';
import { getDirectores, createDirector, updateDirector, deleteDirector } from '../services/directorService';

export default function Director() {
  const [directores, setDirectores] = useState([]);
  const [form, setForm] = useState({ nombres: '', estado: 'Activo' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { loadDirectores(); }, []);

  const loadDirectores = async () => {
    const res = await getDirectores();
    setDirectores(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editingId) await updateDirector(editingId, form);
    else await createDirector(form);
    setForm({ nombres: '', estado: 'Activo' });
    setEditingId(null);
    loadDirectores();
  };

  const handleEdit = (d) => { setForm(d); setEditingId(d.id); };
  const handleDelete = async (id) => { await deleteDirector(id); loadDirectores(); };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Directores</h1>
      <form onSubmit={handleSubmit}>
        <input value={form.nombres} onChange={e => setForm({...form, nombres: e.target.value})} placeholder="Nombres" required />
        <select value={form.estado} onChange={e => setForm({...form, estado: e.target.value})}>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
        <thead>
          <tr><th>Nombres</th><th>Estado</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {directores.map(d => (
            <tr key={d.id}>
              <td>{d.nombres}</td>
              <td>{d.estado}</td>
              <td>
                <button onClick={() => handleEdit(d)}>Editar</button>
                <button onClick={() => handleDelete(d.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

