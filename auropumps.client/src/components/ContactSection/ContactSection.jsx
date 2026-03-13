/*import React from "react";*/
import React, { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../poweradmin/api/axios";
import ThemeButton from "../ThemeButton";
import { useNavigate } from "react-router-dom";

const ContactSection = () => {
    const navigate = useNavigate();
    const getRandom = () => Math.floor(Math.random() * 10) + 1;
    const [errors, setErrors] = useState({});
    const validateForm = () => {

        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }
        if (!formData.companyName.trim()) {
            newErrors.companyName = "Company Name is required";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        if (!formData.captcha.trim()) {
            newErrors.captcha = "Captcha is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const [formData, setFormData] = useState({
        name: "",
        companyName: "",
        email: "",
        phone: "",
        message: "",
        captcha: ""
    });

    const [captchaData, setCaptchaData] = useState(() => {
        const n1 = getRandom();
        const n2 = getRandom();
        return { num1: n1, num2: n2, question: `${n1} + ${n2} = ?` };
    });

    const generateCaptcha = useCallback(() => {
        const num1 = getRandom();
        const num2 = getRandom();
        setCaptchaData({
            num1,
            num2,
            question: `${num1} + ${num2} = ?`
        });
    }, []);
     
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhoneKeyDown = (e) => {
        const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const correctAnswer = captchaData.num1 + captchaData.num2;

        if (parseInt(formData.captcha) !== correctAnswer) {
            toast.error("Captcha incorrect ❌");
            generateCaptcha();
            return;
        }

        try {

            const payload = {
                name: formData.name,
                companyName: formData.companyName,
                email: formData.email,
                phone: formData.phone,
                message: formData.message
            };

            

            //toast.success("Inquiry submitted successfully ✅");
            navigate("/thank-you");
            await api.post("/inquiry/submit", payload);
            setFormData({
                name: "",
                companyName: "",
                email: "",
                phone: "",
                message: "",
                captcha: ""
            });
            setErrors({});
            generateCaptcha();

        } catch (error) {
            toast.error("Something went wrong ❌",error);
        }
    };


    return (

        <section className="py-8 sm:py-14 md:py-16 lg:py-100 bg-white">
            <ToastContainer position="top-right" autoClose={2500} />
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">

                    {/* ================= LEFT SIDE ================= */}
                    <div>

                        {/* Office */}
                        <div className="flex items-start gap-4 mb-8">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-full bg-primary">
                                <picture>
                                    <source
                                        srcSet={`${import.meta.env.BASE_URL}/assets/images/location-icon.webp`}
                                        type="image/webp"
                                    />
                                    <img
                                        src={`${import.meta.env.BASE_URL}/assets/images/location-icon.png`}
                                        alt="Location icon"
                                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 object-contain"
                                    />
                                </picture>
                            </div>

                            <div>
                                <h4 className="font-semibold text-[#4B4B4B] text-lg">
                                    Registered Office & Works
                                </h4>
                                <p className="text-md text-secondary mt-1">
                                    Plot No. 104/5 & 6<br />
                                    G.I.D.C. Palej, Bharuch District, Gujarat – 392220, INDIA
                                </p>
                            </div>
                        </div>


                        {/* Email */}
                        <div className="flex items-start gap-4 mb-8">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-full bg-primary">
                                <picture>
                                    <source
                                        srcSet={`${import.meta.env.BASE_URL}/assets/images/email-icon.webp`}
                                        type="image/webp"
                                    />
                                    <img
                                        src={`${import.meta.env.BASE_URL}/assets/images/email-icon.png`}
                                        alt="email icon"
                                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 object-contain"
                                    />
                                </picture>
                            </div>

                            <div>
                                <h4 className="font-semibold text-[#4B4B4B] text-lg">
                                    Email ID
                                </h4>
                                <p className="text-md text-secondary mt-1 space-y-1">
                                    <a
                                        href="mailto:sales@auropumps.com"
                                        className="block hover:text-[#2D258E] transition-colors duration-300"
                                    >
                                        sales@auropumps.com
                                    </a>

                                    <a
                                        href="mailto:purchase@auropumps.com"
                                        className="block hover:text-[#2D258E] transition-colors duration-300"
                                    >
                                        purchase@auropumps.com
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Map */}
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Plot+No.+104/5+%26+6+GIDC+Palej+Bharuch+Gujarat+392220+India"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-lg overflow-hidden shadow-sm"
                        >
                            <iframe
                                title="Registered Office Location"
                                src="https://www.google.com/maps?q=Plot+No.+104/5+%26+6+GIDC+Palej+Bharuch+Gujarat+392220+India&output=embed"
                                className="w-full lg:h-96 border-0 pointer-events-none"
                                loading="lazy"
                            />
                        </a>

                    </div>

                    {/* ================= RIGHT SIDE ================= */}
                    <div className="bg-[#f3f2fb] py-5 px-3 lg:p-6">

                        <p className="text-primary uppercase font-medium">
                            Get in Touch
                        </p>

                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary mt-2">
                            Let’s discuss about your project
                        </h2>

                        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

                            {/* First Name */}
                            <div>
                                <label className="block text-md font-medium text-[#4B4B4B] mb-1">
                                    First Name *
                                </label>
                                {/*<input*/}
                                {/*    type="text"*/}
                                {/*    placeholder="Enter First Name"*/}
                                {/*    className="w-full px-4 py-3 rounded-md bg-white text-md outline-none border border-gray-200 placeholder:text-gray-400 focus:border-primary transition"*/}
                                {/*/>*/}
                                <input
                                    type="text"
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                    className="w-full px-4 py-3 rounded-md bg-white text-md outline-none border border-gray-200"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Company Name */}
                            <div>
                                <label className="block text-md font-medium text-[#4B4B4B] mb-1">
                                    Company Name *
                                </label>
                                {/*<input*/}
                                {/*    type="text"*/}
                                {/*    placeholder="Enter Company Name"*/}
                                {/*    className="w-full px-4 py-3 rounded-md bg-white text-md outline-none border border-gray-200 placeholder:text-gray-400 focus:border-primary transition"*/}
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Enter Company Name"
                                    className="w-full px-4 py-3 rounded-md bg-white text-md outline-none border border-gray-200"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                                )}
                                {/*/>*/}
                            </div>

                            {/* Email ID */}
                            <div>
                                <label className="block text-md font-medium text-[#4B4B4B] mb-1">
                                    Email ID *
                                </label>
                                {/*<input*/}
                                {/*    type="email"*/}
                                {/*    placeholder="Enter Email ID"*/}
                                {/*    className="w-full px-4 py-3 rounded-md bg-white text-md outline-none border border-gray-200 placeholder:text-gray-400 focus:border-primary transition"*/}
                                {/*/>*/}
                                <input
                                    type="email"
                                    name="email"
                                  
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter Email"
                                    className="w-full px-4 py-3 rounded-md bg-white text-md outline-none border border-gray-200"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Contact Number */}
                            <div>
                                <label className="block text-md font-medium text-[#4B4B4B] mb-1">
                                    Contact Number *
                                </label>
                                {/*<input*/}
                                {/*    type="tel"*/}
                                {/*    placeholder="Enter Contact Number"*/}
                                {/*    className="w-full px-4 py-3 rounded-md bg-white text-md outline-none border border-gray-200 placeholder:text-gray-400 focus:border-primary transition"*/}
                                {/*/>*/}
                                <input
                                    type="tel"
                                    name="phone"
                           
                                    maxLength="15"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onKeyDown={handlePhoneKeyDown}
                                    placeholder="Enter Contact Number"
                                    className="w-full px-4 py-3 rounded-md bg-white text-md outline-none border border-gray-200"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}

                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-md font-medium text-[#4B4B4B] mb-1">
                                    Message *
                                </label>
                                {/*<textarea*/}
                                {/*    rows="4"*/}
                                {/*    placeholder="Type......"*/}
                                {/*    className="w-full px-4 py-3 rounded-md bg-white text-md outline-none border border-gray-200 placeholder:text-gray-400 resize-none focus:border-primary transition"*/}
                                {/*></textarea>*/}
                                <textarea
                                    rows="4"
                                    name="message"
 
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Type your message"
                                    className="w-full px-4 py-3 rounded-md bg-white text-md outline-none border border-gray-200 resize-none"
                                ></textarea>
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-md font-medium text-[#4B4B4B] mb-1">
                                    Captcha *
                                </label>

                                <div className="flex items-center gap-3">
                                    {/*<input*/}
                                    {/*    type="text"*/}
                                    {/*    placeholder="Enter Captcha"*/}
                                    {/*    className="flex-1 px-4 py-2 rounded-md bg-white text-md outline-none border border-gray-200 placeholder:text-gray-400 focus:border-primary transition"*/}
                                    {/*/>*/}
                                    <input
                                        type="text"
                                        name="captcha"
                                       
                                        value={formData.captcha}
                                        onChange={handleChange}
                                        onKeyDown={handlePhoneKeyDown}
                                        placeholder="Enter Captcha"
                                        className="flex-1 px-4 py-3 rounded-md bg-white border border-gray-200"
                                    />
                                  

                                    <div className="px-4 py-2 bg-white rounded-md font-medium tracking-widest text-secondary text-lg select-none">
                                        {captchaData.question}
                                    </div>

                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.captcha}</p>
                                )}
                            </div>
                            <div>
                                <ThemeButton
                                    text="Submit"
                                    type="submit"
                                    link="#"
                                    className="uppercase text-sm font-medium"
                                />
                                {/*<button */}
                                {/*    type="submit"*/}
                                {/*    className="bg-primary text-white px-6 py-3 rounded-md uppercase text-sm font-medium hover:opacity-90 transition"*/}
                                {/*>*/}
                                {/*    Submit*/}
                                {/*</button>*/}
                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;