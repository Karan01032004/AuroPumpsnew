import { useState, useEffect } from "react";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
function ViewCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "  View Product Category | PowerAdmin";
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/ProductsCategory/list");
            setCategories(res.data);
        } catch (err) {
            console.error("Failed to load Product categories",err);
        } finally {
            setLoading(false);
        }
    };   
const handleDelete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't to delete this Product Category!",
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
                api.delete(`/ProductsCategory/delete/${id}`),
                {
                    loading: 'Deleting Category...',
                    success: () => {
                        fetchCategories();
                        return 'Product Category deleted successfully';
                    },
                    error: 'Failed to delete category.',
                }
            );
        }
    });
}; 
    const columns = [
        {
            title: "CATEGORY",
            data: "categoryName",
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
                            navigate(`/poweradmin/edit-Productcategory/${row.id}`)

                        }
                        onDelete={() => handleDelete(row.id)}
                    />
                ),
        },
    ];

       return (
        <div>
            <PageHeader
                title="View Product Categories"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "View Category" },
                ]}
            />

            <div className="mt-10">
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-6">
                    <AppDataTable
                        data={categories}
                        columns={columns}
                        loading={loading}
                        searchPlaceholder="Search categories..."
                    />
                </div>
            </div>
        </div>
    );
}

export default ViewCategory;
