const stats = [
  { valor: '+40', titulo: 'Años de experiencia', detalle: 'Desde 1983 brindando soluciones en impermeabilización.' },
  { valor: '+2.500', titulo: 'Obras realizadas', detalle: 'Proyectos completados en todo el AMBA y la región.' },
  { valor: '★', titulo: 'Materiales premium', detalle: 'Trabajamos con las mejores marcas del mercado.' },
  { valor: '👷', titulo: 'Profesionales especializados', detalle: 'Equipo técnico capacitado para cada tipo de obra.' },
];

const marcas = ['Sika', 'Megaflex', 'Weber', 'Danosa', 'Fester', 'Tersuave'];

export default function About() {
  return (
    <>
      <section id="nosotros" className="bg-white py-20 text-black">
        <div className="mx-auto max-w-7xl px-4">
          <p className="eyebrow">Sobre Membranas Burzaco</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">
            Más de 40 años protegiendo lo que construís
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.titulo} className="rounded-xl border border-gray-200 p-6 shadow-sm">
                <p className="font-display text-3xl font-black text-brand-yellow">{s.valor}</p>
                <h3 className="mt-2 font-bold">{s.titulo}</h3>
                <p className="mt-1 text-sm text-gray-600">{s.detalle}</p>
              </div>
            ))}
          </div>

          {/* Fotos reales del local */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl shadow-md">
              <img src="/img/local-frente.jpg" alt="Frente del local de Membranas Burzaco en Av. Espora 2222" loading="lazy" className="h-72 w-full object-cover transition hover:scale-105" />
              <figcaption className="bg-brand-dark px-4 py-3 text-sm text-gray-300">Nuestro local en Av. Espora 2222, Burzaco</figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl shadow-md">
              <img src="/img/local-interior.jpg" alt="Stock de membranas asfálticas y productos en el interior del local" loading="lazy" className="h-72 w-full object-cover transition hover:scale-105" />
              <figcaption className="bg-brand-dark px-4 py-3 text-sm text-gray-300">Stock permanente de las mejores marcas</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-border bg-black py-10">
        <div className="mx-auto max-w-7xl px-4">
          <p className="eyebrow mb-6">Marcas que trabajamos</p>
        </div>
        <div className="marquee-container">
          {[0, 1].map((g) => (
            <div key={g} className="marquee-group" aria-hidden={g > 0 ? 'true' : undefined}>
              {[...marcas, ...marcas, ...marcas, ...marcas].map((m, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-14 font-display text-xl font-bold uppercase tracking-wide text-gray-400">{m}</span>
                  <span className="text-brand-yellow opacity-40">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
