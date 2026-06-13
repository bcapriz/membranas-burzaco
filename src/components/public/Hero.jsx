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
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/hero-bg.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/60" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-32 md:py-52">
        <h1 className="font-display font-black uppercase leading-tight">
          <span className="block text-2xl sm:hidden">
            Soluciones en <span className="text-brand-yellow">membranas</span> impermeabilizantes
          </span>
          <span className="hidden text-4xl sm:block md:text-6xl">
            Soluciones en <span className="text-brand-yellow">membranas</span>
            <br />impermeabilizantes
          </span>
        </h1>

        <p className="mt-4 max-w-xl text-sm text-gray-300 sm:mt-6 sm:text-lg">
          Protegemos techos y estructuras con materiales de primera calidad y mano de obra especializada.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
          <a href={waLink(settings)} target="_blank" rel="noreferrer" className="btn-yellow justify-center">
            <WhatsAppIcon /> Consultar por WhatsApp
          </a>
          <a href="#productos" className="btn-outline justify-center">
            Ver productos
          </a>
        </div>
      </div>

      {/* Franja de diferenciales */}
      <div className="relative border-t border-brand-border bg-black/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-5 md:grid-cols-4 md:gap-6 md:py-6">
          {features.map((f) => (
            <div key={f.titulo} className="flex items-center gap-2 md:gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-yellow md:h-10 md:w-10">
                <ShieldIcon className="h-4 w-4 md:h-6 md:w-6" />
              </span>
              <div className="min-w-0 text-xs md:text-sm">
                <p className="truncate font-semibold">{f.titulo}</p>
                <p className="truncate text-gray-400">{f.detalle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}