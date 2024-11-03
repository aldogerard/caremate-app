import axiosInstance from "@/api/axios";
import React from "react";

const ButtonFile = (props) => {
    const { fileName, name } = props;

    const handleClick = async () => {
        try {
            const response = await axiosInstance.get(`/files/${fileName}`);
            window.open(response.data, "_blank");
        } catch (error) {
            console.log("Error : ", error);
        }
    };
    return (
        <div
            onClick={handleClick}
            className="px-8 py-3 border rounded-lg border-primary cursor-pointer hover:shadow-md transition-template"
        >
            <h1 className="text-base text-dark">{name}</h1>
        </div>
    );
};

export default ButtonFile;
