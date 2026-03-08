
"use client"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryResponse } from "@/lib/types/categories";
import { handleUpdateCategory } from "../_actions/add-category.action";
import { CategorySchema, CategorySchemaType } from "@/lib/schemes/category.schema";

// types
interface Props {
    category: CategoryResponse,
    id: string
}

export default function EditCategoryForm({ category, id }: Props) {
    // translate
    const t = useTranslations("dashboard.categories")

    //form
    const form = useForm<CategorySchemaType>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: category?.category.name,
            image: category?.category.image || undefined,
        },
    });

    // handle submit
    const onSubmit = async (values: CategorySchemaType) => {
        await handleUpdateCategory(id, values);
    };

    return (
        <>
            <h2 className="font-semibold text-2xl">{t("edit_category")}: {category?.category?.name}</h2>

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
                        </div>

                        {/* Submission Button */}
                        <div className="mt-20">
                            <Button
                                disabled={form.formState.isSubmitting}
                                type="submit"
                                className="w-full">
                                {t("edit_category")}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}