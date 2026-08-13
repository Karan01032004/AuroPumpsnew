import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";
import { IMAGE_BASE_URL } from "../../api/axios";
import TinyEditor from "../../components/Forms/TinyEditor";
import SeoMetaSection from "../../components/Forms/SeoMetaSection";
const AddApplication = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [metaTags, setMetaTags] = useState("");
    const [description, setDescription] = useState("");
    const [faqs, setFaqs] = useState([
        {
            question: "",
            answer: "",
            sort_order: 1,
            visible: true
        }
    ]);
    const [visible, setVisible] = useState("yes");

    const [productOptions, setProductOptions] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState({});
    // 🔥 Nayi state taaki track ho sake kaunsi image delete ki hai
    const [deletedImages, setDeletedImages] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            const options = await loadProducts();
            if (isEdit) {
                await loadApplication(options);
            }
        };

        init();
    }, [id]);

    const loadProducts = async () => {
        try {
            const res = await api.get("/product/list");
            const options = res.data.map(p => ({
                value: p.id.toString(),
                label: p.productName
            }));
            setProductOptions(options);
            return options;
        } catch (err) {
            console.error(err);
            return [];
        }
    };

    const loadApplication = async (options) => {
        try {
            const res = await api.get(`/application/${id}`);
            const data = res.data;

            setTitle(data.title);
            setDescription(data.description);
            setVisible(data.visible ? "yes" : "no");
            setMetaTags(data.meta);
            if (data.product_ids) {
                const idsArray = data.product_ids.split(",");
                const selected = options.filter(opt =>
                    idsArray.includes(opt.value)
                );
                setSelectedProducts(selected);
            }

            setExistingImages({
                image1: data.image1,
                image2: data.image2,
                image3: data.image3,
                image4: data.image4,
                image5: data.image5,
                image6: data.image6,
                image7: data.image7,
                image8: data.image8
            });

            if (data.faqs && data.faqs.length > 0) {
                setFaqs(data.faqs);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // 🔥 Existing image ko local state se temporary remove karne ka logic
    const handleRemoveExistingImage = (key) => {
        // State se image path hatao taaki UI se gayab ho jaye
        setExistingImages(prev => ({
            ...prev,
            [key]: null
        }));
        // Deleted list me daalo taaki backend ko bata sakein
        setDeletedImages(prev => [...prev, key]);
    };

    // ================= SUBMIT =================
    const handleSubmit = async () => {
        if (!title.trim()) {
            alert("Title required");
            return;
        }

        // Check karo ki Image 1 hai ya nahi (Nayi upload ki ho ya fir purani bachi ho)
        if (!images[0] && !existingImages.image1) {
            alert("Image 1 is required!");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("Visible", visible === "yes" ? "true" : "false");
            formData.append("meta", metaTags);
            const productIds = selectedProducts.map(p => p.value).join(",");
            formData.append("product_ids", productIds);
            formData.append("FAQs", JSON.stringify(faqs));

            // Naye images append karo
            for (let i = 0; i < 8; i++) {
                if (images[i]) {
                    formData.append(`image${i + 1}`, images[i]);
                }
            }

            // 🔥 Backend ko batao kaun-kaun si purani images delete karni hain
            formData.append("deleted_images", JSON.stringify(deletedImages));

            if (isEdit) {
                await api.put(`/application/update/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                await api.post("/application/add", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }

            navigate("/poweradmin/view-application");

        } catch (err) {
            console.error(err);
            alert("Save failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <PageHeader
                title={isEdit ? "Edit Application" : "Add Application"}
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: isEdit ? "Edit Application" : "Add Application" }
                ]}
            />

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

                {/* TITLE */}
                <div className="mt-4">
                    <label className="font-medium">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                {/* PRODUCTS MULTI SELECT */}
                <div className="mt-6">
                    <label className="font-medium">Select Products</label>
                    <Select
                        isMulti
                        options={productOptions}
                        value={selectedProducts}
                        onChange={setSelectedProducts}
                        className="mt-2"
                    />
                </div>

                {/* VISIBLE */}
                <div className="mt-6">
                    <p className="font-medium">Display on Frontend?</p>
                    <label className="mr-4 cursor-pointer">
                        <input
                            type="radio"
                            checked={visible === "yes"}
                            onChange={() => setVisible("yes")}
                        /> Yes
                    </label>
                    <label className="cursor-pointer">
                        <input
                            type="radio"
                            checked={visible === "no"}
                            onChange={() => setVisible("no")}
                        /> No
                    </label>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-6">
                    <label className="font-medium">Description  <span className="text-red-500">*</span></label>
                    <TinyEditor
                        value={description}
                        onChange={setDescription}
                    />
                </div>

                {/* FAQ SECTION */}
                <div className="mt-8 border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Application FAQs</h3>
                        <button
                            type="button"
                            onClick={() =>
                                setFaqs([
                                    ...faqs,
                                    {
                                        question: "",
                                        answer: "",
                                        sort_order: faqs.length + 1,
                                        visible: true
                                    }
                                ])
                            }
                            className="bg-green-600 text-white px-3 py-2 rounded"
                        >
                            + Add More FAQ
                        </button>
                    </div>

                    {faqs.map((faq, index) => (
                        <div key={index} className="border rounded-lg p-4 mb-4 bg-white">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="font-semibold">FAQ #{index + 1}</h4>
                                {faqs.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setFaqs(faqs.filter((_, i) => i !== index))}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="font-medium">Title</label>
                                <input
                                    type="text"
                                    value={faq.question}
                                    onChange={(e) => {
                                        const updated = [...faqs];
                                        updated[index].question = e.target.value;
                                        setFaqs(updated);
                                    }}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="font-medium">Description</label>
                                <TinyEditor
                                    value={faq.answer}
                                    onChange={(content) => {
                                        const updated = [...faqs];
                                        updated[index].answer = content;
                                        setFaqs(updated);
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="font-medium">Sort Order</label>
                                <input
                                    type="number"
                                    value={faq.sort_order}
                                    onChange={(e) => {
                                        const updated = [...faqs];
                                        updated[index].sort_order = parseInt(e.target.value) || 0;
                                        setFaqs(updated);
                                    }}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* UPLOAD IMAGES */}
                <div className="mt-6">
                    <p className="font-bold text-lg mb-4">Upload Application Images</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">
                                    Image {i + 1}
                                    {i === 0 && <span className="text-indigo-600 ml-1 font-bold">*</span>}
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const files = [...images];
                                        files[i] = e.target.files[0];
                                        setImages(files);
                                    }}
                                    className={`w-full border rounded-md px-2 py-1 text-sm ${i === 0 && !existingImages.image1 ? 'border-red-300' : ''}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🔥 EXISTING IMAGES WITH CROSS (REMOVE) BUTTON */}
                {isEdit && Object.values(existingImages).some(img => img !== null) && (
                    <div className="pt-6">
                      
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
                            {["image1", "image2", "image3"].map((key) => {
                                const imgPath = existingImages[key];

                                return (
                                    <div
                                        key={key}
                                        className="relative flex flex-col items-center gap-2 border p-2 rounded-lg bg-gray-50 min-h-[150px]"
                                    >
                                        <span className="text-xs font-bold text-indigo-600 uppercase">
                                            {key === "image1"
                                                ? "Image 1 *"
                                                : `Image ${key.replace("image", "")}`}
                                        </span>

                                        {imgPath ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveExistingImage(key)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs"
                                                >
                                                    ✕
                                                </button>

                                                <img
                                                    src={`${IMAGE_BASE_URL}${imgPath}`}
                                                    alt={key}
                                                    className="h-24 w-full object-cover rounded border bg-white"
                                                />
                                            </>
                                        ) : (
                                            <div className="h-24 w-full border-2 border-dashed rounded flex items-center justify-center text-gray-400">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <SeoMetaSection
                   
                    metaTags={metaTags}
                    setMetaTags={setMetaTags}
                />
                {/* SUBMIT */}
                <div className="mt-8 text-right">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dynamic-btn"
                    >
                        {loading ? "Saving..." : "Save Application"}
                    </button>
                </div>

            </div>
        </div>
    );
};
export default AddApplication;