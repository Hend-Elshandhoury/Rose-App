import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useTableHook({ initialData }: { initialData: any[] }) {

    // navigate
    const router = useRouter();

    const pathname = usePathname();

    const searchParams = useSearchParams();

    // state
    const [search, setSearch] = useState(searchParams.get("search") || "");

    // handles 
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    // handle search
    const handleSearchChange = (value: string) => {
        setSearch(value);
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", value);
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    };

    const filteredData = initialData.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    // change header name
    const header: Record<string, string> = {
        productsCount: "Products",
    };

    return { search, handleSearchChange, filteredData, header, handlePageChange }
}