import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";
import { useParams } from "react-router-dom";

const AddCategory = () => {
    const [displayOnFrontend, setDisplayOnFrontend] = useState("yes");
    const [categoryName, setCategoryName] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { id } = useParams(); // id aaye to EDIT mode
    const isEditMode = !!id;

    useEffect(() => {
        document.title = isEditMode
            ? "Edit Category | PowerAdmin"
            : "Add Category | PowerAdmin";

        if (isEditMode) {
            fetchCategory();
        }
    }, [id]);
    const fetchCategory = async () => {
        try {
            const res = await api.get(`/category/${id}`);
            setCategoryName(res.data.title);
            setDisplayOnFrontend(res.data.isvisible ? "yes" : "no");
        } catch (err) {
            setError("Failed to load category",err);
        }
    };

    const handleSubmit = async () => {
        setError("");
        setSuccess("");

        if (!categoryName.trim()) {
            setError("Category name is required");
            return;
        }
        setLoading(true);

        try {
            if (isEditMode) {
              
                const res = await api.put(`/category/update/${id}`, {
                    title: categoryName,
                    isvisible: displayOnFrontend === "yes",
                });
                setSuccess(res.data.message);
            } else {
             
                const res = await api.post("/category/add", {
                    title: categoryName,
                    isvisible: displayOnFrontend === "yes",
                });
                setSuccess(res.data.message);
                setCategoryName("");
                setDisplayOnFrontend("yes");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <PageHeader
                title="Add Category"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "View Category" },
                ]}
            /> 
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-6">
                <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
                    Add Category
                </h2>

                {/* ERROR */}
                {error && (
                    <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-700">
                        {error}
                    </div>
                )}

                {/* SUCCESS */}
                {success && (
                    <div className="mb-4 rounded bg-green-100 px-4 py-2 text-green-700">
                        {success}
                    </div>
                )}

                {/* Display Toggle */}
                <div className="mt-6">
                    <p className="mb-2 font-medium text-gray-700 dark:text-white">
                        Display on Front-End?
                    </p>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="yes"
                                checked={displayOnFrontend === "yes"}
                                onChange={(e) =>
                                    setDisplayOnFrontend(e.target.value)
                                }
                            />
                            Yes
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="no"
                                checked={displayOnFrontend === "no"}
                                onChange={(e) =>
                                    setDisplayOnFrontend(e.target.value)
                                }
                            />
                            No
                        </label>
                    </div>
                </div>

                {/* Category Name */}
                <div className="mt-6">
                    <label className="mb-1 block font-medium text-gray-700 dark:text-white">
                        Category Name
                    </label>
                    <input
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
                    >
                        {loading ? "Saving..." : "Save Category"}
                    </button>
                </div>
            </div>
        </div>
    );
}; 
export default AddCategory;
