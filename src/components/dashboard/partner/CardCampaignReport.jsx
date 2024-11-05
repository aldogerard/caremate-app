import axiosInstance from "@/api/axios";
import Button from "@/components/Button";
import CardCampaignReportSkleton from "@/components/Skleton/CardCampaignReportSkleton";
import {
    deleteCampaignReportById,
    getCampaignReportByCampaignId,
} from "@/redux/feature/partner/campaignReportSlice";
import { Confirm, Failed, Success } from "@/utils/AlertUtil";
import React, { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const CardCampaignReport = ({ item }) => {
    const dispatch = useDispatch();
    const { currentCampaign } = useSelector((state) => state.campaign);
    const { role } = useSelector((state) => state.auth);

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await axiosInstance.get(
                    `/file/${item?.imageName}`
                );
                return setImageUrl(response.data);
            } catch (error) {
                setImageUrl("");
            }
        };

        fetchImageUrl();
    }, [item?.reportImageName]);

    const onDelete = () => {
        try {
            Confirm("Delete a campaign report", async () => {
                await dispatch(deleteCampaignReportById(item.id)).unwrap();
                await dispatch(
                    getCampaignReportByCampaignId(currentCampaign.id)
                ).unwrap();
                Success("Successfully delete campaign report");
            });
        } catch (error) {
            console.log(error);
            Failed("Failed delete campaign report");
        }
    };

    return imageUrl !== "" ? (
        <div className="w-72 relative rounded-xl h-max hover:border-primary transition-template shadow-sm border flex flex-col overflow-hidden">
            <div className="w-full h-40">
                <img
                    src={imageUrl}
                    alt="Image Campaign Report"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-2 pb-3 h-[120px] overflow-y-scroll break-words">
                <h1 className="text-dark/85">{item?.description || "NaN"}</h1>
            </div>
            {role === "PARTNER" && (
                <div
                    onClick={onDelete}
                    className="flex justify-center bg-red-500 w-max p-2 cursor-pointer rounded-lg absolute right-2 top-2"
                >
                    <FaRegTrashCan size={18} className="text-white" />
                </div>
            )}
        </div>
    ) : (
        <CardCampaignReportSkleton />
    );
};

export default CardCampaignReport;
