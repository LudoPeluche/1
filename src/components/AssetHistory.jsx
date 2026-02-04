import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, onSnapshot, collection, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import {
    ArrowLeft,
    Trash2,
    FileText,
    Loader,
    Clock,
    Calendar,
    Camera,
    Download,
    TrendingUp,
    AlertTriangle,
    CheckCircle2,
    History,
    MapPin,
    Tag,
    ClipboardCheck,
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';

// Custom Tooltip for Chart
const CustomChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const statusMap = { 3: 'A - Excelente', 2: 'B - Aceptable', 1: 'C - Deficiente' };
        return (
            <div className="custom-tooltip">
                <p className="text-sm font-semibold text-white mb-1">{label}</p>
                <p className="text-xs text-indigo-400">
                    Estado: <span className="font-bold">{statusMap[payload[0].value] || 'N/A'}</span>
                </p>
            </div>
        );
    }
    return null;
};

// Status Trend Chart with Recharts
const StatusTrendChart = ({ points = [] }) => {
    const data = Array.isArray(points) ? points : [];

    if (!data.length) {
        return (
            <div className="flex items-center justify-center h-48 text-gray-500">
                <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm">Sin datos de tendencia</p>
                </div>
            </div>
        );
    }

    const chartData = data.map((d) => ({
        date: d.date?.toLocaleDateString?.('es-ES', { day: '2-digit', month: 'short' }) || '',
        value: d.value,
    }));

    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <defs>
                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                />
                <YAxis
                    domain={[0, 4]}
                    ticks={[1, 2, 3]}
                    tickFormatter={(value) => ['', 'C', 'B', 'A'][value] || ''}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                />
                <Tooltip content={<CustomChartTooltip />} />
                <ReferenceLine y={3} stroke="#10b981" strokeDasharray="3 3" strokeOpacity={0.5} />
                <ReferenceLine y={2} stroke="#f59e0b" strokeDasharray="3 3" strokeOpacity={0.5} />
                <ReferenceLine y={1} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.5} />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#14b8a6"
                    strokeWidth={3}
                    dot={{ fill: '#14b8a6', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, fill: '#2dd4bf' }}
                    animationDuration={1000}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

// KPI Card Component
const KPICard = ({ title, value, icon: Icon, colorClass, tooltip }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="kpi-card accent-blue"
        title={tooltip}
    >
        <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${colorClass}`}>
                <Icon className="w-4 h-4" />
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">{title}</p>
        </div>
        <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
);

// Status Badge
const StatusBadge = ({ status }) => {
    const config = {
        A: { label: 'A', bg: 'bg-emerald-500', text: 'text-white' },
        B: { label: 'B', bg: 'bg-lime-500', text: 'text-white' },
        C: { label: 'C', bg: 'bg-red-500', text: 'text-white' },
        OK: { label: 'OK', bg: 'bg-emerald-500', text: 'text-white' },
        ALERT: { label: 'ALERT', bg: 'bg-red-500', text: 'text-white' },
    };
    const c = config[status] || { label: status, bg: 'bg-gray-500', text: 'text-white' };

    return (
        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${c.bg} ${c.text}`}>
            {c.label}
        </span>
    );
};

// Inspection Record Card
const InspectionCard = ({ inspection, isSelected, onClick }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onClick}
        className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
            isSelected
                ? 'bg-indigo-500/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                : 'bg-gray-800/30 border-transparent hover:bg-gray-800/50 hover:border-gray-700'
        }`}
    >
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-white font-medium">
                    {inspection.date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
            </div>
            <StatusBadge status={inspection.overallStatus} />
        </div>
    </motion.div>
);

// Checklist Result Item
const ChecklistItem = ({ item, index }) => {
    const isOk = item.answer === 'Si';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className={`p-4 rounded-xl border-l-4 ${
                isOk
                    ? 'bg-emerald-500/10 border-emerald-500'
                    : 'bg-red-500/10 border-red-500'
            }`}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <span className="text-gray-500 text-sm font-mono">{index + 1}.</span>
                    <p className="text-gray-200">{item.text}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-medium ${isOk ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isOk ? 'OK' : 'ALERTA'}
                    </span>
                    {isOk ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const AssetHistory = ({ db, appId, asset, onBack, onInspect }) => {
    const [historyInspections, setHistoryInspections] = useState([]);
    const [selectedInspection, setSelectedInspection] = useState(null);
    const [loadingHistory, setLoadingHistory] = useState(true);

    // PDF Download Handler (keeping original logic)
    const handleDownloadPdf = async () => {
        if (!selectedInspection) return;
        const docPdf = new jsPDF();

        const COLORS = {
            PRIMARY: [30, 41, 59],
            SECONDARY: [59, 130, 246],
            ACCENT_GREEN: [16, 185, 129],
            ACCENT_RED: [239, 68, 68],
            BG_SECTION: [51, 65, 85],
            TEXT_WHITE: [255, 255, 255],
            TEXT_DARK: [30, 41, 59],
            TEXT_GRAY: [100, 116, 139],
            ALERT_BG: [254, 226, 226],
        };

        const MARGIN = 14;
        const PAGE_WIDTH = docPdf.internal.pageSize.getWidth();
        const PAGE_HEIGHT = docPdf.internal.pageSize.getHeight();
        const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);
        let y = 0;

        const checkPageBreak = (neededHeight) => {
            if (y + neededHeight > PAGE_HEIGHT - MARGIN) {
                docPdf.addPage();
                drawHeader();
                y = 45;
            }
        };

        const drawSectionTitle = (title) => {
            checkPageBreak(15);
            docPdf.setFillColor(...COLORS.BG_SECTION);
            docPdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 8, 2, 2, 'F');
            docPdf.setTextColor(...COLORS.TEXT_WHITE);
            docPdf.setFontSize(11);
            docPdf.setFont("helvetica", "bold");
            docPdf.text(title, MARGIN + 4, y + 5.5);
            y += 14;
        };

        const drawHeader = () => {
            docPdf.setFillColor(...COLORS.PRIMARY);
            docPdf.rect(0, 0, PAGE_WIDTH, 40, 'F');
            docPdf.setTextColor(...COLORS.TEXT_WHITE);
            docPdf.setFontSize(22);
            docPdf.setFont("helvetica", "bold");
            docPdf.text("PIA", MARGIN, 20);
            docPdf.setFontSize(12);
            docPdf.setFont("helvetica", "normal");
            docPdf.text("Predictive Inspection App", MARGIN, 26);
            docPdf.setFontSize(10);
            docPdf.text("REPORTE DE INSPECCION", PAGE_WIDTH - MARGIN, 15, { align: "right" });
            docPdf.setFontSize(9);
            const dateStr = selectedInspection.date?.toLocaleDateString() || 'N/A';
            const timeStr = selectedInspection.date?.toLocaleTimeString() || '';
            docPdf.text(`Fecha: ${dateStr} ${timeStr}`, PAGE_WIDTH - MARGIN, 22, { align: "right" });
        };

        drawHeader();
        y = 50;

        docPdf.setTextColor(...COLORS.SECONDARY);
        docPdf.setFontSize(14);
        docPdf.setFont("helvetica", "bold");
        docPdf.text(asset.name || "Activo Sin Nombre", MARGIN, y);
        y += 7;

        docPdf.setFontSize(10);
        docPdf.setTextColor(...COLORS.TEXT_GRAY);
        docPdf.setFont("helvetica", "normal");
        docPdf.text(`${asset.tag || 'N/A'} | ${asset.location || 'Ubicacion Desconocida'}`, MARGIN, y);

        const critValues = { text: asset.criticality || '?', bg: COLORS.ACCENT_GREEN };
        if (asset.criticality === 'A' || asset.criticality === 'Alta') critValues.bg = COLORS.ACCENT_RED;
        else if (asset.criticality === 'B' || asset.criticality === 'Media') critValues.bg = COLORS.SECONDARY;

        const badgeWidth = 20;
        docPdf.setFillColor(...critValues.bg);
        docPdf.roundedRect(PAGE_WIDTH - MARGIN - badgeWidth, y - 4, badgeWidth, 6, 1, 1, 'F');
        docPdf.setTextColor(...COLORS.TEXT_WHITE);
        docPdf.setFontSize(8);
        docPdf.setFont("helvetica", "bold");
        docPdf.text(`Criticidad ${critValues.text}`, PAGE_WIDTH - MARGIN - (badgeWidth/2), y, { align: 'center' });
        y += 10;

        if (asset.description) {
            docPdf.setTextColor(...COLORS.TEXT_DARK);
            docPdf.setFontSize(10);
            docPdf.setFont("helvetica", "italic");
            const descLines = docPdf.splitTextToSize(asset.description, CONTENT_WIDTH);
            docPdf.text(descLines, MARGIN, y);
            y += (descLines.length * 5) + 5;
        }

        drawSectionTitle("RESULTADOS: ALERTAS Y HALLAZGOS");

        const alerts = (selectedInspection.results || []).filter(
            r => r.answer === 'No' || r.status === 'ALERT' || r.cumple === false
        );

        if (alerts.length === 0) {
            docPdf.setTextColor(...COLORS.ACCENT_GREEN);
            docPdf.setFontSize(11);
            docPdf.setFont("helvetica", "bold");
            docPdf.text("No se detectaron anomalias. El activo se encuentra en buen estado.", MARGIN, y);
            y += 10;
        } else {
            alerts.forEach(alert => {
                const alertText = alert.text || alert.detail || "Alerta reportada";
                const label = "ALERTA:";
                const contentLines = docPdf.splitTextToSize(alertText, CONTENT_WIDTH - 35);
                const textLineHeight = 6;
                const boxHeight = Math.max(16, 10 + contentLines.length * textLineHeight);

                checkPageBreak(boxHeight + 4);

                docPdf.setFillColor(...COLORS.ALERT_BG);
                docPdf.setDrawColor(...COLORS.ACCENT_RED);
                docPdf.rect(MARGIN, y, CONTENT_WIDTH, boxHeight, 'FD');

                docPdf.setTextColor(...COLORS.ACCENT_RED);
                docPdf.setFontSize(10);
                docPdf.setFont("helvetica", "bold");
                docPdf.text(label, MARGIN + 4, y + 10);

                docPdf.setTextColor(...COLORS.TEXT_DARK);
                docPdf.setFont("helvetica", "normal");
                contentLines.forEach((line, idx) => {
                    docPdf.text(line, MARGIN + 30, y + 10 + idx * textLineHeight);
                });

                y += boxHeight + 6;
            });
        }
        y += 5;

        if (selectedInspection.notes) {
            drawSectionTitle("OBSERVACIONES Y COMENTARIOS");
            docPdf.setTextColor(...COLORS.TEXT_DARK);
            docPdf.setFontSize(10);
            docPdf.setFont("helvetica", "normal");
            const noteLines = docPdf.splitTextToSize(selectedInspection.notes, CONTENT_WIDTH);
            checkPageBreak(noteLines.length * 5);
            docPdf.text(noteLines, MARGIN, y);
            y += (noteLines.length * 5) + 10;
        }

        if (selectedInspection.photoURLs && selectedInspection.photoURLs.length > 0) {
            drawSectionTitle("EVIDENCIA FOTOGRAFICA");

            const getImageData = (url) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        resolve(canvas.toDataURL('image/jpeg'));
                    };
                    img.onerror = () => resolve(null);
                    img.src = url;
                });
            };

            for (let i = 0; i < selectedInspection.photoURLs.length; i++) {
                const url = selectedInspection.photoURLs[i];
                checkPageBreak(60);

                docPdf.setFontSize(9);
                docPdf.setTextColor(...COLORS.TEXT_GRAY);
                docPdf.text(`Imagen ${i + 1}:`, MARGIN, y);
                y += 5;

                try {
                    const imgData = await getImageData(url);
                    if (imgData) {
                        const imgProps = docPdf.getImageProperties(imgData);
                        const imgRatio = imgProps.height / imgProps.width;
                        const imgWidth = 80;
                        const imgHeight = imgWidth * imgRatio;

                        docPdf.addImage(imgData, 'JPEG', MARGIN, y, imgWidth, imgHeight);
                        docPdf.link(MARGIN, y, imgWidth, imgHeight, { url: url });
                        y += imgHeight + 10;
                    } else {
                        docPdf.setTextColor(...COLORS.SECONDARY);
                        docPdf.textWithLink("Ver imagen en navegador", MARGIN, y, { url: url });
                        y += 10;
                    }
                } catch {
                    docPdf.setTextColor(...COLORS.SECONDARY);
                    docPdf.textWithLink("Ver imagen en navegador", MARGIN, y, { url: url });
                    y += 10;
                }
            }
        }

        const pageCount = docPdf.internal.getNumberOfPages();
        for(let i = 1; i <= pageCount; i++) {
            docPdf.setPage(i);
            docPdf.setFontSize(8);
            docPdf.setTextColor(...COLORS.TEXT_GRAY);
            docPdf.text(`Pagina ${i} de ${pageCount} - Generado via PIA`, PAGE_WIDTH / 2, PAGE_HEIGHT - 5, { align: 'center' });
        }

        const dateSlug = selectedInspection.date ? selectedInspection.date.toISOString().slice(0, 10) : 'sin-fecha';
        const nameSlug = `${asset.name}`.replace(/[^a-zA-Z0-9-_]/g, '_');
        docPdf.save(`REPORTE-${nameSlug}-${dateSlug}.pdf`);
    };

    const handleDeleteAsset = async () => {
        if (window.confirm(`Estas seguro de que quieres eliminar el activo "${asset.name}"? Esta accion no se puede deshacer.`)) {
            try {
                const assetDocRef = doc(db, `artifacts/${appId}/assets`, asset.id);
                await deleteDoc(assetDocRef);
                onBack();
            } catch (error) {
                console.error("Error deleting asset:", error);
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

    // Computed values
    const statusToScore = (s) => (s === 'A' ? 3 : s === 'B' ? 2 : s === 'C' ? 1 : s === 'OK' ? 3 : s === 'ALERT' ? 1 : 0);
    const sortedAsc = useMemo(() => [...historyInspections].sort((a, b) => a.date - b.date), [historyInspections]);
    const trendPoints = useMemo(() => sortedAsc.map(i => ({ date: i.date, value: statusToScore(i.overallStatus) })).slice(-12), [sortedAsc]);
    const lastInspection = historyInspections[0] || null;
    const lastCritical = useMemo(() => historyInspections.find(i => i.overallStatus === 'C' || i.overallStatus === 'ALERT') || null, [historyInspections]);
    const daysSinceLast = lastInspection?.date ? Math.max(0, Math.floor((Date.now() - lastInspection.date.getTime()) / (1000 * 60 * 60 * 24))) : null;
    const lastNotCompliant = useMemo(() => {
        if (!lastInspection?.results) return null;
        return lastInspection.results.reduce((acc, r) => acc + (r.answer === 'No' ? 1 : 0), 0);
    }, [lastInspection]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="dashboard-panel"
            >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600">
                                <History className="w-6 h-6 text-white" />
                            </div>
                            {asset.tag ? `${asset.tag} - ${asset.name}` : asset.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-400">
                            {asset.location && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {asset.location}
                                </span>
                            )}
                            {asset.criticality && (
                                <span className="flex items-center gap-1">
                                    <Tag className="w-4 h-4" />
                                    Criticidad {asset.criticality}
                                </span>
                            )}
                            {lastInspection && (
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Ultima inspeccion: {lastInspection.date.toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => { setSelectedInspection(null); onBack(); }}
                            className="btn-secondary flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver
                        </button>
                        <button
                            onClick={handleDeleteAsset}
                            className="btn-danger flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                        </button>
                        <button
                            onClick={handleDownloadPdf}
                            disabled={!selectedInspection}
                            className={`btn-primary flex items-center gap-2 ${!selectedInspection ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Download className="w-4 h-4" />
                            Descargar PDF
                        </button>
                        <button
                            onClick={() => onInspect?.(asset)}
                            className="btn-success flex items-center gap-2"
                        >
                            <ClipboardCheck className="w-4 h-4" />
                            Inspeccionar
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Trend Chart + KPIs */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-3 dashboard-panel"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-teal-500/20">
                            <TrendingUp className="w-5 h-5 text-teal-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Tendencia del Estado</h3>
                            <p className="text-xs text-gray-500">Historial de inspecciones</p>
                        </div>
                    </div>
                    <div className="chart-container">
                        <StatusTrendChart points={trendPoints} />
                    </div>
                </motion.div>

                <div className="space-y-4">
                    <KPICard
                        title="Ultima Alerta (C)"
                        value={lastCritical?.date ? lastCritical.date.toLocaleDateString() : 'N/A'}
                        icon={AlertTriangle}
                        colorClass="bg-red-500/20 text-red-400"
                        tooltip="Fecha de la ultima inspeccion critica"
                    />
                    <KPICard
                        title="Antiguedad"
                        value={daysSinceLast != null ? `${daysSinceLast} dias` : 'N/A'}
                        icon={Clock}
                        colorClass="bg-blue-500/20 text-blue-400"
                        tooltip="Dias desde la ultima inspeccion"
                    />
                    <KPICard
                        title="No Cumplidos"
                        value={lastNotCompliant ?? 'N/A'}
                        icon={lastNotCompliant > 0 ? AlertTriangle : CheckCircle2}
                        colorClass={lastNotCompliant > 0 ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}
                        tooltip="Items no cumplidos en la ultima inspeccion"
                    />
                </div>
            </div>

            {/* Records List + Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Records List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="dashboard-panel"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-indigo-500/20">
                            <FileText className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Registros</h3>
                            <p className="text-xs text-gray-500">{historyInspections.length} inspecciones</p>
                        </div>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                        {loadingHistory ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader className="w-8 h-8 animate-spin text-indigo-400" />
                            </div>
                        ) : historyInspections.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                                <p>No hay inspecciones registradas</p>
                            </div>
                        ) : (
                            historyInspections.map((insp) => (
                                <InspectionCard
                                    key={insp.id}
                                    inspection={insp}
                                    isSelected={selectedInspection?.id === insp.id}
                                    onClick={() => setSelectedInspection(insp)}
                                />
                            ))
                        )}
                    </div>
                </motion.div>

                {/* Inspection Detail */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 dashboard-panel"
                >
                    <AnimatePresence mode="wait">
                        {selectedInspection ? (
                            <motion.div
                                key={selectedInspection.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                                    <h3 className="text-xl font-bold text-white">
                                        Registro del {selectedInspection.date.toLocaleDateString()}
                                    </h3>
                                    <StatusBadge status={selectedInspection.overallStatus} />
                                </div>

                                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                                    {/* Checklist Results */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                            Resultados del Checklist
                                        </h4>
                                        <div className="space-y-2">
                                            {selectedInspection.results?.map((r, idx) => (
                                                <ChecklistItem key={idx} item={r} index={idx} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    {selectedInspection.notes && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                                Notas Generales
                                            </h4>
                                            <p className="text-gray-300 bg-gray-800/50 p-4 rounded-xl whitespace-pre-wrap">
                                                {selectedInspection.notes}
                                            </p>
                                        </div>
                                    )}

                                    {/* Photos */}
                                    {selectedInspection.photoURLs?.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <Camera className="w-4 h-4" />
                                                Evidencia Fotografica
                                            </h4>
                                            <div className="flex flex-wrap gap-3">
                                                {selectedInspection.photoURLs.map((url) => (
                                                    <a
                                                        key={url}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block w-24 h-24 rounded-xl overflow-hidden ring-2 ring-offset-2 ring-offset-gray-900 ring-indigo-500 hover:ring-indigo-400 transition-all"
                                                    >
                                                        <img
                                                            src={url}
                                                            alt="Evidencia"
                                                            className="w-full h-full object-cover hover:scale-110 transition-transform"
                                                        />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                                <Clock className="w-16 h-16 mb-4 text-gray-600" />
                                <p className="text-lg">Selecciona un registro</p>
                                <p className="text-sm text-gray-600">para ver los detalles de la inspeccion</p>
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AssetHistory;
