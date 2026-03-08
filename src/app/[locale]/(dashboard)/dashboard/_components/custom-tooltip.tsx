"use client";

import { useFormatter } from 'next-intl';

export default function CustomTooltip({ active, payload, coordinate }: any) {
    const t = useFormatter();

    if (active && payload && payload.length && coordinate) {
        const amount = payload[0].value;

        return (
            <div
                style={{
                    position: "absolute",
                    left: coordinate.x,
                    top: coordinate.y,
                    transform: "translateX(-50%)",
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <span className="text-[0.75rem] font-bold text-maroon-600 bg-white/80 px-1 rounded">
                    {t.number(amount, { style: 'currency', currency: 'EGP' })}
                </span>
            </div>
        );
    }
    return null;
};