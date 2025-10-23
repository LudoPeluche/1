# PIA - Predictive Inspection App

Aplicación React + Vite para inspecciones visuales de mantenimiento con soporte de Firebase y un módulo de IA (Gemini).

## Requisitos
- Node.js 18+
- Una cuenta de Firebase (Auth anónima y Firestore habilitados)

## Configuración
1. Copia `.env.example` a `.env.local` y ajusta valores:
   - `VITE_APP_ID`
   - Credenciales de Firebase (`VITE_FIREBASE_*`)
   - `VITE_GEMINI_API_KEY` (solo en desarrollo; en producción usa un backend/proxy)
   - `VITE_GEMINI_MODEL` (por defecto `gemini-1.5-flash`)
   - `VITE_DEMO_MODE=true` para arrancar sin Firebase/Gemini (muestra datos de ejemplo)

2. Instala dependencias:
   - `npm install`

3. Arranca en modo desarrollo:
   - `npm start`

4. Build de producción:
   - `npm run build`

## Notas de Seguridad
- Evita exponer `VITE_GEMINI_API_KEY` en producción. Implementa un backend que consuma la API de Gemini y aplica autenticación/autorización con Firebase.
- Reglas de Firestore (ejemplo base, ajusta a tu esquema):
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /artifacts/{appId}/users/{userId}/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
  ```

## Índices de Firestore
Las consultas que combinan `where('assetId','==', ...)` y `orderBy('date','desc')` requieren un índice compuesto. Firestore mostrará un enlace para crearlo la primera vez que falle la consulta.

## Estructura Principal
- `src/main.jsx`: punto de entrada React.
- `src/App.jsx`: aplicación principal.
- `tailwind.config.js`: configuración de Tailwind (escanea `src/**`).

## Scripts
- `npm start` — Dev server con Vite.
- `npm run build` — Build de producción.
- `npm run preview` — Previsualización del build.
