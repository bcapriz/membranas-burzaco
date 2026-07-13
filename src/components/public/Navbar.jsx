import { useState } from 'react';
import { waLink } from '../../api/client';
import { WhatsAppIcon, InstagramIcon } from './Icons';

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#productos', label: 'Productos' },
  { href: '#trabajos', label: 'Trabajos' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar({ settings }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Barra superior de contacto */}
      <div className="hidden border-b border-brand-border bg-black px-4 py-2 text-xs text-gray-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span>📍 {settings?.direccion}</span>
          <div className="flex gap-6">
            <a href={`tel:${settings?.telefono}`} className="transition hover:text-white">📞 {settings?.telefono}</a>
            <a href={`mailto:${settings?.email}`} className="transition hover:text-white">✉️ {settings?.email}</a>
            <a href={`https://instagram.com/${settings?.instagram}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 transition hover:text-white"><InstagramIcon className="h-3.5 w-3.5" />@{settings?.instagram}</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-brand-border bg-brand-dark/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#inicio" className="flex items-center gap-3">
            <img src="/img/logo.png" alt="Membranas Burzaco - desde 1983" className="h-14 w-14 rounded-lg object-cover md:h-16 md:w-16" />
            <div className="leading-tight">
              <p className="font-display text-lg font-extrabold uppercase tracking-wide text-brand-yellow">Membranas</p>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-300">Burzaco · desde 1983</p>
            </div>
          </a>

          <nav className="hidden gap-8 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-gray-200 transition hover:text-brand-yellow">
                {l.label}
              </a>
            ))}
          </nav>

          <a href={waLink(settings)} target="_blank" rel="noreferrer" className="btn-yellow hidden md:inline-flex">
            Consultar <WhatsAppIcon />
          </a>

          <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Abrir menú">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 border-t border-brand-border px-4 pb-4 md:hidden">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded px-2 py-3 text-gray-200 hover:bg-brand-panel">
                {l.label}
              </a>
            ))}
            <a href={waLink(settings)} target="_blank" rel="noreferrer" className="btn-yellow mt-2 justify-center">
              Consultar por WhatsApp <WhatsAppIcon />
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
