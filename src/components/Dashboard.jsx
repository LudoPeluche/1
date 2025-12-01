import React, { useMemo } from 'react';
import { Target as TargetIcon } from 'lucide-react';
import { PieChart, AssetEvolutionChart } from './Charts';

const Dashboard = ({ assets, latestInspections, allInspections, onInspectAssetHistory }) => {
    const assetStatusSummary = useMemo(() => {
        // Soporta estados 'A' | 'B' | 'C' | 'X' y 'Uninspected'
        const summary = { A: 0, B: 0, C: 0, X: 0, Uninspected: 0 };
        assets.forEach(asset => {
            const s = asset.status || 'Uninspected';
            if (summary[s] != null) summary[s] += 1; else summary['Uninspected'] += 1;
        });
        const total = assets.length;
        const data = [
            { name: 'A', value: summary.A, color: '#10B981' },      // verde
            { name: 'B', value: summary.B, color: '#84CC16' },      // lima
            { name: 'C', value: summary.C, color: '#EF4444' },      // rojo
            { name: 'No Insp.', value: summary.Uninspected, color: '#F59E0B' },
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
                        const s = insp.overallStatus;
                        // Tratar A/B como OK; C y X como ALERT
                        if (s === 'A' || s === 'B' || s === 'OK') monthsData[monthIndex].valueOK += 1;
                        else if (s === 'C' || s === 'X' || s === 'ALERT') monthsData[monthIndex].valueALERT += 1;
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
                        <TargetIcon className="w-10 h-10 text-blue-400" />
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

export default Dashboard;