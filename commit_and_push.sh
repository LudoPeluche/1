#!/bin/bash
# Este script añade, confirma y sube los cambios al repositorio de Git.

# 1. Añade todos los archivos modificados y nuevos.
echo "Añadiendo archivos al stage..."
git add src/App.jsx functions/index.js firebase.json ESTATUS/2025-12-02.md

# 2. Crea el commit con un mensaje descriptivo.
echo "Realizando el commit..."
git commit -m "feat: Implementar carga masiva de activos

Se implementa la funcionalidad de carga masiva de activos a través de un archivo Excel.

- Se añade la función Cloud Function 'bulkAddAssets' para procesar los datos en el backend.
- Se conecta el componente de UI con la Cloud Function a través de una llamada HTTPS.
- Se solucionan errores de despliegue (linting) y de permisos (403 Forbidden) para permitir la ejecución.
- Se documentan los cambios en el archivo de estado."

# 3. Sube los cambios al repositorio remoto (rama principal).
echo "Subiendo cambios al repositorio remoto..."
git push

echo "¡Proceso completado!"
