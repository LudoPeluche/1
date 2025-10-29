# PIA - Predictive Inspection App

Aplicación React + Vite para inspecciones visuales de mantenimiento con soporte de Firebase.

## Requisitos
- Node.js 18+
- Firebase (Auth y Firestore habilitados)

## Configuración
1. Copia `.env.example` a `.env.local` y ajusta valores:
   - `VITE_APP_ID`
   - Credenciales de Firebase (`VITE_FIREBASE_*`)

2. Instala dependencias:
   - `npm install`

3. Desarrollo:
   - `npm start`

4. Producción:
   - `npm run build`

## Seguridad
- Reglas de Firestore (ejemplo base):
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

## Estructura
- `src/main.jsx`: punto de entrada React.
- `src/App.jsx`: aplicación principal.
- `tailwind.config.js`: configuración de Tailwind.

## Scripts
- `npm start` — Dev server con Vite.
- `npm run build` — Build de producción.
- `npm run preview` — Previsualización del build.

