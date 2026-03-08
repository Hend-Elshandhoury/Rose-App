import { CardHeader, CardTitle } from "@/components/ui/card";


export default function CardHeaderChart({t}:{t: (key: string) => string}) {

    return (
        <CardHeader>
            <div className="flex items-center justify-between">
                {/* title */}
                <CardTitle className="text-2xl font-semibold">
                    {t("revenue")}
                </CardTitle>
                <div className="flex gap-2">
                    <button className="text-sm font-semibold text-maroon-600">
                        {t("monthly")}
                    </button>
                    <button className="text-[#969696] text-sm">
                        {t("last_week")}
                    </button>
                </div>
            </div>
        </CardHeader>
    )
}