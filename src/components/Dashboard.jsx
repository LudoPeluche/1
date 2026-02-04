import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Target,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CheckCircle2,
    Clock,
    Activity,
    BarChart3,
    PieChart as PieChartIcon,
    Calendar,
    ArrowRight,
    Zap,
} from 'lucide-react';
import { PieChart, AssetEvolutionChart, SparklineChart } from './Charts';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

// KPI Card Component
const KPICard = ({ title, value, subtitle, icon: Icon, trend, trendValue, accentColor, sparklineData }) => {
    const accentClasses = {
        blue: 'accent-blue',
        green: 'accent-green',
        purple: 'accent-purple',
        orange: 'accent-orange',
        red: 'accent-red',
        teal: 'accent-teal',
    };

    const iconBgClasses = {
        blue: 'bg-blue-500/20 text-blue-400',
        green: 'bg-emerald-500/20 text-emerald-400',
        purple: 'bg-purple-500/20 text-purple-400',
        orange: 'bg-orange-500/20 text-orange-400',
        red: 'bg-red-500/20 text-red-400',
        teal: 'bg-teal-500/20 text-teal-400',
    };

    return (
        <motion.div
            variants={itemVariants}
            className={`kpi-card ${accentClasses[accentColor] || 'accent-blue'}`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${iconBgClasses[accentColor] || iconBgClasses.blue}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend && (
                    <div className={`stat-badge ${trend === 'up' ? 'positive' : trend === 'down' ? 'negative' : 'neutral'}`}>
                        {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : trend === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
                        <span>{trendValue}</span>
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
                <p className="text-4xl font-bold text-white counter-value">{value}</p>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
            {sparklineData && (
                <div className="mt-4 -mx-2">
                    <SparklineChart data={sparklineData} color={accentColor === 'green' ? '#10b981' : accentColor === 'red' ? '#ef4444' : '#4f46e5'} />
                </div>
            )}
        </motion.div>
    );
};

// Dashboard Header
const DashboardHeader = () => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
    >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                        <BarChart3 className="w-7 h-7 text-white" />
                    </div>
                    Dashboard de Operaciones
                </h1>
                <p className="text-gray-400 mt-2">
                    Monitoreo en tiempo real de activos e inspecciones
                </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Ultima actualizacion: {new Date().toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </div>
        </div>
    </motion.div>
);

// Status Legend Component
const StatusLegend = ({ data }) => (
    <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item) => (
            <div
                key={item.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
            >
                <div
                    className="w-4 h-4 rounded-full ring-2 ring-offset-2 ring-offset-gray-900"
                    style={{ backgroundColor: item.color, ringColor: item.color }}
                />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.value} activos</p>
                </div>
                <span className="text-lg font-bold text-white">
                    {((item.value / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(0)}%
                </span>
            </div>
        ))}
    </div>
);

// Inspection List Item
const InspectionItem = ({ inspection, onViewDetails, assets, index }) => {
    const statusConfig = {
        A: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', label: 'Excelente' },
        B: { bg: 'bg-lime-500/10', border: 'border-lime-500/30', text: 'text-lime-400', label: 'Aceptable' },
        C: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', label: 'Deficiente' },
        OK: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', label: 'OK' },
        ALERT: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', label: 'Alerta' },
    };

    const status = statusConfig[inspection.overallStatus] || statusConfig.OK;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="list-item group"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                    <div className={`p-2 rounded-lg ${status.bg} ${status.border} border`}>
                        {inspection.overallStatus === 'ALERT' || inspection.overallStatus === 'C' ? (
                            <AlertTriangle className={`w-5 h-5 ${status.text}`} />
                        ) : (
                            <CheckCircle2 className={`w-5 h-5 ${status.text}`} />
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-white truncate">{inspection.assetName}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>{inspection.date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`status-badge ${status.bg} ${status.border} border ${status.text}`}>
                        {status.label}
                    </span>
                    <button
                        onClick={() => {
                            const asset = assets.find((a) => a.id === inspection.assetId);
                            if (asset) onViewDetails(asset);
                        }}
                        className="btn-secondary px-3 py-1.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <span className="flex items-center gap-1">
                            Ver <ArrowRight className="w-3 h-3" />
                        </span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// Main Dashboard Component
const Dashboard = ({ assets, latestInspections, allInspections, onInspectAssetHistory }) => {
    // Asset status summary
    const assetStatusSummary = useMemo(() => {
        const summary = { A: 0, B: 0, C: 0, X: 0, Uninspected: 0 };
        assets.forEach((asset) => {
            const s = asset.status || 'Uninspected';
            if (summary[s] != null) summary[s] += 1;
            else summary['Uninspected'] += 1;
        });

        const data = [
            { name: 'Excelente (A)', value: summary.A, color: '#10b981' },
            { name: 'Aceptable (B)', value: summary.B, color: '#84cc16' },
            { name: 'Deficiente (C)', value: summary.C, color: '#ef4444' },
            { name: 'Sin Inspeccionar', value: summary.Uninspected, color: '#f59e0b' },
        ].filter((item) => item.value > 0);

        return { data, total: assets.length, summary };
    }, [assets]);

    // Monthly evolution data
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
                const inspDate = insp?.date?.toDate ? insp.date.toDate() : insp?.date instanceof Date ? insp.date : null;
                if (!inspDate || inspDate < twelveMonthsAgo) return;

                const monthIndex =
                    (inspDate.getFullYear() - twelveMonthsAgo.getFullYear()) * 12 +
                    (inspDate.getMonth() - twelveMonthsAgo.getMonth());

                if (monthIndex >= 0 && monthIndex < 12) {
                    const s = insp.overallStatus;
                    if (s === 'A' || s === 'B' || s === 'OK') monthsData[monthIndex].valueOK += 1;
                    else if (s === 'C' || s === 'X' || s === 'ALERT') monthsData[monthIndex].valueALERT += 1;
                }
            });
        }

        return monthsData;
    }, [allInspections]);

    // Inspection stats
    const inspectionStats = useMemo(() => {
        const total = allInspections.length;
        const thisMonth = allInspections.filter((insp) => {
            const d = insp?.date?.toDate ? insp.date.toDate() : insp?.date;
            if (!d) return false;
            const now = new Date();
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).length;

        const alerts = allInspections.filter(
            (insp) => insp.overallStatus === 'ALERT' || insp.overallStatus === 'C'
        ).length;

        const okRate = total > 0 ? (((total - alerts) / total) * 100).toFixed(1) : 0;

        // Sparkline data for inspections
        const sparklineData = monthlyEvolutionData.map((d) => ({ value: d.valueOK + d.valueALERT }));

        return { total, thisMonth, alerts, okRate, sparklineData };
    }, [allInspections, monthlyEvolutionData]);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <DashboardHeader />

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="Total Activos"
                    value={assetStatusSummary.total}
                    subtitle="Registrados en el sistema"
                    icon={Target}
                    accentColor="blue"
                />
                <KPICard
                    title="Inspecciones"
                    value={inspectionStats.total}
                    subtitle={`${inspectionStats.thisMonth} este mes`}
                    icon={Activity}
                    trend={inspectionStats.thisMonth > 0 ? 'up' : 'neutral'}
                    trendValue={`${inspectionStats.thisMonth} nuevas`}
                    accentColor="purple"
                    sparklineData={inspectionStats.sparklineData}
                />
                <KPICard
                    title="Tasa de Exito"
                    value={`${inspectionStats.okRate}%`}
                    subtitle="Inspecciones sin alertas"
                    icon={Zap}
                    trend={Number(inspectionStats.okRate) >= 80 ? 'up' : 'down'}
                    trendValue={Number(inspectionStats.okRate) >= 80 ? 'Optimo' : 'Revisar'}
                    accentColor="green"
                />
                <KPICard
                    title="Alertas Activas"
                    value={inspectionStats.alerts}
                    subtitle="Requieren atencion"
                    icon={AlertTriangle}
                    trend={inspectionStats.alerts > 0 ? 'down' : 'up'}
                    trendValue={inspectionStats.alerts > 0 ? 'Pendientes' : 'Sin alertas'}
                    accentColor={inspectionStats.alerts > 0 ? 'red' : 'green'}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Pie Chart Panel */}
                <motion.div variants={itemVariants} className="lg:col-span-2 dashboard-panel">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-teal-500/20">
                            <PieChartIcon className="w-5 h-5 text-teal-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Estado de Activos</h2>
                            <p className="text-xs text-gray-500">Distribucion actual</p>
                        </div>
                    </div>
                    <div className="chart-container">
                        <PieChart data={assetStatusSummary.data} />
                    </div>
                    <StatusLegend data={assetStatusSummary.data} />
                </motion.div>

                {/* Bar Chart Panel */}
                <motion.div variants={itemVariants} className="lg:col-span-3 dashboard-panel">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-indigo-500/20">
                            <BarChart3 className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Evolucion Mensual</h2>
                            <p className="text-xs text-gray-500">Inspecciones de los ultimos 12 meses</p>
                        </div>
                    </div>
                    <div className="chart-container">
                        <AssetEvolutionChart data={monthlyEvolutionData} />
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                            <span className="text-sm text-gray-400">OK / Aceptable</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-sm text-gray-400">Alertas / Deficiente</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Latest Inspections */}
            <motion.div variants={itemVariants} className="dashboard-panel">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-pink-500/20">
                            <Clock className="w-5 h-5 text-pink-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Inspecciones Recientes</h2>
                            <p className="text-xs text-gray-500">Ultimas {latestInspections.length} registradas</p>
                        </div>
                    </div>
                </div>

                {latestInspections.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <div className="w-16 h-16 mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                            <Clock className="w-8 h-8 text-gray-600" />
                        </div>
                        <p className="text-sm">No hay inspecciones recientes</p>
                        <p className="text-xs text-gray-600 mt-1">Las nuevas inspecciones apareceran aqui</p>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {latestInspections.map((insp, index) => (
                            <InspectionItem
                                key={insp.id}
                                inspection={insp}
                                onViewDetails={onInspectAssetHistory}
                                assets={assets}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
