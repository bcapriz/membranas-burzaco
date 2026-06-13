import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Login from './pages/admin/Login.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ProductsAdmin from './pages/admin/ProductsAdmin.jsx';
import CategoriesAdmin from './pages/admin/CategoriesAdmin.jsx';
import SettingsAdmin from './pages/admin/SettingsAdmin.jsx';
import { useAuth } from './context/AuthContext.jsx';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex h-screen items-center justify-center bg-brand-dark text-white">Cargando…</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<Protected><AdminLayout /></Protected>}>
        <Route index element={<Dashboard />} />
        <Route path="productos" element={<ProductsAdmin />} />
        <Route path="categorias" element={<CategoriesAdmin />} />
        <Route path="configuracion" element={<SettingsAdmin />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
