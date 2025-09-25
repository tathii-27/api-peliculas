import { useState, useEffect } from 'react';
import { getProductoras, createProductora, updateProductora, deleteProductora } from '../services/productoraService';

export default function Productora() {
  const [productoras, setProductoras] = useState([]);
  const [form, setForm] = useState({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { loadProductoras(); }, []);

  const loadProductoras = async () => {
    const res = await getProductoras();
    setProductoras(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editingId) await updateProductora(editingId, form);
    else await createProductora(form);
    setForm({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
    setEditingId(null);
    loadProductoras();
  };

  const handleEdit = (p) => { setForm(p); setEditingId(p.id); };
  const handleDelete = async (id) => { await deleteProductora(id); loadProductoras(); };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Productoras</h1>
      <form onSubmit={handleSubmit}>
        <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} placeholder="Nombre" required />
        <input value={form.slogan} onChange={e => setForm({...form, slogan: e.target.value})} placeholder="Slogan" />
        <textarea value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} placeholder="Descripción" />
        <select value={form.estado} onChange={e => setForm({...form, estado: e.target.value})}>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
        <thead>
          <tr><th>Nombre</th><th>Slogan</th><th>Descripción</th><th>Estado</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {productoras.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.slogan}</td>
              <td>{p.descripcion}</td>
              <td>{p.estado}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
