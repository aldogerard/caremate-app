import Button from "@/components/Button";
import CardCampaign from "@/components/dashboard/partner/CardCampaign";
import DetailCampaign from "@/components/dashboard/partner/DetailCampaign";
import FormCampaign from "@/components/dashboard/partner/FormCampaign";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import { Confirm, Failed, Success } from "@/utils/AlertUtil";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    createCampaign,
    getCampaignByPartnerId,
    stopCampaignById,
    updateCampaignByPartnerId,
} from "@/redux/feature/partner/campaignSlice";
import { getDetailPartner } from "@/redux/feature/partner/partnerSlice";
import Loader from "@/components/Loader";
import { createWithdrawal } from "@/redux/feature/partner/withdrawalSlice";
import {
    createCampaignReport,
    getCampaignReportByPartnerId,
} from "@/redux/feature/partner/campaignReportSlice";

const data = [
    {
        name: "IN_REVIEW",
    },
    {
        name: "ACTIVE",
    },
    {
        name: "COMPLETED",
    },
    {
        name: "REJECTED",
    },
];

const Campaign = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { partner } = useSelector((state) => state.partner);
    const { campaigns, currentCampaign } = useSelector(
        (state) => state.campaign
    );

    const [filter, setFilter] = useState(data[0].name);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    useEffect(() => {
        if (user?.id) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            await dispatch(getDetailPartner(user.id)).unwrap();
            await dispatch(getCampaignByPartnerId(user.id)).unwrap();
            await dispatch(getCampaignReportByPartnerId(user.id)).unwrap();
        } catch (error) {
            console.error("Error fetching : ", error);
        }
    };

    const handleFromModal = () => {
        if (partner?.status !== "VERIFIED") {
            return Failed("Your foundation has not been verified");
        }
        setIsFormModalOpen((state) => !state);
    };

    const handleDetailModal = () => {
        setIsDetailModalOpen((state) => !state);
    };

    const handleSaveCampaign = async (formData) => {
        try {
            const data = new FormData();

            const sanitizedString = formData.goalAmount.replace(/[^0-9]/g, "");
            const goalAmount = parseInt(sanitizedString, 10);

            data.append("category", formData.category);
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("startDate", formData.startDate);
            data.append("endDate", formData.endDate);
            data.append("goalAmount", goalAmount);
            data.append("partnerId", user.id);
            data.append("file", formData.image);

            await dispatch(createCampaign(data)).unwrap();
            Success("Successfully add new campaign");
        } catch (error) {
            console.log(error);
            Failed("Failed create campaign");
        }
        fetchData();
    };

    const handleEditCampaign = async (formData) => {
        const data = new FormData();

        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("file", formData.image);
        data.append("partnerId", user.id);

        const startDate = new Date(currentCampaign.startDate);
        const endDate = new Date(currentCampaign.endDate);

        data.append("category", currentCampaign.category);
        data.append("goalAmount", currentCampaign.goalAmount);
        data.append("startDate", startDate);
        data.append("endDate", endDate);

        try {
            await dispatch(
                updateCampaignByPartnerId({ id: currentCampaign.id, data })
            ).unwrap();
            Success("Successfully update campaign");
        } catch (error) {
            console.log(error);
            Failed("Failed update campaign");
        }
        await fetchData();
    };

    const handleStopCampaign = async () => {
        try {
            await dispatch(stopCampaignById(currentCampaign.id)).unwrap();
            Success("Successfully stop campaign");
            await fetchData();
        } catch (error) {
            console.log(error);
            Failed("Failed stop campaign");
        }
    };

    const handleSubmitWithdrawal = async (cb) => {
        try {
            const totalTax = currentCampaign.currentAmount * (3 / 100);
            const totalAmount = currentCampaign.currentAmount - totalTax;

            const data = new FormData();
            data.append("totalTax", totalTax);
            data.append("totalAmount", totalAmount);
            data.append("campaignId", currentCampaign.id);

            await dispatch(createWithdrawal(data)).unwrap();
            await fetchData();
            cb();
        } catch (error) {
            console.log(error);
            Failed("Failed request withdrawal");
        }
    };

    const handleSaveCampaignReport = async (request) => {
        try {
            const data = new FormData();

            data.append("description", request.descrtiption);
            data.append("file", request.image);
            data.append("campaignId", currentCampaign.id);

            await dispatch(createCampaignReport(data)).unwrap();
            Success("Successfully create campaign report");
            await fetchData();
        } catch (error) {
            console.log(error);
            Failed("Failed create campaign report");
        }
    };

    return (
        <>
            <Title name={"Campaign"}>
                <div className="pb-2">
                    <Button
                        type={"button"}
                        name={"Add Campaign"}
                        onClick={handleFromModal}
                    />
                </div>
            </Title>
            {partner && (
                <>
                    <FormCampaign
                        isOpen={isFormModalOpen}
                        closeModal={handleFromModal}
                        handleSaveCampaign={handleSaveCampaign}
                    />

                    {campaigns?.length > 0 ? (
                        <>
                            <Filter
                                data={data}
                                setFilter={setFilter}
                                filter={filter}
                            />

                            <div className="flex flex-col gap-4 w-full mt-10 lg:flex-row lg:flex-wrap lg:justify-start">
                                <EachUtils
                                    of={campaigns}
                                    render={(item) =>
                                        filter === item.status && (
                                            <CardCampaign
                                                item={item}
                                                status={filter}
                                                openModal={handleDetailModal}
                                            />
                                        )
                                    }
                                />
                            </div>
                            <DetailCampaign
                                isOpen={isDetailModalOpen}
                                closeModal={handleDetailModal}
                                status={filter}
                                handleEditCampaign={handleEditCampaign}
                                handleStopCampaign={handleStopCampaign}
                                handleSubmitWithdrawal={handleSubmitWithdrawal}
                                handleSaveCampaignReport={
                                    handleSaveCampaignReport
                                }
                            />
                        </>
                    ) : (
                        <div className="flex text-black justify-center items-center h-[50vh]">
                            <h1>Campaign Not Found</h1>
                        </div>
                    )}
                </>
            )}
            {!partner && <Loader />}
        </>
    );
};

export default Campaign;
