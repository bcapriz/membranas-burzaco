# Membranas Burzaco — Landing + Panel de Administración

Sitio web en producción para **Membranas Burzaco**, empresa de impermeabilización de la zona sur del GBA. Proyecto freelance real, desarrollado end-to-end: landing pública optimizada para SEO y panel de administración (CMS propio) para que el cliente gestione su contenido sin tocar código.

🔗 **Sitio en vivo:** https://www.membranasburzaco.com.ar

---

## ✨ Qué hace

**Landing pública**
- Presentación de servicios, galería de trabajos realizados y contacto directo (WhatsApp / formulario).
- SEO técnico: Schema.org (LocalBusiness), sitemap.xml, Open Graph, metadatos por sección — posicionada en Google para búsquedas locales del rubro.
- Responsive, optimizada para carga rápida en móvil.

**Panel de administración (`/admin`)**
- CMS propio protegido con autenticación **JWT**.
- ABM de contenido: servicios, trabajos de la galería e imágenes.
- Carga y gestión de imágenes con **Cloudinary**.

---

## 🛠️ Stack

| Capa | Tecnología |
|---|---|
| Frontend | React (Vite) · Tailwind CSS · Axios |
| Backend | Node.js · Express ([repo](https://github.com/bcapriz/membranas-burzaco-backend)) |
| Base de datos | MongoDB |
| Imágenes | Cloudinary |
| Auth | JWT |
| Deploy | Vercel (frontend) · Render (backend) · dominio propio NIC.ar |

---

## 🏗️ Arquitectura

```
┌─────────────┐      /api       ┌──────────────┐        ┌───────────┐
│ React (Vite)│ ──────────────► │ Express API  │ ─────► │  MongoDB  │
│   Vercel    │                 │    Render    │        │   Atlas   │
└─────────────┘                 └──────┬───────┘        └───────────┘
                                       │
                                       ▼
                                  Cloudinary
                                 (imágenes)
```

---

## 🚀 Desarrollo local

```bash
npm install
npm run dev     # http://localhost:5173
```

En desarrollo no hace falta `.env`: el proxy de Vite redirige `/api` y `/uploads` a `http://localhost:4000` (ver `vite.config.js`). La API ([membranas-burzaco-backend](https://github.com/bcapriz/membranas-burzaco-backend)) debe estar corriendo en el puerto 4000.

- Landing: `http://localhost:5173/`
- Panel admin: `http://localhost:5173/admin`

### Variables de entorno (solo producción)

```
VITE_API_URL=https://api.tudominio.com.ar
```

URL pública del backend, sin barra final. Se usa como baseURL de Axios y para resolver las imágenes relativas (`/uploads/...`).

### Deploy

1. Importar el repo en Vercel o Netlify. Build: `npm run build`, output: `dist`.
2. Configurar `VITE_API_URL` apuntando al backend en producción.

---

## 👤 Autor

**Bruno Capriz** — [GitHub](https://github.com/bcapriz) · [LinkedIn](https://linkedin.com/in/brunocapriz) · brucapriz@icloud.com


