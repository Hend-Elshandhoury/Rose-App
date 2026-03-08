
"use client"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/shared/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleAddCategory } from "../_actions/add-category.action";
import { CategorySchema, CategorySchemaType, defaultValue } from "@/lib/schemes/category.schema";
import { useTranslations } from "next-intl";

export default function AddCategoryForm() {

    // translate
    const t = useTranslations("dashboard.categories")

    // state
    const [categoryImage, setCategoryImage] = useState<File | null>(null);

    //form
    const form = useForm<CategorySchemaType>({
        resolver: zodResolver(CategorySchema),
        defaultValues: defaultValue,
    });

    //  handle submit
    const onSubmit = async (values: CategorySchemaType) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            if (categoryImage) {
                formData.append("image", categoryImage);
            }
            await handleAddCategory(formData);
            console.log("formData", formData)
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    return (
        <>
            <h2 className="font-semibold text-2xl">{t("add_category")}</h2>

            <div className="mt-6 bg-white rounded-lg lg:w-3/4 p-6">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}>
                        {/* inputs */}
                        <div className="space-y-4">

                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        {/* Label */}
                                        <FormLabel>{t("name")}</FormLabel>

                                        {/* Input */}
                                        <FormControl>
                                            <Input {...field} placeholder="Enter category name" />
                                        </FormControl>

                                        {/* Error Message */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* image */}
                            <ImageUpload
                                label={t("image")}
                                value={categoryImage}
                                onChange={(file) => setCategoryImage(file)}
                                error={form.formState.errors.image?.message}
                            />
                        </div>

                        {/* Submission Button */}
                        <div className="mt-20">
                            <Button
                                disabled={form.formState.isSubmitting}
                                type="submit"
                                className="w-full">
                                {t("add_btn")}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>

    )
}