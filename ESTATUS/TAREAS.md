# Tareas

## En curso
- Migrar import de iconos faltantes y alias (`TargetIcon`).
- Añadir checklist por defecto para creación de activos.

## Pendientes — Opción A
- Crear despliegue `empresa-1` con `VITE_APP_ID=empresa-1`.
- Crear despliegue `empresa-2` con `VITE_APP_ID=empresa-2`.
- Definir proceso para alta de admins por empresa.

## Pendientes — Opción B (multi‑tenant)
- Añadir selector de empresa para superAdmin.
- Cambiar rutas a `tenants/{tenantId}/...` (assets, inspections, roles).
- Implementar `members/{uid}` y lectura de rol por tenant.
- Actualizar reglas de Firestore (ver archivo correspondiente).
- Preparar script de migración desde `artifacts/{appId}`.

## Hecho (hoy)
- Fix de `Loader`, `Target` y otros iconos no importados.
- Arreglo de condición de carga (mostrar Login cuando corresponde).
- Import de `Login` y eliminación de estado local `db` que tapaba el import.
- Agregado `DEFAULT_IV_IS_CHECKLIST` para evitar error al crear activos.
- Documentación en `ESTATUS/2025-11-06.md` con opciones A y B.
