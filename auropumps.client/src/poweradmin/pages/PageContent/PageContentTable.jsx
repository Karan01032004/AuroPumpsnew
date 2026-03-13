import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";

function PageContentTable() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Page Content | PowerAdmin";
        fetchPages();
    }, []);

    // ===============================
    //  FETCH PAGE CONTENT LIST
    // ===============================
    const fetchPages = async () => {
        setLoading(true);
        try {
            const res = await api.get("/pagecontent/getall");
            setPages(res.data);
        } catch (err) {
            console.error("Error fetching page content", err);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: "PAGE NAME",
            data: "page_Name", // backend DTO field
        },
        {
            title: "TITLE",
            data: "title",
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
                        onEdit={() =>
                            navigate(`/poweradmin/page-content/${row.id}`)
                        }
                    />
                ),
        },
    ];
    return (
        <div>
            <PageHeader
                title="Page Content Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "Page Content" },
                ]}
                actionButton={{
                    label: "Add Page",
                    onClick: () =>
                        navigate("/poweradmin/page-content/add"),
                }}
            />

            <div className="mt-10 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-6">
                <AppDataTable
                    data={pages}
                    columns={columns}
                    loading={loading}
                    searchPlaceholder="Search pages..."
                />
            </div>
        </div>
    );
}

export default PageContentTable;
