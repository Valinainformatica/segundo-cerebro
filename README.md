# 🧠 Segundo Cerebro

Sistema de gestión de conocimiento personal de Efrén Valiña.

## Características

- ✅ **Autenticación integrada** - Requiere login mediante sesión PHP
- 📚 **Gestión de documentos** - Lista, visualiza y organiza documentos Markdown
- 🔍 **Búsqueda y filtros** - Búsqueda avanzada y filtrado por categorías
- 🎨 **Diseño moderno** - UI oscura profesional con acentos de color
- 📱 **Responsive** - Funciona perfectamente en todos los dispositivos
- 🔒 **Seguro** - Todas las peticiones requieren sesión válida

## Stack Tecnológico

- **Frontend:** Next.js 14 + React + TypeScript
- **Estilos:** Tailwind CSS
- **Backend:** API REST en PHP (Hostinger)
- **Deploy:** Vercel
- **Autenticación:** Sesión PHP con cookies

## Autenticación

El sistema requiere login previo:

- **URL Login:** https://mitienda.tech/brain/login.php
- **Contraseña:** `Cerebr0_V4l1n4_2026!`

La aplicación:
- Envía `credentials: 'include'` en todas las peticiones API
- Redirige automáticamente a login si recibe error 401
- Incluye botón de logout en el sidebar

## Configuración Local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://mitienda.tech/brain/api.php
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Deploy en Vercel

### Opción 1: Desde CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Opción 2: Desde GitHub

1. Push del código a GitHub
2. Importar repo en https://vercel.com/new
3. Configurar variable de entorno:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://mitienda.tech/brain/api.php`
4. Deploy

## Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página home con lógica
│   └── globals.css         # Estilos globales
├── components/
│   ├── Sidebar.tsx         # Sidebar con logout
│   ├── DocViewer.tsx       # Visor de documentos
│   └── EmptyState.tsx      # Estado vacío
└── lib/
    └── api.ts              # Cliente API con auth
```

## Flujo de Autenticación

```
Usuario → App Vercel
         ↓
      API sin sesión (401)
         ↓
      Redirige → Login PHP
         ↓
      Ingresa contraseña
         ↓
      Sesión creada (24h)
         ↓
      Redirige → App Vercel
         ↓
      Carga documentos
```

## API Backend

El backend en Hostinger soporta:
- Autenticación dual (sesión + API key)
- CORS configurado para Vercel
- Endpoints: `list`, `get`, `save`, `delete`

Ver documentación en el Segundo Cerebro: `login-sistema.md`

## Autor

**Efrén Valiña**
Valiña Informática
© 2026
