import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import {
    FaArrowRightToBracket,
    FaBars,
    FaCaretDown,
    FaSeedling,
    FaXmark,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation().pathname;

    const [isOpen, setIsOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleIsOpen = () => {
        setIsOpen((state) => !state);
        setIsDetailOpen(false);
    };

    const handleIsDetail = () => {
        console.log(isDetailOpen);
        setIsDetailOpen((state) => !state);
    };

    useEffect(() => {
        setIsOpen(false);
        setIsDetailOpen(false);
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1023) {
                setIsOpen(false);
                setIsDetailOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const link = [
        {
            name: "About us",
            link: "/about",
        },
        {
            name: "Contact",
            link: "/contact",
        },
        {
            name: "FAQ",
            link: "/faq",
        },
    ];

    const loginList = [
        {
            name: "Donor",
            link: "/donor/signin",
        },
        {
            name: "Partner",
            link: "/partner/signin",
        },
        {
            name: "Admin",
            link: "/admin/signin",
        },
    ];

    return (
        <section className="flex justify-center w-full bg-light fixed z-50">
            <main className="container relative lg:flex lg:items-center lg:justify-between">
                <header className="py-4 flex justify-between items-center padding">
                    <div className="flex justify-center items-center w-max gap-1">
                        <FaSeedling className="text-primary text-3xl" />
                        <h1 className="text-xl font-semibold text-primary">
                            CareMate
                        </h1>
                    </div>
                    <div
                        className="cursor-pointer lg:hidden"
                        onClick={handleIsOpen}
                    >
                        {isOpen ? (
                            <FaXmark className="font-medium text-2xl text-[28px] text-accent" />
                        ) : (
                            <FaBars className="font-medium text-2xl text-accent" />
                        )}
                    </div>
                </header>
                <nav
                    className={`padding absolute w-full  transition-template border-b lg:border-0  bg-light lg:h-max lg:static lg:w-max lg:py-5 lg:overflow-visible ${
                        isOpen ? "pt-4 pb-6 h-max" : "h-0 overflow-hidden"
                    }`}
                >
                    <ul className="relative flex flex-col gap-4 text-dark lg:flex-row lg:items-center lg:justify-between lg:w-[420px]">
                        <EachUtils
                            of={link}
                            render={(item) => (
                                <Link to={item.link}>
                                    <li
                                        className={` transition-template ${
                                            item.link === location &&
                                            "lg:font-medium "
                                        }`}
                                    >
                                        {item.name}
                                    </li>
                                </Link>
                            )}
                        />
                        <div
                            onClick={handleIsDetail}
                            className="cursor-pointer"
                        >
                            <h1>Login</h1>
                        </div>
                        <div
                            className={`${
                                isDetailOpen ? "flex absolute" : "hidden"
                            } flex-col top-[152px] w-52 bg-red-50 border gap-1 p-2 rounded-md lg:top-8 lg:right-0`}
                        >
                            <EachUtils
                                of={loginList}
                                render={(item) => (
                                    <Link
                                        to={item.link}
                                        className="w-full hover:bg-accent/10 transition-template px-2 py-1 rounded-md"
                                    >
                                        <li>{item.name}</li>
                                    </Link>
                                )}
                            />
                        </div>
                    </ul>
                </nav>
            </main>
        </section>
    );
};

export default Header;
