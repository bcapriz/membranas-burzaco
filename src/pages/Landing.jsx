import { useEffect, useState } from 'react';
import api, { waLink } from '../api/client';
import Navbar from '../components/public/Navbar';
import Hero from '../components/public/Hero';
import Services from '../components/public/Services';
import Products from '../components/public/Products';
import Works from '../components/public/Works';
import About from '../components/public/About';
import Contact from '../components/public/Contact';
import Footer from '../components/public/Footer';
import { WhatsAppIcon } from '../components/public/Icons';

export default function Landing() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get('/api/settings').then((res) => setSettings(res.data)).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar settings={settings} />
      <Hero settings={settings} />
      <Services />
      <Products settings={settings} />
      <Works settings={settings} />
      <About />
      <Contact settings={settings} />
      <Footer settings={settings} />

      {/* Botón flotante de WhatsApp */}
      <a
        href={waLink(settings)}
        target="_blank" rel="noreferrer"
        aria-label="Abrir WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  );
}
