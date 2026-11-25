
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function FAQAccordion({ faqGroups = [] }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex((prevIndex) =>
            prevIndex === index ? null : index
        );
    };

    if (!faqGroups || faqGroups.length === 0) {
        return null;
    }

    return (
        <section className="pt-4 lg:pt-6">
            <div className="max-w-5xl mx-auto space-y-8">
                {faqGroups.map((group, groupIndex) => (
                    <div key={group.title}>
                        <h2 className="mb-5 lg:mb-6 text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                            {group.title}
                        </h2>

                        <div className="space-y-4">
                            {group.questions.map((faq, questionIndex) => {
                                const faqIndex = `${groupIndex}-${questionIndex}`;
                                const isOpen = openIndex === faqIndex;

                                return (
                                    <div
                                        key={faqIndex}
                                        className={`border rounded-lg bg-white overflow-hidden ${isOpen
                                                ? "border-[#2D258E] shadow-lg"
                                                : "border-gray-300 hover:border-[#2D258E]"
                                            }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFAQ(faqIndex)}
                                            aria-expanded={isOpen}
                                            className="w-full flex items-center justify-between gap-4 p-4 text-left group"
                                        >
                                            <h3
                                                className={`font-semibold text-base ${isOpen
                                                        ? "text-[#2D258E]"
                                                        : "text-gray-800 group-hover:text-[#2D258E]"
                                                    }`}
                                            >
                                                {faq.question}
                                            </h3>

                                            <span className="shrink-0 text-[#2D258E]">
                                                {isOpen ? <FaMinus /> : <FaPlus />}
                                            </span>
                                        </button>

                                        {isOpen && (
                                            <div className="border-t border-gray-300">
                                                <div
                                                    className="px-5 pb-5 pt-4 text-gray-600 leading-relaxed text-sm sm:text-base faq-answer"
                                                    dangerouslySetInnerHTML={{
                                                        __html: faq.answer,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
