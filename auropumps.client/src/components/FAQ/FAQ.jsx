import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
    {
        question: "What services do you offer?",
        answer:
            "We provide web development, mobile app development, UI/UX design, and digital solutions.",
    },
    {
        question: "How long does a project take?",
        answer:
            "Project timelines depend on requirements, but most projects are completed within 2-8 weeks.",
    },
    {
        question: "Do you provide support after launch?",
        answer:
            "Yes, we offer ongoing maintenance and support packages after deployment.",
    },
    {
        question: "Can I request custom features?",
        answer:
            "Absolutely! We build solutions tailored to your business requirements.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="pt-4 lg:pt-6">
            <div className="max-w-4xl mx-auto">
               
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`border rounded-xl bg-white overflow-hidden transition-all duration-300 ${isOpen
                                        ? "border-[#2D258E] shadow-lg"
                                        : "border-gray-200 hover:border-[#2D258E]"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between p-5 text-left group"
                                >
                                    <h3
                                        className={`font-semibold text-base md:text-lg transition-colors duration-300 ${isOpen
                                                ? "text-[#2D258E]"
                                                : "text-gray-800 group-hover:text-[#2D258E]"
                                            }`}
                                    >
                                        {faq.question}
                                    </h3>

                                    <span className="text-[#2D258E] text-lg">
                                        {isOpen ? <FaMinus /> : <FaPlus />}
                                    </span>
                                </button>

                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <p className="px-5 pb-5 text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}