import React, { useEffect, useState } from "react";
import ImageUpload from "../../components/Forms/ImageUpload";
import TinyEditor from "../../components/Forms/TinyEditor";
import SeoMetaSection from "../../components/Forms/SeoMetaSection";
import PageHeader from "../../components/PageHeader";

const AddBlog = () => {
    const [displayOnFrontend, setDisplayOnFrontend] = useState("yes");
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => {
        document.title = "Add Blog | PowerAdmin";
    }, []);
    return (
        <div className="min-h-screen">
            <PageHeader
                title="Blog Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "Add Blog" },
                ]}
            />
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-6">
                <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
                    Add Blog
                </h2>

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
                        Blog Name 
                    </label>
                    <input
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter blog name"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>
                {/* Blog Basic Info */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    

                    {/* Blog Date */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-white">
                            Blog Date
                        </label>
                        <input
                            type="date"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        />
                    </div>

                    {/* Post By */}
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 dark:text-white">
                            Post By
                        </label>
                        <input
                            placeholder="Author name"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        />
                    </div>
                </div>

                {/* Category Image */}
                <div className="mt-6">
                    <ImageUpload
                        label="Blog Image"
                        required
                        onChange={(file) =>
                            console.log("Category Image:", file)
                        }
                    />
                </div>
                {/* Short Description */}
                <div className="mt-6">
                    <label className="mb-1 block font-medium text-gray-700 dark:text-white">
                        Short Description
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Enter short description"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>

                {/* Description */}
                <div className="mt-6">
                    <label className="mb-1 block font-medium text-gray-700 dark:text-white">
                        Long Description
                    </label>
                    <div className="rounded-lg border border-gray-300">
                        <TinyEditor
                            value={description}
                            onChange={setDescription}
                        />

                    </div>
                </div>

                {/* SEO Meta */}
                <SeoMetaSection />

                {/* Submit */}
                <div className="mt-8 flex justify-end">
                    <button className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700">
                        Save Category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;
