import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ImageUpload from "../../components/Forms/ImageUpload";
import api from "../../api/axios";  
const AddImageGallery = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate(); 
    const [categories, setCategories] = useState([]);
    const [catid, setCatid] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);  
    const [existingImage, setExistingImage] = useState("");

    const [display, setDisplay] = useState("yes");
    const [watermark, setWatermark] = useState("no");
    const [loading, setLoading] = useState(false);

    const loadCategories = async () => {
        const res = await api.get("/imagegallery/categories");
        setCategories(res.data);
    }; 
    const loadData = async () => {
        const res = await api.get(`/imagegallery/${id}`); 
        setCatid(res.data.catid);
        setTitle(res.data.title);

        setExistingImage(res.data.image);  

        setDisplay(res.data.displayonfrontend ? "yes" : "no");
        setWatermark(res.data.watermark_on_image ? "yes" : "no");
    };
    const BACKEND_URL = "https://dotcompreview.com/auropumps";
  //  const BACKEND_URL = "https://localhost:7051";
 useEffect(() => {
    (async () => {
        await loadCategories();
        if (isEdit) {
            await loadData();
        }
    })();
}, [id]); 
    const handleSubmit = async () => {
        setLoading(true); 
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("catid", catid);
            formData.append(
                "displayonfrontend",
                display === "yes"
            );
            formData.append(
                "watermark_on_image",
                watermark === "yes"
            );
            formData.append("imageFile", image); 
            if (isEdit) {
                await api.put(
                    `/imagegallery/update/${id}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
            } else {
                await api.post(
                    "/imagegallery/add",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
            } 
            navigate("/poweradmin/Viewimagegallery");
        } catch (err) {
            console.error("Save failed", err);
            alert("Save failed");
        } finally {
            setLoading(false);
        }
    }; 
    return (
        <div className="min-h-screen">
            <PageHeader
                title="Add Image"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: isEdit ? "Edit Image" : "Add Image" },
                ]}
            />

            <div className="rounded-2xl bg-white p-6 shadow">
                {/* DISPLAY */}
                <p className="font-medium">Display on Front-End?</p>
                <label><input type="radio" checked={display === "yes"} onChange={() => setDisplay("yes")} /> Yes</label>
                <label className="ml-4"><input type="radio" checked={display === "no"} onChange={() => setDisplay("no")} /> No</label>

                {/* CATEGORY */}
                <div className="mt-4">
                    <label>Category</label>
                    <select
                        value={catid}
                        onChange={(e) => setCatid(parseInt(e.target.value))}

                        className="w-full border p-2 rounded">
                        <option value="">Select Category</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                    </select>
                </div>

                {/* TITLE */}
                <div className="mt-4">
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div> 
                {isEdit && existingImage && !image && (
                    <div className="mt-4">
                        <p className="mb-1 font-medium text-gray-700">
                            Current Image
                        </p>
                        <img
                            src={
                                existingImage.startsWith("http")
                                    ? existingImage
                                    : existingImage.startsWith("/")
                                        ? `${BACKEND_URL}${existingImage}`
                                        : `${BACKEND_URL}/Webfiles/gallery/${existingImage}`
                            }
                            alt="Current"
                            className="h-32 rounded border object-cover"
                        />
                    </div>
                )}  
                <div className="mt-4">
                    <ImageUpload onChange={(file) => setImage(file)} />
                </div>

                {/* WATERMARK */}
                <div className="mt-4">
                    <p className="font-medium">Watermark on Image?</p>
                    <label><input type="radio" checked={watermark === "yes"} onChange={() => setWatermark("yes")} /> Yes</label>
                    <label className="ml-4"><input type="radio" checked={watermark === "no"} onChange={() => setWatermark("no")} /> No</label>
                </div> 
                <div className="mt-6 text-right">
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    onClick={() => navigate(-1)}*/}
                    {/*    className="rounded-lg border border-gray-300 px-4 py-2 */}
                    {/*    text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/10"*/}
                    {/*>*/}
                    {/*     Back*/}
                    {/*</button>*/}
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="bg-indigo-600 text-white px-6 py-2 rounded"
                    >
                        {isEdit ? "Update Image" : "Save Image"}
                    </button>
                </div>
            </div>
        </div>
    );
}; 
export default AddImageGallery;
