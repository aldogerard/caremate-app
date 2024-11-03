import { capitalizeFirstLetter } from "@/utils/Utils";
import React from "react";
import { Link } from "react-router-dom";

const CardDashboard = ({ link, name, data, icon }) => {
    return (
        <Link
            to={link}
            className={`flex flex-col w-full lg:w-max lg:min-w-[200px] overflow-hidden rounded-2xl  bg-white px-4 py-6 shadow-md border`}
        >
            <div className={`rounded-2xl bg-primary/15 p-2 w-max`}>{icon}</div>
            <h1 className="font-light mt-8 mb-2 text-black">{name}</h1>
            <div className="flex items-end gap-2">
                <h2 className="text-4xl font-semibold leading-none text-slate-800/80">
                    {capitalizeFirstLetter(data)}
                </h2>
            </div>
        </Link>
    );
};

export default CardDashboard;
