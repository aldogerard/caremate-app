import React from "react";
import { FaRegMessage } from "react-icons/fa6";

const IconMessage = () => {
    return (
        <div className="flex justify-center items-center cursor-pointer shadow-sm bg-blue-500/20 aspect-square w-10 rounded-md">
            <FaRegMessage className="text-base text-blue-600" />
        </div>
    );
};

export default IconMessage;
