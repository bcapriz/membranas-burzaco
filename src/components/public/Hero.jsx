import { waLink } from '../../api/client';
import { WhatsAppIcon, ShieldIcon } from './Icons';

const features = [
  { titulo: 'Impermeabilización', detalle: '100% efectiva' },
  { titulo: 'Materiales', detalle: 'de primera calidad' },
  { titulo: 'Mano de obra', detalle: 'especializada' },
  { titulo: 'Garantía', detalle: 'en todos los trabajos' },
];

export default function Hero({ settings }) {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Foto real de obra (membrana aluminizada) con overlay oscuro para legibilidad */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/hero-bg.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
        <h1 className="max-w-3xl font-display text-4xl font-black uppercase leading-tight md:text-6xl">
          Soluciones en{' '}
          <span className="text-brand-yellow">membranas</span>
          <br />e impermeabilización
        </h1>
        <p className="mt-6 max-w-xl text-lg text-gray-300">
          Protegemos techos y estructuras con materiales de primera calidad y mano de obra especializada.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href={waLink(settings)} target="_blank" rel="noreferrer" className="btn-yellow">
            <WhatsAppIcon /> Consultar por WhatsApp
          </a>
          <a href="#productos" className="btn-outline">Ver productos</a>
        </div>
      </div>

      {/* Franja de diferenciales */}
      <div className="relative border-t border-brand-border bg-black/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4">
          {features.map((f) => (
            <div key={f.titulo} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-yellow">
                <ShieldIcon />
              </span>
              <div className="text-sm">
                <p className="font-semibold">{f.titulo}</p>
                <p className="text-gray-400">{f.detalle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
