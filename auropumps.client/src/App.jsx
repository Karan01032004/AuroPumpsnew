import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import Company from "./pages/Company/Company";
import Application from "./pages/Application/Application";
import Products from "./pages/Products/Products";
import ThankYou from "./pages/ThankYou/ThankYou";
import Error from "./pages/Error/Error";
import SiteMap from "./pages/SiteMap/SiteMap";
import ScrollToTop from "./components/Common/ScrollToTop";
import ScrollToHash from "./components/Common/ScrollToHash";

import { ThemeProvider } from "./poweradmin/context/ThemeContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Dashboard from "./poweradmin/pages/Dashboard/Dashboard";
import PoweradminLayout from "./poweradmin/layout/PoweradminLayout";
import BannerManagement from "./poweradmin/pages/BannerManagemnet/BannerManagement";
import BannerForm from "./poweradmin/pages/BannerManagemnet/BannerForm";
import BannerTable from "./poweradmin/pages/BannerManagemnet/BannerTable";
import InquiryTable from "./poweradmin/pages/InquiryManagement/InquiryTable";
import PageContentTable from "./poweradmin/pages/PageContent/PageContentTable";
import PageDetailsForm from "./poweradmin/pages/PageContent/PageDetailsForm";
import AddProduct from "./poweradmin/pages/ProductManagement/AddProduct";
import ViewProduct from "./poweradmin/pages/ProductManagement/ViewProduct";
import AddCategory from "./poweradmin/pages/CategoryManagement/AddCategory";
import ViewCategory from "./poweradmin/pages/CategoryManagement/ViewCategory";
import SignIn from "./poweradmin/pages/SignIn/SignIn";
import ForgotPassword from "./poweradmin/pages/ForgotPassword/ForgotPassword";
import OtpVerify from "./poweradmin/pages/ForgotPassword/OtpVerify";
import AddBlog from "./poweradmin/pages/BlogManagement/AddBlog";
import ViewBlog from "./poweradmin/pages/BlogManagement/ViewBlogs";
import AddImageGallery from "./poweradmin/pages/CategoryManagement/AddImageGallery";
import Viewimagegallery from "./poweradmin/pages/CategoryManagement/Viewimagegallery";
import InquiryDetails from "./poweradmin/pages/InquiryManagement/InquiryDetails";
import AddProductCategory from "./poweradmin/pages/ProductManagement/AddCategory";
import ViewProductCategory from "./poweradmin/pages/ProductManagement/ViewCategory";

function App() {
    return (
        <BrowserRouter basename="/auropumps">
            <ScrollToTop />
            <ScrollToHash />
            <Routes>
                {/* Layout Route */}
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="contact-us" element={<ContactUs />} />
                    <Route path="company" element={<Company />} />
                    <Route path="application" element={<Application />} />
                    <Route path="application/:categoryId/:productId" element={<Application />} />
                    <Route path="products" element={<Products />} />
                    <Route path="/products/:categorySlug/:productSlug" element={<Products />} />
                    <Route
                        path="/thank-you"
                        element={<ThankYou />}
                    />
                    <Route
                        path="/sitemap"
                        element={<SiteMap />}
                    />
                    <Route
                        path="/error"
                        element={<Error />}
                    />
                </Route>
            </Routes>

            <ThemeProvider>
                <Toaster position="top-right" reverseOrder={false} /> {/* Ye line add karein */}
                {/*   <BrowserRouter basename="/auropumps">  </BrowserRouter>*/}
                {/* <BrowserRouter basename="/auropumps/">*/}
                <Routes>
                    <Route path="signin" element={<SignIn />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/verify-otp" element={<OtpVerify />} />
                    {/*<Route path="/poweradmin" element={<AppLayout />}>*/}
                    <Route
                        path="/poweradmin"
                        element={
                            <ProtectedRoute>
                                <PoweradminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="inquiry" element={<InquiryTable />} />
                        <Route path="page-content" element={<PageContentTable />} />
                        <Route path="add-product" element={<AddProduct />} />
                        <Route path="view-product" element={<ViewProduct />} />
                        <Route path="add-category" element={<AddCategory />} />
                        <Route path="Addimagegallery" element={<AddImageGallery />} />
                        <Route path="Viewimagegallery" element={<Viewimagegallery />} />
                        <Route path="view-category" element={<ViewCategory />} />
                        <Route path="view-inquiry/:id" element={<InquiryDetails />} />
                        <Route path="edit-category/:id" element={<AddCategory />} />
                        <Route path="edit-image-gallery/:id" element={<AddImageGallery />} />
                        <Route path="edit-product/:id" element={<AddProduct />} />
                        <Route path="page-content/:id" element={<PageDetailsForm />} />
                        <Route path="pagecontent/add" element={<PageDetailsForm />} />
                        <Route path="add-blog" element={<AddBlog />} />
                        <Route path="view-blog" element={<ViewBlog />} />
                        <Route path="add-Productcategory" element={<AddProductCategory />} />
                        <Route path="edit-Productcategory/:id" element={<AddProductCategory />} />
                        <Route path="view-Productcategory" element={<ViewProductCategory />} />
                        <Route path="banner" element={<BannerManagement />}>
                            <Route index element={<BannerTable />} />
                            <Route path="add" element={<BannerForm />} />
                            <Route path="edit/:id" element={<BannerForm />} /> </Route>
                    </Route>
                </Routes>
                {/*</BrowserRouter>*/}

            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;