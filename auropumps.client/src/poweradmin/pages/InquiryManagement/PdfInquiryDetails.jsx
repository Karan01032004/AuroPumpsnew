import {
    HiOutlineArrowLeft,
    HiOutlineMail,
    HiOutlineUser,
    HiOutlinePhone
} from "react-icons/hi";
import { MdOutlineSubject } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import { BiMessageRoundedDetail } from "react-icons/bi";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function PdfInquiryDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [inquiry, setInquiry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "View PDF Inquiry | PowerAdmin";
        fetchInquiry();
    }, [id]);

    const fetchInquiry = async () => {
        try {
            const res = await api.get(`/product/pdf-inquiry/${id}`);
            setInquiry(res.data);
        } catch (error) {
            console.error("Failed to load PDF inquiry", error);
            setInquiry(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!inquiry) {
        return <div className="p-6">PDF Inquiry not found</div>;
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-8">

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                    PDF Inquiry Details
                </h2>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                    <HiOutlineArrowLeft className="text-lg" />
                    Back
                </button>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <DetailItem
                    icon={<HiOutlineUser />}
                    label="Name"
                    value={inquiry.name}
                />

                <DetailItem
                    icon={<HiOutlineMail />}
                    label="Email ID"
                    value={inquiry.email}
                />

                <DetailItem
                    icon={<HiOutlinePhone />}
                    label="Contact No."
                    value={inquiry.phone}
                />

                <DetailItem
                    icon={<MdOutlineSubject />}
                    label="Company Name"
                    value={inquiry.companyName}
                />

                <DetailItem
                    icon={<MdOutlineSubject />}
                    label="Product"
                    value={inquiry.productName}
                />

                <DetailItem
                    icon={<FiCalendar />}
                    label="Inquiry Date"
                    value={
                        inquiry.addedDate
                            ? new Date(inquiry.addedDate).toLocaleString("en-IN")
                            : "-"
                    }
                />

            </div>

            {/* Message */}
            <div className="mt-8">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex gap-4">
                        <div className="mt-0.5 text-lg text-indigo-500">
                            <BiMessageRoundedDetail />
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                                Message
                            </p>
                            <p className="mt-1 leading-relaxed text-gray-900">
                                {inquiry.message || "-"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

const DetailItem = ({ icon, label, value }) => (
    <div className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="mt-0.5 text-lg text-indigo-500">{icon}</div>

        <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
                {label}
            </p>
            <p className="mt-1 font-medium text-gray-900">
                {value || "-"}
            </p>
        </div>
    </div>
);

export default PdfInquiryDetails;