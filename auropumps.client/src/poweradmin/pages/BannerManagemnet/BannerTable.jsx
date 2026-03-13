import ImageCell from "../../components/Table/table-cells/ImageCell";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import { renderCell } from "../../utils/renderCell";
import bannerData from "../../content/bannerData";
import AppDataTable from "../../components/Table/AppDataTable";
import {  useEffect } from "react";

function BannerTable() {
    useEffect(() => {
        document.title = "View Banner | PowerAdmin";
    }, []);
    const columns = [
        {
            title: "IMAGE",
            data: "image",
            orderable: false,
            width: "12%",          // ✅ fit content
            createdCell: (td, data) =>
                renderCell(td, <ImageCell src={data} />),
        },
        {
            title: "TITLE",
            data: "title",
            width: "76%",         // ✅ take remaining space
        },
        {
            title: "ACTION",
            data: null,
            orderable: false,
            searchable: false,
            width: "12%",          // 👈 was 1%, now slightly wider
            createdCell: (td, _, row) =>
                renderCell(
                    td,
                    <ActionButtons
                        onEdit={() => alert(`Edit: ${row.title}`)}
                        onDelete={() => alert(`Delete: ${row.title}`)}
                    />
                ),
        },
    ];

    return (
        <div className="mt-10">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]  shadow-sm p-6">
                <AppDataTable
                    data={bannerData}
                    columns={columns}
                    searchPlaceholder="Search banners..."
                />
            </div>
        </div>
    );
}

export default BannerTable;
