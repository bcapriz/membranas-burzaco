import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/api/products/stats').then((res) => setStats(res.data)).catch(console.error);
  }, []);

  const cards = stats && [
    { titulo: 'Total productos', valor: stats.total, color: 'text-black' },
    { titulo: 'Publicados', valor: stats.publicados, color: 'text-green-600' },
    { titulo: 'Destacados', valor: stats.destacados, color: 'text-brand-yellow' },
    { titulo: 'Borradores', valor: stats.borradores, color: 'text-gray-500' },
    { titulo: 'Sin imagen', valor: stats.sinImagen, color: 'text-orange-500' },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold">Dashboard</h1>
          <p className="text-sm text-gray-500">Bienvenido al panel de administración</p>
        </div>
        <Link to="/admin/productos?nuevo=1" className="btn-yellow">+ Nuevo producto</Link>
      </div>

      {!cards ? (
        <p className="text-gray-500">Cargando métricas…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((c) => (
            <div key={c.titulo} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className={`font-display text-3xl font-black ${c.color}`}>{c.valor}</p>
              <p className="mt-1 text-sm text-gray-500">{c.titulo}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="font-display font-bold">Sitio sin carrito de compras</h2>
        <p className="mt-1 text-sm text-gray-600">
          El sitio web no utiliza carrito de compras. Todas las llamadas a la acción (CTA) redirigen a
          WhatsApp o Instagram para consultas directas. Podés editar el número, el usuario de Instagram
          y el mensaje predeterminado desde <Link to="/admin/configuracion" className="font-semibold text-brand-yellow underline">Configuración</Link>.
        </p>
      </div>
    </div>
  );
}
