import { useEffect, useState } from 'react';
import api from '../../api/client';

export default function CategoriesAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  const cargar = () => api.get('/api/categories').then((r) => setCategorias(r.data));
  useEffect(() => { cargar(); }, []);

  const crear = async () => {
    setError('');
    try {
      await api.post('/api/categories', { nombre, orden: categorias.length + 1 });
      setNombre('');
      cargar();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo crear la categoría');
    }
  };

  const renombrar = async (c) => {
    const nuevo = prompt('Nuevo nombre de la categoría:', c.nombre);
    if (!nuevo || nuevo === c.nombre) return;
    await api.put(`/api/categories/${c._id}`, { nombre: nuevo });
    cargar();
  };

  const eliminar = async (c) => {
    if (!confirm(`¿Eliminar la categoría "${c.nombre}"?`)) return;
    try {
      await api.delete(`/api/categories/${c._id}`);
      cargar();
    } catch (err) {
      alert(err.response?.data?.error || 'No se pudo eliminar');
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-extrabold">Categorías</h1>
      <p className="mb-6 text-sm text-gray-500">Agrupan los productos en la landing y en el panel.</p>

      <div className="mb-6 flex gap-3">
        <input value={nombre} onChange={(e) => setNombre(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && nombre.trim() && crear()}
          placeholder="Nueva categoría (ej: Selladores)"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-yellow" />
        <button onClick={crear} disabled={!nombre.trim()} className="btn-yellow disabled:opacity-50">Agregar</button>
      </div>
      {error && <p className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {categorias.map((c) => (
          <div key={c._id} className="flex items-center justify-between border-b border-gray-100 px-4 py-3 last:border-0">
            <div>
              <p className="font-medium">{c.nombre}</p>
              <p className="text-xs text-gray-400">/{c.slug}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => renombrar(c)} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs hover:border-brand-yellow">Renombrar</button>
              <button onClick={() => eliminar(c)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">Eliminar</button>
            </div>
          </div>
        ))}
        {categorias.length === 0 && <p className="px-4 py-8 text-center text-sm text-gray-500">Todavía no hay categorías.</p>}
      </div>
    </div>
  );
}
