import { useEffect } from 'react';
import { imgUrl, waLink } from '../../api/client';
import { WhatsAppIcon, CloseIcon } from './Icons';

export default function ProductModal({ producto, settings, onClose }) {
  // Cerrar con Escape y bloquear el scroll del body
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!producto) return null;
  const nombreCompleto = `${producto.nombre}${producto.subtitulo ? ' ' + producto.subtitulo : ''}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={nombreCompleto}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-brand-border bg-brand-panel shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-brand-yellow hover:text-black"
          aria-label="Cerrar"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Foto ampliada */}
          <div className="flex min-h-64 items-center justify-center bg-black/40 p-6">
            {producto.imagen ? (
              <img
                src={imgUrl(producto.imagen)}
                alt={nombreCompleto}
                className="max-h-80 w-full object-contain"
              />
            ) : (
              <span className="text-6xl" aria-hidden="true">📦</span>
            )}
          </div>

          {/* Detalle */}
          <div className="flex flex-col p-6">
            {producto.categoria?.nombre && (
              <span className="eyebrow">{producto.categoria.nombre}</span>
            )}
            <h3 className="mt-2 font-display text-2xl font-extrabold">{producto.nombre}</h3>
            {producto.subtitulo && (
              <p className="text-lg font-semibold text-brand-yellow">{producto.subtitulo}</p>
            )}

            {producto.descripcion && (
              <p className="mt-4 text-sm leading-relaxed text-gray-300">{producto.descripcion}</p>
            )}

            {producto.especificaciones?.length > 0 && (
              <ul className="mt-4 space-y-1 text-sm text-gray-300">
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
              className="btn-yellow mt-auto justify-center pt-3"
            >
              <WhatsAppIcon /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
