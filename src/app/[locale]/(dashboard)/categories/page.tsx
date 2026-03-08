import Categories from "./_components/categories";

export default function page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
    return <Categories searchParams={searchParams} />;
}