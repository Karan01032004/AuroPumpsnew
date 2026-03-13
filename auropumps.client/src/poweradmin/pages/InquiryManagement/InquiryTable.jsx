import { useState, useEffect } from "react";
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";
import Swal from 'sweetalert2';
function InquiryTable() {
    const [inquiry, setInquiry] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Inquiry Management | PowerAdmin";
        fetchInquiry();
    }, []);

    const fetchInquiry = async () => {
        setLoading(true);
        try {
            const res = await api.get("/inquiry/getall");
            setInquiry(res.data);
        } catch (err) {
            console.error("Error fetching inquiry", err);
        } finally {
            setLoading(false);
        }
    }; 
    //const handleDelete = async (id) => {
    //    if (!window.confirm("Are you sure you want to delete this inquiry?"))
    //        return; 
    //    toast.promise(
    //        api.delete(`/inquiry/delete/${id}`),
    //        {
    //            loading: 'Deleting inquiry...',
    //            success: () => {
    //                fetchInquiry();  
    //                return 'Inquiry deleted successfully';
    //            },
    //            error: 'Failed to delete inquiry. Please try again.',
    //        }
    //    );
    //};
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't to delete this Inquiry!",
            icon: 'warning',
            width: '400px',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                container: 'dark:bg-gray-900',
            }
        }).then((result) => {
            if (result.isConfirmed) {

                toast.promise(
                    api.delete(`/inquiry/delete/${id}`),
                    {
                        loading: 'Deleting Inquiry...',
                        success: () => {
                            fetchInquiry();
                            return 'Inquiry deleted successfully';
                        },
                        error: 'Failed to delete Inquiry. Please try again.',
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
        { title: "EMAIL ID", data: "email" },
        {
            title: "MESSAGE",
            data: "message",
            render: (data) => data?.substring(0, 40) + "..."
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
                            navigate(`/poweradmin/view-inquiry/${row.id}`)
                        }
                        onDelete={() => handleDelete(row.id)}
                    />
                ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Inquiry Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "Inquiry Management" }
                ]}
            />

            <div className="mt-10 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-6">
                <AppDataTable
                    data={inquiry}
                    columns={columns}
                    loading={loading}
                    searchPlaceholder="Search inquiry..."
                />
            </div>
        </div>
    );
}

export default InquiryTable;
