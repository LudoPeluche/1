# Plan — Opción B (Una sola app multi‑empresa)

## Objetivo
- Una sola aplicación que sirva a múltiples empresas con datos aislados por `tenantId`.

## Modelo de datos
- `tenants/{tenantId}`
  - `assets/{assetId}`
  - `inspections/{inspectionId}`
  - `members/{uid}` → `{ role: 'admin' | 'technician', email, displayName, createdAt }`
- `superAdmins/{uid}` → super usuarios con acceso a todos los tenants.

## Cambios en la app
- Selector de empresa (solo superAdmin): elegir/crear `tenantId` activo, guardar en `localStorage.tenantId`.
- Lecturas/escrituras cambian a rutas `tenants/{tenantId}/...`.
- Roles: leer `members/{uid}` del tenant activo; si no existe, acceso mínimo.
- Cabecera: mostrar `Empresa: <tenantId>` junto a usuario/rol.

## Reglas de Firestore (borrador)
- Ver `ESTATUS/REGLAS_FIRESTORE.md` sección Multi‑tenant.

## Migración desde `artifacts/{appId}` (si aplica)
- Paso 1: congelar escrituras temporalmente (ventana de mantenimiento corta).
- Paso 2: script de migración (Cloud Function o script local) que copie:
  - `artifacts/{appId}/users/{uid}/assets/*` → `tenants/{tenantId}/assets/*` (mapea `tenantId` = `appId`).
  - `.../inspections/*` → `tenants/{tenantId}/inspections/*`.
  - Roles: `artifacts/{appId}/users/{uid}.role` → `tenants/{tenantId}/members/{uid}.role`.
- Paso 3: verificar conteos por colección y amostras.
- Paso 4: publicar nueva versión del front apuntando a `tenants`.

## Estimación y fases
- Desarrollo UI + rutas + roles: 1–2 días.
- Integración y pruebas (staging): 0.5 día.
- Migración productiva (si hay datos previos): 0.5 día.

## Observaciones
- Conserva `admins/{uid}` como superAdmin (`superAdmins/{uid}`) para administración general.
- Mantener un índice por `inspections.date desc` para listados y gráficos.
