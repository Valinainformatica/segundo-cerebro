# CLAUDE.md — Segundo Cerebro

## Descripción

Sistema de gestión de conocimiento personal (estilo Obsidian/Linear) construido con Next.js. Frontend desplegado en Vercel, backend PHP en Hostinger. Renderiza documentos Markdown con categorías, búsqueda y navegación.

## Estructura del proyecto

```
src/
├── app/
│   ├── api/docs/route.ts    # Proxy API → backend PHP (maneja CORS)
│   ├── layout.tsx            # Layout raíz (fuentes, metadata)
│   ├── page.tsx              # Página principal (componente cliente)
│   └── globals.css           # Estilos globales + tema Tailwind
├── components/
│   ├── Sidebar.tsx           # Lista de documentos, búsqueda, filtros
│   ├── DocViewer.tsx         # Renderizador de Markdown
│   └── EmptyState.tsx        # Placeholder sin documento seleccionado
└── lib/
    └── api.ts                # Cliente API con autenticación
```

## Comandos

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run start     # Servidor de producción
npm run lint      # ESLint
```

## Stack tecnológico

- **Framework**: Next.js 16 (App Router) + React 19
- **Lenguaje**: TypeScript 5 (modo estricto)
- **Estilos**: Tailwind CSS 4 via PostCSS
- **Markdown**: react-markdown + remark-gfm + rehype-highlight + rehype-raw
- **Despliegue**: Vercel (auto-deploy desde Git)
- **Backend**: PHP en Hostinger (`mitienda.tech/brain/api.php`)

## Convenciones de código

- **Componentes**: PascalCase (`DocViewer.tsx`)
- **Funciones**: camelCase (`fetchDocs()`)
- **Constantes/enums**: UPPER_SNAKE_CASE (`CATEGORY_ICONS`)
- **Tipos**: PascalCase, sufijo `Props` para props de componentes
- Marcar componentes con hooks como `"use client"`
- Usar Tailwind para estilos — no CSS modules
- Estado con React hooks (useState, useEffect, useMemo) — sin Redux/Zustand
- Try-catch con mensajes de error amigables para el usuario

## Tema y diseño

- **Tema oscuro**: fondo `#0a0a0a`, texto blanco
- **Color primario**: `#3b82f6`
- **Color secundario**: `#60a5fa`
- **Color hover**: `#2563eb`
- **NUNCA usar fondos rosa** — negro es negro (`#0f0f0f`)

## Sistema de categorías

| Categoría     | Icono | Color   |
|---------------|-------|---------|
| proyecto      | 📁    | blue    |
| bug           | 🐛    | red     |
| arquitectura  | 🏗️    | purple  |
| sesion        | 💬    | green   |
| referencia    | 📖    | amber   |
| sistema       | ⚙️    | zinc    |
| general       | 📄    | zinc    |

## Arquitectura

```
[Vercel - Next.js Frontend] → /api/docs (proxy) → [Hostinger - PHP Backend]
```

- **Autenticación**: Sesiones PHP con cookies (`credentials: 'include'`)
- **API proxy**: `src/app/api/docs/route.ts` reenvía peticiones al backend PHP para evitar CORS
- **Redirección 401**: Si la sesión expira, redirige a página de login externa

## Variables de entorno

- `NEXT_PUBLIC_API_URL` — URL del backend API (configurada en `vercel.json` para producción)

## Testing

No hay framework de testing configurado actualmente.

## Notas para desarrollo

- El backend PHP está en un servidor Hostinger separado — los cambios de frontend y backend se despliegan independientemente
- Los documentos se almacenan como archivos `.md` en el servidor
- La configuración de Vercel está en `vercel.json`
- ESLint configurado en `eslint.config.mjs`
