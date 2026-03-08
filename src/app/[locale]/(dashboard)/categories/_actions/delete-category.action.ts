"use server";

import { deleteCategoryService } from "../_services/delete-category.service";

export async function deleteCategoryAction(id: string) {
    await deleteCategoryService(id);
}