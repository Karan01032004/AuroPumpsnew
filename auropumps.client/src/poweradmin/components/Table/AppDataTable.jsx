import React from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "./AppDataTable.css";
import { useTheme } from "../../context/ThemeContext";

DataTable.use(DT);

function AppDataTable({ data, columns, searchPlaceholder = "Search..." }) {
    const { theme } = useTheme();

    return (
        <div className={`app-data-table-shell ${theme === "dark" ? "table-theme-dark" : "table-theme-light"}`}>
            <DataTable
                data={data}
                columns={columns}
                className="app-data-table w-full text-sm stripe hover nowrap"
                options={{
                    autoWidth: false,
                    scrollCollapse: true,
                    pageLength: 10,
                    lengthMenu: [10, 25, 50, 100],
                    pagingType: "simple_numbers",

                    language: {
                        lengthMenu: "_MENU_ entries per page",
                        search: "",
                        searchPlaceholder,
                    },

                    dom: `
                      <"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4"
                        l
                        f
                      >
                      rt
                      <"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4"
                        i
                        p
                      >
                    `,

                    initComplete: function () {
                        const lengthSelect =
                            document.querySelector(".dt-length select");
                        if (lengthSelect) {
                            lengthSelect.className =
                                "app-data-table-select rounded-lg border px-3 py-2 text-sm focus:outline-none";
                        }

                        const searchInput =
                            document.querySelector(".dt-search input");
                        if (searchInput) {
                            searchInput.className =
                                "app-data-table-search w-64 rounded-lg border px-4 py-2 text-sm focus:outline-none";
                        }
                    },
                }}
            />
        </div>
    );
}

export default AppDataTable;
