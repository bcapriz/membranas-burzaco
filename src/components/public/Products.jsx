import { useEffect, useState } from 'react';
import api, { imgUrl } from '../../api/client';
import ProductModal from './ProductModal';
import { WhatsAppIcon, InstagramIcon } from './Icons';

const POR_PAGINA = 12;

export default function Products({ settings }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [pagina, setPagina] = useState(1);
  const [seleccionado, setSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/api/products'), api.get('/api/categories')])
      .then(([p, c]) => { setProductos(p.data); setCategorias(c.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Al cambiar filtro, volver a página 1
  const cambiarFiltro = (id) => { setFiltro(id); setPagina(1); };

  const visibles = filtro ? productos.filter((p) => p.categoria?._id === filtro) : productos;
  const totalPaginas = Math.ceil(visibles.length / POR_PAGINA);
  const paginados = visibles.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  const irAPagina = (n) => {
    setPagina(n);
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
              onClick={() => cambiarFiltro('')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${!filtro ? 'bg-brand-yellow text-black' : 'border border-brand-border text-gray-300 hover:border-brand-yellow'}`}
            >
              Todos
            </button>
            {categorias.map((c) => (
              <button
                key={c._id}
                onClick={() => cambiarFiltro(c._id)}
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
          <>
            {/* Contador */}
            <p className="mt-6 text-sm text-gray-400">
              Mostrando {(pagina - 1) * POR_PAGINA + 1}–{Math.min(pagina * POR_PAGINA, visibles.length)} de {visibles.length} productos
            </p>

            {/* Grid */}
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginados.map((p) => (
                <button
                  key={p._id}
                  onClick={() => setSeleccionado(p)}
                  className="group flex h-[340px] flex-col overflow-hidden rounded-xl border border-brand-border bg-brand-panel text-left transition hover:-translate-y-1 hover:border-brand-yellow"
                >
                  {/* Imagen — altura fija */}
                  <div className="flex h-40 w-full shrink-0 items-center justify-center bg-black/40 p-3">
                    {p.imagen ? (
                      <img
                        src={imgUrl(p.imagen)}
                        alt={p.nombre}
                        loading="lazy"
                        className="h-full w-full object-contain transition group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-5xl" aria-hidden="true">📦</span>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-2 font-display text-sm font-bold leading-snug">
                      {p.nombre}{p.subtitulo ? ` — ${p.subtitulo}` : ''}
                    </h3>
                    {p.especificaciones?.length > 0 && (
                      <ul className="mt-2 flex-1 space-y-0.5 overflow-hidden text-xs text-gray-400">
                        {p.especificaciones.slice(0, 3).map((e, i) => (
                          <li key={i} className="truncate">• {e}</li>
                        ))}
                      </ul>
                    )}
                    <span className="btn-yellow mt-auto justify-center py-2 text-sm">Ver más</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Paginación */}
            {totalPaginas > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => irAPagina(pagina - 1)}
                  disabled={pagina === 1}
                  className="rounded-lg border border-brand-border px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-brand-yellow hover:text-brand-yellow disabled:opacity-30"
                >
                  ← Anterior
                </button>

                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => irAPagina(n)}
                    className={`h-9 w-9 rounded-lg text-sm font-medium transition ${n === pagina ? 'bg-brand-yellow text-black' : 'border border-brand-border text-gray-300 hover:border-brand-yellow hover:text-brand-yellow'}`}
                  >
                    {n}
                  </button>
                ))}

                <button
                  onClick={() => irAPagina(pagina + 1)}
                  disabled={pagina === totalPaginas}
                  className="rounded-lg border border-brand-border px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-brand-yellow hover:text-brand-yellow disabled:opacity-30"
                >
                  Siguiente →
                </button>
              </div>
            )}
          </>
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