"use client";

import { Button } from "../ui/button";
import { TableCell } from "../ui/table";
import { Pencil, Trash2 } from "lucide-react";
import DropdownActionMenu from "./dropdown-actions";
import Link from "next/link";
import { useState } from "react";
import { DeleteConfirmation } from "./delete-confirmation";
import { deleteCategoryAction } from "@/app/[locale]/(dashboard)/categories/_actions/delete-category.action";

// interface
interface Props {
    editPath: string;
    id: string;
}

export default function Actions({ editPath, id }: Props) {
    // states
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | undefined>();

    // handle delete
    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            setError(undefined);

            await deleteCategoryAction(String(id));

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const isMobile = false;

    return (
        <>
            {isMobile ? (
                // dropdown menu
                <TableCell className="text-right px-6 space-x-2">
                    <DropdownActionMenu editPath={editPath} handleDelete={handleDelete} isDeleting={isDeleting} error={error} />
                </TableCell>
            ) : (
                <TableCell className="text-right px-6 space-x-2">
                    <Link href={editPath}>
                        <Button variant="ghost" size="sm" className="text-blue-600 bg-blue-50">
                            <Pencil className="w-3 h-3" /> Edit
                        </Button>
                    </Link>
                    {/* <Button variant="ghost" size="sm" className="text-red-600 bg-red-50 hover:bg-red-50">
                        <Trash2 className="w-3 h-3" /> Delete
                    </Button> */}

                    {/* delete */}
                    <DeleteConfirmation
                        deleteFn={handleDelete}
                        isDeleting={isDeleting}
                        error={error}
                        deleteTitle="Delete"
                        deleteContent="Are you sure you want to delete this category?"
                        cancelButtonText="Cancel"
                        confirmButtonText="Confirm Delete"
                    />
                </TableCell>
            )}
        </>
    )
}