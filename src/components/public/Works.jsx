import { waLink } from '../../api/client';
import { WhatsAppIcon } from './Icons';

export default function Works({ settings }) {
  return (
    <section id="trabajos" className="border-y border-brand-border bg-black py-20">
      <div className="mx-auto max-w-7xl px-4">
        <p className="eyebrow">Trabajos realizados</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">
          Resultados que hablan por sí solos
        </h2>
        <p className="mt-3 max-w-2xl text-gray-300">
          Un techo con membrana líquida que falló: lo resolvimos con membrana asfáltica
          aluminizada y quedó solucionado de manera definitiva.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-brand-border">
            <img src="/img/trabajo-antes.jpg" alt="Techo con filtraciones antes del trabajo" loading="lazy" className="w-full object-cover" />
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-brand-yellow">
            <img src="/img/trabajo-despues.jpg" alt="Techo impermeabilizado con membrana asfáltica aluminizada" loading="lazy" className="w-full object-cover" />
          </figure>
        </div>

        <div className="mt-8 text-center">
          <a href={waLink(settings)} target="_blank" rel="noreferrer" className="btn-yellow">
            <WhatsAppIcon /> Quiero solucionar mi techo
          </a>
        </div>
      </div>
    </section>
  );
}
