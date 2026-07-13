import { useState, useEffect, useRef, useCallback } from 'react';
import { waLink } from '../../api/client';
import { WhatsAppIcon } from './Icons';

const slides = [
  {
    antes: '/img/trabajo-antes.jpg',
    despues: '/img/trabajo-despues.jpg',
    altAntes: 'Techo con filtraciones antes del trabajo',
    altDespues: 'Techo impermeabilizado con membrana asfáltica aluminizada',
  },
  {
    antes: '/img/lastWork1.jpeg',
    despues: '/img/beforeWork1.jpeg',
    altAntes: 'Techo con filtraciones antes del trabajo',
    altDespues: 'Techo impermeabilizado con membrana asfáltica aluminizada',
  },
];

const INTERVAL_MS = 6000;
const FADE_MS = 300;

export default function Works({ settings }) {
  const [actual, setActual] = useState(0);
  const [visible, setVisible] = useState(true);
  const actualRef = useRef(0);
  const timerRef = useRef(null);

  const goTo = useCallback((idx) => {
    setVisible(false);
    setTimeout(() => {
      setActual(idx);
      actualRef.current = idx;
      setVisible(true);
    }, FADE_MS);
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    if (slides.length > 1) {
      timerRef.current = setInterval(() => {
        goTo((actualRef.current + 1) % slides.length);
      }, INTERVAL_MS);
    }
  }, [goTo]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const anterior = () => { goTo((actualRef.current - 1 + slides.length) % slides.length); resetTimer(); };
  const siguiente = () => { goTo((actualRef.current + 1) % slides.length); resetTimer(); };

  const slide = slides[actual];

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

        {/* Carrusel */}
        <div className="mt-10">
          <div
            className="grid gap-4 md:grid-cols-2"
            style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease-in-out` }}
          >
            <figure className="relative h-64 overflow-hidden rounded-2xl border border-brand-border sm:h-80 md:h-96">
              <img
                src={slide.antes}
                alt={slide.altAntes}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-gray-300">
                Antes
              </span>
            </figure>
            <figure className="relative h-64 overflow-hidden rounded-2xl border border-brand-yellow sm:h-80 md:h-96">
              <img
                src={slide.despues}
                alt={slide.altDespues}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-md bg-brand-yellow/90 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-black">
                Después
              </span>
            </figure>
          </div>

          {/* Controles */}
          {slides.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={anterior}
                aria-label="Anterior"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-gray-300 transition hover:border-brand-yellow hover:text-brand-yellow"
              >
                ←
              </button>

              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { goTo(i); resetTimer(); }}
                    aria-label={`Ir al trabajo ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === actual ? 'w-6 bg-brand-yellow' : 'w-2 bg-brand-border'}`}
                  />
                ))}
              </div>

              <button
                onClick={siguiente}
                aria-label="Siguiente"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-gray-300 transition hover:border-brand-yellow hover:text-brand-yellow"
              >
                →
              </button>
            </div>
          )}
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
