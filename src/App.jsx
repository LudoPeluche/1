import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, query, serverTimestamp, doc, updateDoc, orderBy, limit, where, setLogLevel, deleteDoc } from 'firebase/firestore';
import { Plus, CheckCircle, List, BarChart2, Loader, AlertTriangle, ArrowLeft, Clock, Target, BarChart, Calendar, FileText, Search, Trash2 } from 'lucide-react';

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

// (IA removida) ConfiguraciÃ³n de Gemini eliminada

const defaultChecklist = [
    { text: "Verificar nivel de aceite (visual)", type: "boolean" },
    { text: "Detectar vibraciÃ³n anormal (tacto/oÃ­do)", type: "boolean" },
    { text: "Temperatura superficial (tacto/termÃ³metro)", type: "text" },
    { text: "Presencia de fugas o derrames", type: "boolean" },
];

// Lista IV/IS por defecto para nuevas inspecciones
const DEFAULT_IV_IS_CHECKLIST = [
  { category: 'IV', text: 'Conexiones a tierra intactas y sin peladías' },
  { category: 'IV', text: 'Protecciones de acoplamiento intactas y con pernos completos' },
  { category: 'IV', text: 'Tapas de Inspección bien sujetas y con pernos completos' },
  { category: 'IV', text: 'Sin fugas de vapor en el sellado' },
  { category: 'IV', text: 'Sin fugas de vapor en tuberÃ­as' },
  { category: 'IV', text: 'Sin fugas en tuberÃ­as de transporte' },
  { category: 'IV', text: 'Sin suciedad excesiva ni inusual en el equipo o Ã¡rea' },
  { category: 'IV', text: 'Sin problemas en cimientos ni en el montaje' },
  { category: 'IV', text: 'Sin cables pelados' },
  { category: 'IV', text: 'Caja de control e interruptores bien instalados y sin componentes rotos' },
  { category: 'IV', text: 'Sin fugas de aceite' },
  { category: 'IV', text: 'Sin goteo de grasa por el sello' },
  { category: 'IV', text: 'Entrada de aire del motor limpia y operativamente limpia' },
  { category: 'IV', text: 'Sin correas flojas' },
  { category: 'IV', text: 'Sin correas peladas' },
  { category: 'IV', text: 'Boquillas de engrase (Zerk) presentes y en buen estado' },
  { category: 'IV', text: 'No hay filtros obstruidos' },
  { category: 'IV', text: 'Sin fugas de agua sobre el equipo' },
  { category: 'IV', text: 'Ãrea alrededor del equipo libre de residuos y sin riesgo' },
  { category: 'IV', text: 'Sin ruidos inusuales' },
  { category: 'IV', text: 'Sin temperaturas inusuales' },
  { category: 'IV', text: 'Sin vibraciones inusuales' },
  { category: 'IV', text: 'Mirilla de lubricante limpia, legible y en estado normal' },
  { category: 'IV', text: 'Otros (especificar)' },
  { category: 'IS', text: 'Sin riesgo por altura o golpes en la cabeza' },
  { category: 'IS', text: 'Barandillas firmes y en su lugar' },
  { category: 'IS', text: 'Barandillas instaladas donde corresponde' },
  { category: 'IS', text: 'IluminaciÃ³n y visibilidad adecuadas' },
  { category: 'IS', text: 'Superficies sin riesgo potencial de resbalamiento' },
  { category: 'IS', text: 'Sin riesgo de descarga elÃ©ctrica' },
  { category: 'IS', text: 'Sin gases ni olores inusuales' },
  { category: 'IS', text: 'Sin residuos en suspensiÃ³n' },
  { category: 'IS', text: 'Sin riesgo para la vista' },
  { category: 'IS', text: 'Sin riesgo de caÃ­das' },
  { category: 'IS', text: 'Componentes de giro correctamente protegidos' },
  { category: 'IS', text: 'Sin sobreexposiciÃ³n al calor' },
  { category: 'IS', text: 'Sin riesgo de desenganche' },
  { category: 'IS', text: 'Visibilidad adecuada en el Ã¡rea' },
  { category: 'IS', text: 'Sin riesgo de llamas abiertas' },
  { category: 'IS', text: 'Sin exposiciÃ³n a chispas o radiaciÃ³n ultravioleta' },
  { category: 'IS', text: 'Equipos bien cuidados y almacenados adecuadamente' },
  { category: 'IS', text: 'Rutas de entrada y salida mÃºltiples y despejadas' },
  { category: 'IS', text: 'Escaleras y puntos de apoyo estables' },
  { category: 'IS', text: 'Sin riesgo por desplazamiento de material' },
  { category: 'IS', text: 'Materiales cÃ¡usticos correctamente contenidos y con EPP disponible' },
  { category: 'IS', text: 'Etiquetado correcto y visible' },
  { category: 'IS', text: 'Ejes y poleas protegidos y seÃ±alizados' },
  { category: 'IS', text: 'Puntos de sujeciÃ³n adecuados' },
  { category: 'IS', text: 'EPP disponible y en uso cuando corresponde' },
  { category: 'IS', text: 'Sin fuga tÃ©rmica' },
  { category: 'IS', text: 'Superficies escalonadas visibles y seÃ±alizadas' },
  { category: 'IS', text: 'Superficies de trÃ¡nsito regulares y sin orificios' },
  { category: 'IS', text: 'Sin superficies con temperaturas peligrosas sin protecciÃ³n' },
  { category: 'IS', text: 'Superficies no resbaladías o con tratamiento antideslizante' },
  { category: 'IS', text: 'Sin agua o aceite estancado' },
  { category: 'IS', text: 'Sin riesgo de chorro de aire' },
  { category: 'IS', text: 'Sin riesgo de succiÃ³n cerca de ventiladores u otros equipos' },
  { category: 'IS', text: 'Sin bordes afilados expuestos' },
  { category: 'IS', text: 'Sin ruido elevado o dentro de lÃ­mites controlados' },
  { category: 'IS', text: 'Sin descargas repentinas o violentas de aire' },
  { category: 'IS', text: 'Sin riesgo de explosiones o descargas repentinas' },
  { category: 'IS', text: 'Advertencia y ajuste correcto de prendas o equipos' },
  { category: 'IS', text: 'Otros (especificar)' },
];

// Stub para evitar referencias si quedaran llamadas residuales
const fetchGemini = async () => {
  throw new Error('Funciones de IA deshabilitadas');
};

// (IA removida) Llamadas a Gemini eliminadas

const getCriticalityColor = (crit) => {
    switch (crit) {
      case 'A': return 'bg-red-500 text-white';
      case 'B': return 'bg-orange-500 text-white';
      case 'C': return 'bg-yellow-500 text-gray-800';
      case 'D': return 'bg-green-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
};

// PequeÃ±o grÃ¡fico de lÃ­nea para tendencia A/B/C (o OK/ALERT como fallback)
const StatusTrendChart = ({ points = [] }) => {
  const data = Array.isArray(points) ? points : [];
  if (!data.length) return <p className="text-gray-400 italic">Sin datos</p>;
  const w = 600, h = 180, left = 40, right = 10, top = 10, bottom = 30;
  const innerW = w - left - right, innerH = h - top - bottom;
  const maxScore = 3, minScore = 1;
  const xStep = data.length > 1 ? innerW / (data.length - 1) : 0;
  const yFromVal = (v) => top + (maxScore - v) * (innerH / (maxScore - minScore));
  const poly = data.map((d, i) => `${left + i * xStep},${yFromVal(d.value)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <rect x={left} y={top} width={innerW} height={innerH/3} fill="#10B981" opacity="0.15" />
      <rect x={left} y={top + innerH/3} width={innerW} height={innerH/3} fill="#FBBF24" opacity="0.15" />
      <rect x={left} y={top + 2*innerH/3} width={innerW} height={innerH/3} fill="#F97316" opacity="0.15" />
      <polyline points={poly} fill="none" stroke="#38BDF8" strokeWidth="2" />
      {data.map((d,i)=> (
        <g key={i}>
          <circle cx={left + i * xStep} cy={yFromVal(d.value)} r="3.5" fill="#10B981" stroke="#111827" strokeWidth="1" />
          <text x={left + i * xStep} y={top+innerH+18} textAnchor="middle" fontSize="9" fill="#9CA3AF">{d.date?.toLocaleDateString?.() || ''}</text>
        </g>
      ))}
    </svg>
  );
};

const AssetHistory = ({ db, userId, appId, asset, onBack, onInspect }) => {
    const [historyInspections, setHistoryInspections] = useState([]);
    const [selectedInspection, setSelectedInspection] = useState(null);
    const [loadingHistory, setLoadingHistory] = useState(true);

    const handleDeleteAsset = async () => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar el activo "${asset.name}"? Esta acción no se puede deshacer.`)) {
            try {
                const assetDocRef = doc(db, `/artifacts/${appId}/users/${userId}/assets`, asset.id);
                await deleteDoc(assetDocRef);
                onBack();
            } catch (error) {
                console.error("Error deleting asset:", error);
                // Optionally, show an error message to the user
            }
        }
    };

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

    // Tendencia y KPIs
    const statusToScore = (s) => (s === 'A' ? 3 : s === 'B' ? 2 : s === 'C' ? 1 : s === 'OK' ? 3 : s === 'ALERT' ? 1 : 0);
    const sortedAsc = useMemo(() => [...historyInspections].sort((a,b)=>a.date-b.date), [historyInspections]);
    const trendPoints = useMemo(() => sortedAsc.map(i => ({ date: i.date, value: statusToScore(i.overallStatus) })).slice(-12), [sortedAsc]);
    const lastInspection = historyInspections[0] || null;
    const lastCritical = useMemo(() => historyInspections.find(i => i.overallStatus === 'C' || i.overallStatus === 'ALERT') || null, [historyInspections]);
    const daysSinceLast = lastInspection?.date ? Math.max(0, Math.floor((Date.now() - lastInspection.date.getTime())/(1000*60*60*24))) : null;
    const lastNotCompliant = useMemo(() => {
      if (!lastInspection?.results) return null;
      return lastInspection.results.reduce((acc, r) => acc + ((r.status === 'ALERT' || r.answer === 'Si') ? 1 : 0), 0);
    }, [lastInspection]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start bg-gray-800 p-6 rounded-xl shadow-2xl border-b border-gray-700">
                <div>
                    <h2 className="text-3xl font-bold text-teal-400">{asset.tag ? `${asset.tag} - ${asset.name}` : asset.name}</h2>
                    <p className="text-sm text-gray-300 mt-1">
                        Ubicación: {asset.location || 'N/D'} <span className="font-bold">{asset.criticality}</span>
                        {asset.description ? ` | ${asset.description}` : ''}
                        {` | Última inspección: ${lastInspection?.date ? lastInspection.date.toLocaleDateString() : 'N/A'}`}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setSelectedInspection(null); onBack();
                        }}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition duration-150 flex items-center"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Dashboard
                    </button>
                    <button
                        onClick={handleDeleteAsset}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition duration-150 flex items-center"
                    >
                        <Trash2 className="w-4 h-4 mr-2" /> Eliminar Activo
                    </button>
                    <button
                        onClick={() => onInspect ? onInspect(asset) : null}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-white transition duration-150 flex items-center"
                    >
                        <FileText className="w-4 h-4 mr-2" /> Inspeccionar
                    </button>
                </div>
            </div>
            {/* Tendencia + KPIs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gray-800 p-4 rounded-xl shadow-lg">
                    <h4 className="text-lg font-semibold text-blue-300 mb-3">Tendencia Historia del Estado del Activo</h4>
                    <StatusTrendChart points={trendPoints} />
                </div>
                <div className="lg:col-span-1 grid grid-cols-1 gap-4">
                    <div className="bg-gray-800 p-4 rounded-xl">
                        <p
                            className="text-sm text-gray-400"
                            title="Fecha de la inspección más reciente en la que el activo quedó en estado crítico (C) o ALERT."
                        >
                            Última alerta registrada (C)
                        </p>
                        <p className="text-2xl font-bold mt-1">{lastCritical?.date ? lastCritical.date.toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-xl">
                        <p className="text-sm text-gray-400">Antigüedad</p>
                        <p className="text-2xl font-bold mt-1">{daysSinceLast ?? 'N/A'}{daysSinceLast!=null?' días':''}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-xl">
                        <p className="text-sm text-gray-400">No cumplidos (última)</p>
                        <p className={`text-2xl font-bold mt-1 ${lastNotCompliant>0?'text-red-400':'text-green-400'}`}>{lastNotCompliant ?? 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Lista + detalle */}
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

    // (GrÃ¡fico removido) Resumen de criticidad eliminado

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-indigo-500">
                    <p className="text-xl font-semibold text-indigo-300 mb-4">Evolucion Mensual de Inspecciones</p>
                    <AssetEvolutionChart data={monthlyEvolutionData} />
                </div>
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-pink-500">
                    <p className="text-xl font-semibold text-pink-300 mb-4">Ultimas Inspecciones Registradas</p>
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
    const [overall, setOverall] = useState('B');
    const [ivOpen, setIvOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (asset?.checklist) {
            const initialResults = asset.checklist.map((item, index) => ({
                index,
                category: item.category || 'IV',
                text: item.text,
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

const App = () => {
    const [db, setDb] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [assets, setAssets] = useState([]);
    const [latestInspections, setLatestInspections] = useState([]);
    const [allInspections, setAllInspections] = useState([]);
    const [newAssetName, setNewAssetName] = useState('');
    const [newAssetLocation, setNewAssetLocation] = useState('');
    const [newAssetTag, setNewAssetTag] = useState('');
    const [newAssetDescription, setNewAssetDescription] = useState('');
    const [newAssetCriticality, setNewAssetCriticality] = useState('D');
    const [loading, setLoading] = useState(false);
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
            setError("Error: ConfiguraciÃ³n de Firebase no encontrada. Revisa tu .env.local");
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
                        console.error('AutenticaciÃ³n fallida (Â¿Auth anÃ³nima habilitada?):', err);
                        setError('No se pudo autenticar. Revisa la configuraciÃ³n de Firebase.');
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
        const systemPrompt = `Eres un ingeniero de confiabilidad experto. Tu tarea es generar un JSON de 4 a 6 puntos de Inspección visual y auditiva de rutina (diaria) para el activo proporcionado. CÃ©ntrate en fallos comunes detectables sin instrumentaciÃ³n avanzada. La respuesta DEBE ser Ãºnicamente un arreglo JSON vÃ¡lido de objetos (sin texto adicional ni bloques markdown). Cada objeto debe tener: {"text": string, "type": "boolean" | "text"}.`;
        const payload = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: `${systemPrompt}

Activo: "${newAssetName}". Criticidad: {asset.criticality}\n                                            . Responde SOLO con el arreglo JSON solicitado.` }
                    ]
                }
            ]
        };
        try {
            const jsonText = await fetchGemini(payload);
            const suggestedChecklist = JSON.parse(jsonText);
            sessionStorage.setItem('suggestedChecklist', JSON.stringify(suggestedChecklist));
            setError("âœ¨ Checklist sugerido por IA listo. Â¡Presiona 'Guardar Activo' para almacenarlo!");
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
            setError("Por favor, introduce una DescripciÃ³n del activo para el anÃ¡lisis de criticidad.");
            return;
        }
        setAiLoading(true);
        setError(null);
        const systemPrompt = `Eres un Ingeniero de Confiabilidad. Analiza la siguiente descripciÃ³n de activo. Tu tarea es asignar la criticidad mÃ¡s adecuada (A, B, C o D) y justificar brevemente por quÃ©. La respuesta DEBE ser Ãºnicamente un objeto JSON vÃ¡lido con dos campos: {"criticality": "A"|"B"|"C"|"D", "justification": string}. No incluyas texto adicional ni bloques markdown.`;
        const payload = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: `${systemPrompt}

DescripciÃ³n del Activo: "${newAssetDescription}". Devuelve SOLO el objeto JSON solicitado.` }
                    ]
                }
            ]
        };
        try {
            const jsonText = await fetchGemini(payload);
            const analysis = JSON.parse(jsonText);
            setNewAssetCriticality(analysis.criticality);
            setError(`âœ¨ Criticidad: {asset.criticality}\n                                            . JustificaciÃ³n: ${analysis.justification}`);
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
            const finalChecklist = DEFAULT_IV_IS_CHECKLIST;
            await addDoc(collection(db, assetCollectionPath), {
                name: newAssetName,
                location: newAssetLocation,
                tag: newAssetTag,
                description: newAssetDescription,
                criticality: newAssetCriticality,
                status: 'Uninspected',
                createdAt: serverTimestamp(),
                checklist: finalChecklist,
            });
            setNewAssetName('');
            setNewAssetLocation('');
            setNewAssetTag('');
            setNewAssetDescription('');
            setNewAssetCriticality('D');
        } catch (e) {
            console.error("Error adding document: ", e);
            setError("Error al guardar el activo: " + e.message);
        } finally {
            setLoading(false);
        }
    }, [db, userId, newAssetName, newAssetLocation, newAssetTag, newAssetDescription, newAssetCriticality]);

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
            setError("âœ… Inspección guardada y estado del activo actualizado.");
        } catch (e) {
            console.error("Error saving inspection:", e);
            setError("Error al guardar la Inspección: " + e.message);
            setLoading(false);
        }
    }, [db, userId, selectedAsset]);

    if (!isAuthReady) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <Loader className="w-8 h-8 animate-spin mr-2" /> Cargando aplicaciÃ³n...
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
                                <textarea value={newAssetDescription} onChange={(e) => setNewAssetDescription(e.target.value)} placeholder="Descripcion del Activo" rows="3" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600" />
                                <input value={newAssetTag} onChange={(e) => setNewAssetTag(e.target.value)} placeholder="Tag del Activo" className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600" />
                            </div>
                            <div className="space-y-4">
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
                                            <p className="font-bold text-lg">{asset.tag ? `${asset.tag} - ${asset.name}` : asset.name}</p>
                                            <p className="text-sm text-gray-400">Ubicacion: "{asset.location}" Criticidad: "{asset.criticality}"</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${asset.status === 'ALERT' ? 'bg-red-500' : asset.status === 'OK' ? 'bg-green-500' : 'bg-gray-500'}`}>
                                                {asset.status || 'Uninspected'}
                                            </span>
                                            <button className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-500" onClick={() => navigateToView('assetHistory', asset)}>Detalle del Activo</button>
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
                    onInspect={(asset) => navigateToView('inspection', asset)}
                />
            )}

            <footer className="mt-8 pt-4 border-t border-gray-700 text-center text-xs text-gray-500">
                AplicaciÃ³n PIA - Impulsada por React y Firestore
            </footer>
        </div>
    );
};

export default App;









