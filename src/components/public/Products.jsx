import { useEffect, useState } from 'react';
import api, { imgUrl } from '../../api/client';
import ProductModal from './ProductModal';
import { WhatsAppIcon, InstagramIcon } from './Icons';

export default function Products({ settings }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [seleccionado, setSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/api/products'), api.get('/api/categories')])
      .then(([p, c]) => { setProductos(p.data); setCategorias(c.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const visibles = filtro ? productos.filter((p) => p.categoria?._id === filtro) : productos;

  return (
    <section id="productos" className="bg-brand-dark py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Productos destacados</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">
              Materiales de máxima calidad
            </h2>
          </div>

          {/* Filtro por categoría */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFiltro('')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${!filtro ? 'bg-brand-yellow text-black' : 'border border-brand-border text-gray-300 hover:border-brand-yellow'}`}
            >
              Todos
            </button>
            {categorias.map((c) => (
              <button
                key={c._id}
                onClick={() => setFiltro(c._id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${filtro === c._id ? 'bg-brand-yellow text-black' : 'border border-brand-border text-gray-300 hover:border-brand-yellow'}`}
              >
                {c.nombre}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="mt-10 text-gray-400">Cargando productos…</p>
        ) : visibles.length === 0 ? (
          <p className="mt-10 text-gray-400">No hay productos publicados en esta categoría.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {visibles.map((p) => (
              <button
                key={p._id}
                onClick={() => setSeleccionado(p)}
                className="group flex flex-col overflow-hidden rounded-xl border border-brand-border bg-brand-panel text-left transition hover:-translate-y-1 hover:border-brand-yellow"
              >
                <div className="flex h-44 items-center justify-center bg-black/40 p-4">
                  {p.imagen ? (
                    <img src={imgUrl(p.imagen)} alt={p.nombre} loading="lazy" className="max-h-36 object-contain transition group-hover:scale-105" />
                  ) : (
                    <span className="text-5xl" aria-hidden="true">📦</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display font-bold leading-snug">{p.nombre}</h3>
                  {p.subtitulo && <p className="text-sm font-semibold text-brand-yellow">{p.subtitulo}</p>}
                  {p.especificaciones?.length > 0 && (
                    <ul className="mt-2 space-y-0.5 text-xs text-gray-400">
                      {p.especificaciones.slice(0, 3).map((e, i) => <li key={i}>• {e}</li>)}
                    </ul>
                  )}
                  <span className="btn-yellow mt-4 justify-center py-2 text-sm">Ver más</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Banner: sin ventas online */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-brand-yellow px-6 py-4 text-black">
          <p className="flex items-center gap-3 font-semibold">
            <WhatsAppIcon className="h-6 w-6" />
            No contamos con ventas online ni carrito de compras. Consultas y presupuestos por WhatsApp o Instagram.
          </p>
          <a
            href={`https://instagram.com/${settings?.instagram || ''}`}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 font-semibold text-white"
          >
            <InstagramIcon /> @{settings?.instagram}
          </a>
        </div>
      </div>

      {seleccionado && (
        <ProductModal producto={seleccionado} settings={settings} onClose={() => setSeleccionado(null)} />
      )}
    </section>
  );
}
