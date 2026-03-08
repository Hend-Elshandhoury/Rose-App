import { SearchInput } from "../ui/search-input";


interface SearchTableProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchTable({ value, onChange }: SearchTableProps) {
    return (
        <SearchInput
            placeholder="Search..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}