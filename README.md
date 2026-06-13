# Membranas Burzaco — Web (frontend)

Landing pública + panel de administración en React (Vite) + Tailwind.
Repo de la API: `membranas-burzaco-backend` (debe estar corriendo en el puerto 4000 en desarrollo).

## Puesta en marcha

```bash
npm install
npm run dev     # http://localhost:5173
```

En desarrollo no hace falta `.env`: el proxy de Vite redirige `/api` y `/uploads`
a `http://localhost:4000` (ver `vite.config.js`).

- Landing: `http://localhost:5173/`
- Panel admin: `http://localhost:5173/admin`

## Variables de entorno (solo producción)

```
VITE_API_URL=https://api.tudominio.com.ar
```

Es la URL pública del backend. Se usa como baseURL de axios y para resolver
las imágenes relativas (`/uploads/...`). Sin barra final.

## Deploy (Vercel o Netlify)

1. Subir este repo a GitHub e importarlo. Build: `npm run build`, output: `dist`.
2. Variable `VITE_API_URL` apuntando al backend (recordá que las variables `VITE_*`
   se inyectan en build time: si la cambiás, hay que redeployar).
3. Configurar rewrite SPA para que `/admin` funcione al recargar:
   - **Vercel** — `vercel.json` ya incluido en este repo.
   - **Netlify** — archivo `public/_redirects` ya incluido.
4. Avisarle al backend: agregar la URL final del frontend en su `CLIENT_URL` (CORS).
