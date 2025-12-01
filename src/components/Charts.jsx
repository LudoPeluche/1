import React from 'react';

export const PieChart = ({ data }) => {
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

export const AssetEvolutionChart = ({ data }) => {
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
