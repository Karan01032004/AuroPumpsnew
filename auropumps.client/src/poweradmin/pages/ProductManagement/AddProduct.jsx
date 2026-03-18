import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MultiImageUpload from "../../components/Forms/MultiImageUpload";
import TinyEditor from "../../components/Forms/TinyEditor";
import Select from "react-select"; // 1. Import Select
import SeoMetaSection from "../../components/Forms/SeoMetaSection";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";
import { IMAGE_BASE_URL } from "../../api/axios";

const AddProduct = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate(); 
    // ================= STATES =================
    const [title, setTitle] = useState(""); 
    const [visible, setVisible] = useState("yes");
    const [isFeatured, setIsFeatured] = useState("no");
    const [isAddContact, setIsAddContact] = useState("no");
    const [categoryOptions, setCategoryOptions] = useState([]);  
    const [selectedCategories, setSelectedCategories] = useState([]);   
    const [description, setDescription] = useState("");
    const [technicalDetails, setTechnicalDetails] = useState("");
    const [moc, setMoc] = useState("");
    const [applications, setApplications] = useState("");
    const [pendingCategoryId, setPendingCategoryId] = useState("");
    const [seoTitle, setSeoTitle] = useState("");
    const [metaTags, setMetaTags] = useState("");
    const [capacity, setCapacity] = useState("");
    const [productHead, setProductHead] = useState("");
    const [productSize, setProductSize] = useState("");
    const [temperature, setTemperature] = useState("");
    const [viscosity, setViscosity] = useState("");
    const [SubmergenceLength, setSubmergenceLength] = useState("");
    const [operatingFrequency, setOperatingFrequency] = useState("");
    const [material, setMaterial] = useState(""); 
    const [images, setImages] = useState([]);
    const [catalogue, setCatalogue] = useState(null);

    const [existingImages, setExistingImages] = useState({});
    const [existingCatalogue, setExistingCatalogue] = useState("");

    const [loading, setLoading] = useState(false);
 
    useEffect(() => {
        document.title = isEdit
            ? "Edit Product | PowerAdmin"
            : "Add Product | PowerAdmin";
        loadCategories();
        if (isEdit) loadProduct();
    }, [id]);
    useEffect(() => { 
        if (categoryOptions.length > 0 && pendingCategoryId) {
            const idsArray = pendingCategoryId.split(","); // "1,2" -> ["1", "2"] 
            const selected = categoryOptions.filter(opt =>
                idsArray.includes(opt.value)
            );

            setSelectedCategories(selected);

            // Kaam khatam hone ke baad pending ko clear kar do taaki baar baar na chale
            setPendingCategoryId("");
        }
    }, [categoryOptions, pendingCategoryId]);
    const loadCategories = async () => {
        try {
            const res = await api.get("/ProductsCategory/list");
            console.log("Backend Categories Data:", res.data); // Yeh check karein

            const options = res.data.map(cat => ({ 
                value: (cat.id || cat.Id).toString(),
                label: cat.categoryName || "No Name"
            }));
            setCategoryOptions(options);
        } catch (err) {
            console.error("Error loading categories", err);
        }
    };
    const loadProduct = async () => {
        const res = await api.get(`/product/${id}`);
        const p = res.data;

        setTitle(p.title);

        setVisible(p.visible ? "yes" : "no");
        setIsFeatured(p.isFeatured ? "yes" : "no");
        setIsAddContact(p.isaddcontact ? "yes" : "no");

        setDescription(p.description);
        setTechnicalDetails(p.technicalDetails);
        setMoc(p.moc);
        setApplications(p.applications);
        setCapacity(p.capacity || "");
        setProductHead(p.producthead || "");
        setProductSize(p.productsize || "");
        setTemperature(p.temperature || "");
        setViscosity(p.viscosity || "");
        setSubmergenceLength(p.SubmergenceLength || "");
        setOperatingFrequency(p.operating_frequency || "");
        setMaterial(p.material || "");
        setSeoTitle(p.pageIETitle);
        setMetaTags(p.meta);
        setPendingCategoryId(p.categoryId || "");
        setExistingImages({
            image1: p.image1,
            image2: p.image2,
            //image3: p.image3,
        });
        //if (p.categoryId) {
        //    const ids = p.categoryId.split(",");
        //    const selected = categoryOptions.filter(opt => ids.includes(opt.value));
        //    setSelectedCategories(selected);
        //}

        setExistingCatalogue(p.catelogue);
    }; 
    // ================= SUBMIT =================
    const handleSubmit = async () => {
        if (!title.trim()) {
            alert("Product name is required");
            return;
        } 
        setLoading(true); 
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("Visible", visible === "yes" ? "true" : "false");
            formData.append("isFeatured", isFeatured === "yes" ? "true" : "false");
            formData.append("isaddcontact", isAddContact === "yes" ? "true" : "false");
            const catIds = selectedCategories.map(x => x.value).join(",");
            formData.append("CategoryId", catIds);
            formData.append("description", description);
            formData.append("technicalDetails", technicalDetails);
            formData.append("MOC", moc);
            formData.append("applications", applications);
            formData.append("Capacity", capacity);
            formData.append("producthead", productHead);
            formData.append("productsize", productSize);
            formData.append("temperature", temperature);
            formData.append("viscosity", viscosity);
            formData.append("SubmergenceLength", SubmergenceLength);
            formData.append("operating_frequency", operatingFrequency);
            formData.append("material", material);
            formData.append("PageIETitle", seoTitle);
            formData.append("Meta", metaTags);

            // Files
            if (images[0]) formData.append("image1", images[0]);
            if (images[1]) formData.append("image2", images[1]);
            //if (images[2]) formData.append("image3", images[2]);
            if (catalogue) formData.append("catalogue", catalogue);

            if (isEdit) {
                // ✅ EDIT MODE: API call to Update
                await api.put(`/product/edit/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                // ✅ ADD MODE: API call to Add
                await api.post("/product/add", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            navigate("/poweradmin/view-product");
        } catch (err) {
            console.error(err);
            alert(isEdit ? "Update failed" : "Save failed");
        } finally {
            setLoading(false);
        }
    };

    // ================= JSX =================
    return (
        <div className="min-h-screen">
            <PageHeader
                title="Add Product"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: isEdit ? "Edit Product" : "Add Product" },
                ]}
            />

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <h2 className="mb-6 text-xl font-semibold">
                    {isEdit ? "Edit Product" : "Add Product"}
                </h2>

                {/* PRODUCT NAME */}
                <div className="mt-6">
                    <label className="font-medium">
                        Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>
                <div className="mt-6">
                    <label className="font-medium">Select Categories  <span className="text-red-500">*</span></label>
                    <Select
                        isMulti
                        options={categoryOptions}
                        value={selectedCategories}
                        onChange={setSelectedCategories}
                        className="mt-2"
                        placeholder="Choose categories..."
                    />
                </div>
                 <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        ["Display on Frontend? ", visible, setVisible],
                        //["Is Featured?", isFeatured, setIsFeatured],
                        //["Only Viw Contact Button?", isAddContact, setIsAddContact],
                      
                    ].map(([label, value, setter]) => (
                        <div key={label}>
                            <p className="font-medium">{label}</p>
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    checked={value === "yes"}
                                    onChange={() => setter("yes")}
                                />{" "}
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    checked={value === "no"}
                                    onChange={() => setter("no")}
                                />{" "}
                                No
                            </label>
                        </div>
                    ))}
                </div>

                {/* IMAGES */}
                {/* PRODUCT IMAGES */}
                <div className="mt-6">
                    <p className="mb-2 font-medium text-gray-700">
                        Product Images 
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* IMAGE 1 */}
                        <div>
                            <label className="text-sm font-medium">Upload Gif</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const files = [...images];
                                    files[0] = e.target.files[0];
                                    setImages(files);
                                }}
                                className="w-full rounded border px-2 py-1 text-sm"
                            />
                        </div>

                        {/* IMAGE 2 */}
                        <div>
                            <label className="text-sm font-medium">Upload Image  <span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const files = [...images];
                                    files[1] = e.target.files[0];
                                    setImages(files);
                                }}
                                className="w-full rounded border px-2 py-1 text-sm"
                            />
                        </div>

                        {/* IMAGE 3 */}
                        {/*<div>*/}
                        {/*    <label className="text-sm font-medium">Image 3</label>*/}
                        {/*    <input*/}
                        {/*        type="file"*/}
                        {/*        accept="image/*"*/}
                        {/*        onChange={(e) => {*/}
                        {/*            const files = [...images];*/}
                        {/*            files[2] = e.target.files[0];*/}
                        {/*            setImages(files);*/}
                        {/*        }}*/}
                        {/*        className="w-full rounded border px-2 py-1 text-sm"*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                </div>


                {/* EXISTING IMAGES (EDIT) */}
                {isEdit && (
                    <div className="mt-4">
                        <p className="mb-2 font-medium text-gray-700">
                            Existing Images
                        </p>
                        <div className="flex gap-4">
                            {Object.values(existingImages).map(
                                (img, i) =>
                                    img && (
                                        <img
                                            key={i}
                                            /*  src={img}*/
                                            src={`${IMAGE_BASE_URL}/${img}`}
                                            className="h-24 w-24 rounded border object-cover"
                                        />
                                    )
                            )}
                        </div>
                    </div>
                )} 
                <div className="mt-6">
                    <label className="mb-1 block font-medium text-gray-700">
                        Product Catalogue (PDF)
                    </label>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setCatalogue(e.target.files[0])}
                        className="w-full rounded border px-3 py-2 text-sm"
                    />

                    <p className="mt-1 text-xs text-gray-500">
                        Upload product catalogue in PDF format
                    </p>

                    {existingCatalogue && (
                        <p className="mt-2 text-sm">
                            Existing Catalogue:{" "}
                            <a
                              //  href={existingCatalogue}
                                href={`${IMAGE_BASE_URL}${existingCatalogue}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 underline"
                            >
                                View PDF
                            </a>
                        </p>
                    )}
                </div>

                {/* EDITORS */}
                {/*{[*/}
                {/*    ["Product Description", description, setDescription],*/}
                {/*    ["Technical Details", technicalDetails, setTechnicalDetails],*/}
                {/*    ["MOC", moc, setMoc],*/}
                {/*    ["Applications", applications, setApplications],*/}
                {/*].map(([label, val, setter]) => (*/}
                {/*    <div className="mt-6" key={label}>*/}
                {/*        <label className="font-medium">{label}</label>*/}
                {/*        <TinyEditor value={val} onChange={setter} />*/}
                {/*    </div>*/}
                {/*))}*/}

                <div className="mt-6">
                    <label className="font-medium text-gray-700">Product Description  <span className="text-red-500">*</span></label>
                    <textarea
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="6"
                        placeholder="Enter product description here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className="font-medium">Capacity</label>
                        <input
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Product Head</label>
                        <input
                            value={productHead}
                            onChange={(e) => setProductHead(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Product Size</label>
                        <input
                            value={productSize}
                            onChange={(e) => setProductSize(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Temperature</label>
                        <input
                            value={temperature}
                            onChange={(e) => setTemperature(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Viscosity</label>
                        <input
                            value={viscosity}
                            onChange={(e) => setViscosity(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Operating Frequency</label>
                        <input
                            value={operatingFrequency}
                            onChange={(e) => setOperatingFrequency(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div> 
                    <div>
                        <label className="font-medium">Material</label>
                        <textarea
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                            rows={3}
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Submergence Length</label>
                        <input
                            value={SubmergenceLength}
                            onChange={(e) => setOperatingFrequency(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>

                </div>


                {/* SEO */}
                <SeoMetaSection
                    seoTitle={seoTitle}
                    setSeoTitle={setSeoTitle}
                    metaTags={metaTags}
                    setMetaTags={setMetaTags}
                />
               
                {/* SUBMIT */}
                <div className="mt-8 text-right">
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="rounded-lg bg-indigo-600 px-6 py-2 text-white"
                    >
                        {loading ? "Saving..." : "Save Product"}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AddProduct;
