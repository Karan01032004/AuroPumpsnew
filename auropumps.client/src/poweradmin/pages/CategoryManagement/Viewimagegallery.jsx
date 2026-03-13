import { useEffect, useState } from "react";
import ImageCell from "../../components/Table/table-cells/ImageCell";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import { renderCell } from "../../utils/renderCell";
import AppDataTable from "../../components/Table/AppDataTable";
import api from "../../api/axios";
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; 
function ImageGalleryTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "View Image Gallery | PowerAdmin";
        loadGallery();
    }, []);

    const loadGallery = async () => {
        try {
            const res = await api.get("/imagegallery/list");
            setData(res.data);
        } catch (err) {
            console.error("Failed to load image gallery", err);
        } finally {
            setLoading(false);
        }
    };  
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't to delete this Image!",
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
                    api.delete(`/imagegallery/delete/${id}`),
                    {
                        loading: 'Deleting Image...',
                        success: () => {
                            loadGallery();
                            return 'Image deleted successfully';
                        },
                        error: 'Failed to delete Image. Please try again.',
                    }
                );
            }
        });
    }; 
    //const BACKEND_URL = "https://localhost:7051";
    const BACKEND_URL = "https://dotcompreview.com/auropumps";
    const columns = [
        {
            title: "IMAGE",
            data: "image",
            orderable: false,
            width: "10%",
            createdCell: (td, data) =>
                renderCell(td, <ImageCell src={data ? `${BACKEND_URL}/Webfiles/gallery/${data}` : "/placeholder.png"} alt="gallery"
                    // Tailwind use kar rahe ho toh yahan se change hoga
                    // Inline style sabse taqatwar hota hai, ye apply ho hi jayega
                    style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                    }}/>),
                //renderCell(td, <ImageCell src={data ? `${IMAGE_BASE_URL}${data}` : "/placeholder.png"} />),
              //  renderCell(td, <ImageCell src={data} />),
        },
        {
            title: "TITLE",
            data: "title",
            width: "48%",
        },
        {
            title: "VISIBLE",
            data: "displayonfrontend",
            width: "16%",
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
            width: "12%",
            createdCell: (td, _, row) =>
                renderCell(
                    td,
                    <ActionButtons
                        onEdit={() => navigate(`/poweradmin/edit-image-gallery/${row.id}`)
                            //window.location.href =
                            //`/poweradmin/edit-image-gallery/${row.id}`
                        }
                        onDelete={() => handleDelete(row.id)}
                    />
                ),
        },
    ]; 

    return (
        <div className="mt-10">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-6">
                <AppDataTable
                    data={data}
                    columns={columns}
                    loading={loading}
                    searchPlaceholder="Search images..."
                />
            </div>
        </div>
    );
}

export default ImageGalleryTable;
