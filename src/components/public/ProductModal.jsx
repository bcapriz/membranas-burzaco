import { useEffect } from 'react';
import { imgUrl, waLink } from '../../api/client';
import { WhatsAppIcon, CloseIcon } from './Icons';

export default function ProductModal({ producto, settings, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [onClose]);

  if (!producto) return null;
  const nombreCompleto = `${producto.nombre}${producto.subtitulo ? ' ' + producto.subtitulo : ''}`;

  return (
    // Overlay — click fuera cierra
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={nombreCompleto}
    >
      {/* Contenedor del modal */}
      <div
        className="relative flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-brand-border bg-brand-panel shadow-2xl sm:max-h-[85vh] sm:max-w-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-brand-yellow hover:text-black"
          aria-label="Cerrar"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Handle visual en mobile (barra gris arriba) */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-gray-600" />
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto">
          <div className="flex flex-col sm:grid sm:grid-cols-2">
            {/* Imagen */}
            <div className="flex h-52 items-center justify-center bg-black/40 p-6 sm:h-auto sm:min-h-64">
              {producto.imagen ? (
                <img
                  src={imgUrl(producto.imagen)}
                  alt={nombreCompleto}
                  className="max-h-44 w-full object-contain sm:max-h-80"
                />
              ) : (
                <span className="text-6xl" aria-hidden="true">📦</span>
              )}
            </div>

            {/* Detalle */}
            <div className="flex flex-col p-5 sm:p-6">
              {producto.categoria?.nombre && (
                <span className="eyebrow">{producto.categoria.nombre}</span>
              )}
              <h3 className="mt-1 font-display text-xl font-extrabold sm:text-2xl">
                {producto.nombre}
              </h3>
              {producto.subtitulo && (
                <p className="text-base font-semibold text-brand-yellow">{producto.subtitulo}</p>
              )}

              {producto.descripcion && (
                <p className="mt-3 text-sm leading-relaxed text-gray-300">{producto.descripcion}</p>
              )}

              {producto.especificaciones?.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-gray-300">
                  {producto.especificaciones.map((e, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-brand-yellow">•</span> {e}
                    </li>
                  ))}
                </ul>
              )}

              <a
                href={waLink(settings, producto)}
                target="_blank"
                rel="noreferrer"
                className="btn-yellow mt-5 justify-center"
              >
                <WhatsAppIcon /> Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}