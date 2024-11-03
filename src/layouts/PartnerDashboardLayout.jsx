import { logout } from "@/redux/feature/authSlice";
import { getDetailPartner } from "@/redux/feature/partner/PartnerSlice";
import { Logout } from "@/utils/AlertUtil";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { FaThLarge } from "react-icons/fa";
import {
    FaArrowRightFromBracket,
    FaChevronLeft,
    FaHeart,
    FaMoneyCheckDollar,
    FaSeedling,
    FaUser,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";

const list = [
    {
        name: "Dashboard",
        link: "/dashboard/partner",
        icon: <FaThLarge size={14} color="#eee" />,
    },
    {
        name: "Profile",
        link: "/dashboard/partner/profile",
        icon: <FaUser size={14} color="#eee" />,
    },
    {
        name: "Campaign",
        link: "/dashboard/partner/campaign",
        icon: <FaHeart size={14} color="#eee" />,
    },
    {
        name: "Withdrawal",
        link: "/dashboard/partner/withdrawal",
        icon: <FaMoneyCheckDollar size={14} color="#eee" />,
    },
];

const PartnerDashboardLayout = () => {
    const location = useLocation().pathname;

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const [isOpen, setIsOpen] = useState(window.innerWidth > 1023);

    useEffect(() => {
        if (window.innerWidth < 1023) {
            setIsOpen(false);
        }
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1023) {
                setIsOpen(true);
            }
            if (window.innerWidth < 1000) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (user?.id) {
            fetchPartnerDetails();
        }
    }, [user]);

    const fetchPartnerDetails = async () => {
        try {
            await dispatch(getDetailPartner(user.id)).unwrap();
        } catch (error) {
            console.error("Error fetching partner details:", error);
        }
    };

    const handleLogout = () => {
        Logout(() => {
            dispatch(logout());
        });
    };
    return (
        <>
            <section className="flex  bg-dark relative ">
                <nav
                    className={`${
                        isOpen ? "w-72 md:w-56" : "w-16 "
                    } px-2 justify-between transition-all fixed bg-dark z-50 duration-300 flex flex-col py-8 h-screen`}
                >
                    <div
                        className={`cursor-pointer absolute p-2 bg-white border border-dark rounded-full top-20 -right-[12px] lg:hidden ${
                            !isOpen ? "rotate-180" : ""
                        }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <FaChevronLeft size={8} color="black" />
                    </div>

                    <Link
                        to="/"
                        className="flex gap-3 w-max self-center items-center justify-start"
                    >
                        <div className="p-2 bg-primary rounded-md ">
                            <FaSeedling size={24} color="#171717" />
                        </div>
                        {isOpen && (
                            <h1 className="text-light text-xl">CareMate</h1>
                        )}
                    </Link>

                    <main className=" flex flex-col gap-y-2">
                        <EachUtils
                            of={list}
                            render={(item) => (
                                <Link
                                    to={item.link}
                                    className={`flex gap-4 p-4 rounded-md hover:bg-primary duration-300 items-center ${
                                        isOpen
                                            ? "justify-start"
                                            : "justify-start"
                                    }  ${
                                        location === item.link && "bg-primary"
                                    }`}
                                >
                                    <div className={`${!isOpen && "mx-auto"}`}>
                                        {item.icon}
                                    </div>
                                    <h1
                                        className={`${
                                            isOpen ? "" : "hidden"
                                        } text-sm md:text-md text-white`}
                                    >
                                        {item.name}
                                    </h1>
                                </Link>
                            )}
                        />
                    </main>

                    <div
                        onClick={handleLogout}
                        className={`flex gap-4 p-4 rounded-md hover:bg-primary duration-300 cursor-pointer items-center ${
                            isOpen ? "justify-start" : "justify-start"
                        } `}
                    >
                        <div className={`${!isOpen && "mx-auto"}`}>
                            <FaArrowRightFromBracket size={18} color="#eee" />
                        </div>
                        <h1
                            className={`${
                                isOpen ? "" : "hidden"
                            } md:text-md text-white`}
                        >
                            Logout
                        </h1>
                    </div>
                </nav>

                <main
                    className={`bg-white overflow-x-hidden transition-all duration-300 w-full rounded-s-xl py-10 px-6 sm:px-8 md:px-16 relative ${
                        isOpen ? "ml-56" : "ml-16"
                    } min-h-screen`}
                >
                    <Outlet />
                </main>
            </section>
        </>
    );
};

export default PartnerDashboardLayout;
