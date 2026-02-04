import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Loader,
    ArrowLeft,
    CheckCircle,
    X,
    ClipboardCheck,
    Eye,
    Shield,
    ChevronDown,
    ChevronUp,
    MapPin,
    AlertTriangle,
    FileText,
    Camera,
    Save,
    Info,
    CheckSquare,
    Square,
} from 'lucide-react';
import StorageUploader from './StorageUploader';

// Full IV/IS checklist (fallback y para nuevos activos)
const FULL_IV_IS_CHECKLIST = [
    // IV — Inspecciones Visuales / Operativas
    { category: 'IV', text: 'Nivel de aceite adecuado' },
    { category: 'IV', text: 'Sin Fugas de aceite o lubricante' },
    { category: 'IV', text: 'Sin Fugas de agua o refrigerante' },
    { category: 'IV', text: 'Vibraciones normales (tacto/oido)' },
    { category: 'IV', text: 'Sin Ruidos anormales o golpeteos' },
    { category: 'IV', text: 'Temperatura de carcasa normal' },
    { category: 'IV', text: 'Tornilleria/abrazaderas ajustadas' },
    { category: 'IV', text: 'Sin Corrosion u oxidacion visible' },
    { category: 'IV', text: 'Estan Alineadas las poleas/acoples' },
    { category: 'IV', text: 'Estado de correas sin desgaste y bien tensionadas' },
    { category: 'IV', text: 'Estado de acoples y chavetas en buenas condiciones' },
    { category: 'IV', text: 'Guardas mecanicas en buen estado' },
    { category: 'IV', text: 'Cables electricos sin danos' },
    { category: 'IV', text: 'Conexiones electricas firmes' },
    { category: 'IV', text: 'Sin Suciedad/polvo acumulado en el equipo' },
    { category: 'IV', text: 'Rejillas/ventilacion sin obstrucciones' },
    { category: 'IV', text: 'Base/soportes sin fisuras ni juego' },
    { category: 'IV', text: 'Sellos y empaques sin fugas' },
    { category: 'IV', text: 'Filtros limpios/ciclo de limpieza vigente' },
    { category: 'IV', text: 'Manometros/indicadores en rangos normales' },
    { category: 'IV', text: 'Puntos calientes visibles (inspeccion visual)' },
    { category: 'IV', text: 'Sin Holguras o desalineaciones visibles' },
    { category: 'IV', text: 'Sin Presencia de condensacion/goteos' },
    { category: 'IV', text: 'Sin Necesidad de relubricacion inmediata' },
    { category: 'IV', text: 'Etiquetado/identificacion legible' },

    // IS — Inspecciones de Seguridad
    { category: 'IS', text: 'Guardas de seguridad instaladas y fijas' },
    { category: 'IS', text: 'Paros de emergencia accesibles' },
    { category: 'IS', text: 'Botoneras/cajas electricas en buen estado' },
    { category: 'IS', text: 'Orden y limpieza del area (5S)' },
    { category: 'IS', text: 'Pasillos libres de obstaculos' },
    { category: 'IS', text: 'Senalizacion y etiquetas de seguridad presentes' },
    { category: 'IS', text: 'Niveles de ruido dentro de limites' },
    { category: 'IS', text: 'Iluminacion adecuada en el area' },
    { category: 'IS', text: 'Sin superficies calientes expuestas' },
    { category: 'IS', text: 'Sin puntos de atrapamiento sin resguardo' },
    { category: 'IS', text: 'Extintor cercano y accesible' },
    { category: 'IS', text: 'Uso de EPI adecuado por el personal' },
    { category: 'IS', text: 'Control de derrames (bandejas, absorbente)' },
    { category: 'IS', text: 'Cables/mangueras enrutados de forma segura' },
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.02 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

// Criticality Badge Component
const CriticalityBadge = ({ criticality }) => {
    const styles = {
        A: 'bg-red-500/20 text-red-400 border-red-500/30',
        B: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        C: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        D: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    };

    const labels = {
        A: 'Critica',
        B: 'Alta',
        C: 'Media',
        D: 'Baja',
    };

    return (
        <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${styles[criticality] || styles.C}`}>
            {criticality} - {labels[criticality] || 'Media'}
        </span>
    );
};

// Checklist Item Component
const ChecklistItem = ({ item, onToggle }) => {
    return (
        <motion.div
            variants={itemVariants}
            className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                item.cumple
                    ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/15'
                    : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/80 hover:border-gray-600'
            }`}
            onClick={() => onToggle(item.index)}
        >
            <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
                    item.cumple
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-gray-700 text-gray-500 group-hover:bg-gray-600'
                }`}>
                    {item.cumple ? (
                        <CheckSquare className="w-4 h-4" />
                    ) : (
                        <Square className="w-4 h-4" />
                    )}
                </div>
                <span className={`text-sm transition-colors duration-300 ${
                    item.cumple ? 'text-emerald-300' : 'text-gray-300 group-hover:text-white'
                }`}>
                    {item.text}
                </span>
                {item.cumple && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                    >
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

// Accordion Section Component
const AccordionSection = ({ title, icon: Icon, iconColor, isOpen, onToggle, children, completedCount, totalCount }) => {
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <div className="dashboard-panel overflow-hidden">
            <button
                type="button"
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${iconColor}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-semibold text-white">{title}</h3>
                        <p className="text-xs text-gray-500">{completedCount} de {totalCount} completados</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {/* Progress indicator */}
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <span className="text-xs text-gray-400 w-10">{Math.round(progress)}%</span>
                    </div>
                    <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-indigo-500/20' : 'bg-gray-700/50'}`}>
                        {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-indigo-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-4 pt-0 border-t border-white/5">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Photo Gallery Component
const PhotoGallery = ({ photos, onRemove }) => {
    if (photos.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4"
        >
            {photos.map((url, index) => (
                <motion.div
                    key={url}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                >
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <img
                            src={url}
                            alt={`Evidencia ${index + 1}`}
                            className="w-full h-24 rounded-xl object-cover border border-white/10 group-hover:border-indigo-500/50 transition-all"
                        />
                    </a>
                    <button
                        onClick={() => onRemove(url)}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 hover:bg-red-400 text-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </motion.div>
            ))}
        </motion.div>
    );
};

const InspectionForm = ({ asset, onBack, onSave, loading }) => {
    const normalizeText = useCallback((text) => {
        const map = [
            ['Sin residuos en suspensión', 'Sin residuos en suspension'],
            ['Sin residuos en suspensiÃ³n', 'Sin residuos en suspension'],
            ['Sin riesgo de caídas', 'Sin riesgo de caidas'],
            ['Sin riesgo de caÃ­das', 'Sin riesgo de caidas'],
            ['Sin sobreexposición al calor', 'Sin sobreexposicion de calor'],
            ['Sin sobreexposiciÃ³n al calor', 'Sin sobreexposicion de calor'],
            ['Visibilidad adecuada en el área', ' Visibilidad adecuada en el Area'],
            ['Visibilidad adecuada en el Ã¡rea', ' Visibilidad adecuada en el Area'],
            ['Sin exposición a chispas o radiación ultravioleta', 'Sin exposicion a chispas o radiacion ultravioleta'],
            ['Sin exposiciÃ³n a chispas o radiaciÃ³n ultravioleta', 'Sin exposicion a chispas o radiacion ultravioleta'],
            ['Rutas de entrada y salida múltiples y despejadas', ' Rutas de entrada y salida multiples y despejadas'],
            ['Rutas de entrada y salida mÃºltiples y despejadas', ' Rutas de entrada y salida multiples y despejadas'],
            ['Materiales cáusticos correctamente contenidos y con EPP disponible', 'Materiales causticos correctamente contenidos y con EPP disponible'],
            ['Materiales cÃ¡usticos correctamente contenidos y con EPP disponible', 'Materiales causticos correctamente contenidos y con EPP disponible'],
            ['Puntos de sujeción adecuados', 'Puntos de sujecion adecuados'],
            ['Puntos de sujeciÃ³n adecuados', 'Puntos de sujecion adecuados'],
            ['Sin fuga térmica', 'Sin fuga terrmica'],
            ['Sin fuga tÃ©rmica', 'Sin fuga terrmica'],
            ['Superficies escalonadas visibles y señalizadas', 'Superficies escalonadas visibles y señalizadas'],
            ['Superficies escalonadas visibles y seÃ±alizadas', 'Superficies escalonadas visibles y señalizadas'],
            ['Superficies de tránsito regulares y sin orificios', 'Superficies de transito regulares y sin orificios'],
            ['Superficies de trÃ¡nsito regulares y sin orificios', 'Superficies de transito regulares y sin orificios'],
            ['Sin superficies con temperaturas peligrosas sin protección', ' Sin superficies con temperaturas peligrosas sin proteccion'],
            ['Sin superficies con temperaturas peligrosas sin protecciÃ³n', ' Sin superficies con temperaturas peligrosas sin proteccion'],
            ['Sin riesgo de succión cerca de ventiladores u otros equipos', 'Sin riesgo de succion cerca de ventiladores u otros equipos'],
            ['Sin riesgo de succiÃ³n cerca de ventiladores u otros equipos', 'Sin riesgo de succion cerca de ventiladores u otros equipos'],
            ['Sin ruido elevado o dentro de límites controlados', ' Sin ruido elevado o dentro de limites controlados'],
            ['Sin ruido elevado o dentro de lÃ­mites controlados', ' Sin ruido elevado o dentro de limites controlados']
        ];
        for (const [bad, good] of map) {
            if (text === bad) return good;
        }
        return text;
    }, []);

    const [results, setResults] = useState([]);
    const [notes, setNotes] = useState('');
    const [overall, setOverall] = useState('B');
    const [ivOpen, setIvOpen] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [photoURLs, setPhotoURLs] = useState([]);

    useEffect(() => {
        const sourceChecklist = Array.isArray(asset?.checklist) && asset.checklist.length >= 10 ? asset.checklist : FULL_IV_IS_CHECKLIST;
        if (sourceChecklist) {
            const initialResults = sourceChecklist.map((item, index) => ({
                index,
                category: item.category || 'IV',
                text: normalizeText(item.text),
                cumple: false,
            }));
            setResults(initialResults);
        }
    }, [asset, normalizeText]);

    const toggleCumple = (idx) => {
        setResults(prev => prev.map(r => r.index === idx ? { ...r, cumple: !r.cumple } : r));
    };

    const handleUploadComplete = (downloadURL) => {
        setPhotoURLs(prev => [...prev, downloadURL]);
    };

    const removePhoto = (urlToRemove) => {
        setPhotoURLs(prev => prev.filter(url => url !== urlToRemove));
    };

    const handleSave = () => {
        const mapped = results.map(r => ({
            category: r.category,
            text: r.text,
            cumple: !!r.cumple,
            comment: '',
            status: r.cumple ? 'OK' : 'ALERT',
            answer: r.cumple ? 'Si' : 'No',
        }));
        onSave(mapped, notes, overall, photoURLs);
    };

    const isFormComplete = results.length > 0;

    // Calculate stats
    const ivItems = results.filter(r => (r.category || 'IV') === 'IV');
    const isItems = results.filter(r => (r.category || 'IV') === 'IS');
    const ivCompleted = ivItems.filter(r => r.cumple).length;
    const isCompleted = isItems.filter(r => r.cumple).length;
    const totalCompleted = results.filter(r => r.cumple).length;
    const totalItems = results.length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                            <ClipboardCheck className="w-6 h-6 text-white" />
                        </div>
                        Inspeccion de Activo
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Complete el formulario de inspeccion
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onBack}
                    className="btn-secondary flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a Activos
                </motion.button>
            </motion.div>

            {/* Asset Info Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="dashboard-panel"
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-indigo-500/20">
                            <Info className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">{asset.name}</h2>
                            <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>{asset.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <AlertTriangle className="w-4 h-4" />
                            Criticidad:
                        </div>
                        <CriticalityBadge criticality={asset.criticality} />
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Progreso de la Inspeccion</span>
                        <span className="text-sm font-semibold text-white">{totalCompleted} / {totalItems}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${totalItems > 0 ? (totalCompleted / totalItems) * 100 : 0}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20"
            >
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-300">
                    Marque los items que el activo <strong>cumple</strong>. Los items no marcados se registraran como observaciones pendientes.
                </p>
            </motion.div>

            {/* Checklist Sections */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
            >
                {/* IV Section */}
                <AccordionSection
                    title="Inspecciones Visuales (IV)"
                    icon={Eye}
                    iconColor="bg-cyan-500/20 text-cyan-400"
                    isOpen={ivOpen}
                    onToggle={() => setIvOpen(!ivOpen)}
                    completedCount={ivCompleted}
                    totalCount={ivItems.length}
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-2 mt-4"
                    >
                        {ivItems.map(item => (
                            <ChecklistItem
                                key={item.index}
                                item={item}
                                onToggle={toggleCumple}
                            />
                        ))}
                    </motion.div>
                </AccordionSection>

                {/* IS Section */}
                <AccordionSection
                    title="Inspecciones de Seguridad (IS)"
                    icon={Shield}
                    iconColor="bg-amber-500/20 text-amber-400"
                    isOpen={isOpen}
                    onToggle={() => setIsOpen(!isOpen)}
                    completedCount={isCompleted}
                    totalCount={isItems.length}
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-2 mt-4"
                    >
                        {isItems.map(item => (
                            <ChecklistItem
                                key={item.index}
                                item={item}
                                onToggle={toggleCumple}
                            />
                        ))}
                    </motion.div>
                </AccordionSection>
            </motion.div>

            {/* Notes Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="dashboard-panel"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                        <FileText className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">Notas Generales</h3>
                        <p className="text-xs text-gray-500">Agregue observaciones o hallazgos importantes</p>
                    </div>
                </div>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="form-input min-h-[120px] resize-y"
                    placeholder="Resumen, hallazgos importantes, recomendaciones..."
                />
            </motion.div>

            {/* Photo Evidence Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="dashboard-panel"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-pink-500/20">
                        <Camera className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">Evidencia Fotografica</h3>
                        <p className="text-xs text-gray-500">Adjunte fotos de respaldo</p>
                    </div>
                </div>
                <StorageUploader
                    onUploadComplete={handleUploadComplete}
                    uploadPath={`inspections/${asset.id}`}
                    label="Adjuntar Foto"
                />
                <PhotoGallery photos={photoURLs} onRemove={removePhoto} />
            </motion.div>

            {/* Overall Status & Save */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="dashboard-panel"
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-300">Estado General del Activo:</label>
                        <select
                            value={overall}
                            onChange={e => setOverall(e.target.value)}
                            className="form-select w-auto"
                        >
                            <option value="A">A - Excelente</option>
                            <option value="B">B - Aceptable</option>
                            <option value="C">C - Insatisfactorio</option>
                            <option value="X">X - No Disponible</option>
                        </select>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        disabled={loading || !isFormComplete}
                        className={`btn-success flex items-center justify-center gap-2 px-8 py-3 ${
                            loading || !isFormComplete ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? (
                            <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Guardar Inspeccion
                            </>
                        )}
                    </motion.button>
                </div>

                {!isFormComplete && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-center text-sm text-amber-400 flex items-center justify-center gap-2"
                    >
                        <AlertTriangle className="w-4 h-4" />
                        Por favor, complete todos los puntos de inspeccion para guardar.
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
};

export default InspectionForm;
