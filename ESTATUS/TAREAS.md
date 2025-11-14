# Tareas

## En curso (Opcion B)
- Reglas Firestore multi-tenant y despliegue.
- UI cuando no hay `tenantId` (usuario sin membership): mostrar aviso y pasos.
- (Opcional) Cambiar check de `admins/{uid}` a `superAdmins/{uid}`.
- Indices necesarios (`inspections` por `date desc`).
- Script de migracion desde `artifacts/{appId}` si aplica.

## Pendientes - Opcion A (solo si se retoma)
- Crear despliegues por empresa con `VITE_APP_ID` distinto.
- Definir proceso para alta de admins por empresa.

## Hecho (2025-11-07)
- Migradas rutas residuales a `tenants/{tenantId}/...` (eliminacion de activos).
- Selector y creador de empresa para superAdmin en header.
- Persistencia de `tenantId` en `localStorage`.
- Resolucion automatica de `tenantId` por membership (`tenants/*/members/{uid}`).
- Header muestra `Empresa: <tenantId>`.
- `npm run build` exitoso.

## Hecho (2025-11-06)
- Fix de iconos (`Loader`, `Target`, etc.).
- Arreglo de condicion de carga y Login.
- Eliminado estado local que ocultaba `db` importado.
- Agregado checklist por defecto para activos.
- Documentadas Opciones A y B en `ESTATUS/2025-11-06.md`.
