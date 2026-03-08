import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { DeleteConfirmation } from "./delete-confirmation";


// interface
interface Props {
    editPath: string;
    handleDelete: () => Promise<void>;
    isDeleting: boolean;
    error: string | undefined;
}

export default function DropdownActionMenu({ editPath, handleDelete, isDeleting, error }: Props) {

    return (
        <>
            <DropdownMenu>
                {/* open & close btn */}
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-7 w-7 p-0 rounded-sm border border-zinc-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none">
                        <MoreVertical className="h-4 w-4 text-zinc-300" />
                    </Button>
                </DropdownMenuTrigger>

                {/* content menu*/}
                <DropdownMenuContent align="end" className="w-[200px] border-zinc-200 shadow-none rounded-b-none flex flex-col gap-2 bg-white rounded-t-lg ">
                    {/* Edit btn */}
                    <DropdownMenuItem className="text-blue-600 cursor-pointer hover:bg-maroon-100">
                        <Link href={editPath}>
                            <Pencil className=" h-5 w-5" color="#2563eb" />
                            <span className="font-medium">Edit</span>
                        </Link>
                    </DropdownMenuItem>

                    {/* Delete btn */}
                    <DropdownMenuItem className="text-red-600 cursor-pointer hover:bg-maroon-100">

                        {/* <Trash2 className="h-5 w-5" color="#dc2626" />
                    <span className="font-medium">Delete</span> */}

                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteConfirmation
                deleteFn={handleDelete}
                isDeleting={isDeleting}
                error={error}
                deleteTitle="Delete Category"
                deleteContent="Are you sure you want to delete this category?"
                cancelButtonText="Cancel"
                confirmButtonText="Confirm Delete"
            />
        </>
    );
}