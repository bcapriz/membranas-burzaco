import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark px-4">
      <div className="w-full max-w-sm rounded-2xl border border-brand-border bg-brand-panel p-8">
        <div className="mb-6 text-center">
          <img src="/img/logo.png" alt="Membranas Burzaco" className="mx-auto mb-3 h-20 w-20 rounded-xl" />
          <h1 className="font-display text-xl font-extrabold uppercase text-brand-yellow">Membranas Burzaco</h1>
          <p className="text-sm text-gray-400">Panel de administración</p>
        </div>

        <label className="mb-1 block text-sm text-gray-300">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="username"
          className="mb-4 w-full rounded-lg border border-brand-border bg-black/40 px-4 py-3 text-sm outline-none focus:border-brand-yellow" />

        <label className="mb-1 block text-sm text-gray-300">Contraseña</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password"
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          className="mb-4 w-full rounded-lg border border-brand-border bg-black/40 px-4 py-3 text-sm outline-none focus:border-brand-yellow" />

        {error && <p className="mb-4 rounded bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}

        <button onClick={onSubmit} disabled={loading} className="btn-yellow w-full justify-center disabled:opacity-50">
          {loading ? 'Ingresando…' : 'Iniciar sesión'}
        </button>
      </div>
    </div>
  );
}
