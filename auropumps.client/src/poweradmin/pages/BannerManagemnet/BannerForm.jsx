import React, { useState, useEffect } from "react";
import ImageUpload from "../../components/Forms/ImageUpload";
import TinyEditor from "../../components/Forms/TinyEditor";


const BannerForm = () => {
    useEffect(() => {
        document.title = "Add Banner | PowerAdmin";
    }, []);
    const [description, setDescription] = useState("");
    const [displayOnFrontend, setDisplayOnFrontend] = useState("yes");
    const [linkUrl, setLinkUrl] = useState("");
    const [altTag, setAltTag] = useState("");

    return (
        <div className="min-h-screen">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]  shadow-sm p-6">
                <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
                    Add Banner
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

                {/* Link URL & Alt Tag */}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block font-medium text-gray-700  dark:text-white">
                            Link URL
                        </label>
                        <input
                            type="url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium text-gray-700  dark:text-white">
                            Alt Tag Name
                        </label>
                        <input
                            value={altTag}
                            onChange={(e) => setAltTag(e.target.value)}
                            placeholder="Banner alt text"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        />
                    </div>
                </div>


                {/* Desktop Banner */}
                <div className="mt-6">
                    <ImageUpload
                        label="Desktop Banner Image"
                        required
                        onChange={(file) =>
                            console.log("Desktop Banner:", file)
                        }
                    />
                </div>

                {/* Mobile Banner */}
                <div className="mt-6">
                    <ImageUpload
                        label="Mobile Banner Image"
                        required
                        onChange={(file) =>
                            console.log("Mobile Banner:", file)
                        }
                    />
                </div>

                {/* Description */}
                <div className="mt-6">
                    <label className="mb-1 block font-medium text-gray-700  dark:text-white">
                        Description
                    </label>
                    <div className="rounded-lg border border-gray-300">
                        <TinyEditor
                            value={description}
                            onChange={setDescription}
                        />
                    </div>
                </div>

                {/* Submit */}
                <div className="mt-8 flex justify-end">
                    <button className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700">
                        Save Banner
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BannerForm;
