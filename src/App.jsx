import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  addDoc, 
  query,
  serverTimestamp,
  doc,
  updateDoc,
  orderBy,
  limit,
  where, // Importado para filtrar por assetId en el historial
  setLogLevel
} from 'firebase/firestore';
import { 
  Plus, 
  CheckCircle, 
  List, 
  BarChart2, 
  Loader, 
  AlertTriangle, 
  Sparkles, 
  ArrowLeft,
  Clock,
  Target,
  BarChart,
  Calendar, // Icono para fecha
  FileText, // Icono para registro
  Search // Icono para buscar
} from 'lucide-react';
// Librerías de gráficos (usando SVG básico)

// --- FIREBASE SETUP (Variables globales o .env de Vite) ---
// 1) Intentar leer variables inyectadas globalmente (__firebase_config, etc.)
let firebaseConfig = {};
try {
  if (typeof __firebase_config !== 'undefined' && __firebase_config) {
    firebaseConfig = JSON.parse(__firebase_config);
  }
} catch {}

// 2) Si no hay config global, usar variables de entorno de Vite (archivo .env.local)
if (!firebaseConfig || Object.keys(firebaseConfig).length === 0) {
  const env = (typeof import.meta !== 'undefined') ? import.meta.env : undefined;
  if (env) {
    const envConfig = {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID,
    };
    if (envConfig.apiKey) {
      firebaseConfig = envConfig;
    }
  }
}

const initialAuthToken = (typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_INITIAL_AUTH_TOKEN : null)) || null;
const appId = (typeof __app_id !== 'undefined' ? __app_id : (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_APP_ID : undefined)) || 'default-app-id';

// Gemini API Configuration
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=";
const API_KEY = ""; // Placeholder, key is injected at runtime

// Define una plantilla de checklist de ejemplo que se guardará junto con el activo
const defaultChecklist = [
    { text: "Verificar nivel de aceite (visual)", type: "boolean" },
    { text: "Detectar vibración anormal (tacto/oído)", type: "boolean" },
    { text: "Temperatura superficial (tacto/termómetro)", type: "text" },
    { text: "Presencia de fugas o derrames", type: "boolean" },
];

// Componente para manejar la lógica de Retry y Llamada a Gemini
const fetchGemini = async (payload) => {
    let lastError = null;
    for (let i = 0; i < 3; i++) { // Retry up to 3 times
        const delay = Math.pow(2, i) * 1000; // Exponential backoff (1s, 2s, 4s)
        if (i > 0) await new Promise(resolve => setTimeout(resolve, delay));

        try {
            const response = await fetch(GEMINI_API_URL + API_KEY, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                lastError = `HTTP error! status: ${response.status}`;
                continue;
            }
            
            const result = await response.json();
            const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
                return text.trim();
            } else {
                lastError = "Respuesta de Gemini vacía o inesperada.";
            }
        } catch (e) {
            lastError = e.message;
        }
    }
    throw new Error(`Fallo la llamada a Gemini después de 3 intentos. Último error: ${lastError}`);
};

// --- START: ASSET HISTORY COMPONENT ---

const AssetHistory = ({ db, userId, appId, asset, onBack }) => {
    const [historyInspections, setHistoryInspections] = useState([]);
    const [selectedInspection, setSelectedInspection] = useState(null);
    const [loadingHistory, setLoadingHistory] = useState(true);

    // 1. Carga del Historial de Inspecciones para el activo seleccionado
    useEffect(() => {
        if (!db || !userId || !asset?.id) return;
        
        setLoadingHistory(true);
        const inspectionCollectionPath = `/artifacts/${appId}/users/${userId}/inspections`;
        const inspectionsColRef = collection(db, inspectionCollectionPath);
        
        // Query: Trae todas las inspecciones para ESTE activo, ordenadas por fecha
        const q = query(
            inspectionsColRef, 
            where('assetId', '==', asset.id),
            orderBy('date', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().date?.toDate ? doc.data().date.toDate() : new Date(),
            }));
            setHistoryInspections(data);
            setLoadingHistory(false);
            // Si hay un historial, seleccionamos la última inspección por defecto
            if (data.length > 0 && !selectedInspection) {
                setSelectedInspection(data[0]);
            }
        }, (e) => {
            console.error("Error fetching asset history:", e);
            setLoadingHistory(false);
        });

        return () => unsubscribe();
    }, [db, userId, appId, asset]);

    const getCriticalityColor = (crit) => {
        switch (crit) {
          case 'A': return 'bg-red-500 text-white';
          case 'B': return 'bg-orange-500 text-white';
          case 'C': return 'bg-yellow-500 text-gray-800';
          case 'D': return 'bg-green-500 text-white';
          default: return 'bg-gray-400 text-white';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-800 p-6 rounded-xl shadow-2xl border-b border-gray-700">
                <h2 className="text-3xl font-bold text-teal-400">
                    Historial de {asset.name} 
                </h2>
                <button 
                    onClick={() => {setSelectedInspection(null); onBack();}}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition duration-150 flex items-center"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Dashboard
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna Izquierda: Lista de Inspecciones */}
                <div className="lg:col-span-1 bg-gray-800 p-4 rounded-xl shadow-lg h-96 overflow-y-auto">
                    <p className="text-xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2">
                        Registros ({historyInspections.length})
                    </p>
                    {loadingHistory ? (
                        <div className="flex justify-center items-center h-full"><Loader className="w-6 h-6 animate-spin text-blue-400" /></div>
                    ) : historyInspections.length === 0 ? (
                        <p className="text-gray-400 italic">No hay inspecciones registradas para este activo.</p>
                    ) : (
                        <div className="space-y-3">
                            {historyInspections.map((insp) => (
                                <div 
                                    key={insp.id}
                                    onClick={() => setSelectedInspection(insp)}
                                    className={`p-3 rounded-lg cursor-pointer transition duration-150 border-l-4 ${
                                        selectedInspection?.id === insp.id 
                                            ? 'bg-blue-900 border-blue-400 shadow-xl' 
                                            : 'bg-gray-700 hover:bg-gray-700/80 border-gray-600'
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center text-sm font-medium">
                                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                            {insp.date.toLocaleDateString()}
                                        </div>
                                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${insp.overallStatus === 'ALERT' ? 'bg-red-600' : 'bg-green-600'} text-white`}>
                                            {insp.overallStatus}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Columna Derecha: Detalle de la Inspección Seleccionada */}
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg">
                    {selectedInspection ? (
                        <>
                            <div className="mb-6 pb-4 border-b border-gray-700">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold text-white">
                                        Registro del {selectedInspection.date.toLocaleDateString()}
                                    </h3>
                                    <span className={`font-bold p-2 rounded ${getCriticalityColor(asset.criticality)}`}>
                                        Crit.: {asset.criticality}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 mt-1">
                                    Notas Generales: <span className="text-gray-200 italic">{selectedInspection.notes || 'N/A'}</span>
                                </p>
                            </div>
                            
                            {/* Resultados del Checklist */}
                            <div className="space-y-3 h-80 overflow-y-auto pr-2">
                                {selectedInspection.results.map((result, index) => (
                                    <div 
                                        key={index} 
                                        className={`p-3 rounded-lg shadow-md ${result.status === 'ALERT' ? 'bg-red-900/50 border-l-4 border-red-500' : 'bg-gray-700 border-l-4 border-green-500'}`}
                                    >
                                        <p className="text-base font-medium text-gray-50">
                                            {index + 1}. {result.text}
                                        </p>
                                        <div className="flex justify-between items-start mt-1 text-sm">
                                            <span className="text-gray-300">Respuesta: <strong className="text-white">{result.answer}</strong></span>
                                            <span className={`text-xs font-semibold ${result.status === 'ALERT' ? 'text-red-300' : 'text-green-300'}`}>{result.status}</span>
                                        </div>
                                        {result.notes && (
                                            <p className="text-xs text-gray-400 mt-1 italic">Notas: {result.notes}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-full text-gray-500">
                            <FileText className="w-10 h-10 mr-3" />
                            Selecciona un registro de inspección para ver los detalles del checklist.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- END: ASSET HISTORY COMPONENT ---


// --- START: DASHBOARD UTILITIES AND COMPONENTS ---
// Componente simple para el gráfico de pastel (usando SVG básico)
const PieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return <p className="text-gray-400 italic">No hay datos para mostrar.</p>;

    let startAngle = 0;
    
    return (
        <svg viewBox="0 0 100 100" className="w-full max-w-xs mx-auto">
            {data.map((item, index) => {
                const angle = (item.value / total) * 360;
                const largeArcFlag = angle > 180 ? 1 : 0;
                
                const x1 = 50 + 50 * Math.sin(startAngle * Math.PI / 180);
                const y1 = 50 - 50 * Math.cos(startAngle * Math.PI / 180);
                
                startAngle += angle;
                
                const x2 = 50 + 50 * Math.sin(startAngle * Math.PI / 180);
                const y2 = 50 - 50 * Math.cos(startAngle * Math.PI / 180);

                const pathData = angle === 360 
                    ? `M 50 50 L 50 0 A 50 50 0 1 1 49.9 0 Z` 
                    : `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                return <path key={index} d={pathData} fill={item.color} />;
            })}
        </svg>
    );
};

// Componente simple para el gráfico de barras (simulación de evolución)
const AssetEvolutionChart = ({ data }) => {
    const maxVal = Math.max(...data.map(d => d.valueOK + d.valueALERT)) || 1;
    const displayData = data.slice(-12);

    // Márgenes internos para que todo quede dentro del cuadro
    const left = 24;     // margen izquierdo
    const top = 12;      // margen superior
    const right = 380;
    const bottom = 135;  // eje X aún más arriba
    const innerH = bottom - top; // altura útil del eje Y

    return (
        <svg viewBox="0 0 400 200" className="w-full h-auto">
            <line x1={left} y1={bottom} x2={right} y2={bottom} stroke="#4B5563" />
            <line x1={left} y1={top} x2={left} y2={bottom} stroke="#4B5563" />

            {displayData.map((d, index) => {
                const barGap = 30;
                const barW = 16;
                const xBase = left + 10 + index * barGap;
                const heightOK = (d.valueOK / maxVal) * innerH;
                const heightALERT = (d.valueALERT / maxVal) * innerH;

                return (
                    <g key={index}>
                        <rect x={xBase} y={bottom - heightOK} width={barW} height={heightOK} fill="#10B981" rx="2" />
                        <rect x={xBase} y={bottom - heightOK - heightALERT} width={barW} height={heightALERT} fill="#EF4444" rx="2" />
                        <text x={xBase + barW / 2} y={bottom - 3} textAnchor="middle" fontSize="9" fill="#9CA3AF">{d.month}</text>
                    </g>
                );
            })}
            {[0, 25, 50, 75, 100].map((val, i) => (
                <text key={i} x={left - 4} y={bottom - (val / 100) * innerH} textAnchor="end" fontSize="7" fill="#9CA3AF">
                    {(val / 100 * maxVal).toFixed(0)}
                </text>
            ))}
        </svg>
    );
};


const Dashboard = ({ assets, latestInspections, allInspections, onInspectAssetHistory }) => {
    
    // Métrica 1: Resumen de Estado de Activos (OK/ALERT/Uninspected)
    const assetStatusSummary = useMemo(() => {
        const summary = { 'OK': 0, 'ALERT': 0, 'Uninspected': 0 };
        assets.forEach(asset => {
            summary[asset.status] = (summary[asset.status] || 0) + 1;
        });
        const total = assets.length;
        const data = [
            { name: 'OK', value: summary['OK'], color: '#10B981' }, // Green
            { name: 'ALERTA', value: summary['ALERT'], color: '#EF4444' }, // Red
            { name: 'No Insp.', value: summary['Uninspected'], color: '#F59E0B' }, // Amber
        ].filter(item => item.value > 0);
        return { data, total };
    }, [assets]);
    
    // Métrica 2: Distribución por Criticidad (A, B, C, D)
    const assetCriticalitySummary = useMemo(() => {
        const summary = { 'A': 0, 'B': 0, 'C': 0, 'D': 0 };
        assets.forEach(asset => {
            summary[asset.criticality] = (summary[asset.criticality] || 0) + 1;
        });
        const total = assets.length;
        const data = [
            { name: 'A (Alta)', value: summary['A'], color: '#DC2626' }, // Red-600
            { name: 'B (M-Alta)', value: summary['B'], color: '#F97316' }, // Orange-600
            { name: 'C (M-Baja)', value: summary['C'], color: '#FCD34D' }, // Amber-300
            { name: 'D (Baja)', value: summary['D'], color: '#4ADE80' }, // Green-400
        ].filter(item => item.value > 0);
        return { data, total };
    }, [assets]);
    
    // Métrica 3: Evolución mensual (últimos 12 meses) basada en inspecciones reales
    const monthlyEvolutionData = useMemo(() => {
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        // Orden fijo Ene..Dic
        const monthsData = monthNames.map((name) => ({ month: name, valueOK: 0, valueALERT: 0 }));
        const now = new Date();
        const cutoff = new Date(now.getFullYear(), now.getMonth() - 11, 1); // últimos 12 meses
        if (Array.isArray(allInspections)) {
            allInspections.forEach((insp) => {
                const inspDate = insp?.date?.toDate ? insp.date.toDate() : (insp?.date instanceof Date ? insp.date : null);
                if (!inspDate) return;
                if (inspDate >= cutoff && inspDate <= now) {
                    const idx = inspDate.getMonth(); // 0..11 → Ene..Dic
                    if (insp.overallStatus === 'ALERT') {
                        monthsData[idx].valueALERT += 1;
                    } else if (insp.overallStatus === 'OK') {
                        monthsData[idx].valueOK += 1;
                    }
                }
            });
        }
        return monthsData;
    }, [allInspections]);

    return (
        <div className="space-y-8">
            {/* Row 1: Totales, Estado de Activos y Criticidad */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Card: Total de Activos */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-blue-500">
                    <p className="text-sm font-medium text-gray-400">Activos Totales</p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-5xl font-extrabold text-white">{assetStatusSummary.total}</span>
                        <Target className="w-10 h-10 text-blue-400" />
                    </div>
                </div>

                {/* Card: Estado de Activos (OK/ALERT/Uninspected) */}
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-teal-500">
                    <p className="text-xl font-semibold text-teal-300 mb-4">Estado de Activos (Actual)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div>
                            <PieChart data={assetStatusSummary.data} />
                        </div>
                        <div className="space-y-2">
                            {assetStatusSummary.data.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-gray-200">{item.name}:</span>
                                    <span className="ml-2 font-bold text-lg">{item.value}</span>
                                    <span className="text-gray-400 ml-1">({((item.value / assetStatusSummary.total) * 100).toFixed(1)}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Card: Distribución por Criticidad (A, B, C, D) */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-yellow-500">
                    <p className="text-sm font-medium text-gray-400">Distribución por Criticidad</p>
                    <div className="h-40 flex flex-col justify-center">
                        <PieChart data={assetCriticalitySummary.data} />
                    </div>
                    <div className="mt-4 space-y-1 text-xs">
                        {assetCriticalitySummary.data.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-gray-300 font-semibold">{item.name}</span>
                                </div>
                                <span className="font-bold text-white">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Row 2: Evolución y Historial */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Card: Evolución del Estado (Barras) */}
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-indigo-500 overflow-hidden">
                    <h2 className="text-2xl font-semibold mb-2 flex items-center text-indigo-300">
                        <BarChart className="w-5 h-5 mr-2" /> Evolución del Estado (Últimos 12 meses)
                    </h2>
                    <div className="h-90 flex items-start justify-center pt-1">
                        <AssetEvolutionChart data={monthlyEvolutionData} />
                    </div>
                    <div className="flex justify-center mt-4 space-x-6 text-sm">
                        <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div><span className='text-gray-300'>OK</span></div>
                        <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div><span className='text-gray-300'>ALERTA</span></div>
                    </div>
                </div>
                
                {/* Card: Historial de Inspecciones Recientes */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-purple-500">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-300">
                        <Clock className="w-5 h-5 mr-2" /> Últimas 10 Inspecciones
                    </h2>
                    
                    {latestInspections.length === 0 ? (
                        <p className="text-gray-400 italic">No hay registros de inspección recientes.</p>
                    ) : (
                        <div className="space-y-3">
                            {latestInspections.map((insp) => (
                                <div 
                                    key={insp.id} 
                                    className={`flex items-center p-3 rounded-lg shadow-md border-l-4 ${insp.overallStatus === 'ALERT' ? 'border-red-500 bg-gray-700/50' : 'border-green-500 bg-gray-700'}`}
                                >
                                    <div className="flex-grow">
                                        <p className="text-lg font-bold text-white">{insp.assetName}</p>
                                        <p className="text-sm text-gray-300">
                                            Insp: {insp.date.toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`flex-shrink-0 px-3 py-1 text-xs font-semibold rounded-full ${insp.overallStatus === 'ALERT' ? 'bg-red-600' : 'bg-green-600'} text-white`}>
                                        {insp.overallStatus}
                                    </span>
                                    <button 
                                        className="ml-4 p-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white text-sm font-medium"
                                        onClick={() => {
                                            const asset = assets.find(a => a.id === insp.assetId);
                                            if (asset) onInspectAssetHistory(asset);
                                        }}
                                    >
                                        Detalle
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
// --- END: DASHBOARD COMPONENT ---


// Componente para el Formulario de Inspección
const InspectionForm = ({ asset, onBack, onSave, loading }) => {
  const [results, setResults] = useState([]);
  const [notes, setNotes] = useState('');

  // Inicializa los resultados del checklist cuando el activo cambia
  useEffect(() => {
    if (asset?.checklist) {
      const initialResults = asset.checklist.map((item, index) => ({
        questionIndex: index,
        text: item.text,
        type: item.type,
        answer: item.type === 'boolean' ? 'No' : '', // 'No' por defecto (OK)
        status: 'OK', 
        notes: '',
      }));
      setResults(initialResults);
    }
  }, [asset]);

  // Maneja el cambio de respuesta en un punto del checklist
  const handleInputChange = (index, value) => {
    setResults(prevResults => {
      const newResults = [...prevResults];
      const question = newResults[index];
      
      let newStatus = 'OK';

      if (question.type === 'boolean') {
        question.answer = value;
        // Si la respuesta es 'Si', es ALERTA. Si es 'No', es OK.
        newStatus = value === 'Si' ? 'ALERT' : 'OK';
      } else {
        question.answer = value;
        // Para texto, mantenemos OK por defecto
      }
      question.status = newStatus;
      
      return newResults;
    });
  };
  
  // Maneja notas específicas de un punto de inspección
  const handleNotesChange = (index, value) => {
    setResults(prevResults => {
      const newResults = [...prevResults];
      newResults[index].notes = value;
      return newResults;
    });
  }

  // Calcula el estado general de la inspección: ALERT si cualquier punto está en ALERT
  const overallStatus = results.some(r => r.status === 'ALERT') ? 'ALERT' : 'OK';
  
  // Llama a la función de guardar en el componente padre
  const handleSave = () => {
    onSave(results, notes, overallStatus);
  };
  
  // Asegura que todas las preguntas booleanas tienen una respuesta y los textos no están vacíos
  const isFormComplete = results.every(r => r.type === 'boolean' ? ['Si', 'No'].includes(r.answer) : r.answer.trim() !== '');


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
        Ubicación: {asset.location} | Criticidad: <span className={`font-bold p-1 rounded ${asset.criticality === 'A' ? 'bg-red-500' : asset.criticality === 'D' ? 'bg-green-500' : 'bg-orange-500'}`}>{asset.criticality}</span>
      </p>
      
      {/* Lista de Puntos de Inspección */}
      <div className="space-y-6">
        <p className="text-sm italic text-gray-400 mb-4 border-b border-gray-700 pb-2">
            Marque los resultados. Un resultado 'Si' (para booleanos) o cualquier alerta en notas, marcará el punto como ALERTA.
        </p>
        {results.map((item, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg shadow-md transition duration-150 ${item.status === 'ALERT' ? 'bg-red-900 border-l-4 border-red-500' : 'bg-gray-700 border-l-4 border-teal-500'}`}
          >
            <label className="block text-lg font-medium mb-2 text-gray-50">
              {index + 1}. {item.text}
            </label>
            
            {/* Controles de Respuesta */}
            {item.type === 'boolean' ? (
              <div className="flex space-x-4 mt-2">
                {['No', 'Si'].map((option, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleInputChange(index, option)}
                    className={`px-4 py-2 rounded-lg font-semibold transition duration-150 ${
                      item.answer === option
                        ? option === 'Si' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                        : 'bg-gray-500 hover:bg-gray-600 text-gray-100'
                    }`}
                  >
                    {option} ({option === 'Si' ? 'ALERTA' : 'OK'})
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={item.answer}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="Introduzca lectura o valor..."
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                required
              />
            )}
            
            {/* Notas del Punto de Inspección */}
            <textarea
              value={item.notes}
              onChange={(e) => handleNotesChange(index, e.target.value)}
              placeholder="Notas detalladas de la inspección o hallazgos (opcional)..."
              rows="2"
              className="w-full mt-3 p-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-teal-500 focus:border-teal-500 resize-none text-sm"
            />
          </div>
        ))}
      </div>
      
      {/* Notas Generales y Botón de Guardado */}
      <div className="mt-8 p-4 bg-gray-700 rounded-lg shadow-inner">
        <label htmlFor="generalNotes" className="block text-lg font-medium text-gray-200 mb-2">
          Notas Generales de la Inspección
        </label>
        <textarea
          id="generalNotes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Comentarios adicionales sobre el estado general del activo o el entorno..."
          rows="3"
          className="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-700">
        <div className="text-xl font-bold">
            Estado Final: 
            <span className={`ml-2 px-3 py-1 rounded-full ${overallStatus === 'ALERT' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                {overallStatus === 'ALERT' ? 'ALERTA' : 'OK'}
            </span>
        </div>
        <button
          onClick={handleSave}
          className={`px-6 py-3 text-white font-bold rounded-lg transition duration-300 transform flex items-center justify-center ${
            loading || !isFormComplete ? 'bg-green-600/70 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-xl'
          }`}
          disabled={loading || !isFormComplete}
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
            * Por favor, complete todos los puntos de inspección para guardar.
        </p>
      )}
    </div>
  );
};


const App = () => {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  const [assets, setAssets] = useState([]);
  const [latestInspections, setLatestInspections] = useState([]); // Nuevo estado para inspecciones recientes
  
  // Estados para formulario de nuevo activo
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetLocation, setNewAssetLocation] = useState('');
  const [newAssetDescription, setNewAssetDescription] = useState('');
  const [newAssetCriticality, setNewAssetCriticality] = useState('D'); 
  
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('list'); // 'list', 'inspection', 'dashboard', 'assetHistory'
  const [selectedAsset, setSelectedAsset] = useState(null);
  
  // --- NUEVO ESTADO PARA BÚSQUEDA ---
  const [searchTerm, setSearchTerm] = useState(''); 
  
  // Función para cambiar de vista (útil para la navegación del dashboard)
  const navigateToView = useCallback((view, asset = null) => {
    setActiveView(view);
    setSelectedAsset(asset);
  }, []);


  // 1. INITIALIZATION and AUTHENTICATION
  useEffect(() => {
    setLogLevel('error'); 

    if (Object.keys(firebaseConfig).length === 0) {
      console.error("Firebase config is missing.");
      setError("Error: Configuración de Firebase faltante.");
      // Evita quedarse en 'Cargando aplicación...' si no hay config
      setIsAuthReady(true);
      return;
    }

    try {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const authInstance = getAuth(app);
      
      setDb(firestore);
      setAuth(authInstance);

      const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
        if (!user) {
          if (initialAuthToken) {
            await signInWithCustomToken(authInstance, initialAuthToken);
          } else {
            await signInAnonymously(authInstance);
          }
        }
        setUserId(authInstance.currentUser?.uid || crypto.randomUUID());
        setIsAuthReady(true);
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Error during Firebase initialization:", e);
      setError("Error al inicializar Firebase. Ver consola.");
    }
  }, []);

  // 2. FIRESTORE REAL-TIME DATA LISTENER (Assets)
  useEffect(() => {
    if (db && userId) {
      const assetCollectionPath = `/artifacts/${appId}/users/${userId}/assets`;
      const assetsColRef = collection(db, assetCollectionPath);
      const q = query(assetsColRef);
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const assetsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        assetsData.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
        setAssets(assetsData);
        setError(null); 
      }, (e) => {
        console.error("Error fetching assets:", e);
        setError("Error al cargar los activos. Ver consola.");
      });

      return () => unsubscribe();
    }
  }, [db, userId]);
  
  // 3. FIRESTORE REAL-TIME DATA LISTENER (Latest Inspections)
  useEffect(() => {
    if (db && userId) {
        // Obtenemos los últimos 10 registros de inspección, ordenados por fecha descendente.
        const inspectionCollectionPath = `/artifacts/${appId}/users/${userId}/inspections`;
        const inspectionsColRef = collection(db, inspectionCollectionPath);
        
        // Usamos solo limit y orderBy para obtener los datos correctos del historial.
        const q = query(inspectionsColRef, orderBy('date', 'desc'), limit(10));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const inspectionsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Convertir Timestamp a objeto Date para fácil manejo en React
                date: doc.data().date?.toDate ? doc.data().date.toDate() : new Date(), 
            }));
            setLatestInspections(inspectionsData);
        }, (e) => {
            console.error("Error fetching latest inspections:", e);
            // Manejo de error si falla el índice (común con orderBy)
            // setError("Advertencia: Fallo al cargar el historial de inspecciones. Si hay error de índice en consola, se puede quitar el orderBy.");
        });

        return () => unsubscribe();
    }
  }, [db, userId]);

  // 4. FIRESTORE REAL-TIME DATA LISTENER (All Inspections for dashboard evolution)
  const [allInspections, setAllInspections] = useState([]);
  useEffect(() => {
    if (db && userId) {
      const inspectionCollectionPath = `/artifacts/${appId}/users/${userId}/inspections`;
      const inspectionsColRef = collection(db, inspectionCollectionPath);
      const q = query(inspectionsColRef, orderBy('date', 'desc'), limit(500));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate ? doc.data().date.toDate() : new Date(),
        }));
        setAllInspections(data);
      }, (e) => {
        console.error('Error fetching all inspections:', e);
      });
      return () => unsubscribe();
    }
  }, [db, userId]);

  // --- LÓGICA DE FILTRADO DE ACTIVOS ---
  const filteredAssets = useMemo(() => {
    if (!searchTerm) return assets;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return assets.filter(asset => {
        // Buscar por nombre del activo
        const nameMatch = asset.name.toLowerCase().includes(lowerCaseSearchTerm);
        // Buscar por ubicación del activo
        const locationMatch = (asset.location || '').toLowerCase().includes(lowerCaseSearchTerm);
        
        return nameMatch || locationMatch;
    });
  }, [assets, searchTerm]);
  // ------------------------------------


  // Function to determine criticality color
  const getCriticalityColor = (crit) => {
    switch (crit) {
      case 'A': return 'bg-red-500 text-white';
      case 'B': return 'bg-orange-500 text-white';
      case 'C': return 'bg-yellow-500 text-gray-800';
      case 'D': return 'bg-green-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  // LLM FEATURE: Generate Suggested Checklist
  const handleGenerateChecklist = async () => {
    if (!newAssetName || !newAssetCriticality) {
        setError("Necesitas al menos el Nombre y la Criticidad para generar una lista.");
        return;
    }

    setAiLoading(true);
    setError(null);

    const systemPrompt = `Eres un ingeniero de confiabilidad experto. Tu tarea es generar un JSON de 4 a 6 puntos de inspección visual y auditiva de rutina (diaria) para el activo proporcionado. Céntrate en fallos comunes detectables sin instrumentación avanzada. La respuesta DEBE ser un arreglo JSON de objetos, sin preámbulos, explicaciones ni markdown envolvente (e.g., \`\`\`json).`;
    
    const userQuery = `Activo: "${newAssetName}". Criticidad: ${newAssetCriticality}.`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        text: { type: "STRING", description: "La pregunta o punto de inspección, e.g., 'Detectar ruidos anómalos o golpeteo.'" },
                        type: { type: "STRING", enum: ["boolean", "text"], description: "El tipo de entrada que necesita el inspector." }
                    },
                    propertyOrdering: ["text", "type"]
                }
            }
        }
    };

    try {
        const jsonText = await fetchGemini(payload);
        const suggestedChecklist = JSON.parse(jsonText);
        
        sessionStorage.setItem('suggestedChecklist', JSON.stringify(suggestedChecklist));
        setError("✨ Checklist sugerido por IA listo. ¡Presiona 'Guardar Activo' para almacenarlo!");

    } catch (e) {
        console.error("Error generating checklist:", e);
        setError(`Error del Generador IA: ${e.message}. Usando plantilla por defecto.`);
        sessionStorage.removeItem('suggestedChecklist');
    } finally {
        setAiLoading(false);
    }
  };

  // LLM FEATURE: Analyze Criticality
  const handleAnalyzeCriticality = async () => {
    if (!newAssetDescription) {
        setError("Por favor, introduce una Descripción del activo para el análisis de criticidad.");
        return;
    }

    setAiLoading(true);
    setError(null);

    const systemPrompt = `Eres un Ingeniero de Confiabilidad. Analiza la siguiente descripción de activo. Tu tarea es asignar la criticidad más adecuada (A, B, C o D) y justificar brevemente por qué. La respuesta DEBE ser un objeto JSON de 2 campos, sin preámbulos ni markdown envolvente.`;
    
    const userQuery = `Descripción del Activo: "${newAssetDescription}". Basado en esta descripción, asigna una criticidad entre A (Muy Alta) y D (Baja).`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    criticality: { type: "STRING", enum: ["A", "B", "C", "D"] },
                    justification: { type: "STRING", description: "Breve justificación del por qué de la criticidad asignada." }
                },
                propertyOrdering: ["criticality", "justification"]
            }
        }
    };

    try {
        const jsonText = await fetchGemini(payload);
        const analysis = JSON.parse(jsonText);
        
        setNewAssetCriticality(analysis.criticality);
        setError(`✨ Criticidad sugerida por IA: ${analysis.criticality}. Justificación: ${analysis.justification}`);

    } catch (e) {
        console.error("Error analyzing criticality:", e);
        setError(`Error del Analizador IA: ${e.message}. No se pudo sugerir la criticidad.`);
    } finally {
        setAiLoading(false);
    }
  };


  // Function to add a new Asset
  const handleAddAsset = useCallback(async (e) => {
    e.preventDefault();
    if (!newAssetName || !db || !userId) {
      setError("El nombre del activo es obligatorio.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const assetCollectionPath = `/artifacts/${appId}/users/${userId}/assets`;
      
      const storedChecklist = sessionStorage.getItem('suggestedChecklist');
      const finalChecklist = storedChecklist ? JSON.parse(storedChecklist) : defaultChecklist;
      sessionStorage.removeItem('suggestedChecklist'); 

      await addDoc(collection(db, assetCollectionPath), {
        name: newAssetName,
        location: newAssetLocation,
        description: newAssetDescription,
        criticality: newAssetCriticality,
        status: 'Uninspected', // Estado inicial
        createdAt: serverTimestamp(),
        checklist: finalChecklist, // Checklist guardado
      });
      
      setNewAssetName('');
      setNewAssetLocation('');
      setNewAssetDescription('');
      setNewAssetCriticality('D');
      
    } catch (e) {
      console.error("Error adding document: ", e);
      setError("Error al guardar el activo: " + e.message);
    } finally {
      setLoading(false);
    }
  }, [db, userId, newAssetName, newAssetLocation, newAssetDescription, newAssetCriticality]);
  
  // Function to save a new Inspection record
  const handleSaveInspection = useCallback(async (results, notes, overallStatus) => {
    if (!db || !userId || !selectedAsset) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Guardar el nuevo registro de Inspección
      const inspectionCollectionPath = `/artifacts/${appId}/users/${userId}/inspections`;
      await addDoc(collection(db, inspectionCollectionPath), {
        assetId: selectedAsset.id,
        assetName: selectedAsset.name,
        inspectorUserId: userId,
        date: serverTimestamp(),
        results: results, 
        notes: notes,
        overallStatus: overallStatus,
      });

      // 2. Actualizar el estado del Activo
      const assetDocRef = doc(db, `/artifacts/${appId}/users/${userId}/assets`, selectedAsset.id);
      await updateDoc(assetDocRef, {
        status: overallStatus,
        lastInspectionDate: serverTimestamp(),
      });
      
      // 3. Resetear el estado de la vista
      setLoading(false);
      setSelectedAsset(null);
      setActiveView('list');
      setError("✅ Inspección guardada y estado del activo actualizado.");

    } catch (e) {
      console.error("Error saving inspection:", e);
      setError("Error al guardar la inspección: " + e.message);
      setLoading(false);
    }
  }, [db, userId, selectedAsset]);


  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <Loader className="w-8 h-8 animate-spin mr-2" /> Cargando aplicación...
      </div>
    );
  }

  // Main UI
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8 font-sans">
      <header className="mb-8 pb-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                PIA (Predictive Inspection App)
            </h1>
            <nav className="flex space-x-3">
                <button
                    onClick={() => navigateToView('list')}
                    className={`px-3 py-2 rounded-lg font-semibold transition duration-150 flex items-center ${activeView === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                    <List className="w-5 h-5 mr-2" /> Activos
                </button>
                <button
                    onClick={() => navigateToView('dashboard')}
                    className={`px-3 py-2 rounded-lg font-semibold transition duration-150 flex items-center ${activeView === 'dashboard' ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                    <BarChart2 className="w-5 h-5 mr-2" /> Dashboard
                </button>
            </nav>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          {userId && `Usuario: ${userId}`} | Entorno: {appId}
        </p>
      </header>
      
      {error && (
        <div className="p-3 mb-4 bg-red-800 rounded-lg flex items-center shadow-lg">
          <AlertTriangle className="w-5 h-5 mr-2" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* RENDERIZADO CONDICIONAL DE VISTAS */}
      
      {/* VISTA: LISTA DE ACTIVOS Y CREACIÓN */}
      {activeView === 'list' && (
        <>
          {/* ACTIVO CREATION FORM */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-teal-300">
              <Plus className="w-5 h-5 mr-2" /> Nuevo Activo y Generación Inteligente
            </h2>
            <form onSubmit={handleAddAsset} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div className="md:col-span-2">
                <label htmlFor="assetName" className="block text-sm font-medium text-gray-400 mb-1">
                  1. Nombre del Activo (Ej: Bomba Principal M-1)
                </label>
                <input
                  id="assetName"
                  type="text"
                  value={newAssetName}
                  onChange={(e) => setNewAssetName(e.target.value)}
                  placeholder="Escribe el nombre del activo"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  required
                  disabled={loading || aiLoading}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="assetLocation" className="block text-sm font-medium text-gray-400 mb-1">
                  Ubicación
                </label>
                <input
                  id="assetLocation"
                  type="text"
                  value={newAssetLocation}
                  onChange={(e) => setNewAssetLocation(e.target.value)}
                  placeholder="Ej: Planta Baja, Área 3"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  disabled={loading || aiLoading}
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="assetDescription" className="block text-sm font-medium text-gray-400 mb-1">
                  2. Descripción y Contexto (Para Análisis IA)
                </label>
                <textarea
                  id="assetDescription"
                  value={newAssetDescription}
                  onChange={(e) => setNewAssetDescription(e.target.value)}
                  placeholder="Ej: Motor eléctrico de 500HP. Componente crítico en la línea de producción, si falla se detiene toda la planta."
                  rows="3"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none"
                  disabled={loading || aiLoading}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:col-span-2">
                <div>
                    <label htmlFor="assetCriticality" className="block text-sm font-medium text-gray-400 mb-1">
                    3. Criticidad Actual
                    </label>
                    <select
                    id="assetCriticality"
                    value={newAssetCriticality}
                    onChange={(e) => setNewAssetCriticality(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 appearance-none"
                    disabled={loading || aiLoading}
                    >
                    <option value="A">A (Alta)</option>
                    <option value="B">B (Media-Alta)</option>
                    <option value="C">C (Media-Baja)</option>
                    <option value="D">D (Baja)</option>
                    </select>
                </div>
                
                <button
                    type="button"
                    onClick={handleAnalyzeCriticality}
                    className={`p-3 text-white font-bold rounded-lg transition duration-300 transform flex items-center justify-center ${
                      aiLoading ? 'bg-indigo-600/70 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
                    }`}
                    disabled={aiLoading}
                  >
                    {aiLoading ? (
                      <Loader className="w-5 h-5 inline animate-spin mr-2" />
                    ) : (
                      <Sparkles className="w-5 h-5 inline mr-2" />
                    )}
                    Analizar Criticidad (IA)
                  </button>
              </div>

              <div className="md:col-span-4 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleGenerateChecklist}
                    className={`p-3 text-white font-bold rounded-lg transition duration-300 transform flex items-center justify-center ${
                      aiLoading ? 'bg-pink-600/70 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 hover:shadow-lg'
                    }`}
                    disabled={aiLoading || !newAssetName || !newAssetCriticality}
                  >
                    {aiLoading ? (
                      <Loader className="w-5 h-5 inline animate-spin mr-2" />
                    ) : (
                      <Sparkles className="w-5 h-5 inline mr-2" />
                    )}
                    Generar Checklist (IA)
                  </button>

                  <button
                    type="submit"
                    className={`p-3 text-white font-bold rounded-lg transition duration-300 transform flex items-center justify-center ${
                      loading ? 'bg-blue-600/70 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader className="w-5 h-5 inline animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="w-5 h-5 inline mr-2" />
                    )}
                    Guardar Activo y Checklist
                  </button>
              </div>
            </form>
          </div>
          
          {/* ASSET LIST */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-300">
              <List className="w-5 h-5 mr-2" /> Mis Activos ({filteredAssets.length} de {assets.length} mostrados)
            </h2>
            
            {/* INPUT DE BÚSQUEDA --- NUEVO --- */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar por Nombre o Ubicación del Activo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
            </div>
            {/* FIN INPUT DE BÚSQUEDA */}
            
            {filteredAssets.length === 0 ? (
              <p className="text-gray-400 italic">No se encontraron activos que coincidan con la búsqueda.</p>
            ) : (
              <div className="space-y-4">
                {filteredAssets.map((asset) => (
                  <div 
                    key={asset.id} 
                    className="flex items-center p-4 bg-gray-700/50 rounded-lg shadow-md hover:bg-gray-700 transition duration-150 border-l-4 border-teal-400"
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold ${getCriticalityColor(asset.criticality)}`}>
                      {asset.criticality}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-50">{asset.name}</h3>
                      <p className="text-sm text-gray-300">{asset.location || 'Sin ubicación'}</p>
                    </div>
                    <div className="flex-shrink-0 text-right flex items-center">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${asset.status === 'ALERT' ? 'bg-red-600' : 'bg-green-600'} text-white mr-4`}>
                        {asset.status}
                      </span>
                      <button 
                        className="ml-4 p-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white text-sm font-medium"
                        onClick={() => {
                            setSelectedAsset(asset);
                            navigateToView('inspection', asset);
                        }}
                      >
                        Inspeccionar
                      </button>
                      <button
                        className="ml-2 p-2 bg-teal-600 rounded-lg hover:bg-teal-700 text-white text-sm font-medium"
                        onClick={() => {
                          setSelectedAsset(asset);
                          navigateToView('assetHistory', asset);
                        }}
                      >
                        Historial
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* VISTA: FORMULARIO DE INSPECCIÓN */}
      {activeView === 'inspection' && selectedAsset && (
        <InspectionForm
          asset={selectedAsset}
          onBack={() => navigateToView('list')}
          onSave={handleSaveInspection}
          loading={loading}
        />
      )}
      
      {/* VISTA: DASHBOARD */}
      {activeView === 'dashboard' && (
        <Dashboard 
            assets={assets} 
            latestInspections={latestInspections}
            allInspections={allInspections}
            onInspectAssetHistory={(asset) => navigateToView('assetHistory', asset)} // Modificado
        />
      )}
      
      {/* VISTA: HISTORIAL DE ACTIVO INDIVIDUAL */}
      {activeView === 'assetHistory' && selectedAsset && db && userId && appId && (
        <AssetHistory
          db={db}
          userId={userId}
          appId={appId}
          asset={selectedAsset}
          onBack={() => navigateToView('dashboard')} // Volver al dashboard
        />
      )}


      <footer className="mt-8 pt-4 border-t border-gray-700 text-center text-xs text-gray-500">
        Aplicación PIA (V7.0) - Impulsada por React, Firestore y Gemini
      </footer>
    </div>
  );
};

export default App;
