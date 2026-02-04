import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Loader,
    Plus,
    CheckCircle,
    UploadCloud,
    Search,
    MapPin,
    Tag,
    AlertCircle,
    ChevronRight,
    FileSpreadsheet,
    Package,
    Eye,
    ClipboardCheck,
    Filter,
    Grid3X3,
    List,
} from 'lucide-react';
import { read, utils } from 'xlsx';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// Status Badge Component
const StatusBadge = ({ status }) => {
    const config = {
        A: { label: 'Excelente', class: 'status-a' },
        B: { label: 'Aceptable', class: 'status-b' },
        C: { label: 'Deficiente', class: 'status-c' },
        OK: { label: 'OK', class: 'status-ok' },
        ALERT: { label: 'Alerta', class: 'status-alert' },
        Uninspected: { label: 'Sin inspeccionar', class: 'status-warning' },
    };

    const statusConfig = config[status] || config.Uninspected;

    return (
        <span className={`status-badge ${statusConfig.class}`}>
            {statusConfig.label}
        </span>
    );
};

// Criticality Badge
const CriticalityBadge = ({ level }) => {
    const config = {
        A: { label: 'Critica', bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
        B: { label: 'Alta', bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
        C: { label: 'Media', bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
        D: { label: 'Baja', bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30' },
    };

    const c = config[level] || config.D;

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text} ${c.border} border`}>
            {c.label}
        </span>
    );
};

// Asset Card Component
const AssetCard = ({ asset, onViewHistory, onInspect, index }) => (
    <motion.div
        variants={itemVariants}
        className="list-item group"
        layout
    >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Asset Info */}
            <div className="flex items-start gap-4 min-w-0 flex-1">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                    <Package className="w-6 h-6" />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-white truncate">
                            {asset.tag ? `${asset.tag} - ` : ''}{asset.name}
                        </h3>
                        <CriticalityBadge level={asset.criticality} />
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        {asset.location && (
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {asset.location}
                            </span>
                        )}
                        {asset.tag && (
                            <span className="flex items-center gap-1">
                                <Tag className="w-3.5 h-3.5" />
                                {asset.tag}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
                <StatusBadge status={asset.status} />
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onViewHistory(asset)}
                        className="btn-secondary px-3 py-2 text-sm flex items-center gap-2"
                    >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">Detalle</span>
                    </button>
                    <button
                        onClick={() => onInspect(asset)}
                        className="btn-primary px-3 py-2 text-sm flex items-center gap-2"
                    >
                        <ClipboardCheck className="w-4 h-4" />
                        <span className="hidden sm:inline">Inspeccionar</span>
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
);

// Create Asset Form
const CreateAssetForm = ({
    handleAddAsset,
    loading,
    newAssetName, setNewAssetName,
    newAssetLocation, setNewAssetLocation,
    newAssetDescription, setNewAssetDescription,
    newAssetTag, setNewAssetTag,
    newAssetCriticality, setNewAssetCriticality,
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-panel mb-6"
    >
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-500/20">
                <Plus className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
                <h2 className="text-lg font-semibold text-white">Crear Nuevo Activo</h2>
                <p className="text-xs text-gray-500">Agrega un activo al sistema</p>
            </div>
        </div>

        <form onSubmit={handleAddAsset} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Nombre del Activo *
                    </label>
                    <input
                        required
                        value={newAssetName}
                        onChange={(e) => setNewAssetName(e.target.value)}
                        placeholder="Ej: Bomba hidraulica #1"
                        className="form-input"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Ubicacion
                    </label>
                    <input
                        value={newAssetLocation}
                        onChange={(e) => setNewAssetLocation(e.target.value)}
                        placeholder="Ej: Planta Norte, Sector A"
                        className="form-input"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Descripcion
                    </label>
                    <textarea
                        value={newAssetDescription}
                        onChange={(e) => setNewAssetDescription(e.target.value)}
                        placeholder="Descripcion detallada del activo..."
                        rows="3"
                        className="form-input resize-none"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Tag / Codigo
                    </label>
                    <input
                        value={newAssetTag}
                        onChange={(e) => setNewAssetTag(e.target.value)}
                        placeholder="Ej: BH-001"
                        className="form-input"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Nivel de Criticidad
                    </label>
                    <select
                        value={newAssetCriticality}
                        onChange={(e) => setNewAssetCriticality(e.target.value)}
                        className="form-select"
                    >
                        <option value="A">Criticidad A (Muy Alta)</option>
                        <option value="B">Criticidad B (Alta)</option>
                        <option value="C">Criticidad C (Media)</option>
                        <option value="D">Criticidad D (Baja)</option>
                    </select>
                </div>
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading || !newAssetName}
                        className="btn-success w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                            <CheckCircle className="w-5 h-5" />
                        )}
                        Guardar Activo
                    </button>
                </div>
            </div>
        </form>
    </motion.div>
);

// Bulk Upload Section
const BulkUploadSection = ({ onBulkAddAssets }) => {
    const [uploadStatus, setUploadStatus] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
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
                    setUploadStatus('Error: El archivo esta vacio o tiene un formato incorrecto.');
                    setIsUploading(false);
                    return;
                }

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
                    setIsUploading(false);
                    return;
                }

                setUploadStatus(`Se encontraron ${validatedAssets.length} activos. Subiendo...`);
                onBulkAddAssets(validatedAssets, (success, message) => {
                    setUploadStatus(success ? `✓ ${message}` : `✗ ${message}`);
                    setIsUploading(false);
                });

            } catch (error) {
                console.error("Error processing file:", error);
                setUploadStatus('Error al procesar el archivo. Asegurate de que sea un formato valido.');
                setIsUploading(false);
            }
        };

        reader.onerror = () => {
            setUploadStatus('Error al leer el archivo.');
            setIsUploading(false);
        };

        reader.readAsArrayBuffer(file);
        e.target.value = '';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="dashboard-panel mb-6"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/20">
                    <UploadCloud className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-white">Carga Masiva</h2>
                    <p className="text-xs text-gray-500">Importa multiples activos desde Excel</p>
                </div>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="text-sm text-gray-400">
                        <p className="mb-2">El archivo debe contener las siguientes columnas:</p>
                        <div className="flex flex-wrap gap-2">
                            {['Nombre*', 'Ubicacion', 'Tag', 'Descripcion', 'Criticidad'].map((col) => (
                                <code key={col} className="px-2 py-1 rounded bg-gray-900/50 text-xs text-gray-300">
                                    {col}
                                </code>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <label
                htmlFor="bulk-upload-input"
                className={`btn-primary w-full flex items-center justify-center gap-2 cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isUploading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                ) : (
                    <UploadCloud className="w-5 h-5" />
                )}
                {isUploading ? 'Procesando...' : 'Seleccionar archivo Excel'}
            </label>
            <input
                id="bulk-upload-input"
                type="file"
                className="hidden"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileUpload}
                disabled={isUploading}
            />

            <AnimatePresence>
                {uploadStatus && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mt-4 p-3 rounded-xl flex items-center gap-2 text-sm ${
                            uploadStatus.startsWith('✓')
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : uploadStatus.startsWith('✗') || uploadStatus.startsWith('Error')
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}
                    >
                        {uploadStatus.startsWith('✓') ? (
                            <CheckCircle className="w-4 h-4 shrink-0" />
                        ) : uploadStatus.startsWith('✗') || uploadStatus.startsWith('Error') ? (
                            <AlertCircle className="w-4 h-4 shrink-0" />
                        ) : (
                            <Loader className="w-4 h-4 animate-spin shrink-0" />
                        )}
                        <span>{uploadStatus}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Main AssetList Component
const AssetList = ({
    userRole,
    handleAddAsset,
    onBulkAddAssets,
    loading,
    newAssetName, setNewAssetName,
    newAssetLocation, setNewAssetLocation,
    newAssetDescription, setNewAssetDescription,
    newAssetTag, setNewAssetTag,
    newAssetCriticality, setNewAssetCriticality,
    filteredAssets,
    searchTerm, setSearchTerm,
    onNavigateToAssetHistory,
    onNavigateToInspection,
}) => {
    const [viewMode, setViewMode] = useState('list');

    return (
        <div className="space-y-6">
            {/* Admin Forms */}
            {userRole === 'admin' && (
                <div className="grid lg:grid-cols-2 gap-6">
                    <CreateAssetForm
                        handleAddAsset={handleAddAsset}
                        loading={loading}
                        newAssetName={newAssetName}
                        setNewAssetName={setNewAssetName}
                        newAssetLocation={newAssetLocation}
                        setNewAssetLocation={setNewAssetLocation}
                        newAssetDescription={newAssetDescription}
                        setNewAssetDescription={setNewAssetDescription}
                        newAssetTag={newAssetTag}
                        setNewAssetTag={setNewAssetTag}
                        newAssetCriticality={newAssetCriticality}
                        setNewAssetCriticality={setNewAssetCriticality}
                    />
                    <BulkUploadSection onBulkAddAssets={onBulkAddAssets} />
                </div>
            )}

            {/* Asset List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="dashboard-panel"
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-500/20">
                            <Package className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Lista de Activos</h2>
                            <p className="text-xs text-gray-500">{filteredAssets.length} activos encontrados</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative flex-1 sm:flex-none">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar activos..."
                                className="form-input pl-10 w-full sm:w-64"
                            />
                        </div>

                        {/* View Toggle */}
                        <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-gray-800/50">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Asset List */}
                {filteredAssets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                        <div className="w-20 h-20 mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                            <Package className="w-10 h-10 text-gray-600" />
                        </div>
                        <p className="text-lg font-medium">No se encontraron activos</p>
                        <p className="text-sm text-gray-600 mt-1">
                            {searchTerm ? 'Intenta con otro termino de busqueda' : 'Agrega tu primer activo para comenzar'}
                        </p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className={viewMode === 'grid' ? 'grid sm:grid-cols-2 gap-4' : 'space-y-3'}
                    >
                        {filteredAssets.map((asset, index) => (
                            <AssetCard
                                key={asset.id}
                                asset={asset}
                                onViewHistory={onNavigateToAssetHistory}
                                onInspect={onNavigateToInspection}
                                index={index}
                            />
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default AssetList;
