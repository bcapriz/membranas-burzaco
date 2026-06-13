import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api, { imgUrl } from '../../api/client';

const VACIO = {
  nombre: '', subtitulo: '', descripcion: '', especificaciones: [''],
  imagen: '', categoria: '', estado: 'borrador', destacado: false, orden: 0,
};

export default function ProductsAdmin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
  const [categorias, setCategorias] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [editando, setEditando] = useState(null); // null | objeto producto | VACIO
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  const cargar = useCallback(() => {
    api.get('/api/products/admin', { params: { page, q: q || undefined } })
      .then((res) => setData(res.data))
      .catch(console.error);
  }, [page, q]);

  useEffect(() => { cargar(); }, [cargar]);
  useEffect(() => { api.get('/api/categories').then((r) => setCategorias(r.data)); }, []);

  // Abrir el formulario si viene de "Nuevo producto" en el dashboard
  useEffect(() => {
    if (searchParams.get('nuevo')) {
      setEditando({ ...VACIO });
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const guardar = async () => {
    setError('');
    setGuardando(true);
    const payload = {
      ...editando,
      categoria: editando.categoria || null,
      especificaciones: (editando.especificaciones || []).map((e) => e.trim()).filter(Boolean),
    };
    try {
      if (editando._id) await api.put(`/api/products/${editando._id}`, payload);
      else await api.post('/api/products', payload);
      setEditando(null);
      cargar();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo guardar el producto');
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (p) => {
    if (!confirm(`¿Eliminar "${p.nombre} ${p.subtitulo || ''}"? Esta acción no se puede deshacer.`)) return;
    await api.delete(`/api/products/${p._id}`);
    cargar();
  };

  const toggleDestacado = async (p) => {
    await api.put(`/api/products/${p._id}`, { destacado: !p.destacado });
    cargar();
  };

  const subirImagen = async (file) => {
    const fd = new FormData();
    fd.append('imagen', file);
    try {
      const { data: res } = await api.post('/api/upload', fd);
      setEditando((prev) => ({ ...prev, imagen: res.url }));
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo subir la imagen');
    }
  };

  const set = (k) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setEditando((prev) => ({ ...prev, [k]: value }));
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold">Gestión de productos</h1>
          <p className="text-sm text-gray-500">{data.total} producto(s) en total</p>
        </div>
        <div className="flex gap-3">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder="Buscar producto…"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-brand-yellow"
          />
          <button onClick={() => setEditando({ ...VACIO })} className="btn-yellow">+ Nuevo producto</button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Imagen</th>
              <th className="px-4 py-3">Nombre del producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Destacado</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((p) => (
              <tr key={p._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded bg-gray-100">
                    {p.imagen ? <img src={imgUrl(p.imagen)} alt="" className="h-full w-full object-cover" /> : <span aria-hidden="true">📦</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{p.nombre}</p>
                  <p className="text-xs text-gray-500">{p.subtitulo}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{p.categoria?.nombre || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${p.estado === 'publicado' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                    {p.estado === 'publicado' ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleDestacado(p)} className="text-xl" title="Marcar destacado" aria-label="Marcar destacado">
                    {p.destacado ? '⭐' : '☆'}
                  </button>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {new Date(p.createdAt).toLocaleDateString('es-AR')}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditando({ ...VACIO, ...p, categoria: p.categoria?._id || '' })}
                    className="mr-2 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium hover:border-brand-yellow">
                    Editar
                  </button>
                  <button onClick={() => eliminar(p)}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {data.items.length === 0 && (
              <tr><td colSpan="7" className="px-4 py-10 text-center text-gray-500">
                No hay productos. Creá el primero con "+ Nuevo producto".
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {data.pages > 1 && (
        <div className="mt-4 flex justify-end gap-2">
          {Array.from({ length: data.pages }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => setPage(n)}
              className={`h-9 w-9 rounded-lg text-sm font-medium ${n === data.page ? 'bg-brand-yellow text-black' : 'border border-gray-300 hover:border-brand-yellow'}`}>
              {n}
            </button>
          ))}
        </div>
      )}

      {/* Modal de alta / edición */}
      {editando && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="mb-4 font-display text-xl font-extrabold">
              {editando._id ? 'Editar producto' : 'Nuevo producto'}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Nombre *</label>
                <input value={editando.nombre} onChange={set('nombre')}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-yellow" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Subtítulo</label>
                <input value={editando.subtitulo} onChange={set('subtitulo')} placeholder="ej: 4 mm Aluminizada"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-yellow" />
              </div>
            </div>

            <label className="mb-1 mt-4 block text-sm font-medium">Descripción</label>
            <textarea value={editando.descripcion} onChange={set('descripcion')} rows="3"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-yellow" />

            <label className="mb-1 mt-4 block text-sm font-medium">Especificaciones (una por línea)</label>
            <textarea
              value={(editando.especificaciones || []).join('\n')}
              onChange={(e) => setEditando((prev) => ({ ...prev, especificaciones: e.target.value.split('\n') }))}
              rows="3" placeholder={'Espesor: 4 mm\nTerminación: Aluminio\nPresentación: Rollo 10 m²'}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-yellow" />

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Categoría</label>
                <select value={editando.categoria} onChange={set('categoria')}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-yellow">
                  <option value="">Sin categoría</option>
                  {categorias.map((c) => <option key={c._id} value={c._id}>{c.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Estado</label>
                <select value={editando.estado} onChange={set('estado')}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-yellow">
                  <option value="borrador">Borrador (no visible en el sitio)</option>
                  <option value="publicado">Publicado</option>
                </select>
              </div>
            </div>

            {/* Imagen: subir archivo o pegar URL */}
            <label className="mb-1 mt-4 block text-sm font-medium">Imagen</label>
            <div className="flex items-start gap-4">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                {editando.imagen ? <img src={imgUrl(editando.imagen)} alt="" className="h-full w-full object-cover" /> : <span className="text-2xl" aria-hidden="true">📦</span>}
              </div>
              <div className="flex-1 space-y-2">
                <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && subirImagen(e.target.files[0])}
                  className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-brand-yellow file:px-4 file:py-2 file:text-sm file:font-semibold" />
                <input value={editando.imagen} onChange={set('imagen')} placeholder="…o pegá una URL de imagen"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-yellow" />
              </div>
            </div>

            <label className="mt-4 flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={editando.destacado} onChange={set('destacado')} className="h-4 w-4 accent-brand-yellow" />
              Producto destacado (aparece primero en la landing)
            </label>

            {error && <p className="mt-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => { setEditando(null); setError(''); }}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50">
                Cancelar
              </button>
              <button onClick={guardar} disabled={guardando || !editando.nombre.trim()}
                className="btn-yellow disabled:opacity-50">
                {guardando ? 'Guardando…' : editando._id ? 'Guardar cambios' : 'Crear producto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
