import axios from 'axios';

// En dev, baseURL vacía → el proxy de Vite redirige /api al backend.
// En producción, definir VITE_API_URL (ej: https://api.midominio.com.ar)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mb_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Token vencido en el admin → volver al login
    if (err.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('mb_token');
      if (window.location.pathname !== '/admin/login') window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

// Resuelve URLs de imágenes relativas (/uploads/...) contra la API
export const imgUrl = (src) => {
  if (!src) return '';
  if (src.startsWith('http')) return src;
  return `${import.meta.env.VITE_API_URL || ''}${src}`;
};

// Construye el link de WhatsApp con el mensaje del producto
export const waLink = (settings, producto) => {
  const numero = settings?.whatsapp || '';
  const plantilla = settings?.mensajeWhatsApp || 'Hola, quería consultar por {producto}.';
  const nombre = producto ? `${producto.nombre}${producto.subtitulo ? ' ' + producto.subtitulo : ''}` : '';
  const mensaje = producto ? plantilla.replace('{producto}', nombre) : 'Hola, quería hacer una consulta.';
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
};

export default api;
