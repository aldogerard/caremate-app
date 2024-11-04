import axiosInstance from "@/api/axios";
import Button from "@/components/Button";
import CustomModal from "@/components/CustomModal";
import {
    approveCampaign,
    getAllCampaign,
    rejectCampaign,
} from "@/redux/feature/admin/adminCampaignSlice";
import { Confirm, InputMessage, Success } from "@/utils/AlertUtil";
import { formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AdminDetailCampaign = (props) => {
    const { currentCampaign, isOpen, closeModal, status } = props;

    const [imageUrl, setImageUrl] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await axiosInstance.get(
                    `/file/${currentCampaign?.campaignImageName}`
                );
                console.log(response.data);
                return setImageUrl(response.data);
            } catch (error) {
                setImageUrl("");
            }
        };

        fetchImageUrl();
    }, [currentCampaign?.campaignImageName]);

    const handleApprove = () => {
        Confirm("Approved a campaign", async () => {
            try {
                await dispatch(approveCampaign(currentCampaign.id)).unwrap();
                await dispatch(getAllCampaign()).unwrap();
                Success("Successfully approved a new campaign");
                closeModal();
            } catch (error) {
                console.log(error);
                Failed("Failed approved a campaign");
            }
        });
    };
    const handleReject = () => {
        Confirm("Rejected a partner", () => {
            InputMessage(async (message) => {
                try {
                    const data = new FormData();
                    data.append("message", message);
                    await dispatch(
                        rejectCampaign({ id: currentCampaign.id, data })
                    ).unwrap();
                    await dispatch(getAllCampaign()).unwrap();
                    Success("Successfully rejected a campaign");
                    closeModal();
                } catch (error) {
                    console.log(error);
                    Failed("Failed rejected a campaign");
                }
            });
        });
    };

    return (
        <CustomModal isOpen={isOpen}>
            <main className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl text-dark">Detail Campaign</h1>
                    <Button type="button" name={"Close"} onClick={closeModal} />
                </div>
                <div className="flex flex-row gap-4 flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center w-full mb-2">
                        {imageUrl === "" ? (
                            <div className="w-72 h-40 rounded-xl bg-accent/30 animate-pulse overflow-hidden shadow-lg"></div>
                        ) : (
                            <div className="w-72 h-40 rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={imageUrl}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                    <div className="w-[49%]">
                        <h1 className="text-dark/70">Foundation Name</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm">
                            <h1 className="text-dark">
                                {currentCampaign?.partnerName}
                            </h1>
                        </div>
                    </div>
                    <div className="w-[49%]">
                        <h1 className="text-dark/70">Category</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm">
                            <h1 className="text-dark">
                                {currentCampaign?.category}
                            </h1>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-dark/70">Campaign Title</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm min-h-20">
                            <h1 className="text-dark">
                                {currentCampaign?.description}
                            </h1>
                        </div>
                    </div>
                    <div className="flex w-full gap-4">
                        {(status === "ACTIVE" || status === "COMPLETED") && (
                            <div className="w-[33%]">
                                <h1 className="text-dark/70">Raise Amount</h1>
                                <div className="px-4 py-3 border rounded-md shadow-sm">
                                    <h1 className="text-dark">
                                        <FormatRupiah
                                            value={
                                                currentCampaign?.currentAmount
                                            }
                                        />
                                    </h1>
                                </div>
                            </div>
                        )}
                        <div className="w-[33%]">
                            <h1 className="text-dark/70">Goal Amount</h1>
                            <div className="px-4 py-3 border rounded-md shadow-sm">
                                <h1 className="text-dark">
                                    <FormatRupiah
                                        value={currentCampaign?.goalAmount}
                                    />
                                </h1>
                            </div>
                        </div>
                        <div className="w-[33%]">
                            <h1 className="text-dark/70">Start Date</h1>
                            <div className="px-4 py-3 border rounded-md shadow-sm">
                                <h1 className="text-dark">
                                    {formatDate(currentCampaign?.startDate)}
                                </h1>
                            </div>
                        </div>
                        <div className="w-[33%]">
                            <h1 className="text-dark/70">End Date</h1>
                            <div className="px-4 py-3 border rounded-md shadow-sm">
                                <h1 className="text-dark">
                                    {formatDate(currentCampaign?.endDate)}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-dark/70">Description</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm min-h-24">
                            <h1 className="text-dark">
                                {currentCampaign?.description}
                            </h1>
                        </div>
                    </div>
                    {status === "IN_REVIEW" && (
                        <div className="flex flex-row gap-2 flex-wrap justify-end items-center w-full mt-6">
                            <Button
                                type="submit"
                                name={"Approve"}
                                onClick={handleApprove}
                            />
                            <Button
                                type="reset"
                                name={"Reject"}
                                onClick={handleReject}
                            />
                        </div>
                    )}
                </div>
            </main>
        </CustomModal>
    );
};

export default AdminDetailCampaign;
