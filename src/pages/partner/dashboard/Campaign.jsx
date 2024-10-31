import React from "react";
import { Link } from "react-router-dom";

const Campaign = () => {
    return (
        <>
            <div className="w-full py-2 pb-4 flex justify-between items-center mb-10 border-b border-black/70">
                <h1 className="text-xl md:text-4xl font-medium text-black">
                    Campaign
                </h1>
                <Link
                    to="/admin/cars/add"
                    className=" bg-primary px-3 py-2  rounded-lg hover:shadow-md transition-template"
                >
                    <h1 className="font-medium text-light text-xs lg:text-sm">
                        Add Campaign
                    </h1>
                </Link>
            </div>
        </>
    );
};

export default Campaign;
