

export default function RenderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, payload, totalCount }: any) {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // PERCENTAGE
    const percent = ((payload.count / totalCount) * 100).toFixed(0);

    // 
    return (
        <g>
            <circle cx={x} cy={y} r={16} fill="#FAFAFA" stroke="#e4e4e7" />
            <text
                x={x}
                y={y}
                fill="#27272a"
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[10px] font-bold"
            >
                {`${percent}%`}
            </text>
        </g>
    );
};