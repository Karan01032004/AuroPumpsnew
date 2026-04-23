import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";
import Swal from 'sweetalert2';

function PdfInquiryTable() {
    const [inquiry, setInquiry] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Product PDF Inquiry | PowerAdmin";
        fetchInquiry();
    }, []);

    const fetchInquiry = async () => {
        setLoading(true);
        try {
            const res = await api.get("/product/pdf-inquiry");
            setInquiry(res.data);
        } catch (err) {
            console.error("Error fetching PDF inquiry", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this record!",
            icon: 'warning',
            width: '400px',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                toast.promise(
                    api.delete(`/product/pdf-inquiry-delete/${id}`),
                    {
                        loading: 'Deleting...',
                        success: () => {
                            fetchInquiry();
                            return 'Deleted successfully';
                        },
                        error: 'Delete failed',
                    }
                );
            }
        });
    };

    const columns = [
        {
            title: "DATE",
            data: "addedDate",
            render: (data) =>
                data ? new Date(data).toLocaleDateString("en-IN") : "-"
        },
        { title: "NAME", data: "name" },
        { title: "EMAIL", data: "email" },
        { title: "PHONE", data: "phone" },
        { title: "COMPANY", data: "companyName" },
        { title: "PRODUCT", data: "productName" },
        {
            title: "MESSAGE",
            data: "message",
            render: (data) => data ? data.substring(0, 40) + "..." : "-"
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
                        onView={() =>
                            navigate(`/poweradmin/view-pdfinquiry/${row.id}`)
                        }
                        onDelete={() => handleDelete(row.id)}
                    />
                ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Product PDF Inquiry"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "Product PDF Inquiry" }
                ]}
            />

            <div className="mt-10 rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <AppDataTable
                    data={inquiry}
                    columns={columns}
                    loading={loading}
                    searchPlaceholder="Search PDF inquiry..."
                />
            </div>
        </div>
    );
}

export default PdfInquiryTable;