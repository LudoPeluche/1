# Checklist de Onboarding — Empresa nueva

- [ ] Definir `empresa-id` (slug estable, sin espacios).
- [ ] Crear copia del front con `.env.local` → `VITE_APP_ID=<empresa-id>`.
- [ ] Desplegar o levantar entorno (staging/prod).
- [ ] Crear admins:
  - [ ] `admins/{UID}` (o `artifacts/<empresa-id>/users/{UID}` con `role: 'admin'`).
- [ ] Verificar cabecera de la app muestra `Entorno: <empresa-id>`.
- [ ] Probar flujo:
  - [ ] Crear activo.
  - [ ] Completar checklist y guardar inspección.
  - [ ] Ver Dashboard y últimos registros.
- [ ] Exportar/activar reglas de Firestore (ver `ESTATUS/REGLAS_FIRESTORE.md`).
- [ ] Crear backup automático (si aplica) y revisión de índices.
