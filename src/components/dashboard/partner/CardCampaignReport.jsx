import axiosInstance from "@/api/axios";
import CardCampaignReportSkleton from "@/components/Skleton/CardCampaignReportSkleton";
import React, { useEffect, useState } from "react";

const CardCampaignReport = ({ item }) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await axiosInstance.get(
                    `/files/${item?.reportImageName}`
                );
                return setImageUrl(response.data);
            } catch (error) {
                setImageUrl("");
            }
        };

        fetchImageUrl();
    }, [item?.reportImageName]);

    return imageUrl !== "" ? (
        <div className="w-72 rounded-xl cursor-pointer hover:border-primary transition-template shadow-md border flex flex-col overflow-hidden">
            <div className="w-full h-40">
                <img
                    src={imageUrl}
                    alt="Image Campaign Report"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-2 pb-3 h-[120px]">
                <h1 className="text-dark text-sm">{item?.description}</h1>
            </div>
        </div>
    ) : (
        <CardCampaignReportSkleton />
    );
};

export default CardCampaignReport;
