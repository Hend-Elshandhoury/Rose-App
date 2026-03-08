"use client";

import { useState, useRef } from "react";
import { X, ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
    value?: string | File | null;
    onChange: (file: File | null) => void;
    label?: string;
    error?: string;
}

export default function ImageUpload({ value, onChange, label, error }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setPreview(null);
        onChange(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="w-full space-y-2">
            {/* Label */}
            <label className="text-sm font-medium text-zinc-700 flex items-center gap-1">
                {label || "Category image"} <span className="text-red-500">*</span>
            </label>

            {/* Container */}
            <div
                onClick={() => fileInputRef.current?.click()}
                className={`
                    relative cursor-pointer group flex items-center justify-between
                    w-full h-12 px-4 rounded-xl border transition-all duration-200
                    ${error ? 'border-red-500 bg-red-50' : 'border-zinc-200 bg-white hover:border-zinc-300'}
                `}
            >
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {/* */}
                <div className="flex items-center gap-3 overflow-hidden">
                    {preview ? (
                        <div className="flex items-center gap-2">
                            <img src={preview} alt="Preview" className="h-8 w-8 rounded object-cover border border-zinc-300" />
                            <span className="text-xs text-zinc-500 truncate max-w-[200px]">Image uploaded successfully</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-zinc-300">
                            <ImageIcon className="h-5 w-5 opacity-50" />
                            <span className="text-sm">No file selected</span>
                        </div>
                    )}
                </div>

                {/* */}
                <div className="flex items-center gap-2 text-red-600 font-medium text-sm">
                    {preview ? (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); removeImage(); }}
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 rounded-full"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Upload className="h-5 w-5" />
                            <span>Upload file</span>
                        </div>
                    )}
                </div>
            </div>

            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>
    );
}