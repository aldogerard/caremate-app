import axiosInstance from "@/api/axios";
import NOT_FOUND from "@/assets/images/NotFound.jpg";
import { formatDate } from "@/utils/Utils";
import React, { useEffect, useState } from "react";

const CardCampaignReport = ({ item }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                setIsLoading(true);
                setImageUrl("");

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
                <div className="w-44 aspect-square">
                    {imageUrl != "" ? (
                        <img
                            src={imageUrl}
                            alt="Campaign 1"
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target.src = NOT_FOUND)}
                        />
                    ) : (
                        <img
                            src={NOT_FOUND}
                            alt="Campaign 1"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div className="flex flex-row space-x-2 items-center">
                    <h3 className="text-xs text-gray-500">
                        {formatDate(item.createdDate || "1-1-2024")}
                    </h3>
                </div>
                <p className="text-[#3d3d3d] text-sm">{item.description}</p>
            </div>
        )
    );
};

export default CardCampaignReport;
