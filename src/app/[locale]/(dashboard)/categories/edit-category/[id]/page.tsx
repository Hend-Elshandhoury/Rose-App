import EditCategory from "../../_components/edit-category";

interface PageProps {
    params: {
        id: string;
    }
}
export default function Page({
  params,
}:PageProps) {return <EditCategory id={params.id} />}