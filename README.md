# PIA - Predictive Inspection App

Aplicación React + Vite para inspecciones visuales de mantenimiento con soporte de Firebase.

### Objetivo del Proyecto: PIA (Predictive Inspection App)

**PIA** es una aplicación diseñada para digitalizar y optimizar el proceso de inspección de activos en un entorno industrial, facilitando la transición hacia un modelo de mantenimiento predictivo.

La aplicación define dos roles de usuario principales:

1.  **Administrador (Planificador / Jefe de Mantenimiento):**
    *   Responsable de la gestión completa de los activos (crear, leer, actualizar y eliminar).
    *   Revisa los informes de inspección y los datos históricos para analizar tendencias, detectar anomalías y tomar decisiones estratégicas de mantenimiento.

2.  **Técnico de Mantenimiento:**
    *   Ejecuta las inspecciones en campo utilizando checklists digitales.
    *   Registra el estado de los equipos, adjunta evidencia fotográfica y reporta cualquier hallazgo.

El **objetivo final** es utilizar los datos recopilados para anticipar fallos en los equipos, reducir el tiempo de inactividad no planificado, optimizar los recursos de mantenimiento y mejorar la seguridad general.

---

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

