import { useState, useEffect } from 'react';
import { getTipos, createTipo, updateTipo, deleteTipo } from '../services/tipoService';

export default function Tipo() {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { loadTipos(); }, []);

  const loadTipos = async () => {
    const res = await getTipos();
    setTipos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editingId) await updateTipo(editingId, form);
    else await createTipo(form);
    setForm({ nombre: '', descripcion: '' });
    setEditingId(null);
    loadTipos();
  };

  const handleEdit = (t) => { setForm(t); setEditingId(t.id); };
  const handleDelete = async (id) => { await deleteTipo(id); loadTipos(); };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Tipos</h1>
      <form onSubmit={handleSubmit}>
        <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} placeholder="Nombre" required />
        <textarea value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} placeholder="Descripción" />
        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
        <thead>
          <tr><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {tipos.map(t => (
            <tr key={t.id}>
              <td>{t.nombre}</td>
              <td>{t.descripcion}</td>
              <td>
                <button onClick={() => handleEdit(t)}>Editar</button>
                <button onClick={() => handleDelete(t.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

