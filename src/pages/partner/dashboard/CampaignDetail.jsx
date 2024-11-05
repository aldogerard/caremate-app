import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getCampaignDetailById,
    getCampaignImageByName,
    stopCampaignById,
} from "@/redux/feature/partner/campaignSlice";

import Title from "@/components/dashboard/Title";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import { Confirm, Failed, Message, Success } from "@/utils/AlertUtil";
import SectionDetailCampaign from "@/components/dashboard/partner/SectionDetailCampaign";
import FormCampaignReports from "@/components/dashboard/partner/FormCampaignReports";
import { getCampaignReportByCampaignId } from "@/redux/feature/partner/campaignReportSlice";
import EachUtils from "@/utils/EachUtils";
import CardCampaignReport from "@/components/dashboard/partner/CardCampaignReport";
import {
    createWithdrawal,
    updateWithdrawal,
} from "@/redux/feature/partner/withdrawalSlice";
import { pdf } from "@react-pdf/renderer";
import Invoice from "@/components/PDF/Invoice";
import FormEditCampaign from "@/components/dashboard/partner/FormEditCampaign";

const CampaignDetail = () => {
    const { slug } = useParams();

    const dispatch = useDispatch();
    const { currentCampaign } = useSelector((state) => state.campaign);
    const { campaignReports } = useSelector((state) => state.campaignReport);
    const { partner } = useSelector((state) => state.partner);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, [slug, dispatch, currentCampaign?.campaignImageName]);

    const fetchData = async () => {
        try {
            await dispatch(getCampaignDetailById(slug)).unwrap();
            if (currentCampaign) {
                await dispatch(
                    getCampaignImageByName(currentCampaign.campaignImageName)
                ).unwrap();
                await dispatch(
                    getCampaignReportByCampaignId(currentCampaign.id)
                ).unwrap();
            }
        } catch (error) {
            console.log("Erorr : ", error);
        }
    };

    const handleModalOpen = () => {
        setIsModalOpen((state) => !state);
    };

    const showMessage = () => {
        Message(currentCampaign.message, "info");
    };

    const requestWithdrawal = () => {
        const { status, isWithdrawal } = currentCampaign;

        console.log(status);
        console.log(isWithdrawal);

        if (status !== "COMPLETED") {
            return Failed("Only campaigns that have been completed");
        }

        if (status === "COMPLETED" && isWithdrawal === "PENDING") {
            return Failed("You already request a withdrawal");
        }

        if (status === "COMPLETED" && isWithdrawal === "APPROVED") {
            return Failed("Withdrawal campaign already approved");
        }

        console.log(currentCampaign);

        Confirm("Request a withdrawal", async () => {
            try {
                const totalTax = currentCampaign.currentAmount * (3 / 100);
                const totalAmount = currentCampaign.currentAmount - totalTax;

                const data = new FormData();
                data.append("totalTax", totalTax);
                data.append("totalAmount", totalAmount);
                data.append("campaignId", currentCampaign.id);

                if (isWithdrawal === "REJECTED") {
                    await dispatch(
                        updateWithdrawal(currentCampaign.id)
                    ).unwrap();
                }

                if (isWithdrawal == null) {
                    await dispatch(createWithdrawal(data)).unwrap();
                }

                const blob = await pdf(
                    <Invoice item={currentCampaign} parter={partner} />
                ).toBlob();

                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "withdrawal_invoice.pdf");
                document.body.appendChild(link);
                link.click();
                link.remove();

                await fetchData();
                Success("Successfully request withdrawal");
            } catch (error) {
                console.log(error);
                return Failed("Failed request withdrawal");
            }
        });
    };

    const stopCampaign = () => {
        Confirm("Stop the campaign", async () => {
            try {
                await dispatch(stopCampaignById(currentCampaign.id)).unwrap();
                await fetchData();
                Success("Successfully stop campaign");
            } catch (error) {
                return Failed("Failed stop campaign");
            }
        });
    };

    return (
        <>
            {campaignReports && (
                <>
                    <Title name={"Detail Campaign"}>
                        <div className="flex gap-4 pb-2">
                            <Button
                                type="button"
                                name={"Info Campaign"}
                                onClick={showMessage}
                            />
                            {currentCampaign.status === "COMPLETED" && (
                                <Button
                                    type="submit"
                                    name={"Request a withdrawal"}
                                    onClick={requestWithdrawal}
                                />
                            )}
                            {currentCampaign.status === "ACTIVE" && (
                                <>
                                    <Button
                                        type="reset"
                                        name={"Stop campaign"}
                                        onClick={stopCampaign}
                                    />
                                    <Button
                                        type="button"
                                        name={"Edit campaign"}
                                        onClick={handleModalOpen}
                                    />
                                </>
                            )}
                        </div>
                    </Title>

                    <FormEditCampaign
                        isOpen={isModalOpen}
                        closeModal={handleModalOpen}
                    />

                    <div className="flex flex-col gap-14 pb-10">
                        {/* Section Detail */}
                        <SectionDetailCampaign />

                        {/* Section Report */}
                        <div>
                            <h1 className="text-dark/85 text-3xl mb-8">
                                Campaign Report
                            </h1>
                            <div className="flex gap-4">
                                <FormCampaignReports />
                                <div className="px-4 py-6 rounded-xl border flex flex-wrap w-3/4 gap-4 h-max">
                                    <EachUtils
                                        of={campaignReports}
                                        render={(item) => (
                                            <CardCampaignReport item={item} />
                                        )}
                                    />
                                    {campaignReports.length == 0 && (
                                        <div className="flex justify-center items-center py-20 w-full">
                                            <h1 className="text-xl">
                                                Campaign reports not found
                                            </h1>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {!campaignReports && <Loader />}
        </>
    );
};

export default CampaignDetail;
