import React, { useEffect, useState } from "react";
import { FaCarRear, FaHourglass, FaHouseChimneyMedical } from "react-icons/fa6";
import { TbClock } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { currentPartner } = useSelector((state) => state.partner);
    const [status, setStatus] = useState("Unverified");

    useEffect(() => {
        if (currentPartner !== null) {
            setStatus(currentPartner.status);
        }
    }, [currentPartner]);

    const capitalizeFirstLetter = (string) => {
        return string
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <>
            <div className="w-full py-2 mb-10 border-b border-black/70">
                <h1 className="text-xl md:text-4xl font-medium text-black">
                    Dashboard
                </h1>
            </div>
            <div className="flex justify-start">
                <div
                    className={`flex flex-col w-full lg:w-max lg:min-w-[200px] overflow-hidden rounded-2xl  bg-white px-4 py-6 shadow-md border`}
                >
                    <div className={`rounded-2xl bg-primary/15 p-2 w-max`}>
                        <TbClock size={52} className="text-primary" />
                    </div>
                    <h1 className="font-light mt-8 mb-2 text-black">
                        Status Fondation
                    </h1>
                    <div className="flex items-end gap-2">
                        <h2 className="text-4xl font-semibold leading-none text-slate-800/80">
                            {capitalizeFirstLetter(status)}
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
