import { useState, useEffect } from "react";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import blogData from "../../content/blogData";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import { HiCheck } from "react-icons/hi";

function ViewBlog() {
    const [selectedBlog, setSelectedBlog] = useState(null);
    useEffect(() => {
        document.title = "View Blog | PowerAdmin";
    }, []);
    const columns = [
        {
            title: "BLOG NAME",
            data: "blogName",
        },
        {
            title: "BLOG DATE",
            data: "blogDate",
            render: (val) =>
                `<span class="text-gray-700 dark:text-gray-300">
                    ${val}
                </span>`,
        },
        {
            title: "VISIBLE",
            data: "visible",
            render: (val) =>
                `<span class="${val ? "text-green-600" : "text-red-500"} font-medium">
                    ${val ? "Yes" : "No"}
                </span>`,
        },
        {
            title: `
                <div class="flex items-center gap-1">
                    Order By
                    <span class="text-gray-400 text-xs">⇅</span>
                </div>
            `,
            data: "orderBy",
            orderable: true,
            createdCell: (td, cellData, row) =>
                renderCell(
                    td,
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            step="0.01"
                            defaultValue={cellData}
                            className="w-20 rounded border border-gray-300 px-2 py-1 text-sm
                                focus:outline-none focus:ring-1 focus:ring-indigo-500
                                dark:border-gray-700 dark:bg-gray-900"
                        />
                        <button
                            title="Update order"
                            className="flex h-8 w-8 items-center justify-center rounded
                                bg-blue-800 text-white hover:bg-blue-700"
                            onClick={() =>
                                alert(`Order updated for ${row.blogName}`)
                            }
                        >
                            <HiCheck size={16} />
                        </button>
                    </div>
                ),
        },
        {
            title: "ACTION",
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td, _, row) =>
                renderCell(
                    td,
                    <ActionButtons
                        onEdit={() => alert(`Edit: ${row.blogName}`)}
                        onDelete={() => alert(`Delete: ${row.blogName}`)}
                    />
                ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Blog Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "View Blog" },
                ]}
            />

            <div className="mt-10">
                {selectedBlog ? (
                    <h1>Blog Details</h1>
                ) : (
                    <div className="rounded-2xl border border-gray-200 bg-white
                        dark:border-gray-800 dark:bg-white/[0.03]
                        shadow-sm p-6">
                        <AppDataTable
                            data={blogData}
                            columns={columns}
                            searchPlaceholder="Search blogs..."
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewBlog;
