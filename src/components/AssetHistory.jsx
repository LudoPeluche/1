import React, { useState, useEffect, useMemo } from 'react';
import { doc, onSnapshot, collection, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import { ArrowLeft, Trash2, FileText, Loader, Clock, Calendar, Camera, Download } from 'lucide-react';

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


const AssetHistory = ({ db, appId, asset, onBack, onInspect }) => {
    const [historyInspections, setHistoryInspections] = useState([]);
    const [selectedInspection, setSelectedInspection] = useState(null);
    const [loadingHistory, setLoadingHistory] = useState(true);

    const handleDownloadPdf = () => {
        if (!selectedInspection) return;
        const docPdf = new jsPDF();
        const margin = 14;
        const pageHeight = docPdf.internal.pageSize.getHeight();
        let y = 20;

        const addLine = (text) => {
            const lines = docPdf.splitTextToSize(text, 180);
            lines.forEach((line) => {
                if (y > pageHeight - 12) {
                    docPdf.addPage();
                    y = 20;
                }
                docPdf.text(line, margin, y);
                y += 6;
            });
        };

        const formatDate = (date) => {
            if (!date) return 'N/A';
            try {
                return date.toLocaleString();
            } catch {
                return 'N/A';
            }
        };

        docPdf.setFontSize(16);
        addLine(`Inspeccion de ${asset.name}`);
        docPdf.setFontSize(11);
        addLine(`Fecha: ${formatDate(selectedInspection.date)}`);
        addLine(`Activo: ${asset.tag ? `${asset.tag} - ${asset.name}` : asset.name}`);
        addLine(`Ubicacion: ${asset.location || 'N/D'}`);
        addLine(`Criticidad: ${asset.criticality || 'N/A'}`);
        addLine(`Estado general: ${selectedInspection.overallStatus || 'N/A'}`);
        y += 4;

        docPdf.setFontSize(12);
        addLine('Resultados del checklist:');
        docPdf.setFontSize(10);
        (selectedInspection.results || []).forEach((r, idx) => {
            const label = r.answer === 'Si' || r.status === 'OK' || r.cumple ? 'OK' : 'ALERT';
            addLine(`${idx + 1}. [${label}] ${r.text}`);
        });

        if (selectedInspection.notes) {
            y += 4;
            docPdf.setFontSize(12);
            addLine('Notas:');
            docPdf.setFontSize(10);
            addLine(selectedInspection.notes);
        }

        if (selectedInspection.photoURLs && selectedInspection.photoURLs.length > 0) {
            y += 4;
            docPdf.setFontSize(12);
            addLine('Evidencia (URLs):');
            docPdf.setFontSize(10);
            selectedInspection.photoURLs.forEach((url, idx) => addLine(`${idx + 1}. ${url}`));
        }

        const dateSlug = selectedInspection.date ? selectedInspection.date.toISOString().slice(0, 10) : 'sin-fecha';
        const nameSlug = `${asset.name}`.replace(/[^a-zA-Z0-9-_]/g, '_');
        docPdf.save(`inspeccion-${nameSlug}-${dateSlug}.pdf`);
    };

    const handleDeleteAsset = async () => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar el activo "${asset.name}"? Esta acción no se puede deshacer.`)) {
            try {
                const assetDocRef = doc(db, `artifacts/${appId}/assets`, asset.id);
                await deleteDoc(assetDocRef);
                onBack();
            } catch (error) {
                console.error("Error deleting asset:", error);
                // Optionally, show an error message to the user
            }
        }
    };

    useEffect(() => {
        if (!db || !appId || !asset?.id) return;
        setLoadingHistory(true);
        const inspectionCollectionPath = `artifacts/${appId}/inspections`;
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
    }, [db, appId, asset]);

    // Tendencia y KPIs
    const statusToScore = (s) => (s === 'A' ? 3 : s === 'B' ? 2 : s === 'C' ? 1 : s === 'OK' ? 3 : s === 'ALERT' ? 1 : 0);
    const sortedAsc = useMemo(() => [...historyInspections].sort((a,b)=>a.date-b.date), [historyInspections]);
    const trendPoints = useMemo(() => sortedAsc.map(i => ({ date: i.date, value: statusToScore(i.overallStatus) })).slice(-12), [sortedAsc]);
    const lastInspection = historyInspections[0] || null;
    const lastCritical = useMemo(() => historyInspections.find(i => i.overallStatus === 'C' || i.overallStatus === 'ALERT') || null, [historyInspections]);
    const daysSinceLast = lastInspection?.date ? Math.max(0, Math.floor((Date.now() - lastInspection.date.getTime())/(1000*60*60*24))) : null;
    const lastNotCompliant = useMemo(() => {
      if (!lastInspection?.results) return null;
      if (!lastInspection?.results) return null;
      // Corregido: Contar solo cuando la respuesta es 'No'
      return lastInspection.results.reduce((acc, r) => acc + (r.answer === 'No' ? 1 : 0), 0);
    }, [lastInspection]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 bg-gray-800 p-6 rounded-xl shadow-2xl border-b border-gray-700">
                <div>
                    <h2 className="text-3xl font-bold text-teal-400">{asset.tag ? `${asset.tag} - ${asset.name}` : asset.name}</h2>
                    <p className="text-sm text-gray-300 mt-1">
                        Ubicación: {asset.location || 'N/D'} <span className="font-bold">{asset.criticality}</span>
                        {asset.description ? ` | ${asset.description}` : ''}
                        {` | Última inspección: ${lastInspection?.date ? lastInspection.date.toLocaleDateString() : 'N/A'}`}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-start">
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
                        onClick={handleDownloadPdf}
                        disabled={!selectedInspection}
                        className={`px-4 py-2 rounded-lg text-white transition duration-150 flex items-center ${selectedInspection ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-gray-600 cursor-not-allowed'}`}
                    >
                        <Download className="w-4 h-4 mr-2" /> Descargar PDF
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
                 <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl h-[32rem]">
                  {selectedInspection ? (
                    <>
                      <div className="mb-4 flex justify-between items-center border-b border-gray-700 pb-2">
                        <h3 className="text-2xl font-bold text-white">Registro del {selectedInspection.date.toLocaleDateString()}</h3>
                      </div>
                      <div className="space-y-4 h-[90%] overflow-y-auto pr-2">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-200 mb-2">Resultados del Checklist</h4>
                            <div className="space-y-3">
                                {selectedInspection.results.map((r,idx)=> {
                                  const isOk = r.answer === 'Si';
                                  const status = isOk ? 'OK' : 'ALERT';
                                  return (
                                    <div key={idx} className={`p-3 rounded-lg ${!isOk ? 'bg-red-900/50 border-l-4 border-red-500' : 'bg-gray-700 border-l-4 border-green-500'}`}>
                                        <p className="text-base font-medium text-gray-50">{idx+1}. {r.text}</p>
                                        <div className="flex justify-between text-sm mt-1">
                                            <span className="text-gray-300">Respuesta: <strong>{r.answer}</strong></span>
                                            <span className={`text-xs ${isOk ? 'text-green-300' : 'text-red-300'}`}>{status}</span>
                                        </div>
                                    </div>
                                  );
                                })}
                            </div>
                        </div>

                        {selectedInspection.notes && (
                            <div>
                                <h4 className="text-lg font-semibold text-gray-200 mb-2">Notas Generales</h4>
                                <p className="text-gray-300 bg-gray-700/50 p-3 rounded-lg whitespace-pre-wrap">{selectedInspection.notes}</p>
                            </div>
                        )}

                        {selectedInspection.photoURLs && selectedInspection.photoURLs.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold text-gray-200 mb-2 flex items-center"><Camera className="w-5 h-5 mr-2" /> Evidencia Fotográfica</h4>
                                <div className="flex flex-wrap gap-4">
                                    {selectedInspection.photoURLs.map(url => (
                                        <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="block w-24 h-24 rounded-lg overflow-hidden ring-2 ring-offset-2 ring-offset-gray-800 ring-blue-500">
                                            <img src={url} alt="Evidencia de inspección" className="w-full h-full object-cover hover:opacity-80 transition-opacity" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
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

export default AssetHistory;
