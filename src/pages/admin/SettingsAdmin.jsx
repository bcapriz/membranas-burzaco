import { useEffect, useState } from 'react';
import api from '../../api/client';

const campos = [
  { key: 'whatsapp', label: 'WhatsApp (formato internacional, sin +)', help: 'Se usa en los links wa.me — ej: 5491155887766' },
  { key: 'whatsappDisplay', label: 'WhatsApp (cómo se muestra)', help: 'ej: 11 5588-7766' },
  { key: 'instagram', label: 'Usuario de Instagram (sin @)' },
  { key: 'email', label: 'Email de contacto' },
  { key: 'telefono', label: 'Teléfono fijo' },
  { key: 'direccion', label: 'Dirección' },
  { key: 'horarios', label: 'Horarios de atención' },
  { key: 'mensajeWhatsApp', label: 'Mensaje predeterminado de WhatsApp', help: 'Usá {producto} donde quieras que aparezca el nombre del producto' },
];

export default function SettingsAdmin() {
  const [form, setForm] = useState(null);
  const [guardado, setGuardado] = useState(false);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => { api.get('/api/settings').then((r) => setForm(r.data)); }, []);

  const guardar = async () => {
    setGuardando(true);
    await api.put('/api/settings', form);
    setGuardando(false);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2500);
  };

  if (!form) return <p className="text-gray-500">Cargando configuración…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-extrabold">Configuración del sitio</h1>
      <p className="mb-6 text-sm text-gray-500">
        Canales de contacto y datos que se muestran en la landing. Los CTA redirigen a WhatsApp o Instagram.
      </p>

      <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {campos.map((c) => (
          <div key={c.key}>
            <label className="mb-1 block text-sm font-medium">{c.label}</label>
            <input value={form[c.key] || ''} onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand-yellow" />
            {c.help && <p className="mt-1 text-xs text-gray-400">{c.help}</p>}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button onClick={guardar} disabled={guardando} className="btn-yellow disabled:opacity-50">
          {guardando ? 'Guardando…' : 'Guardar configuración'}
        </button>
        {guardado && <span className="text-sm font-medium text-green-600">✓ Configuración guardada</span>}
      </div>
    </div>
  );
}
