---

Fecha: 23/10/2025 (ContinuaciÃ³n)

Resumen de Avances
- Se corrigiÃ³ el bug en la grÃ¡fica "EvoluciÃ³n del Estado" del Dashboard.
- La grÃ¡fica ya no usa datos de simulaciÃ³n.
- Se implementÃ³ la lÃ³gica para cargar todas las inspecciones y calcular los totales de 'OK' y 'ALERTA' por mes, mostrando ahora los datos reales del proyecto.
- Se aÃ±adiÃ³ un botÃ³n "Historial" en la lista principal de activos para navegar directamente al historial de inspecciones de cada activo.

Pendiente (sin cambios)
- Refactorizar src/App.jsx (monolÃ­tico) en componentes mÃ¡s pequeÃ±os.
- Crear Ã­ndices de Firestore cuando la aplicaciÃ³n lo requiera.
- Limpiar assets y CSS no utilizados.
- Atender vulnerabilidades reportadas por 'npm audit'.

---

Fecha: 23/10/2025

Resumen de Hoy
- Mejoras en dashboard y datos reales en la grÃ¡fica de evoluciÃ³n.
- NavegaciÃ³n al historial de inspecciones desde la lista de activos.
- Listener de inspecciones consolidado para alimentar mÃ©tricas.

Pendiente
- Refactorizar src/App.jsx en componentes mÃ¡s pequeÃ±os.
- Crear Ã­ndices de Firestore cuando la aplicaciÃ³n lo requiera.
- Limpiar assets y CSS no utilizados.
- Atender vulnerabilidades reportadas por 'npm audit'.

---

Fecha: 22/10/2025

Hecho hoy
- Inventariado del proyecto y revisiÃ³n de configuraciÃ³n (Vite, Tailwind, ESLint, Firebase).
- ReorganizaciÃ³n mÃ­nima: movÃ­ `App.jsx` a `src/App.jsx` y actualicÃ© el import en `src/main.jsx`.
- ActualicÃ© `tailwind.config.js` para escanear solo `src/**/*`.
- AÃ±adÃ­ `.env.example` con todas las variables necesarias y habilitÃ© `VITE_DEMO_MODE=true` por defecto.
- ReescribÃ­ `README.md` con pasos de setup, seguridad e Ã­ndices de Firestore.
- IntegrÃ© "Demo Mode" para ver la interfaz sin Firebase y agreguÃ© fallback automÃ¡tico cuando la auth tarda o falla.
- InstalÃ© dependencias y validÃ© con `npm run build` (build exitoso).

Pendiente
- Confirmar que la UI carga en localhost con `VITE_DEMO_MODE=true` (demo).
- Completar `/.env.local` con credenciales de Firebase y desactivar `VITE_DEMO_MODE` para usar datos reales.
- Reglas de Firestore: restringir a `request.auth.uid == userId` y crear Ã­ndices compuestos (assetId + date desc) cuando Firestore lo pida.
- Refactorizar `src/App.jsx` (monolÃ­tico) en componentes: `AssetHistory`, `AssetList`, `InspectionForm`, `DashboardCards`.
- Normalizar codificaciÃ³n UTF-8 y corregir tildes en textos/strings.
- Limpiar assets/CSS de template no usados (`src/App.css`, `react.svg`, `vite.svg`) o integrarlos a Tailwind.
- Reducir tamaÃ±o de bundle con code splitting (lazy import de vistas pesadas).
- AÃ±adir opciÃ³n en UI para alternar Demo/Live sin editar `.env` (persistir en `localStorage`).
- Revisar y tratar `npm audit` (2 vulnerabilidades moderadas) cuando convenga.

PrÃ³ximos pasos sugeridos
- Para demo inmediata: `Copy-Item .env.example .env.local` y `npm start` â†’ abrir http://localhost:5173.
- Para entorno real: completar `VITE_FIREBASE_*` y reiniciar `npm start`.

---

ActualizaciÃ³n 22/10/2025 (fin de dÃ­a)
- Dashboard con datos reales y estilos ajustados.
- AutenticaciÃ³n y creaciÃ³n de activos funcionando en entorno real.
- Preparados Ã­ndices y consultas para historial.

Pendiente actualizado
- Crear Ã­ndice compuesto en Firestore si aparece aviso al listar historial (assetId + date desc).

---

Fecha: 23/10/2025 (ActualizaciÃ³n UI y DX)

Hecho
- Dashboard > EvoluciÃ³n del Estado (Ãºltimos 12 meses)
  - Sustituido dataset simulado por conteo real desde Firestore (`allInspections`).
  - Orden fijo de meses Ene..Dic y filtro a los Ãºltimos 12 meses.
  - Ajustado grÃ¡fico SVG para que todo quede dentro de la tarjeta: mÃ¡rgenes internos y ejes redibujados.
  - Eje X elevado a `bottom = 135` y etiquetas de meses visibles (`fontSize=9`).
  - Etiquetas del eje Y mÃ¡s pequeÃ±as (`fontSize=7`).
  - Barras mÃ¡s esbeltas (`width=16`) y separaciÃ³n `barGap=30`.
- Lista "Mis Activos"
  - Nuevo botÃ³n "Historial" en cada activo â†’ navega a vista `assetHistory`.
- Firestore / Datos
  - Nuevo listener de inspecciones (`allInspections`) para alimentar el dashboard (hasta 500 registros, `orderBy('date','desc')`).
- ConfiguraciÃ³n Firebase
  - Lectura de config desde `.env` (`VITE_FIREBASE_*`) ademÃ¡s de variables globales inyectadas.
  - Si falta config, se muestra error y no queda bloqueado el "Cargandoâ€¦".
- Estilos / Tailwind
  - AÃ±adido `h-90` en `tailwind.config.js` (`22.5rem`).
  - Tarjeta de evoluciÃ³n: misma anchura (`lg:col-span-2`), mayor altura (`h-90`) y `overflow-hidden`.

Estado
- Build con Vite: OK.

Pendiente sugerido
- Opcional: mover leyenda dentro del Ã¡rea del grÃ¡fico (arriba-derecha) para ganar aÃºn mÃ¡s espacio al eje X.
- Opcional: query con `where('date','>=', cutoff)` para traer directamente Ãºltimos 12 meses (requerirÃ¡ Ã­ndice).

