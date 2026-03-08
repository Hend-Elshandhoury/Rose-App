"use server";

import { CategoriesResponse, Category, CategoryResponse } from "@/lib/types/categories";
import { addCategoryService } from "../_services/add-category.service";
import { updateCategoryService } from "../_services/update-category.service";
import { CategorySchemaType } from "@/lib/schemes/category.schema";


export async function handleAddCategory(formData: FormData) {

    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    if (!name) {
        throw new Error("Name is required");
    }

    await addCategoryService({ name, image });
}


export async function handleUpdateCategory(id: string, formData: CategorySchemaType) {

    const formValues = new FormData();
    formValues.append("name", formData.name);
    // if (formData.image) {
    //     formValues.append("image", formData.image);
    // }

    await updateCategoryService(id, formValues);
}