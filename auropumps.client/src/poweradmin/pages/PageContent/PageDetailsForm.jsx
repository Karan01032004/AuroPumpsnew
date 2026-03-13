import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SeoMetaSection from "../../components/Forms/SeoMetaSection";
import TinyEditor from "../../components/Forms/TinyEditor";
import api from "../../api/axios";

const PageContentForm = () => {
    const { id } = useParams();  
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [title, setTitle] = useState("");
    const [pageName, setPageName] = useState("");
    const [description, setDescription] = useState("");
    const [metaTags, setMetaTags] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = isEdit
            ? "Edit Page Content | PowerAdmin"
            : "Add Page Content | PowerAdmin";

        if (isEdit) fetchPage();
    }, [id]);

    // ===============================
    // ✅ FETCH PAGE (EDIT MODE)
    // ===============================
    const fetchPage = async () => {
        try {
            const res = await api.get(`/pagecontent/getbyid/${id}`);
            const data = res.data;

            setTitle(data.title);
            setPageName(data.page_Name);
            setDescription(data.description);
            setMetaTags(data.meta_Tags || "");
        } catch (error) {
            console.error("Failed to load page content", error);
        }
    };

    // ===============================
    // ✅ SUBMIT (ADD / UPDATE)
    // ===============================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            page_Name: pageName,
            description,
            meta_Tags: metaTags
        };

        setLoading(true);

        try {
            if (isEdit) {
                await api.put(`/pagecontent/update/${id}`, payload);
            } else {
                await api.post(`/pagecontent/add`, payload);
            }

            navigate("/poweradmin/page-content");
        } catch (error) {
            console.error("Save failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm"
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        {isEdit ? "Edit Page Content" : "Add Page Content"}
                    </h2>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="rounded-lg border border-gray-300 px-4 py-2 
                        text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/10"
                    >
                        ← Back
                    </button>
                </div>
                {/* Title */}
                {/*<div className="mt-4">*/}
                {/*    <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">*/}
                {/*        Title <span className="text-red-500">*</span>*/}
                {/*    </label>*/}
                {/*    <input*/}
                {/*        value={title}*/}
                {/*        onChange={(e) => setTitle(e.target.value)}*/}
                {/*        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}

                {/* Page Name */}
                <div className="mt-4">
                    <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">
                        Page Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={pageName}
                        onChange={(e) => setPageName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
                        required
                    />
                </div>

                {/* Page Content */}
                <div className="mt-6">
                    <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">
                        Page Content <span className="text-red-500">*</span>
                    </label>
                    <div className="rounded-lg border border-gray-300 dark:border-gray-700">
                        <TinyEditor
                            value={description}
                            onChange={setDescription}
                        />
                    </div>
                </div>

                {/* SEO (UNCHANGED) */}
                <SeoMetaSection
                    seoTitle={title}
                    setSeoTitle={setTitle}
                    metaTags={metaTags}
                    setMetaTags={setMetaTags}
                />

                {/* Submit */}
                <div className="mt-8 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
                    >
                        {loading ? "Saving..." : "Save Page"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PageContentForm;
