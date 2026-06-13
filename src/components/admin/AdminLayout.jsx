import { NavLink, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const nav = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/productos', label: 'Productos' },
  { to: '/admin/categorias', label: 'Categorías' },
  { to: '/admin/configuracion', label: 'Configuración' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] text-black">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col bg-black text-white">
        <div className="border-b border-brand-border p-5">
          <img src="/img/logo.png" alt="Membranas Burzaco" className="mb-2 h-14 w-14 rounded-lg" />
          <p className="font-display font-extrabold uppercase text-brand-yellow">Membranas Burzaco</p>
          <p className="text-xs text-gray-400">CMS v1.0</p>
        </div>
        <nav className="flex-1 p-3">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({ isActive }) =>
                `mb-1 block rounded-lg px-4 py-2.5 text-sm font-medium transition ${isActive ? 'bg-brand-yellow text-black' : 'text-gray-300 hover:bg-brand-panel'}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-brand-border p-4 text-sm">
          <p className="mb-1 truncate font-medium">{user?.nombre}</p>
          <p className="mb-3 truncate text-xs text-gray-400">{user?.email}</p>
          <Link to="/" className="mb-2 block text-xs text-gray-400 hover:text-brand-yellow">← Ver sitio web</Link>
          <button onClick={logout} className="w-full rounded-lg border border-brand-border py-2 text-xs hover:border-brand-yellow hover:text-brand-yellow">
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
