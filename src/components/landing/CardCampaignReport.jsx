import axiosInstance from "@/api/axios";
import { formatDate } from "@/utils/Utils";
import React, { useEffect, useState } from "react";

const CardCampaignReport = ({ item }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchImageUrl = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(
                    `/file/${item?.imageName}`
                );
                return setImageUrl(response.data);
            } catch (error) {
                setImageUrl("");
            } finally {
                setIsLoading(false);
            }
        };

        fetchImageUrl();
    }, [item?.imageName]);

    return (
        !isLoading && (
            <div className="flex flex-col gap-1 py-4">
                <div className="flex flex-row space-x-2 items-center">
                    <h3 className="text-sm font-medium">
                        {formatDate(item.createDate || "1-1-2024")}
                    </h3>
                </div>
                <p className="text-[#3d3d3d] text-sm">{item.description}</p>
                <div className="w-52 aspect-square">
                    <img
                        src={imageUrl}
                        alt="Campaign 1"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        )
    );
};

export default CardCampaignReport;
