import { Outlet } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

const BannerManagement = () => {
    return (
        <div>
            <PageHeader
                title="Banner Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "Banner Management" }
                ]}
            />

            {/* 👇 This is where BannerTable / BannerForm will render */}
            <Outlet />
        </div>
    );
};

export default BannerManagement;
