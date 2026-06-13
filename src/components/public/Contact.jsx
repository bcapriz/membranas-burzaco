import { useState } from 'react';
import { waLink } from '../../api/client';
import { WhatsAppIcon, InstagramIcon } from './Icons';

export default function Contact({ settings }) {
  const [form, setForm] = useState({ nombre: '', telefono: '', servicio: '', mensaje: '' });

  // Sin backend de emails: el formulario arma el mensaje y abre WhatsApp
  const enviar = () => {
    const texto = [
      `Hola, soy ${form.nombre || '...'}.`,
      form.servicio && `Quería consultar por: ${form.servicio}.`,
      form.mensaje,
      form.telefono && `Mi teléfono: ${form.telefono}`,
    ].filter(Boolean).join(' ');
    window.open(`https://wa.me/${settings?.whatsapp}?text=${encodeURIComponent(texto)}`, '_blank');
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <section id="contacto" className="bg-brand-dark py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Contactanos</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">Estamos para ayudarte</h2>

          <div className="mt-8 space-y-5 text-sm">
            <a href={waLink(settings)} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-200 hover:text-brand-yellow">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-yellow"><WhatsAppIcon /></span>
              <span><strong>WhatsApp</strong><br />{settings?.whatsappDisplay} · Respuesta inmediata</span>
            </a>
            <a href={`https://instagram.com/${settings?.instagram}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-200 hover:text-brand-yellow">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-yellow"><InstagramIcon /></span>
              <span><strong>Instagram</strong><br />@{settings?.instagram} · Escribinos por DM</span>
            </a>
            <p className="flex items-center gap-3 text-gray-200">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-yellow">🕗</span>
              <span><strong>Horarios de atención</strong><br />{settings?.horarios}</span>
            </p>
            <p className="flex items-center gap-3 text-gray-200">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow/15 text-brand-yellow">📍</span>
              <span><strong>Dirección</strong><br />{settings?.direccion}</span>
            </p>
          </div>
        </div>

        {/* Formulario que deriva a WhatsApp */}
        <div className="rounded-2xl border border-brand-border bg-brand-panel p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <input value={form.nombre} onChange={set('nombre')} placeholder="Nombre y apellido"
              className="rounded-lg border border-brand-border bg-black/40 px-4 py-3 text-sm outline-none focus:border-brand-yellow" />
            <input value={form.telefono} onChange={set('telefono')} placeholder="Teléfono / WhatsApp"
              className="rounded-lg border border-brand-border bg-black/40 px-4 py-3 text-sm outline-none focus:border-brand-yellow" />
          </div>
          <select value={form.servicio} onChange={set('servicio')}
            className="mt-4 w-full rounded-lg border border-brand-border bg-black/40 px-4 py-3 text-sm outline-none focus:border-brand-yellow">
            <option value="">Servicio de interés (opcional)</option>
            <option>Colocación de membranas</option>
            <option>Impermeabilización</option>
            <option>Reparación de filtraciones</option>
            <option>Asesoramiento técnico</option>
            <option>Compra de materiales</option>
          </select>
          <textarea value={form.mensaje} onChange={set('mensaje')} rows="4" placeholder="Contanos tu consulta…"
            className="mt-4 w-full rounded-lg border border-brand-border bg-black/40 px-4 py-3 text-sm outline-none focus:border-brand-yellow" />
          <button onClick={enviar} className="btn-yellow mt-4 w-full justify-center">
            <WhatsAppIcon /> Enviar consulta
          </button>
        </div>
      </div>
    </section>
  );
}
