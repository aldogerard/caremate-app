import { formatPhoneNumber } from "@/utils/Utils";
import React from "react";
import { FaLocationDot, FaPhone, FaRegEnvelope } from "react-icons/fa6";
import { Link } from "react-router-dom";

import image from "@/assets/icon-gp.png";

const Footer = () => {
    return (
        <main className="bg-primary flex justify-center text-light">
            <section className="container flex justify-between flex-wrap gap-4 py-8 px-4 md:px-0">
                <div className="w-full md:w-[47%] lg:w-[27%] flex flex-col items-start">
                    <h1 className="text-2xl font-semibold pb-4">CareMate</h1>
                    <p className="font-medium">
                        We connect generous donors with foundations supporting
                        underprivileged children and communities, focusing on
                        education, essential needs, and environmental impact for
                        lasting change.
                    </p>
                </div>
                <div className="w-full md:w-[47%] lg:w-[23%] ">
                    <h1 className="text-2xl font-semibold pb-4 h-max">
                        Information
                    </h1>
                    <div className="flex flex-col gap-2 w-max font-medium">
                        <Link to="/about">
                            <h1>About Us</h1>
                        </Link>
                        <Link to="/faq">
                            <h1>Frequently Asked Question</h1>
                        </Link>
                        <Link to="/terms-and-conditions">
                            <h1>Terms and conditions</h1>
                        </Link>
                    </div>
                </div>
                <div className="w-full md:w-[47%] lg:w-[23%]">
                    <h1 className="text-2xl font-semibold pb-4">Contact Us</h1>
                    <div className="flex flex-col gap-3 font-medium">
                        <div className="flex gap-4 items-center">
                            <FaLocationDot size={18} />
                            <p>Topaz Street Number 7, Malang</p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <FaRegEnvelope size={18} />
                            <p>services@caremate.com</p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <FaPhone size={18} />
                            {formatPhoneNumber("08123456789")}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[47%] lg:w-[17%]">
                    <div className="flex justify-center items-center cursor-pointer text-light w-max gap-4 px-4 py-2 h-max rounded-xl bg-dark">
                        <div className="w-14 aspect-square flex justify-center items-center">
                            <img
                                src={image}
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="text-lg">
                            <h1>GET IT ON</h1>
                            <h1>Google Play</h1>
                        </div>
                    </div>
                </div>
                <div className="border-t border-black/20 flex w-full justify-center mt-4 pt-6">
                    Copyright &copy; 2024 CareMate
                </div>
            </section>
        </main>
    );
};

export default Footer;
