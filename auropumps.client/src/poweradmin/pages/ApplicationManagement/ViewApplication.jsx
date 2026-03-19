import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

function ViewApplication() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "View Application | PowerAdmin";
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const res = await api.get("/application/list");
            setApplications(res.data);
        } catch (err) {
            console.error("Failed to load applications", err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ DELETE
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this Application!",
            icon: "warning",
            width: "400px",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                toast.promise(
                    api.delete(`/application/delete/${id}`),
                    {
                        loading: "Deleting Application...",
                        success: () => {
                            loadApplications();
                            return "Application deleted successfully";
                        },
                        error: "Failed to delete Application",
                    }
                );
            }
        });
    };

    // ✅ TABLE COLUMNS
    const columns = [
        {
            title: "TITLE",
            data: "title",
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
            title: "ACTION",
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td, _, row) =>
                renderCell(
                    td,
                    <ActionButtons
                        onEdit={() =>
                            navigate(`/poweradmin/edit-application/${row.id}`)
                        }
                        onDelete={() => handleDelete(row.id)}
                    />
                ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Application Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "View Application" },
                ]}
            />

            <div className="mt-10">
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                    <AppDataTable
                        data={applications}
                        columns={columns}
                        loading={loading}
                        searchPlaceholder="Search applications..."
                    />
                </div>
            </div>
        </div>
    );
}

export default ViewApplication;