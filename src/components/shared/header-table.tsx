"use client";

import Link from "next/link";
import { Button } from "../ui/button"
import { Plus } from "lucide-react";

type Props = {
    title: string;
    btnTitle: string;
    link: string;
}

export default function HeaderTable({ title, btnTitle, link }: Props) {
    // todo
// const isMobile = window.innerWidth < 768; // Example breakpoint for mobile devices
    return (
        <div className="flex justify-between">
            {/* title */}
            <h2 className="font-semibold text-2xl">{title}</h2>
            {/* button */}
            <Link href={link}>
            <Button ><Plus size={22}/> {btnTitle}</Button>
            </Link>
        </div>
    )
}