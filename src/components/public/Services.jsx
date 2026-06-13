const servicios = [
  {
    titulo: 'Colocación de membranas',
    detalle: 'Instalación profesional de membranas asfálticas y sintéticas para todo tipo de techos y superficies.',
  },
  {
    titulo: 'Impermeabilización',
    detalle: 'Sistemas completos de impermeabilización para terrazas, techos, medianeras, cimientos y más.',
  },
  {
    titulo: 'Reparación de filtraciones',
    detalle: 'Detectamos y solucionamos filtraciones de manera definitiva. Diagnóstico preciso y reparación garantizada.',
  },
  {
    titulo: 'Asesoramiento técnico',
    detalle: 'Te ayudamos a elegir la mejor solución según tu proyecto. Asesoramiento personalizado sin cargo.',
  },
];

export default function Services() {
  return (
    <section id="servicios" className="bg-white py-20 text-black">
      <div className="mx-auto max-w-7xl px-4">
        <p className="eyebrow">Nuestros servicios</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">
          Soluciones profesionales para cada necesidad
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((s) => (
            <article key={s.titulo} className="rounded-xl bg-brand-dark p-6 text-white shadow-lg transition hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow text-xl text-black">★</div>
              <h3 className="font-display text-lg font-bold">{s.titulo}</h3>
              <p className="mt-2 text-sm text-gray-300">{s.detalle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
