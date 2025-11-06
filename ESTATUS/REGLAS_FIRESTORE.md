# Reglas de Firestore — borrador

Estas reglas contemplan dos escenarios: Opción A (por `appId`) y Opción B (multi‑tenant).

Nota: reemplazar `$(db)` por `$(database)` si usas la sintaxis nueva en el editor.

## Opción A — Copia por empresa (appId)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    function userDoc(appId) {
      return get(/databases/$(database)/documents/artifacts/$(appId)/users/$(request.auth.uid));
    }
    function role(appId) {
      return userDoc(appId).data.role;
    }

    // Perfiles
    match /artifacts/{appId}/users/{uid} {
      allow read: if request.auth != null && (isAdmin() || request.auth.uid == uid);
      allow write: if request.auth != null && (isAdmin() || (request.auth.uid == uid));
    }

    // Activos e inspecciones propios del usuario
    match /artifacts/{appId}/users/{uid}/assets/{assetId} {
      allow read: if request.auth != null && (isAdmin() || request.auth.uid == uid);
      allow write: if request.auth != null && (isAdmin() || role(appId) in ['admin']);
    }
    match /artifacts/{appId}/users/{uid}/inspections/{inspectionId} {
      allow read: if request.auth != null && (isAdmin() || request.auth.uid == uid);
      allow write: if request.auth != null && (isAdmin() || role(appId) in ['admin','technician']);
    }
  }
}
```

## Opción B — Multi‑tenant (recomendada)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSuperAdmin() {
      return exists(/databases/$(database)/documents/superAdmins/$(request.auth.uid));
    }
    function isMember(tenantId) {
      return exists(/databases/$(database)/documents/tenants/$(tenantId)/members/$(request.auth.uid));
    }
    function member(tenantId) {
      return get(/databases/$(database)/documents/tenants/$(tenantId)/members/$(request.auth.uid));
    }
    function hasRole(tenantId, r) {
      return isMember(tenantId) && member(tenantId).data.role == r;
    }

    match /tenants/{tenantId} {
      allow read: if isSuperAdmin() || isMember(tenantId);
      allow write: if false; // evita escribir directo en el doc del tenant

      match /members/{uid} {
        allow read: if isSuperAdmin() || (isMember(tenantId) && request.auth.uid == uid);
        allow write: if isSuperAdmin() || hasRole(tenantId, 'admin');
      }
      match /assets/{assetId} {
        allow read: if isSuperAdmin() || isMember(tenantId);
        allow write: if isSuperAdmin() || hasRole(tenantId, 'admin');
      }
      match /inspections/{inspectionId} {
        allow read: if isSuperAdmin() || isMember(tenantId);
        allow write: if isSuperAdmin() || hasRole(tenantId, 'admin') || hasRole(tenantId, 'technician');
      }
    }
  }
}
```

## Índices sugeridos
- `tenants/*/inspections` ordenar por `date desc`.
- `artifacts/*/users/*/inspections` ordenar por `date desc`.
