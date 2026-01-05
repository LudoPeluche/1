import React, { useState } from 'react';
import { Loader, Plus, CheckCircle, UploadCloud } from 'lucide-react';
import { read, utils } from 'xlsx';

const AssetList = ({
  userRole,
  handleAddAsset,
  onBulkAddAssets, // Nueva prop
  loading,
  newAssetName,
  setNewAssetName,
  newAssetLocation,
  setNewAssetLocation,
  newAssetDescription,
  setNewAssetDescription,
  newAssetTag,
  setNewAssetTag,
  newAssetCriticality,
  setNewAssetCriticality,
  filteredAssets,
  searchTerm,
  setSearchTerm,
  onNavigateToAssetHistory,
  onNavigateToInspection,
}) => {
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setUploadStatus('Procesando archivo...');
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target.result;
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet);

        if (json.length === 0) {
          setUploadStatus('Error: El archivo está vacío o tiene un formato incorrecto.');
          return;
        }

        // Mapeo de cabeceras (español) a claves de objeto (inglés)
        const headerMapping = {
          'Nombre': 'name',
          'Ubicacion': 'location',
          'Tag': 'tag',
          'Descripcion': 'description',
          'Criticidad': 'criticality',
        };

        const validatedAssets = json.map(row => {
          const asset = {};
          for (const key in headerMapping) {
            if (row[key] !== undefined) {
              asset[headerMapping[key]] = row[key];
            }
          }
          return asset;
        });

        const firstAsset = validatedAssets[0];
        if (!firstAsset || !firstAsset.name) {
          setUploadStatus('Error: El archivo debe contener una columna "Nombre".');
          return;
        }

        setUploadStatus(`Se encontraron ${validatedAssets.length} activos. Subiendo...`);
        onBulkAddAssets(validatedAssets, (success, message) => {
          if (success) {
            setUploadStatus(`✓ ${message}`);
          } else {
            setUploadStatus(`✗ ${message}`);
          }
        });

      } catch (error) {
        console.error("Error processing file:", error);
        setUploadStatus('Error al procesar el archivo. Asegúrate de que sea un formato válido.');
      }
    };

    reader.onerror = () => {
        setUploadStatus('Error al leer el archivo.');
    };

    reader.readAsArrayBuffer(file);
    e.target.value = ''; // Reset input
  };

  return (
    <>
      {userRole === 'admin' && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-8 space-y-8">
          {/* --- Formulario de creación individual --- */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-teal-300">
              <Plus className="w-6 h-6 mr-2" /> Crear Nuevo Activo
            </h2>
            <form onSubmit={handleAddAsset} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input required value={newAssetName} onChange={(e) => setNewAssetName(e.target.value)} placeholder="Nombre del Activo" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600" />
                <input value={newAssetLocation} onChange={(e) => setNewAssetLocation(e.target.value)} placeholder="Ubicación" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600" />
                <textarea value={newAssetDescription} onChange={(e) => setNewAssetDescription(e.target.value)} placeholder="Descripcion del Activo" rows="3" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600" />
              </div>
              <div className="space-y-4">
                <input value={newAssetTag} onChange={(e) => setNewAssetTag(e.target.value)} placeholder="Tag del Activo" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600" />
                <select value={newAssetCriticality} onChange={(e) => setNewAssetCriticality(e.target.value)} className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600">
                  <option value="A">Criticidad A (Muy Alta)</option>
                  <option value="B">Criticidad B (Alta)</option>
                  <option value="C">Criticidad C (Media)</option>
                  <option value="D">Criticidad D (Baja)</option>
                </select>
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800">
                  {loading ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />} Guardar Activo
                </button>
              </div>
            </form>
          </div>

          {/* --- Sección de Carga Masiva --- */}
          <div className="border-t border-gray-700 pt-8">
             <h2 className="text-2xl font-semibold mb-4 flex items-center text-teal-300">
              <UploadCloud className="w-6 h-6 mr-2" /> Carga Masiva de Activos
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Sube un archivo Excel (.xlsx) o CSV con las columnas: <code className="bg-gray-900 px-1 rounded text-xs">Nombre</code>, <code className="bg-gray-900 px-1 rounded text-xs">Ubicacion</code>, <code className="bg-gray-900 px-1 rounded text-xs">Tag</code>, <code className="bg-gray-900 px-1 rounded text-xs">Descripcion</code>, <code className="bg-gray-900 px-1 rounded text-xs">Criticidad</code>. La columna "Nombre" es obligatoria.
            </p>
            <label htmlFor="bulk-upload-input" className="w-full cursor-pointer bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
              <UploadCloud className="w-4 h-4 mr-2" /> Seleccionar archivo
            </label>
            <input
              id="bulk-upload-input"
              type="file"
              className="hidden"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileUpload}
            />
            {uploadStatus && <p className="mt-4 text-sm text-gray-300">{uploadStatus}</p>}
          </div>
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h2 className="text-2xl font-semibold text-teal-300">Lista de Activos</h2>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar..." className="px-3 py-2 rounded bg-gray-700 border border-gray-600 w-full sm:w-64" />
        </div>
        {filteredAssets.length === 0 ? (
          <p className="text-gray-400">No se encontraron activos.</p>
        ) : (
          <div className="space-y-4">
            {filteredAssets.map(asset => (
              <div key={asset.id} className="p-4 bg-gray-700 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <p className="font-bold text-lg">{asset.tag ? `${asset.tag} - ${asset.name}` : asset.name}</p>
                  <p className="text-sm text-gray-400">Ubicacion: "{asset.location}" Criticidad: "{asset.criticality}"</p>
                </div>
                <div className="flex items-center flex-wrap gap-3">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${asset.status === 'ALERT' ? 'bg-red-500' : asset.status === 'OK' ? 'bg-green-500' : 'bg-gray-500'}`}>
                    {asset.status || 'Uninspected'}
                  </span>
                  <button className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-500" onClick={() => onNavigateToAssetHistory(asset)}>Detalle del Activo</button>
                  <button className="px-3 py-1 rounded bg-teal-600 hover:bg-teal-500" onClick={() => onNavigateToInspection(asset)}>Inspeccionar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AssetList;