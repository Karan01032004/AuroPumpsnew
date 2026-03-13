import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ThemeButton = ({
    text = "DISCOVER SOLUTIONS",
    link = "/",
    className = "",
    type = "link", // Naya prop: 'link' ya 'submit'
    onClick,       // Click handler support
}) => {
    // Shared classes taaki design dono mein same rahe
    const commonClasses = `group inline-flex items-center justify-between gap-4 bg-primary text-white rounded-full transition-all duration-500 ease-out px-3 md:px-4 py-2 ${className}`;

    const content = (
        <>
            <span>{text}</span>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white transition-all duration-500 ease-out group-hover:translate-x-2">
                <FiChevronRight className="w-4 h-4 text-[#737373] transition-transform duration-500" />
            </span>
        </>
    );

    // Agar type 'submit' hai toh <button> render karega, warna <Link>
    if (type === "submit") {
        return (
            <button type="submit" onClick={onClick} className={commonClasses}>
                {content}
            </button>
        );
    }

    return (
        <Link to={link} onClick={onClick} className={commonClasses}>
            {content}
        </Link>
    );
};

export default ThemeButton;