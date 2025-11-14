# Reglas de Firestore — Versión Final (Single-Tenant)

Este archivo contiene las reglas de seguridad de Firestore actualizadas para el modelo de aplicación de **empresa única (single-tenant)** con roles de `admin` y `tecnico`.

Estas reglas reemplazan las versiones anteriores de "Opción A" y "Opción B".

## Reglas para Desplegar
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // --- Funciones de Ayuda ---
    function isAdmin() {
      // Un usuario es admin si existe en la colección global 'admins'.
      // Esto es útil para el bootstrapping inicial de administradores.
      return exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    function getUserRole(appId) {
      // Obtiene el rol del usuario desde su documento en 'artifacts/{appId}/users/{uid}'.
      let userDoc = get(/databases/$(database)/documents/artifacts/$(appId)/users/$(request.auth.uid));
      // Si el documento no existe o no tiene rol, no se le concede ningún rol.
      if (!exists(userDoc.path)) {
        return '';
      }
      return userDoc.data.role;
    }

    function isAppAdmin(appId) {
      // Un usuario es administrador de la aplicación si es un admin global o tiene el rol 'admin'.
      return isAdmin() || getUserRole(appId) == 'admin';
    }

    function isSignedIn() {
      // Verifica que el usuario haya iniciado sesión.
      return request.auth != null;
    }

    function isNotUnavailable(appId) {
      // Verifica que el rol del usuario no sea 'no disponible'.
      return getUserRole(appId) != 'no disponible';
    }

    // --- Reglas por Colección ---

    // La colección 'admins' es de solo lectura para los clientes.
    // Los administradores iniciales deben gestionarse directamente desde la consola de Firebase.
    match /admins/{uid} {
      allow read: if isSignedIn();
      allow write: if false;
    }

    // Contenedor principal de datos de la aplicación.
    match /artifacts/{appId} {

      // Perfiles de usuario y sus roles.
      match /users/{uid} {
        // Solo los usuarios que no están deshabilitados pueden leer la lista de usuarios.
        allow read: if isSignedIn() && isNotUnavailable(appId);
        // Solo los administradores de la aplicación pueden crear, actualizar o eliminar perfiles de usuario.
        // Esto les permite gestionar los roles.
        allow write: if isAppAdmin(appId);
      }

      // Activos de la empresa.
      match /assets/{assetId} {
        // Solo los usuarios que no están deshabilitados pueden leer los activos.
        allow read: if isSignedIn() && isNotUnavailable(appId);
        // Solo los administradores pueden crear, actualizar o eliminar activos.
        allow write: if isAppAdmin(appId);
      }

      // Inspecciones de los activos.
      match /inspections/{inspectionId} {
        // Solo los usuarios que no están deshabilitados pueden leer las inspecciones.
        allow read: if isSignedIn() && isNotUnavailable(appId);
        // Solo los usuarios que no están deshabilitados pueden crear una nueva inspección.
        allow create: if isSignedIn() && isNotUnavailable(appId);
        // Solo los administradores pueden modificar o eliminar una inspección existente.
        allow update, delete: if isAppAdmin(appId);
      }
    }
  }
}
```

## Índices Requeridos

Para que las consultas de la aplicación funcionen correctamente, asegúrate de que los siguientes índices estén creados en tu base de datos de Firestore:

1.  **Colección:** `inspections` (dentro de `artifacts/{appId}`)
    *   **Campo:** `date`
    *   **Orden:** Descendente
2.  **Colección:** `assets` (dentro de `artifacts/{appId}`)
    *   **Campo:** `createdAt`
    *   **Orden:** Descendente