
import EditCategoryForm from "./edit-category-form";
import { showCategoryService } from "../_services/show-category.service";

export default async function EditCategory({ id }: { id: string }) {
  // show category
  const category = await showCategoryService(id);

  return <EditCategoryForm category={category} id={id}/>}