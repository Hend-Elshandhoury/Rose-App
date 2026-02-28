export default function CustomTooltip({ active, payload, coordinate }: any) {
    if (active && payload && payload.length && coordinate) {
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
                <span className="text-[12px] font-bold text-maroon-600 bg-white/80 px-1 rounded">
                    {`${payload[0].value.toLocaleString()} EGP`}
                </span>
            </div>
        );
    }
    return null;
};