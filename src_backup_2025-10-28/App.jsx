import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, query, serverTimestamp, doc, updateDoc, orderBy, limit, where, setLogLevel } from 'firebase/firestore';
import { Plus, CheckCircle, List, BarChart2, Loader, AlertTriangle, Sparkles, ArrowLeft, Clock, Target, BarChart, Calendar, FileText, Search } from 'lucide-react';

// --- FIREBASE SETUP ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const appId = import.meta.env.VITE_APP_ID || 'default-app-id';

// --- GEMINI API CONFIGURATION ---
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-pro';
const GEMINI_API_VERSION = import.meta.env.VITE_GEMINI_API_VERSION || 'v1';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/${GEMINI_API_VERSION}/models/${GEMINI_MODEL}:generateContent?key=`;

const defaultChecklist = [
    { text: "Verificar nivel de aceite (visual)", type: "boolean" },
    { text: "Detectar vibración anormal (tacto/oído)", type: "boolean" },
    { text: "Temperatura superficial (tacto/termómetro)", type: "text" },
    { text: "Presencia de fugas o derrames", type: "boolean" },
];

const fetchGemini = async (payload) => {
    if (!API_KEY) {
        throw new Error('Configuración faltante: define VITE_GEMINI_API_KEY para habilitar las funciones de IA.');
    }
    let lastError = null;
    for (let i = 0; i < 3; i++) {
        const delay = Math.pow(2, i) * 1000;
        if (i > 0) await new Promise(resolve => setTimeout(resolve, delay));
        try {
            console.debug('[Gemini] Intento', i + 1, 'Modelo:', GEMINI_MODEL);
            const response = await fetch(GEMINI_API_URL + API_KEY, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                let detail = '';
                try { detail = await response.text(); } catch {}
                lastError = `HTTP ${response.status} ${response.statusText} (${GEMINI_MODEL})${detail ? ` - ${detail.slice(0,300)}`: ''}`;
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

const getCriticalityColor = (crit) => {
    switch (crit) {
      case 'A': return 'bg-red-500 text-white';
      case 'B': return 'bg-orange-500 text-white';
      case 'C': return 'bg-yellow-500 text-gray-800';
      case 'D': return 'bg-green-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
};

const AssetHistory = ({ db, userId, appId, asset, onBack }) => {
    const [historyInspections, setHistoryInspections] = useState([]);
    const [selectedInspection, setSelectedInspection] = useState(null);
    const [loadingHistory, setLoadingHistory] = useState(true);

    useEffect(() => {
        if (!db || !userId || !asset?.id) return;
        setLoadingHistory(true);
        const inspectionCollectionPath = `/artifacts/${appId}/users/${userId}/inspections`;
        const inspectionsColRef = collection(db, inspectionCollectionPath);
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
            if (data.length > 0 && !selectedInspection) {
                setSelectedInspection(data[0]);
            }
        }, (e) => {
            console.error("Error fetching asset history:", e);
            setLoadingHistory(false);
        });
        return () => unsubscribe();
    }, [db, userId, appId, asset]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-800 p-6 rounded-xl shadow-2xl border-b border-gray-700">
                <h2 className="text-3xl font-bold text-teal-400">
                    Historial de {asset.name}
                </h2>
                <button
                    onClick={() => {
                        setSelectedInspection(null); onBack();
                    }}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition duration-150 flex items-center"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Dashboard
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                                        <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-gray-400" />{insp.date.toLocaleDateString()}</div>
                                        <span className={`text-xs px-2 py-0.5 rounded ${insp.overallStatus==='ALERT'?'bg-red-600':'bg-green-600'} text-white`}>{insp.overallStatus}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                 <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl">
                  {selectedInspection ? (
                    <>
                      <div className="mb-4 flex justify-between items-center border-b border-gray-700 pb-2">
                        <h3 className="text-2xl font-bold text-white">Registro del {selectedInspection.date.toLocaleDateString()}</h3>
                        <span className="px-2 py-1 rounded bg-gray-700 text-gray-200">Criticidad: {asset.criticality}</span>
                      </div>
                      <div className="space-y-3 h-80 overflow-y-auto">
                        {selectedInspection.results.map((r,idx)=> (
                          <div key={idx} className={`p-3 rounded-lg ${r.status==='ALERT'?'bg-red-900/50 border-l-4 border-red-500':'bg-gray-700 border-l-4 border-green-500'}`}>
                            <p className="text-base font-medium text-gray-50">{idx+1}. {r.text}</p>
                            <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-300">Respuesta: <strong>{r.answer}</strong></span>
                                <span className={`text-xs ${r.status==='OK'?'text-green-300':'text-red-300'}`}>{r.status}</span>
                            </div>
                            {r.notes && (<p className="text-xs text-gray-400 mt-1 italic">Comentario: {r.notes}</p>)}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-center items-center h-full text-gray-500"><Clock className="w-5 h-5 mr-2" />Selecciona un registro</div>
                  )}
                </div>
            </div>
        </div>
    );
};

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

const AssetEvolutionChart = ({ data }) => {
    const maxVal = Math.max(...data.map(d => d.valueOK + d.valueALERT)) || 1;
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const displayData = data.slice(-12);
    return (
        <svg viewBox="0 0 400 200" className="w-full h-auto">
            <line x1="20" y1="180" x2="380" y2="180" stroke="#4B5563" />
            <line x1="20" y1="20" x2="20" y2="180" stroke="#4B5563" />
            {displayData.map((d, index) => {
                const xBase = 30 + index * 30;
                const heightOK = (d.valueOK / maxVal) * 160;
                const heightALERT = (d.valueALERT / maxVal) * 160;
                return (
                    <g key={index}>
                        <rect x={xBase} y={180 - heightOK} width="20" height={heightOK} fill="#10B981" rx="2" />
                        <rect x={xBase} y={180 - heightOK - heightALERT} width="20" height={heightALERT} fill="#EF4444" rx="2" />
                        <text x={xBase + 10} y="195" textAnchor="middle" fontSize="10" fill="#9CA3AF">
                            {months[index % 12]}
                        </text>
                    </g>
                );
            })}
            {[0, 25, 50, 75, 100].map((val, i) => (
                <text key={i} x="15" y={180 - (val / 100) * 160} textAnchor="end" fontSize="10" fill="#9CA3AF">
                    {(val / 100 * maxVal).toFixed(0)}
                </text>
            ))}
        </svg>
    );
};

const Dashboard = ({ assets, latestInspections, allInspections, onInspectAssetHistory }) => {
    const assetStatusSummary = useMemo(() => {
        const summary = { 'OK': 0, 'ALERT': 0, 'Uninspected': 0 };
        assets.forEach(asset => {
            summary[asset.status] = (summary[asset.status] || 0) + 1;
        });
        const total = assets.length;
        const data = [
            { name: 'OK', value: summary['OK'], color: '#10B981' },
            { name: 'ALERTA', value: summary['ALERT'], color: '#EF4444' },
            { name: 'No Insp.', value: summary['Uninspected'], color: '#F59E0B' },
        ].filter(item => item.value > 0);
        return { data, total };
    }, [assets]);

    const assetCriticalitySummary = useMemo(() => {
        const summary = { 'A': 0, 'B': 0, 'C': 0, 'D': 0 };
        assets.forEach(asset => {
            summary[asset.criticality] = (summary[asset.criticality] || 0) + 1;
        });
        const total = assets.length;
        const data = [
            { name: 'A (Alta)', value: summary['A'], color: '#DC2626' },
            { name: 'B (M-Alta)', value: summary['B'], color: '#F97316' },
            { name: 'C (M-Baja)', value: summary['C'], color: '#FCD34D' },
            { name: 'D (Baja)', value: summary['D'], color: '#4ADE80' },
        ].filter(item => item.value > 0);
        return { data, total };
    }, [assets]);

    const monthlyEvolutionData = useMemo(() => {
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const now = new Date();
        const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);
        const monthsData = [];
        for (let i = 0; i < 12; i++) {
            const d = new Date(twelveMonthsAgo.getFullYear(), twelveMonthsAgo.getMonth() + i, 1);
            monthsData.push({ month: monthNames[d.getMonth()], valueOK: 0, valueALERT: 0 });
        }
        if (Array.isArray(allInspections)) {
            allInspections.forEach((insp) => {
                const inspDate = insp?.date?.toDate ? insp.date.toDate() : (insp?.date instanceof Date ? insp.date : null);
                if (!inspDate) return;
                if (inspDate >= twelveMonthsAgo) {
                    const monthIndex = (inspDate.getFullYear() - twelveMonthsAgo.getFullYear()) * 12 + (inspDate.getMonth() - twelveMonthsAgo.getMonth());
                    if (monthIndex >= 0 && monthIndex < 12) {
                        if (insp.overallStatus === 'OK') {
                            monthsData[monthIndex].valueOK += 1;
                        } else if (insp.overallStatus === 'ALERT') {
                            monthsData[monthIndex].valueALERT += 1;
                        }
                    }
                }
            });
        }
        return monthsData;
    }, [allInspections]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-blue-500">
                    <p className="text-sm font-medium text-gray-400">Activos Totales</p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-5xl font-extrabold text-white">{assetStatusSummary.total}</span>
                        <Target className="w-10 h-10 text-blue-400" />
                    </div>
                </div>
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-teal-500">
                    <p className="text-xl font-semibold text-teal-300 mb-4">Estado de Activos (Actual)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div>
                            <PieChart data={assetStatusSummary.data} />
                        </div>
                        <div className="text-sm text-gray-300 space-y-2">
                            {assetStatusSummary.data.map(item => (
                                <div key={item.name} className="flex items-center">
                                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                                    {item.name}: <strong className="ml-1">{item.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                 <div className="bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-orange-500">
                    <p className="text-xl font-semibold text-orange-300 mb-4">Distribución por Criticidad</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div>
                            <PieChart data={assetCriticalitySummary.data} />
                        </div>
                        <div className="text-sm text-gray-300 space-y-2">
                            {assetCriticalitySummary.data.map(item => (
                                <div key={item.name} className="flex items-center">
                                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                                    {item.name}: <strong className="ml-1">{item.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-indigo-500">
                    <p className="text-xl font-semibold text-indigo-300 mb-4">Evolución Mensual de Inspecciones</p>
                    <AssetEvolutionChart data={monthlyEvolutionData} />
                </div>
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-pink-500">
                    <p className="text-xl font-semibold text-pink-300 mb-4">Últimas Inspecciones Registradas</p>
                    {latestInspections.length === 0 ? (
                        <p className="text-gray-400 italic">No hay inspecciones recientes.</p>
                    ) : (
                        <div className="space-y-3">
                            {latestInspections.map(insp => (
                                <div key={insp.id} className="p-3 bg-gray-700 rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-white">{insp.assetName}</p>
                                        <p className="text-xs text-gray-400">{insp.date.toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs px-2 py-0.5 rounded ${insp.overallStatus === 'ALERT' ? 'bg-red-600' : 'bg-green-600'} text-white`}>
                                            {insp.overallStatus}
                                        </span>
                                        <button
                                            className="text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded"
                                            onClick={() => {
                                                const asset = assets.find(a => a.id === insp.assetId);
                                                if (asset) onInspectAssetHistory(asset);
                                            }}
                                        >
                                            Detalle
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const InspectionForm = ({ asset, onBack, onSave, loading }) => {
    const [results, setResults] = useState([]);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (asset?.checklist) {
            const initialResults = asset.checklist.map((item, index) => ({
                questionIndex: index,
                text: item.text,
                type: item.type,
                answer: item.type === 'boolean' ? 'No' : '',
                status: 'OK',
                notes: '',
            }));
            setResults(initialResults);
        }
    }, [asset]);

    const handleInputChange = (index, value) => {
        setResults((prev) => {
            const newResults = [...prev];
            newResults[index] = {
                ...newResults[index],
                answer: value,
                status: newResults[index].type === 'boolean' && value === 'Si' ? 'ALERT' : 'OK',
            };
            return newResults;
        });
    };

    const handleNotesChange = (index, value) => {
        setResults((prev) => {
            const newResults = [...prev];
            newResults[index] = {
                ...newResults[index],
                notes: value,
            };
            return newResults;
        });
    };

    const overallStatus = results.some(r => r.status === 'ALERT') ? 'ALERT' : 'OK';

    const handleSave = () => {
        onSave(results, notes, overallStatus);
    };

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
                    * Por favor, complete todos los puntos de inspección para guardar.
                </p>
            )}
        </div>
    );
};

const App = () => {
    const [db, setDb] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [assets, setAssets] = useState([]);
    const [latestInspections, setLatestInspections] = useState([]);
    const [allInspections, setAllInspections] = useState([]);
    const [newAssetName, setNewAssetName] = useState('');
    const [newAssetLocation, setNewAssetLocation] = useState('');
    const [newAssetDescription, setNewAssetDescription] = useState('');
    const [newAssetCriticality, setNewAssetCriticality] = useState('D');
    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeView, setActiveView] = useState('list');
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const navigateToView = useCallback((view, asset = null) => {
        setActiveView(view);
        setSelectedAsset(asset);
    }, []);

    useEffect(() => {
        setLogLevel('error');
        if (Object.keys(firebaseConfig).length === 0 || !firebaseConfig.apiKey) {
            console.error("Firebase config is missing.");
            setError("Error: Configuración de Firebase no encontrada. Revisa tu .env.local");
            setIsAuthReady(true); // Allow UI to render with error
            return;
        }
        try {
            const app = initializeApp(firebaseConfig);
            const authInstance = getAuth(app);
            const firestore = getFirestore(app);
            setDb(firestore);

            const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    try {
                        const userCredential = await signInAnonymously(authInstance);
                        setUserId(userCredential.user.uid);
                    } catch (err) {
                        console.error('Autenticación fallida (¿Auth anónima habilitada?):', err);
                        setError('No se pudo autenticar. Revisa la configuración de Firebase.');
                    }
                }
                setIsAuthReady(true);
            });
            return () => unsubscribe();
        } catch (e) {
            console.error("Error during Firebase initialization:", e);
            setError("Error al inicializar Firebase. Ver consola.");
        }
    }, []);

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

    useEffect(() => {
        if (db && userId) {
            const inspectionCollectionPath = `/artifacts/${appId}/users/${userId}/inspections`;
            const inspectionsColRef = collection(db, inspectionCollectionPath);
            const q = query(inspectionsColRef, orderBy('date', 'desc'), limit(10));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const inspectionsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().date?.toDate ? doc.data().date.toDate() : new Date(),
                }));
                setLatestInspections(inspectionsData);
            }, (e) => {
                console.error("Error fetching latest inspections:", e);
            });
            
            // Subscription for all inspections for the chart
            const allQuery = query(inspectionsColRef, orderBy('date', 'desc'));
            const unsubAll = onSnapshot(allQuery, (snapshot) => {
                const allData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().date?.toDate ? doc.data().date.toDate() : new Date(),
                }));
                setAllInspections(allData);
            });

            return () => {
                unsubscribe();
                unsubAll();
            };
        }
    }, [db, userId]);

    const filteredAssets = useMemo(() => {
        if (!searchTerm) return assets;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return assets.filter(asset => {
            const nameMatch = asset.name.toLowerCase().includes(lowerCaseSearchTerm);
            const locationMatch = (asset.location || '').toLowerCase().includes(lowerCaseSearchTerm);
            return nameMatch || locationMatch;
        });
    }, [assets, searchTerm]);

    const handleGenerateChecklist = async () => {
        if (!newAssetName || !newAssetCriticality) {
            setError("Necesitas al menos el Nombre y la Criticidad para generar una lista.");
            return;
        }
        setAiLoading(true);
        setError(null);
        const systemPrompt = `Eres un ingeniero de confiabilidad experto. Tu tarea es generar un JSON de 4 a 6 puntos de inspección visual y auditiva de rutina (diaria) para el activo proporcionado. Céntrate en fallos comunes detectables sin instrumentación avanzada. La respuesta DEBE ser únicamente un arreglo JSON válido de objetos (sin texto adicional ni bloques markdown). Cada objeto debe tener: {"text": string, "type": "boolean" | "text"}.`;
        const payload = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: `${systemPrompt}

Activo: "${newAssetName}". Criticidad: ${newAssetCriticality}. Responde SOLO con el arreglo JSON solicitado.` }
                    ]
                }
            ]
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

    const handleAnalyzeCriticality = async () => {
        if (!newAssetDescription) {
            setError("Por favor, introduce una Descripción del activo para el análisis de criticidad.");
            return;
        }
        setAiLoading(true);
        setError(null);
        const systemPrompt = `Eres un Ingeniero de Confiabilidad. Analiza la siguiente descripción de activo. Tu tarea es asignar la criticidad más adecuada (A, B, C o D) y justificar brevemente por qué. La respuesta DEBE ser únicamente un objeto JSON válido con dos campos: {"criticality": "A"|"B"|"C"|"D", "justification": string}. No incluyas texto adicional ni bloques markdown.`;
        const payload = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: `${systemPrompt}

Descripción del Activo: "${newAssetDescription}". Devuelve SOLO el objeto JSON solicitado.` }
                    ]
                }
            ]
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
                status: 'Uninspected',
                createdAt: serverTimestamp(),
                checklist: finalChecklist,
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

    const handleSaveInspection = useCallback(async (results, notes, overallStatus) => {
        if (!db || !userId || !selectedAsset) return;
        setLoading(true);
        setError(null);
        try {
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
            const assetDocRef = doc(db, `/artifacts/${appId}/users/${userId}/assets`, selectedAsset.id);
            await updateDoc(assetDocRef, {
                status: overallStatus,
                lastInspectionDate: serverTimestamp(),
            });
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

            {activeView === 'list' && (
                <>
                    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-8">
                        <h2 className="text-2xl font-semibold mb-4 flex items-center text-teal-300">
                            <Plus className="w-6 h-6 mr-2" /> Crear Nuevo Activo
                        </h2>
                        <form onSubmit={handleAddAsset} className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <input required value={newAssetName} onChange={(e) => setNewAssetName(e.target.value)} placeholder="Nombre del Activo" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600" />
                                <input value={newAssetLocation} onChange={(e) => setNewAssetLocation(e.target.value)} placeholder="Ubicación" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600" />
                                <textarea value={newAssetDescription} onChange={(e) => setNewAssetDescription(e.target.value)} placeholder="Descripción (para análisis de IA)" rows="3" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600" />
                            </div>
                            <div className="space-y-4">
                                <select value={newAssetCriticality} onChange={(e) => setNewAssetCriticality(e.target.value)} className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600">
                                    <option value="A">Criticidad A (Muy Alta)</option>
                                    <option value="B">Criticidad B (Alta)</option>
                                    <option value="C">Criticidad C (Media)</option>
                                    <option value="D">Criticidad D (Baja)</option>
                                </select>
                                <div className="flex gap-2">
                                    <button type="button" onClick={handleAnalyzeCriticality} disabled={aiLoading} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800">
                                        {aiLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Analizar Criticidad (IA)
                                    </button>
                                    <button type="button" onClick={handleGenerateChecklist} disabled={aiLoading} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800">
                                        {aiLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Generar Checklist (IA)
                                    </button>
                                </div>
                                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800">
                                    {loading ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />} Guardar Activo
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-teal-300">Lista de Activos</h2>
                            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar..." className="px-3 py-2 rounded bg-gray-700 border border-gray-600 w-64" />
                        </div>
                        {filteredAssets.length === 0 ? (
                            <p className="text-gray-400">No se encontraron activos.</p>
                        ) : (
                            <div className="space-y-4">
                                {filteredAssets.map(asset => (
                                    <div key={asset.id} className="p-4 bg-gray-700 rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-lg">{asset.name}</p>
                                            <p className="text-sm text-gray-400">{asset.location}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${getCriticalityColor(asset.criticality)}`}>
                                                Criticidad {asset.criticality}
                                            </span>
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${asset.status === 'ALERT' ? 'bg-red-500' : asset.status === 'OK' ? 'bg-green-500' : 'bg-gray-500'}`}>
                                                {asset.status || 'Uninspected'}
                                            </span>
                                            <button className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-500" onClick={() => navigateToView('assetHistory', asset)}>Historial</button>
                                            <button className="px-3 py-1 rounded bg-teal-600 hover:bg-teal-500" onClick={() => navigateToView('inspection', asset)}>Inspeccionar</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}

            {activeView === 'inspection' && selectedAsset && (
                <InspectionForm
                    asset={selectedAsset}
                    onBack={() => navigateToView('list')}
                    onSave={handleSaveInspection}
                    loading={loading}
                />
            )}

            {activeView === 'dashboard' && (
                <Dashboard
                    assets={assets}
                    latestInspections={latestInspections}
                    allInspections={allInspections}
                    onInspectAssetHistory={(asset) => navigateToView('assetHistory', asset)}
                />
            )}

            {activeView === 'assetHistory' && selectedAsset && db && userId && appId && (
                <AssetHistory
                    db={db}
                    userId={userId}
                    appId={appId}
                    asset={selectedAsset}
                    onBack={() => navigateToView('dashboard')}
                />
            )}

            <footer className="mt-8 pt-4 border-t border-gray-700 text-center text-xs text-gray-500">
                Aplicación PIA - Impulsada por React, Firestore y Gemini
            </footer>
        </div>
    );
};

export default App;