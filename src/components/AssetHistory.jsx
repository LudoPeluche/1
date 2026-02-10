import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, onSnapshot, collection, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
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

    // PDF Download Handler - Professional Design v3
    const handleDownloadPdf = async () => {
        if (!selectedInspection) return;
        const docPdf = new jsPDF();

        const C = {
            PRIMARY: [15, 23, 42],
            PRIMARY_LIGHT: [30, 41, 59],
            ACCENT: [37, 99, 235],
            ACCENT_LIGHT: [219, 234, 254],
            GREEN: [5, 150, 105],
            GREEN_LIGHT: [209, 250, 229],
            GREEN_BG: [240, 253, 244],
            RED: [220, 38, 38],
            RED_LIGHT: [254, 226, 226],
            AMBER: [217, 119, 6],
            AMBER_LIGHT: [254, 243, 199],
            SECTION_BG: [248, 250, 252],
            BORDER: [226, 232, 240],
            TEXT_PRIMARY: [15, 23, 42],
            TEXT_SECONDARY: [71, 85, 105],
            TEXT_MUTED: [148, 163, 184],
            WHITE: [255, 255, 255],
            DIVIDER: [203, 213, 225],
            TABLE_HEADER: [241, 245, 249],
            TABLE_STRIPE: [249, 250, 251],
        };

        const M = 16; // margin
        const PW = docPdf.internal.pageSize.getWidth();
        const PH = docPdf.internal.pageSize.getHeight();
        const CW = PW - (M * 2);
        let y = 0;

        // --- Data prep ---
        const allResults = selectedInspection.results || [];
        const alerts = allResults.filter(r => r.answer === 'No' || r.status === 'ALERT' || r.cumple === false);
        const okItems = allResults.filter(
            r => (r.answer === 'Si' || r.answer === 'Yes' || r.status === 'OK' || r.cumple === true) &&
                 !(r.answer === 'No' || r.status === 'ALERT' || r.cumple === false)
        );
        const totalChecked = allResults.length;
        const alertCount = alerts.length;
        const okCount = okItems.length;

        const dateStr = selectedInspection.date?.toLocaleDateString('es-MX', {
            year: 'numeric', month: 'long', day: 'numeric'
        }) || 'N/A';
        const timeStr = selectedInspection.date?.toLocaleTimeString('es-MX', {
            hour: '2-digit', minute: '2-digit'
        }) || '';
        const inspId = selectedInspection.id ? selectedInspection.id.slice(0, 8).toUpperCase() : 'N/A';

        // Verdict logic
        let verdict, verdictColor, verdictBg;
        if (alertCount === 0) {
            verdict = 'APROBADO';
            verdictColor = C.GREEN;
            verdictBg = C.GREEN_LIGHT;
        } else if (alertCount <= 3) {
            verdict = 'CON OBSERVACIONES';
            verdictColor = C.AMBER;
            verdictBg = C.AMBER_LIGHT;
        } else {
            verdict = 'NO APROBADO';
            verdictColor = C.RED;
            verdictBg = C.RED_LIGHT;
        }

        // Trend data (reuse component logic)
        const statusToScorePdf = (s) => (s === 'A' ? 3 : s === 'B' ? 2 : s === 'C' ? 1 : s === 'OK' ? 3 : s === 'ALERT' ? 1 : 0);
        const sortedHistory = [...historyInspections].sort((a, b) => a.date - b.date);
        const trendData = sortedHistory.map(i => ({
            date: i.date,
            value: statusToScorePdf(i.overallStatus)
        })).slice(-12);

        // QR Code generation
        let qrDataUrl = null;
        try {
            const appUrl = window.location.origin + `/asset/${asset.id}`;
            qrDataUrl = await QRCode.toDataURL(appUrl, {
                width: 200, margin: 1, color: { dark: '#0f172a', light: '#ffffff' }
            });
        } catch { /* QR generation failed, skip */ }

        // Logo loading
        const loadLogo = () => new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                canvas.getContext('2d').drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => resolve(null);
            img.src = '/logo.svg';
        });
        const logoData = await loadLogo();

        // Image loader helper
        const getImageData = (url) => new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                canvas.getContext('2d').drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/jpeg'));
            };
            img.onerror = () => resolve(null);
            img.src = url;
        });

        // --- Helpers ---
        const checkPageBreak = (neededHeight) => {
            if (y + neededHeight > PH - 18) {
                docPdf.addPage();
                drawPageHeader();
                y = 26;
            }
        };

        const drawPageHeader = () => {
            docPdf.setFillColor(...C.PRIMARY);
            docPdf.rect(0, 0, PW, 16, 'F');
            docPdf.setFillColor(...C.ACCENT);
            docPdf.rect(0, 16, PW, 0.8, 'F');
            docPdf.setTextColor(...C.WHITE);
            docPdf.setFontSize(8);
            docPdf.setFont("helvetica", "bold");
            docPdf.text("PIA", M, 10);
            docPdf.setFont("helvetica", "normal");
            docPdf.setFontSize(7);
            docPdf.text(`Reporte de Inspeccion  |  ${asset.name || ''}  |  REF: ${inspId}`, M + 12, 10);
            docPdf.text(`Pagina ${docPdf.internal.getNumberOfPages()}`, PW - M, 10, { align: 'right' });
        };

        const drawSectionTitle = (title) => {
            checkPageBreak(14);
            docPdf.setFillColor(...C.SECTION_BG);
            docPdf.roundedRect(M, y, CW, 9, 1.5, 1.5, 'F');
            docPdf.setFillColor(...C.ACCENT);
            docPdf.rect(M, y, 2.5, 9, 'F');
            docPdf.setTextColor(...C.PRIMARY);
            docPdf.setFontSize(9);
            docPdf.setFont("helvetica", "bold");
            docPdf.text(title, M + 7, y + 6.2);
            y += 13;
        };

        // ============================================================
        // PAGE 1 - COVER PAGE
        // ============================================================
        // Full dark background
        docPdf.setFillColor(...C.PRIMARY);
        docPdf.rect(0, 0, PW, PH, 'F');

        // Accent stripe at top
        docPdf.setFillColor(...C.ACCENT);
        docPdf.rect(0, 0, PW, 3, 'F');

        // Logo
        if (logoData) {
            try {
                docPdf.addImage(logoData, 'PNG', M, 20, 22, 22);
            } catch { /* logo render failed */ }
        }

        // PIA Title
        const logoOffset = logoData ? 48 : M;
        docPdf.setTextColor(...C.WHITE);
        docPdf.setFontSize(36);
        docPdf.setFont("helvetica", "bold");
        docPdf.text("PIA", logoOffset, 34);
        docPdf.setFontSize(11);
        docPdf.setFont("helvetica", "normal");
        docPdf.setTextColor(...C.TEXT_MUTED);
        docPdf.text("Predictive Inspection App", logoOffset, 42);

        // Horizontal separator
        docPdf.setDrawColor(...C.ACCENT);
        docPdf.setLineWidth(0.8);
        docPdf.line(M, 55, PW - M, 55);

        // "REPORTE DE INSPECCION" centered
        docPdf.setTextColor(...C.WHITE);
        docPdf.setFontSize(20);
        docPdf.setFont("helvetica", "bold");
        docPdf.text("REPORTE DE INSPECCION", PW / 2, 75, { align: 'center' });
        docPdf.setFontSize(10);
        docPdf.setFont("helvetica", "normal");
        docPdf.setTextColor(...C.TEXT_MUTED);
        docPdf.text("Inspeccion Predictiva de Mantenimiento", PW / 2, 83, { align: 'center' });

        // Asset name - large
        docPdf.setTextColor(...C.WHITE);
        docPdf.setFontSize(28);
        docPdf.setFont("helvetica", "bold");
        const assetNameLines = docPdf.splitTextToSize(asset.name || "Activo", CW);
        docPdf.text(assetNameLines, PW / 2, 110, { align: 'center' });
        const nameLinesHeight = assetNameLines.length * 12;

        // Tag and location
        let coverY = 110 + nameLinesHeight + 4;
        docPdf.setFontSize(11);
        docPdf.setFont("helvetica", "normal");
        docPdf.setTextColor(...C.TEXT_MUTED);
        const tagLocParts = [];
        if (asset.tag) tagLocParts.push(asset.tag);
        if (asset.location) tagLocParts.push(asset.location);
        if (tagLocParts.length) {
            docPdf.text(tagLocParts.join('  |  '), PW / 2, coverY, { align: 'center' });
            coverY += 8;
        }

        // Verdict banner
        coverY += 10;
        const verdictBannerW = 80;
        const verdictBannerX = (PW - verdictBannerW) / 2;
        docPdf.setFillColor(...verdictBg);
        docPdf.roundedRect(verdictBannerX, coverY, verdictBannerW, 16, 3, 3, 'F');
        docPdf.setTextColor(...verdictColor);
        docPdf.setFontSize(14);
        docPdf.setFont("helvetica", "bold");
        docPdf.text(verdict, PW / 2, coverY + 11, { align: 'center' });
        coverY += 30;

        // Info grid on cover
        const infoBoxY = coverY + 5;
        const infoColW = CW / 2;

        // Left column
        docPdf.setFontSize(8);
        docPdf.setTextColor(...C.TEXT_MUTED);
        docPdf.setFont("helvetica", "normal");
        docPdf.text("FECHA DE INSPECCION", M, infoBoxY);
        docPdf.setFontSize(11);
        docPdf.setTextColor(...C.WHITE);
        docPdf.setFont("helvetica", "bold");
        docPdf.text(dateStr, M, infoBoxY + 7);
        if (timeStr) {
            docPdf.setFontSize(9);
            docPdf.setFont("helvetica", "normal");
            docPdf.setTextColor(...C.TEXT_MUTED);
            docPdf.text(timeStr + " hrs", M, infoBoxY + 13);
        }

        // Right column
        docPdf.setFontSize(8);
        docPdf.setTextColor(...C.TEXT_MUTED);
        docPdf.setFont("helvetica", "normal");
        docPdf.text("CRITICIDAD DEL ACTIVO", M + infoColW, infoBoxY);
        docPdf.setFontSize(11);
        docPdf.setFont("helvetica", "bold");
        const critMap = {
            'A': { label: 'A - CRITICA', color: C.RED },
            'Alta': { label: 'A - CRITICA', color: C.RED },
            'B': { label: 'B - IMPORTANTE', color: C.AMBER },
            'Media': { label: 'B - IMPORTANTE', color: C.AMBER },
            'C': { label: 'C - MODERADA', color: C.ACCENT },
            'D': { label: 'D - BAJA', color: C.GREEN },
        };
        const critInfo = critMap[asset.criticality] || { label: asset.criticality || 'N/A', color: C.TEXT_MUTED };
        docPdf.setTextColor(...critInfo.color);
        docPdf.text(critInfo.label, M + infoColW, infoBoxY + 7);

        // Second row
        const infoRow2Y = infoBoxY + 24;
        docPdf.setFontSize(8);
        docPdf.setTextColor(...C.TEXT_MUTED);
        docPdf.setFont("helvetica", "normal");
        docPdf.text("REFERENCIA", M, infoRow2Y);
        docPdf.setFontSize(11);
        docPdf.setTextColor(...C.WHITE);
        docPdf.setFont("helvetica", "bold");
        docPdf.text(`REF-${inspId}`, M, infoRow2Y + 7);

        docPdf.setFontSize(8);
        docPdf.setTextColor(...C.TEXT_MUTED);
        docPdf.setFont("helvetica", "normal");
        docPdf.text("RESULTADO", M + infoColW, infoRow2Y);
        docPdf.setFontSize(11);
        docPdf.setFont("helvetica", "bold");
        docPdf.setTextColor(...C.WHITE);
        docPdf.text(`${okCount} OK  /  ${alertCount} Alertas  /  ${totalChecked} Total`, M + infoColW, infoRow2Y + 7);

        // QR Code on cover
        if (qrDataUrl) {
            const qrSize = 28;
            const qrX = PW - M - qrSize;
            const qrY = PH - 55;
            try {
                docPdf.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
                docPdf.setFontSize(6);
                docPdf.setTextColor(...C.TEXT_MUTED);
                docPdf.text("Escanear para ver", qrX + qrSize / 2, qrY + qrSize + 4, { align: 'center' });
                docPdf.text("reporte digital", qrX + qrSize / 2, qrY + qrSize + 8, { align: 'center' });
            } catch { /* QR render failed */ }
        }

        // Cover footer
        docPdf.setDrawColor(55, 65, 81);
        docPdf.setLineWidth(0.3);
        docPdf.line(M, PH - 15, PW - M, PH - 15);
        docPdf.setFontSize(7);
        docPdf.setTextColor(...C.TEXT_MUTED);
        docPdf.text("Documento generado automaticamente por PIA - Predictive Inspection App", M, PH - 8);
        docPdf.text("Documento confidencial", PW - M, PH - 8, { align: 'right' });

        // ============================================================
        // PAGE 2+ - DETAILED CONTENT
        // ============================================================
        docPdf.addPage();
        drawPageHeader();
        y = 26;

        // --- Summary Stats Bar ---
        docPdf.setFillColor(...C.WHITE);
        docPdf.setDrawColor(...C.BORDER);
        docPdf.setLineWidth(0.4);
        docPdf.roundedRect(M, y, CW, 22, 2, 2, 'FD');

        const statW = CW / 4;
        const statCY = y + 8;

        // Stat 1: Total
        docPdf.setFontSize(14);
        docPdf.setFont("helvetica", "bold");
        docPdf.setTextColor(...C.ACCENT);
        docPdf.text(`${totalChecked}`, M + statW * 0.5, statCY, { align: 'center' });
        docPdf.setFontSize(6.5);
        docPdf.setFont("helvetica", "normal");
        docPdf.setTextColor(...C.TEXT_MUTED);
        docPdf.text("EVALUADOS", M + statW * 0.5, statCY + 7, { align: 'center' });

        docPdf.setDrawColor(...C.DIVIDER);
        docPdf.setLineWidth(0.3);
        docPdf.line(M + statW, y + 4, M + statW, y + 18);

        // Stat 2: OK
        docPdf.setFontSize(14);
        docPdf.setFont("helvetica", "bold");
        docPdf.setTextColor(...C.GREEN);
        docPdf.text(`${okCount}`, M + statW * 1.5, statCY, { align: 'center' });
        docPdf.setFontSize(6.5);
        docPdf.setFont("helvetica", "normal");
        docPdf.setTextColor(...C.TEXT_MUTED);
        docPdf.text("CONFORME", M + statW * 1.5, statCY + 7, { align: 'center' });

        docPdf.line(M + statW * 2, y + 4, M + statW * 2, y + 18);

        // Stat 3: Alerts
        docPdf.setFontSize(14);
        docPdf.setFont("helvetica", "bold");
        docPdf.setTextColor(...(alertCount > 0 ? C.RED : C.GREEN));
        docPdf.text(`${alertCount}`, M + statW * 2.5, statCY, { align: 'center' });
        docPdf.setFontSize(6.5);
        docPdf.setFont("helvetica", "normal");
        docPdf.setTextColor(...C.TEXT_MUTED);
        docPdf.text("ALERTAS", M + statW * 2.5, statCY + 7, { align: 'center' });

        docPdf.line(M + statW * 3, y + 4, M + statW * 3, y + 18);

        // Stat 4: Verdict
        docPdf.setFontSize(9);
        docPdf.setFont("helvetica", "bold");
        docPdf.setTextColor(...verdictColor);
        docPdf.text(verdict, M + statW * 3.5, statCY + 1, { align: 'center' });
        docPdf.setFontSize(6.5);
        docPdf.setFont("helvetica", "normal");
        docPdf.setTextColor(...C.TEXT_MUTED);
        docPdf.text("VEREDICTO", M + statW * 3.5, statCY + 7, { align: 'center' });

        y += 28;

        // --- Full Checklist Table ---
        drawSectionTitle("CHECKLIST COMPLETO DE INSPECCION");

        // Table header
        const col1W = 10;     // #
        const col2W = 16;     // Category
        const col3W = CW - col1W - col2W - 22; // Description
        const col4W = 22;     // Status
        const rowH = 7;

        docPdf.setFillColor(...C.TABLE_HEADER);
        docPdf.roundedRect(M, y, CW, rowH, 1, 1, 'F');
        docPdf.setFontSize(7);
        docPdf.setFont("helvetica", "bold");
        docPdf.setTextColor(...C.TEXT_SECONDARY);
        docPdf.text("#", M + 3, y + 5);
        docPdf.text("TIPO", M + col1W + 2, y + 5);
        docPdf.text("DESCRIPCION", M + col1W + col2W + 2, y + 5);
        docPdf.text("ESTADO", M + CW - col4W + 2, y + 5);
        y += rowH;

        // Table rows
        allResults.forEach((item, idx) => {
            checkPageBreak(rowH + 1);
            const isAlert = item.answer === 'No' || item.status === 'ALERT' || item.cumple === false;

            // Alternate row background
            if (idx % 2 === 0) {
                docPdf.setFillColor(...C.TABLE_STRIPE);
                docPdf.rect(M, y, CW, rowH, 'F');
            }

            // Left color indicator
            if (isAlert) {
                docPdf.setFillColor(...C.RED);
            } else {
                docPdf.setFillColor(...C.GREEN);
            }
            docPdf.rect(M, y, 1.5, rowH, 'F');

            docPdf.setFontSize(7);
            docPdf.setFont("helvetica", "normal");
            docPdf.setTextColor(...C.TEXT_MUTED);
            docPdf.text(`${idx + 1}`, M + 3, y + 5);

            // Category badge
            const cat = item.category || 'IV';
            docPdf.setFontSize(6);
            docPdf.setFont("helvetica", "bold");
            if (cat === 'IS') {
                docPdf.setFillColor(219, 234, 254);
                docPdf.roundedRect(M + col1W, y + 1.5, 12, 4, 1, 1, 'F');
                docPdf.setTextColor(...C.ACCENT);
            } else {
                docPdf.setFillColor(243, 232, 255);
                docPdf.roundedRect(M + col1W, y + 1.5, 12, 4, 1, 1, 'F');
                docPdf.setTextColor(124, 58, 237);
            }
            docPdf.text(cat, M + col1W + 6, y + 4.5, { align: 'center' });

            // Description text
            docPdf.setFontSize(7);
            docPdf.setFont("helvetica", "normal");
            docPdf.setTextColor(...C.TEXT_PRIMARY);
            const itemText = item.text || item.detail || 'Item';
            const truncated = itemText.length > 80 ? itemText.substring(0, 77) + '...' : itemText;
            docPdf.text(truncated, M + col1W + col2W + 2, y + 5);

            // Status badge
            if (isAlert) {
                docPdf.setFillColor(...C.RED_LIGHT);
                docPdf.roundedRect(M + CW - col4W, y + 1, 20, 5, 1.5, 1.5, 'F');
                docPdf.setTextColor(...C.RED);
                docPdf.setFontSize(6.5);
                docPdf.setFont("helvetica", "bold");
                docPdf.text("ALERTA", M + CW - col4W + 10, y + 4.8, { align: 'center' });
            } else {
                docPdf.setFillColor(...C.GREEN_LIGHT);
                docPdf.roundedRect(M + CW - col4W, y + 1, 20, 5, 1.5, 1.5, 'F');
                docPdf.setTextColor(...C.GREEN);
                docPdf.setFontSize(6.5);
                docPdf.setFont("helvetica", "bold");
                docPdf.text("OK", M + CW - col4W + 10, y + 4.8, { align: 'center' });
            }

            y += rowH;
        });

        // Table bottom border
        docPdf.setDrawColor(...C.BORDER);
        docPdf.setLineWidth(0.3);
        docPdf.line(M, y, M + CW, y);
        y += 8;

        // --- Observations ---
        if (selectedInspection.notes) {
            drawSectionTitle("OBSERVACIONES Y COMENTARIOS");
            checkPageBreak(16);
            const noteLines = docPdf.splitTextToSize(selectedInspection.notes, CW - 16);
            const noteBoxH = Math.max(14, 8 + noteLines.length * 4.5);
            docPdf.setFillColor(...C.SECTION_BG);
            docPdf.roundedRect(M, y, CW, noteBoxH, 1.5, 1.5, 'F');
            docPdf.setDrawColor(...C.BORDER);
            docPdf.setLineWidth(0.3);
            docPdf.roundedRect(M, y, CW, noteBoxH, 1.5, 1.5, 'S');
            docPdf.setTextColor(...C.TEXT_PRIMARY);
            docPdf.setFontSize(9);
            docPdf.setFont("helvetica", "normal");
            docPdf.text(noteLines, M + 8, y + 6);
            y += noteBoxH + 8;
        }

        // --- Mini Trend Chart ---
        if (trendData.length >= 2) {
            drawSectionTitle("TENDENCIA DE ESTADO DEL ACTIVO");
            checkPageBreak(50);

            const chartX = M + 10;
            const chartW = CW - 20;
            const chartH = 35;
            const chartBottom = y + chartH;

            // Chart background
            docPdf.setFillColor(...C.WHITE);
            docPdf.setDrawColor(...C.BORDER);
            docPdf.setLineWidth(0.3);
            docPdf.roundedRect(M, y - 2, CW, chartH + 10, 2, 2, 'FD');

            // Y-axis labels and reference lines
            const levels = [
                { label: 'A', val: 3, color: C.GREEN },
                { label: 'B', val: 2, color: C.AMBER },
                { label: 'C', val: 1, color: C.RED },
            ];

            levels.forEach(lv => {
                const ly = chartBottom - (lv.val / 3) * chartH;
                docPdf.setDrawColor(...C.DIVIDER);
                docPdf.setLineWidth(0.15);
                docPdf.line(chartX, ly, chartX + chartW, ly);
                docPdf.setFontSize(7);
                docPdf.setFont("helvetica", "bold");
                docPdf.setTextColor(...lv.color);
                docPdf.text(lv.label, chartX - 5, ly + 2, { align: 'center' });
            });

            // Plot line
            const points = trendData.map((d, i) => ({
                x: chartX + (i / (trendData.length - 1)) * chartW,
                y: chartBottom - (d.value / 3) * chartH
            }));

            docPdf.setDrawColor(...C.ACCENT);
            docPdf.setLineWidth(0.8);
            for (let i = 1; i < points.length; i++) {
                docPdf.line(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
            }

            // Plot dots
            points.forEach((p, i) => {
                const val = trendData[i].value;
                const dotColor = val >= 3 ? C.GREEN : val >= 2 ? C.AMBER : C.RED;
                docPdf.setFillColor(...dotColor);
                docPdf.roundedRect(p.x - 1.5, p.y - 1.5, 3, 3, 1.5, 1.5, 'F');
            });

            // X-axis labels
            docPdf.setFontSize(5.5);
            docPdf.setFont("helvetica", "normal");
            docPdf.setTextColor(...C.TEXT_MUTED);
            trendData.forEach((d, i) => {
                const px = chartX + (i / (trendData.length - 1)) * chartW;
                const label = d.date?.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) || '';
                docPdf.text(label, px, chartBottom + 5, { align: 'center' });
            });

            y = chartBottom + 12;
        }

        // --- Photos (2x2 grid) ---
        if (selectedInspection.photoURLs && selectedInspection.photoURLs.length > 0) {
            drawSectionTitle("EVIDENCIA FOTOGRAFICA");

            const photoW = (CW - 6) / 2; // 2 columns with gap
            const photos = selectedInspection.photoURLs;
            let col = 0;
            let rowStartY = y;

            for (let i = 0; i < photos.length; i++) {
                const url = photos[i];

                if (col === 0) {
                    checkPageBreak(65);
                    rowStartY = y;
                }

                const xPos = M + col * (photoW + 6);

                try {
                    const imgData = await getImageData(url);
                    if (imgData) {
                        const imgProps = docPdf.getImageProperties(imgData);
                        const imgRatio = imgProps.height / imgProps.width;
                        const dispW = photoW - 4;
                        const dispH = Math.min(dispW * imgRatio, 55);

                        // Image frame
                        docPdf.setDrawColor(...C.BORDER);
                        docPdf.setLineWidth(0.3);
                        docPdf.roundedRect(xPos, rowStartY, photoW, dispH + 10, 2, 2, 'S');

                        docPdf.addImage(imgData, 'JPEG', xPos + 2, rowStartY + 2, dispW, dispH);
                        docPdf.link(xPos + 2, rowStartY + 2, dispW, dispH, { url });

                        // Caption
                        docPdf.setFontSize(6.5);
                        docPdf.setTextColor(...C.TEXT_MUTED);
                        docPdf.setFont("helvetica", "normal");
                        docPdf.text(`Foto ${i + 1} de ${photos.length}`, xPos + 2, rowStartY + dispH + 7);

                        if (col === 1) {
                            y = rowStartY + dispH + 14;
                            col = 0;
                        } else {
                            col = 1;
                        }
                    } else {
                        docPdf.setTextColor(...C.ACCENT);
                        docPdf.setFontSize(8);
                        docPdf.textWithLink(`Ver foto ${i + 1}`, xPos, rowStartY + 4, { url });
                        if (col === 1) { y = rowStartY + 10; col = 0; } else { col = 1; }
                    }
                } catch {
                    docPdf.setTextColor(...C.ACCENT);
                    docPdf.setFontSize(8);
                    docPdf.textWithLink(`Ver foto ${i + 1}`, xPos, rowStartY + 4, { url });
                    if (col === 1) { y = rowStartY + 10; col = 0; } else { col = 1; }
                }
            }
            if (col === 1) y = rowStartY + 65;
            y += 6;
        }

        // --- Signature Area ---
        checkPageBreak(45);
        drawSectionTitle("FIRMAS DE CONFORMIDAD");

        const sigW = (CW - 20) / 2;
        const sigY = y;

        // Inspector signature
        docPdf.setDrawColor(...C.BORDER);
        docPdf.setLineWidth(0.3);
        docPdf.line(M, sigY + 20, M + sigW, sigY + 20);
        docPdf.setFontSize(8);
        docPdf.setFont("helvetica", "bold");
        docPdf.setTextColor(...C.TEXT_PRIMARY);
        docPdf.text("Inspector / Tecnico", M, sigY + 26);
        docPdf.setFontSize(7);
        docPdf.setFont("helvetica", "normal");
        docPdf.setTextColor(...C.TEXT_MUTED);
        docPdf.text("Nombre y firma", M, sigY + 31);
        docPdf.text(`ID: ${selectedInspection.inspectorUserId?.slice(0, 8) || 'N/A'}`, M, sigY + 36);

        // Supervisor signature
        const sig2X = M + sigW + 20;
        docPdf.setDrawColor(...C.BORDER);
        docPdf.line(sig2X, sigY + 20, sig2X + sigW, sigY + 20);
        docPdf.setFontSize(8);
        docPdf.setFont("helvetica", "bold");
        docPdf.setTextColor(...C.TEXT_PRIMARY);
        docPdf.text("Supervisor / Responsable", sig2X, sigY + 26);
        docPdf.setFontSize(7);
        docPdf.setFont("helvetica", "normal");
        docPdf.setTextColor(...C.TEXT_MUTED);
        docPdf.text("Nombre y firma", sig2X, sigY + 31);

        y = sigY + 42;

        // --- Footer on all pages ---
        const pageCount = docPdf.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            docPdf.setPage(i);
            if (i === 1) continue; // Cover has its own footer
            docPdf.setDrawColor(...C.DIVIDER);
            docPdf.setLineWidth(0.3);
            docPdf.line(M, PH - 12, PW - M, PH - 12);
            docPdf.setFontSize(7);
            docPdf.setTextColor(...C.TEXT_MUTED);
            docPdf.setFont("helvetica", "normal");
            docPdf.text("PIA - Predictive Inspection App", M, PH - 7);
            docPdf.text(`REF-${inspId}  |  ${dateStr}`, PW / 2, PH - 7, { align: 'center' });
            docPdf.text(`Pagina ${i} de ${pageCount}`, PW - M, PH - 7, { align: 'right' });
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
