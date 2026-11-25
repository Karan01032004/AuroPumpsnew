
import FAQAccordion from "../../components/FAQ/FAQ";

function FAQ() {
    const faqs = [
        {
            question: "What is Auro Pumps?",
            answer: "Auro Pumps is a manufacturer of industrial pumps."
        },
        {
            question: "Which industries do Auro Pumps serve?",
            answer: "Auro Pumps serves steel, chemical, pharmaceutical, and energy industries."
        },
        {
            question: "How can I contact Auro Pumps?",
            answer: "You can contact us through our Contact Us page."
        }
    ];

    return (
        <section className="py-10">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Frequently Asked Questions
                </h1>

                <FAQAccordion faqs={faqs} />
            </div>
        </section>
    );
}

export default FAQ;
