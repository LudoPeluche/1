# Plan — Opción A (una copia por empresa con `VITE_APP_ID`)

## Objetivo
- Aislar datos por empresa usando un `appId` distinto en cada despliegue.

## Estructura de datos (ya soportada)
- Colección: `artifacts/{appId}/users/{uid}` → perfil y rol (`role: 'admin'|'technician'`).
- Colección: `artifacts/{appId}/users/{uid}/assets/{assetId}`.
- Colección: `artifacts/{appId}/users/{uid}/inspections/{inspectionId}`.
- Colección raíz opcional: `admins/{uid}` (si existe, el usuario es admin global en esa copia).

## Pasos por empresa
- Elegir identificador de empresa: `empresa-<n>` o un slug (`acme`, `beta-oil`, etc.).
- Configurar `.env.local` de esa copia:
  - `VITE_APP_ID=<empresa-id>`
- Ejecutar o desplegar:
  - Locally: `npm run start`
  - Producción: build y hosting donde corresponda.
- Asignar administradores:
  - Opción rápida: crear documento `admins/{UID}`.
  - Alternativa: en `artifacts/<empresa-id>/users/{UID}` poner `role: 'admin'`.

## Reglas de Firestore (compatible con Opción A)
- Ver `ESTATUS/REGLAS_FIRESTORE.md` sección Opción A.

## Checklist de entrega
- Ver `ESTATUS/CHECKLIST_ONBOARDING_EMPRESA.md`.

## Observaciones
- El encabezado muestra `Entorno: <appId>` para confirmar el "cajón" de datos.
- Mantener un nombre estable para cada empresa; no cambiar `appId` una vez en uso.
