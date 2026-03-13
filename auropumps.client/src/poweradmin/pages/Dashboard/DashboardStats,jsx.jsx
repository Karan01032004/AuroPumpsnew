import {
    HiOutlineCube,
    HiOutlineDocumentText,
    HiOutlineChatAlt2,
} from "react-icons/hi";

const stats = [
    {
        label: "Total Products",
        value: "1,284",
        icon: HiOutlineCube,
        change: "+20%",
    },
    {
        label: "Total Blogs",
        value: "328",
        icon: HiOutlineDocumentText,
        change: "+12%",
    },
    {
        label: "Total Inquiry",
        value: "96",
        icon: HiOutlineChatAlt2,
        change: "+8%",
    },
];

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {stats.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div
                        key={index}
                        className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5
            dark:border-gray-800 dark:bg-gray-900"
                    >
                        {/* Left */}
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700
                dark:bg-gray-800 dark:text-gray-200">
                                <Icon size={24} />
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {item.value}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {item.label}
                                </p>
                            </div>
                        </div>

                        {/* Right */}
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700
              dark:bg-green-900/30 dark:text-green-400">
                            {item.change}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
