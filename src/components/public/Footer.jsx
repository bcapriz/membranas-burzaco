import { InstagramIcon, WhatsAppIcon } from './Icons';

export default function Footer({ settings }) {
  return (
    <footer className="border-t border-brand-border bg-black py-10 text-sm text-gray-400">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
        <div>
          <img src="/img/logo.png" alt="Membranas Burzaco" className="mb-3 h-20 w-20 rounded-lg" />
          <p className="font-display text-lg font-extrabold uppercase text-brand-yellow">Membranas Burzaco</p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em]">desde 1983</p>
          <p className="mt-4">© {new Date().getFullYear()} Membranas Burzaco. Todos los derechos reservados.</p>
          <p>Soluciones en membranas e impermeabilización desde 1983.</p>
        </div>
        <div>
          <p className="mb-3 font-semibold text-white">Enlaces rápidos</p>
          <ul className="grid grid-cols-2 gap-2">
            {['Inicio', 'Servicios', 'Productos', 'Nosotros', 'Contacto'].map((l) => (
              <li key={l}><a className="hover:text-brand-yellow" href={`#${l.toLowerCase()}`}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold text-white">Seguinos</p>
          <div className="flex flex-col gap-2">
            <a className="flex items-center gap-2 hover:text-brand-yellow" target="_blank" rel="noreferrer"
               href={`https://instagram.com/${settings?.instagram}`}><InstagramIcon /> @{settings?.instagram}</a>
            <a className="flex items-center gap-2 hover:text-brand-yellow" target="_blank" rel="noreferrer"
               href={`https://wa.me/${settings?.whatsapp}`}><WhatsAppIcon /> {settings?.whatsappDisplay}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
