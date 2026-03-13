import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

function ViewProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "View Product | PowerAdmin";
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const res = await api.get("/product/list");
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to load products", err);
        } finally {
            setLoading(false);
        }
    };

    //const handleDelete = async (id) => {
    //    if (!window.confirm("Are you sure you want to delete this product?"))
    //        return;

    //    try {
    //        await api.delete(`/product/delete/${id}`);
    //        loadProducts(); // refresh list
    //    } catch (err) {
    //        alert("Delete failed",err);
    //    }
    //};
    //const handleDelete = async (id) => {
    //    if (!window.confirm("Are you sure you want to delete this product?"))
    //        return;

    //    toast.promise(
    //        api.delete(`/product/delete/${id}`),
    //        {
    //            loading: 'Deleting Category...',
    //            success: () => {
    //                loadProducts();
    //                return 'product deleted successfully';
    //            },
    //            error: 'Failed to delete product. Please try again.',
    //        }
    //    );
    //}; 
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't to delete this Product!",
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
                        api.delete(`/product/delete/${id}`),
                        {
                            loading: 'Product Category...',
                            success: () => {
                                loadProducts();
                                return 'Product deleted successfully';
                            },
                            error: 'Failed to delete Product. Please try again.',
                        }
                    );
            }
        });
    };
    const columns = [
        {
            title: "PRODUCT NAME",
            data: "productName",
        },
        {
            title: "VISIBLE",
            data: "visible",
            render: (val) =>
                `<span class="${val ? "text-green-600" : "text-red-500"
                } font-medium">
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
                            navigate(`/poweradmin/edit-product/${row.id}`)
                        }
                        onDelete={() => handleDelete(row.id)}
                    />
                ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Product Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "View Product" },
                ]}
            />

            <div className="mt-10">
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-6">
                    <AppDataTable
                        data={products}
                        columns={columns}
                        loading={loading}
                        searchPlaceholder="Search products..."
                    />
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;
