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

    // PDF Download Handler - Professional Design
    const handleDownloadPdf = async () => {
        if (!selectedInspection) return;
        const docPdf = new jsPDF();

        const COLORS = {
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
        };

        const MARGIN = 16;
        const PAGE_WIDTH = docPdf.internal.pageSize.getWidth();
        const PAGE_HEIGHT = docPdf.internal.pageSize.getHeight();
        const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);
        let y = 0;

        const checkPageBreak = (neededHeight) => {
            if (y + neededHeight > PAGE_HEIGHT - 20) {
                docPdf.addPage();
                drawPageHeader();
                y = 28;
            }
        };

        // Thin header for continuation pages
        const drawPageHeader = () => {
            docPdf.setFillColor(...COLORS.PRIMARY);
            docPdf.rect(0, 0, PAGE_WIDTH, 18, 'F');
            docPdf.setFillColor(...COLORS.ACCENT);
            docPdf.rect(0, 18, PAGE_WIDTH, 1, 'F');
            docPdf.setTextColor(...COLORS.WHITE);
            docPdf.setFontSize(9);
            docPdf.setFont("helvetica", "bold");
            docPdf.text("PIA", MARGIN, 12);
            docPdf.setFont("helvetica", "normal");
            docPdf.setFontSize(8);
            docPdf.text("Reporte de Inspeccion", MARGIN + 14, 12);
            docPdf.text(asset.name || "", PAGE_WIDTH - MARGIN, 12, { align: "right" });
        };

        // Full header for page 1
        const drawMainHeader = () => {
            // Dark background
            docPdf.setFillColor(...COLORS.PRIMARY);
            docPdf.rect(0, 0, PAGE_WIDTH, 44, 'F');
            // Accent stripe
            docPdf.setFillColor(...COLORS.ACCENT);
            docPdf.rect(0, 44, PAGE_WIDTH, 1.5, 'F');

            // PIA logo text
            docPdf.setTextColor(...COLORS.WHITE);
            docPdf.setFontSize(26);
            docPdf.setFont("helvetica", "bold");
            docPdf.text("PIA", MARGIN, 18);

            // Subtitle
            docPdf.setFontSize(9);
            docPdf.setFont("helvetica", "normal");
            docPdf.setTextColor(148, 163, 184);
            docPdf.text("Predictive Inspection App", MARGIN, 25);

            // Right side - report type
            docPdf.setTextColor(...COLORS.WHITE);
            docPdf.setFontSize(11);
            docPdf.setFont("helvetica", "bold");
            docPdf.text("REPORTE DE INSPECCION", PAGE_WIDTH - MARGIN, 16, { align: "right" });

            // Date and time
            docPdf.setFontSize(9);
            docPdf.setFont("helvetica", "normal");
            docPdf.setTextColor(148, 163, 184);
            const dateStr = selectedInspection.date?.toLocaleDateString('es-MX', {
                year: 'numeric', month: 'long', day: 'numeric'
            }) || 'N/A';
            const timeStr = selectedInspection.date?.toLocaleTimeString('es-MX', {
                hour: '2-digit', minute: '2-digit'
            }) || '';
            docPdf.text(dateStr, PAGE_WIDTH - MARGIN, 24, { align: "right" });
            if (timeStr) {
                docPdf.text(timeStr + " hrs", PAGE_WIDTH - MARGIN, 30, { align: "right" });
            }

            // ID reference line
            const inspId = selectedInspection.id ? selectedInspection.id.slice(0, 8).toUpperCase() : '';
            if (inspId) {
                docPdf.setFontSize(7);
                docPdf.setTextColor(100, 116, 139);
                docPdf.text(`REF: ${inspId}`, PAGE_WIDTH - MARGIN, 38, { align: "right" });
            }
        };

        const drawSectionTitle = (title, icon) => {
            checkPageBreak(16);
            // Light background bar with left accent
            docPdf.setFillColor(...COLORS.SECTION_BG);
            docPdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 9, 1.5, 1.5, 'F');
            docPdf.setFillColor(...COLORS.ACCENT);
            docPdf.rect(MARGIN, y, 2.5, 9, 'F');

            docPdf.setTextColor(...COLORS.PRIMARY);
            docPdf.setFontSize(9);
            docPdf.setFont("helvetica", "bold");
            const displayTitle = icon ? `${icon}  ${title}` : title;
            docPdf.text(displayTitle, MARGIN + 7, y + 6.2);
            y += 14;
        };

        const drawDivider = () => {
            docPdf.setDrawColor(...COLORS.DIVIDER);
            docPdf.setLineWidth(0.3);
            docPdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
            y += 6;
        };

        // ======= PAGE 1 =======
        drawMainHeader();
        y = 52;

        // --- Asset Info Card ---
        const cardY = y;
        docPdf.setFillColor(...COLORS.WHITE);
        docPdf.setDrawColor(...COLORS.BORDER);
        docPdf.setLineWidth(0.4);
        const descLines = asset.description ? docPdf.splitTextToSize(asset.description, CONTENT_WIDTH - 16) : [];
        const cardHeight = 30 + (descLines.length > 0 ? descLines.length * 4.5 + 6 : 0);
        docPdf.roundedRect(MARGIN, cardY, CONTENT_WIDTH, cardHeight, 2, 2, 'FD');
        // Left accent bar on card
        docPdf.setFillColor(...COLORS.ACCENT);
        docPdf.rect(MARGIN, cardY, 3, cardHeight, 'F');

        y = cardY + 8;
        docPdf.setTextColor(...COLORS.TEXT_PRIMARY);
        docPdf.setFontSize(15);
        docPdf.setFont("helvetica", "bold");
        docPdf.text(asset.name || "Activo Sin Nombre", MARGIN + 10, y);

        // Criticality badge
        const critMap = {
            'A': { label: 'CRITICA', bg: COLORS.RED, bgLight: COLORS.RED_LIGHT },
            'Alta': { label: 'CRITICA', bg: COLORS.RED, bgLight: COLORS.RED_LIGHT },
            'B': { label: 'IMPORTANTE', bg: COLORS.AMBER, bgLight: COLORS.AMBER_LIGHT },
            'Media': { label: 'IMPORTANTE', bg: COLORS.AMBER, bgLight: COLORS.AMBER_LIGHT },
            'C': { label: 'MODERADA', bg: COLORS.ACCENT, bgLight: COLORS.ACCENT_LIGHT },
            'D': { label: 'BAJA', bg: COLORS.GREEN, bgLight: COLORS.GREEN_LIGHT },
        };
        const crit = critMap[asset.criticality] || { label: asset.criticality || '?', bg: COLORS.TEXT_MUTED, bgLight: COLORS.SECTION_BG };
        const badgeLabel = `${crit.label}`;
        docPdf.setFontSize(7);
        const badgeW = docPdf.getTextWidth(badgeLabel) + 8;
        const badgeX = PAGE_WIDTH - MARGIN - badgeW - 6;
        docPdf.setFillColor(...crit.bgLight);
        docPdf.roundedRect(badgeX, y - 4.5, badgeW, 6.5, 1.5, 1.5, 'F');
        docPdf.setTextColor(...crit.bg);
        docPdf.setFont("helvetica", "bold");
        docPdf.text(badgeLabel, badgeX + badgeW / 2, y - 0.5, { align: 'center' });

        y += 6;
        docPdf.setFontSize(9);
        docPdf.setTextColor(...COLORS.TEXT_SECONDARY);
        docPdf.setFont("helvetica", "normal");
        const tagLoc = [];
        if (asset.tag) tagLoc.push(asset.tag);
        if (asset.location) tagLoc.push(asset.location);
        docPdf.text(tagLoc.join('  |  ') || 'Sin informacion de ubicacion', MARGIN + 10, y);

        if (descLines.length > 0) {
            y += 8;
            docPdf.setTextColor(...COLORS.TEXT_SECONDARY);
            docPdf.setFontSize(9);
            docPdf.setFont("helvetica", "italic");
            docPdf.text(descLines, MARGIN + 10, y);
            y += descLines.length * 4.5;
        }

        y = cardY + cardHeight + 10;

        // --- Summary Stats Bar ---
        const allResults = selectedInspection.results || [];
        const alerts = allResults.filter(
            r => r.answer === 'No' || r.status === 'ALERT' || r.cumple === false
        );
        const okItems = allResults.filter(
            r => (r.answer === 'Si' || r.answer === 'Yes' || r.status === 'OK' || r.cumple === true) &&
                 !(r.answer === 'No' || r.status === 'ALERT' || r.cumple === false)
        );
        const totalChecked = allResults.length;
        const alertCount = alerts.length;
        const okCount = okItems.length;

        checkPageBreak(22);
        // Stats container
        docPdf.setFillColor(...COLORS.SECTION_BG);
        docPdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 18, 2, 2, 'F');

        const statWidth = CONTENT_WIDTH / 3;
        const statY = y + 7;

        // Stat 1: Total items
        docPdf.setFontSize(13);
        docPdf.setFont("helvetica", "bold");
        docPdf.setTextColor(...COLORS.ACCENT);
        docPdf.text(`${totalChecked}`, MARGIN + statWidth * 0.5, statY, { align: 'center' });
        docPdf.setFontSize(7);
        docPdf.setFont("helvetica", "normal");
        docPdf.setTextColor(...COLORS.TEXT_MUTED);
        docPdf.text("ITEMS EVALUADOS", MARGIN + statWidth * 0.5, statY + 6, { align: 'center' });

        // Vertical divider
        docPdf.setDrawColor(...COLORS.DIVIDER);
        docPdf.setLineWidth(0.3);
        docPdf.line(MARGIN + statWidth, y + 3, MARGIN + statWidth, y + 15);

        // Stat 2: OK items
        docPdf.setFontSize(13);
        docPdf.setFont("helvetica", "bold");
        docPdf.setTextColor(...COLORS.GREEN);
        docPdf.text(`${okCount}`, MARGIN + statWidth * 1.5, statY, { align: 'center' });
        docPdf.setFontSize(7);
        docPdf.setFont("helvetica", "normal");
        docPdf.setTextColor(...COLORS.TEXT_MUTED);
        docPdf.text("CONFORME", MARGIN + statWidth * 1.5, statY + 6, { align: 'center' });

        // Vertical divider
        docPdf.line(MARGIN + statWidth * 2, y + 3, MARGIN + statWidth * 2, y + 15);

        // Stat 3: Alerts
        docPdf.setFontSize(13);
        docPdf.setFont("helvetica", "bold");
        docPdf.setTextColor(...(alertCount > 0 ? COLORS.RED : COLORS.GREEN));
        docPdf.text(`${alertCount}`, MARGIN + statWidth * 2.5, statY, { align: 'center' });
        docPdf.setFontSize(7);
        docPdf.setFont("helvetica", "normal");
        docPdf.setTextColor(...COLORS.TEXT_MUTED);
        docPdf.text("ALERTAS", MARGIN + statWidth * 2.5, statY + 6, { align: 'center' });

        y += 26;

        // --- Alerts Section ---
        if (alerts.length > 0) {
            drawSectionTitle("ALERTAS Y HALLAZGOS");

            alerts.forEach(alert => {
                const alertText = alert.text || alert.detail || "Alerta reportada";
                const contentLines = docPdf.splitTextToSize(alertText, CONTENT_WIDTH - 18);
                const textLineHeight = 5;
                const boxHeight = Math.max(12, 6 + contentLines.length * textLineHeight);

                checkPageBreak(boxHeight + 5);

                // Alert card with left red border
                docPdf.setFillColor(...COLORS.RED_LIGHT);
                docPdf.roundedRect(MARGIN, y, CONTENT_WIDTH, boxHeight, 1.5, 1.5, 'F');
                docPdf.setFillColor(...COLORS.RED);
                docPdf.rect(MARGIN, y, 2.5, boxHeight, 'F');

                // Alert icon indicator
                docPdf.setFontSize(7);
                docPdf.setFont("helvetica", "bold");
                docPdf.setTextColor(...COLORS.RED);
                docPdf.text("!", MARGIN + 8, y + boxHeight / 2 + 1, { align: 'center' });

                // Alert text
                docPdf.setTextColor(...COLORS.TEXT_PRIMARY);
                docPdf.setFontSize(9);
                docPdf.setFont("helvetica", "normal");
                contentLines.forEach((line, idx) => {
                    docPdf.text(line, MARGIN + 13, y + 5 + idx * textLineHeight);
                });

                y += boxHeight + 4;
            });
            y += 4;
        }

        // --- OK Items Section ---
        if (okItems.length > 0) {
            drawSectionTitle("ITEMS CONFORMES");

            // Compact 2-column layout for OK items
            const colWidth = (CONTENT_WIDTH - 6) / 2;
            let col = 0;
            let rowY = y;

            okItems.forEach((item, idx) => {
                const itemText = item.text || item.detail || "Item conforme";
                const truncText = itemText.length > 55 ? itemText.substring(0, 52) + '...' : itemText;

                if (col === 0) {
                    checkPageBreak(8);
                    rowY = y;
                }

                const xOffset = MARGIN + col * (colWidth + 6);

                // Small green dot
                docPdf.setFillColor(...COLORS.GREEN);
                docPdf.roundedRect(xOffset + 2, rowY + 1.3, 2.4, 2.4, 1.2, 1.2, 'F');

                // Item text
                docPdf.setTextColor(...COLORS.TEXT_SECONDARY);
                docPdf.setFontSize(8);
                docPdf.setFont("helvetica", "normal");
                docPdf.text(truncText, xOffset + 7, rowY + 3.5);

                if (col === 1) {
                    y = rowY + 7;
                    col = 0;
                } else {
                    col = 1;
                }
            });
            if (col === 1) y = rowY + 7;
            y += 6;
        }

        // --- No alerts message ---
        if (alerts.length === 0 && totalChecked > 0) {
            checkPageBreak(18);
            docPdf.setFillColor(...COLORS.GREEN_BG);
            docPdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 14, 2, 2, 'F');
            docPdf.setFillColor(...COLORS.GREEN);
            docPdf.rect(MARGIN, y, 2.5, 14, 'F');
            docPdf.setTextColor(...COLORS.GREEN);
            docPdf.setFontSize(10);
            docPdf.setFont("helvetica", "bold");
            docPdf.text("Sin anomalias detectadas", MARGIN + 10, y + 6);
            docPdf.setFontSize(8);
            docPdf.setFont("helvetica", "normal");
            docPdf.setTextColor(...COLORS.TEXT_SECONDARY);
            docPdf.text("Todos los items evaluados se encuentran dentro de los parametros aceptables.", MARGIN + 10, y + 11);
            y += 20;
        }

        // --- Observations ---
        if (selectedInspection.notes) {
            drawSectionTitle("OBSERVACIONES Y COMENTARIOS");
            checkPageBreak(16);

            // Styled note box
            const noteLines = docPdf.splitTextToSize(selectedInspection.notes, CONTENT_WIDTH - 16);
            const noteBoxH = Math.max(14, 8 + noteLines.length * 4.5);
            docPdf.setFillColor(...COLORS.SECTION_BG);
            docPdf.roundedRect(MARGIN, y, CONTENT_WIDTH, noteBoxH, 1.5, 1.5, 'F');
            docPdf.setDrawColor(...COLORS.BORDER);
            docPdf.setLineWidth(0.3);
            docPdf.roundedRect(MARGIN, y, CONTENT_WIDTH, noteBoxH, 1.5, 1.5, 'S');

            docPdf.setTextColor(...COLORS.TEXT_PRIMARY);
            docPdf.setFontSize(9);
            docPdf.setFont("helvetica", "normal");
            docPdf.text(noteLines, MARGIN + 8, y + 6);
            y += noteBoxH + 8;
        }

        // --- Photos ---
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
                checkPageBreak(70);

                try {
                    const imgData = await getImageData(url);
                    if (imgData) {
                        const imgProps = docPdf.getImageProperties(imgData);
                        const imgRatio = imgProps.height / imgProps.width;
                        const imgWidth = Math.min(90, CONTENT_WIDTH * 0.5);
                        const imgHeight = imgWidth * imgRatio;
                        const totalH = imgHeight + 10;

                        checkPageBreak(totalH + 10);

                        // Image container with border
                        docPdf.setDrawColor(...COLORS.BORDER);
                        docPdf.setLineWidth(0.3);
                        docPdf.roundedRect(MARGIN, y, imgWidth + 6, imgHeight + 12, 2, 2, 'S');

                        docPdf.addImage(imgData, 'JPEG', MARGIN + 3, y + 3, imgWidth, imgHeight);
                        docPdf.link(MARGIN + 3, y + 3, imgWidth, imgHeight, { url: url });

                        // Caption
                        docPdf.setFontSize(7);
                        docPdf.setTextColor(...COLORS.TEXT_MUTED);
                        docPdf.setFont("helvetica", "normal");
                        docPdf.text(`Foto ${i + 1} de ${selectedInspection.photoURLs.length}`, MARGIN + 3, y + imgHeight + 9);

                        y += imgHeight + 18;
                    } else {
                        docPdf.setTextColor(...COLORS.ACCENT);
                        docPdf.setFontSize(9);
                        docPdf.textWithLink(`Ver foto ${i + 1} en navegador`, MARGIN, y, { url: url });
                        y += 8;
                    }
                } catch {
                    docPdf.setTextColor(...COLORS.ACCENT);
                    docPdf.setFontSize(9);
                    docPdf.textWithLink(`Ver foto ${i + 1} en navegador`, MARGIN, y, { url: url });
                    y += 8;
                }
            }
        }

        // --- Footer on all pages ---
        const pageCount = docPdf.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            docPdf.setPage(i);
            // Footer line
            docPdf.setDrawColor(...COLORS.DIVIDER);
            docPdf.setLineWidth(0.3);
            docPdf.line(MARGIN, PAGE_HEIGHT - 12, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 12);
            // Footer text left
            docPdf.setFontSize(7);
            docPdf.setTextColor(...COLORS.TEXT_MUTED);
            docPdf.setFont("helvetica", "normal");
            docPdf.text("Generado por PIA - Predictive Inspection App", MARGIN, PAGE_HEIGHT - 7);
            // Page number right
            docPdf.text(`Pagina ${i} de ${pageCount}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 7, { align: 'right' });
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
