
"use client"

import HeaderTable from "./header-table";
import SearchTable from "./search-table";
import DynamicTable from "./dynamic-table";
import { AppPagination } from "../ui/pagination";
import { useTableHook } from "@/hooks/use-table-hook";


// types
interface Props {
    initialData: any[],
    totalPages: number,
    currentPage: number,
    title: string,
    link: string,
    btnTitle: string,
    editPath: string,
}
export default function CustomTable({ initialData, totalPages, currentPage, title, link, btnTitle, editPath }: Props) {
    // hook
    const { search, handleSearchChange, filteredData, header, handlePageChange } = useTableHook({ initialData })

    return (
        <div className="w-full h-full rounded-lg  p-6 flex flex-col gap-[1.125rem]">
            {/* header */}
            <HeaderTable title={title} link={link} btnTitle={btnTitle} />
            {/* search */}
            <SearchTable value={search} onChange={handleSearchChange} />
            {/* table */}
            <DynamicTable
                data={filteredData || []}
                title="All Categories"
                btnTitle="Add Category"
                headerMap={header}
                suffixMap={{ productsCount: "products" }}
                editPath={editPath}
            />
            {/* pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center">
                    <AppPagination
                        page={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    )
}