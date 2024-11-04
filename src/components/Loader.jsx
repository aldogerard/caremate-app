import React from "react";
import { FaSeedling } from "react-icons/fa6";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-[50vh]">
            <div className="w-20 h-20 border-4 border-t-primary border-gray-300 rounded-full animate-spin flex justify-center items-center">
                <FaSeedling size={32} />
            </div>
        </div>
    );
};

export default Loader;
