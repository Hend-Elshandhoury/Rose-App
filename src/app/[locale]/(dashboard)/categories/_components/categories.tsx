import CustomTable from "@/components/shared/custom-table";
import { allCategoriesService } from "@/lib/services/category.service";

export default async function Categories({
    searchParams,
}: {
    searchParams?: { page?: string }
}) {
    const currentPage = Number(searchParams?.page ?? 1);
    const limit = 10;

    const categoriesData = await allCategoriesService({
        page: currentPage,
        limit,
    });

    const total = categoriesData?.metadata?.totalPages || 1;


    return (
        <CustomTable
            initialData={categoriesData?.categories || []}
            totalPages={total}
            currentPage={currentPage}
            title="All Categories"
            link="/categories/add-category"
            btnTitle="Add a new category"
            editPath="categories/edit-category"
        />
    )
}