import { z } from "zod";

export const CategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    image: z.string()
});

export const defaultValue = {
    name: "",
    image: "",
}

export type CategorySchemaType = z.infer<typeof CategorySchema>;