import React, { useState, useEffect, useCallback } from 'react';
import { Loader, ArrowLeft, CheckCircle } from 'lucide-react';

// Full IV/IS checklist (fallback y para nuevos activos)
const FULL_IV_IS_CHECKLIST = [
  // IV — Inspecciones Visuales / Operativas
  { category: 'IV', text: 'Nivel de aceite adecuado' },
  { category: 'IV', text: 'Fugas de aceite o lubricante' },
  { category: 'IV', text: 'Fugas de agua o refrigerante' },
  { category: 'IV', text: 'Vibraciones anormales (tacto/oido)' },
  { category: 'IV', text: 'Ruidos anormales o golpeteos' },
  { category: 'IV', text: 'Temperatura de carcasa elevada' },
  { category: 'IV', text: 'Tornilleria/abrazaderas flojas' },
  { category: 'IV', text: 'Corrosion u oxidacion visible' },
  { category: 'IV', text: 'Alineacion de poleas/acoples' },
  { category: 'IV', text: 'Estado de correas (tension y desgaste)' },
  { category: 'IV', text: 'Estado de acoples y chavetas' },
  { category: 'IV', text: 'Guardas mecanicas en buen estado' },
  { category: 'IV', text: 'Cables electricos sin danos' },
  { category: 'IV', text: 'Conexiones electricas firmes' },
  { category: 'IV', text: 'Suciedad/polvo acumulado en el equipo' },
  { category: 'IV', text: 'Rejillas/ventilacion sin obstrucciones' },
  { category: 'IV', text: 'Base/soportes sin fisuras ni juego' },
  { category: 'IV', text: 'Sellos y empaques sin fugas' },
  { category: 'IV', text: 'Filtros limpios/ciclo de limpieza vigente' },
  { category: 'IV', text: 'Manometros/indicadores en rangos normales' },
  { category: 'IV', text: 'Puntos calientes visibles (inspeccion visual)' },
  { category: 'IV', text: 'Holguras o desalineaciones visibles' },
  { category: 'IV', text: 'Presencia de condensacion/goteos' },
  { category: 'IV', text: 'Necesidad de relubricacion inmediata' },
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
    const [ivOpen, setIvOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const sourceChecklist = Array.isArray(asset?.checklist) && asset.checklist.length >= 10 ? asset.checklist : FULL_IV_IS_CHECKLIST;
        if (sourceChecklist) {
            const initialResults = sourceChecklist.map((item, index) => ({
                index,
                category: item.category || 'IV',
                text: normalizeText(item.text),
                cumple: false, // inicia sin marcar
                comment: '',
            }));
            setResults(initialResults);
        }
    }, [asset]);

    const toggleCumple = (idx) => {
        setResults(prev => prev.map(r => r.index === idx ? { ...r, cumple: !r.cumple } : r));
    };

    const setComment = (idx, value) => {
        setResults(prev => prev.map(r => r.index === idx ? { ...r, comment: value } : r));
    };

    const handleSave = () => {
        const mapped = results.map(r => ({
            category: r.category,
            text: r.text,
            cumple: !!r.cumple,
            comment: r.comment || '',
            status: r.cumple ? 'OK' : 'ALERT',
            answer: r.cumple ? 'No' : 'Si',
        }));
        onSave(mapped, notes, overall);
    };

    // Guardar aunque haya ítems sin observación: no es obligatorio comentar
    const isFormComplete = results.length > 0;

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                <h2 className="text-3xl font-bold text-blue-400">
                    Inspección de: {asset.name}
                </h2>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition duration-150 flex items-center"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Activos
                </button>
            </div>
                        <p className="text-lg mb-4 text-gray-300">
                Ubicación: {asset.location} | Criticidad:
                <span className={`ml-2 font-bold px-2 py-0.5 rounded ${asset.criticality === 'A' ? 'bg-red-500' : asset.criticality === 'D' ? 'bg-green-500' : 'bg-orange-500'}`}>
                    {asset.criticality}
                </span>
            </p>            <div className="space-y-6">
                <p className="text-sm italic text-gray-400 mb-4 border-b border-gray-700 pb-2">
                    Marque los resultados. Un resultado 'Si' (para booleanos) o cualquier alerta en notas, marcarÃ¡ el punto como ALERTA.
                </p>
                {false && results.map((item, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg shadow-md transition duration-150 ${item.status === 'ALERT' ? 'bg-red-900 border-l-4 border-red-500' : 'bg-gray-700 border-l-4 border-teal-500'}`}
                    >
                        <label className="block text-lg font-medium mb-2 text-gray-50">
                            {index + 1}. {item.text}
                        </label>
                        {item.type === 'boolean' ? (
                            <div className="flex space-x-4 mt-2">
                                {['No', 'Si'].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleInputChange(index, option)}
                                        className={`px-4 py-2 rounded-lg font-semibold transition duration-150 ${item.answer === option ? (option === 'Si' ? 'bg-red-600' : 'bg-green-600') : 'bg-gray-600 hover:bg-gray-500'}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={item.answer}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                className="w-full mt-2 p-2 rounded-lg bg-gray-600 text-white border border-gray-500 focus:ring-2 focus:ring-blue-500"
                                placeholder="Ingrese valor..."
                            />
                        )}
                        <textarea
                            value={item.notes}
                            onChange={(e) => handleNotesChange(index, e.target.value)}
                            className="w-full mt-3 p-2 rounded-lg bg-gray-600 text-white border border-gray-500 focus:ring-2 focus:ring-blue-500"
                            placeholder="Notas adicionales (opcional)..."
                            rows="2"
                        />
                    </div>
                ))}
                {/* Nueva checklist agrupada IV / IS */}
                <div className="bg-gray-700/40 rounded-md mt-2">
                    <button type="button" onClick={()=>setIvOpen(v=>!v)} className="w-full flex justify-between items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md">
                        <span className="font-semibold text-gray-100">Inspecciones Visuales (IV)</span>
                        <span className="text-sm text-gray-300">{ivOpen ? 'Ocultar' : 'Mostrar'}</span>
                    </button>
                    {ivOpen && (
                        <div className="p-3 space-y-3">
                            {results.filter(r=> (r.category||'IV')==='IV').map(item => (
                                <div key={item.index} className={`p-3 rounded-lg ${item.cumple? 'bg-gray-700 border-l-4 border-teal-500' : 'bg-red-900/40 border-l-4 border-red-500'}`}>
                                    <label className="flex items-center gap-3 text-gray-50">
                                        <input type="checkbox" checked={item.cumple} onChange={()=>toggleCumple(item.index)} className="w-5 h-5 rounded bg-gray-600 border-gray-500 text-teal-500 focus:ring-teal-500" />
                                        <span>{item.text}</span>
                                    </label>
                                    {!item.cumple && (
                                        <textarea className="w-full mt-3 p-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm" rows="2" placeholder="Observacion(obligatoria si no cumple) " value={item.comment} onChange={(e)=>setComment(item.index, e.target.value)} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="bg-gray-700/40 rounded-md">
                    <button type="button" onClick={()=>setIsOpen(v=>!v)} className="w-full flex justify-between items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md">
                        <span className="font-semibold text-gray-100">Inspecciones de Seguridad (IS)</span>
                        <span className="text-sm text-gray-300">{isOpen ? 'Ocultar' : 'Mostrar'}</span>
                    </button>
                    {isOpen && (
                        <div className="p-3 space-y-3">
                            {results.filter(r=> (r.category||'IV')==='IS').map(item => (
                                <div key={item.index} className={`p-3 rounded-lg ${item.cumple? 'bg-gray-700 border-l-4 border-teal-500' : 'bg-red-900/40 border-l-4 border-red-500'}`}>
                                    <label className="flex items-center gap-3 text-gray-50">
                                        <input type="checkbox" checked={item.cumple} onChange={()=>toggleCumple(item.index)} className="w-5 h-5 rounded bg-gray-600 border-gray-500 text-teal-500 focus:ring-teal-500" />
                                        <span>{item.text}</span>
                                    </label>
                                    {!item.cumple && (
                                        <textarea className="w-full mt-3 p-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm" rows="2" placeholder="Observacion(obligatoria si no cumple) " value={item.comment} onChange={(e)=>setComment(item.index, e.target.value)} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8">
                <label className="block text-lg font-medium mb-2 text-gray-50">Notas Generales de la Inspección</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-600 text-white border border-gray-500 focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Resumen, hallazgos importantes, etc."
                />
            </div>
            <div className="mt-4 flex items-center gap-3">
                <label className="text-lg font-medium text-gray-200">Estado del Activo</label>
                <select value={overall} onChange={e=>setOverall(e.target.value)} className="p-2 bg-gray-700 border border-gray-600 rounded">
                    <option value="A">A - Excelente</option>
                    <option value="B">B - Aceptable</option>
                    <option value="C">C - Insatisfactorio</option>
                    <option value="X">X - No Disponible</option>
                </select>
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={loading || !isFormComplete}
                    className={`px-6 py-3 font-bold rounded-lg transition duration-150 flex items-center ${loading || !isFormComplete ? 'bg-green-800 text-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white'}`}
                >
                    {loading ? (
                        <Loader className="w-5 h-5 inline animate-spin mr-2" />
                    ) : (
                        <CheckCircle className="w-5 h-5 inline mr-2" />
                    )}
                    Guardar Registro de Inspección
                </button>
            </div>
            {!isFormComplete && (
                <p className="text-center mt-3 text-sm text-red-400">
                    * Por favor, complete todos los puntos de Inspección para guardar.
                </p>
            )}
        </div>
    );
};

export default InspectionForm;