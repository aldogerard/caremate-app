import Button from "@/components/Button";
import Filter from "@/components/Filter";
import { formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useState } from "react";
import EachUtils from "@/utils/EachUtils";
import CardCampaignReport from "./CardCampaignReport";
import { Confirm, Message, Success } from "@/utils/AlertUtil";
import CustomModal from "@/components/CustomModal";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "@/components/PDF/Invoice";
import { useSelector } from "react-redux";
import FormEditCampaign from "./FormEditCampaign";
import FormCampaignReport from "./FormCampaignReport";

const data = [
    {
        name: "Detail",
    },
    {
        name: "Report",
    },
];

const DetailCampaign = (props) => {
    const {
        isOpen,
        closeModal,
        status,
        handleStopCampaign,
        handleSubmitWithdrawal,
        handleSaveCampaignReport,
    } = props;

    const { partner } = useSelector((state) => state.partner);
    const { currentWithdrawal } = useSelector((state) => state.withdrawal);
    const { currentCampaign, currentCampaignUrl } = useSelector(
        (state) => state.campaign
    );
    const { campaignReports } = useSelector((state) => state.campaignReport);

    const [filter, setFilter] = useState("Detail");
    const [isFormReportOpen, setIsFormReportOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleFormReport = () => {
        setIsFormReportOpen((state) => !state);
    };

    const handleModal = () => {
        setIsFormReportOpen(false);
        setFilter("Detail");
        setIsEdit(false);
        closeModal();
    };

    const handleIsEdit = () => {
        setIsEdit((state) => !state);
    };

    const handleRequestWithdrawal = (e) => {
        e.preventDefault();

        Confirm("Request a withdrawal", () => {
            handleModal();
            handleSubmitWithdrawal(async () => {
                Success("Successfully request a withdrawal");
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
            });
        });
    };

    const handleCLickStop = () => {
        Confirm("Stop the campaign", () => {
            handleStopCampaign();
            handleModal();
        });
    };

    const handleClickMessage = () => {
        Message(currentWithdrawal?.message || "Lorem ipsum");
    };

    return (
        <CustomModal isOpen={isOpen}>
            <main className="flex flex-col gap-8 overflow-scroll">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl text-dark">Detail Campaign</h1>
                    <Button
                        type={"button"}
                        name={"Close"}
                        onClick={handleModal}
                    />
                </div>

                {status === "COMPLETED" && (
                    <Filter data={data} setFilter={setFilter} filter={filter} />
                )}

                {filter === "Detail" && (
                    <>
                        {!isEdit && (
                            <div
                                className={`flex flex-row gap-4 flex-wrap justify-between items-center ${
                                    status === "COMPLETED" && "-mt-8"
                                }`}
                            >
                                <div className="w-72 h-32 rounded-xl overflow-hidden shadow-md">
                                    <img
                                        src={currentCampaignUrl}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="w-full">
                                    <h1 className="text-dark/70">
                                        Campaign Title
                                    </h1>
                                    <div className="px-4 py-3 border rounded-md shadow-sm min-h-[72px]">
                                        <h1 className="text-dark">
                                            {currentCampaign?.title}
                                        </h1>
                                    </div>
                                </div>

                                <div className="flex w-full gap-4">
                                    {(status === "ACTIVE" ||
                                        status === "COMPLETED") && (
                                        <div className="w-[33%]">
                                            <h1 className="text-dark/70">
                                                Raise Amount
                                            </h1>
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
                                        <h1 className="text-dark/70">
                                            Goal Amount
                                        </h1>
                                        <div className="px-4 py-3 border rounded-md shadow-sm">
                                            <h1 className="text-dark">
                                                <FormatRupiah
                                                    value={
                                                        currentCampaign?.goalAmount
                                                    }
                                                />
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="w-[33%]">
                                        <h1 className="text-dark/70">
                                            Start Date
                                        </h1>
                                        <div className="px-4 py-3 border rounded-md shadow-sm">
                                            <h1 className="text-dark">
                                                {formatDate(
                                                    currentCampaign?.startDate
                                                )}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="w-[33%]">
                                        <h1 className="text-dark/70">
                                            End Date
                                        </h1>
                                        <div className="px-4 py-3 border rounded-md shadow-sm">
                                            <h1 className="text-dark">
                                                {formatDate(
                                                    currentCampaign?.endDate
                                                )}
                                            </h1>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <h1 className="text-dark/70">
                                        Description
                                    </h1>
                                    <div className="px-4 py-3 border rounded-md shadow-sm min-h-24">
                                        <h1 className="text-dark">
                                            {currentCampaign?.description}
                                        </h1>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end w-full mb-2">
                                    <div className="w-[49%]">
                                        <h1 className="text-dark/70">
                                            Category
                                        </h1>
                                        <div className="px-4 py-3 border rounded-md shadow-sm">
                                            <h1 className="text-dark">
                                                {currentCampaign?.category}
                                            </h1>
                                        </div>
                                    </div>

                                    {status === "REJECTED" && (
                                        <Button
                                            type={"reset"}
                                            name={"Rejected message"}
                                            onClick={handleClickMessage}
                                        />
                                    )}

                                    {status === "ACTIVE" && (
                                        <div className="flex gap-2">
                                            <Button
                                                type={"submit"}
                                                name={"Edit"}
                                                onClick={handleIsEdit}
                                            />
                                            <Button
                                                type={"reset"}
                                                name={"Stop Campaign"}
                                                onClick={handleCLickStop}
                                            />
                                        </div>
                                    )}

                                    {status === "COMPLETED" &&
                                        (!currentCampaign?.isWithdrawal ||
                                            currentCampaign?.isWithdrawal ===
                                                "REJECTED") && (
                                            <PDFDownloadLink
                                                document={
                                                    <Invoice
                                                        item={currentCampaign}
                                                        partner={partner}
                                                    />
                                                }
                                                fileName="withdrawal_invoice.pdf"
                                                onClick={
                                                    handleRequestWithdrawal
                                                }
                                            >
                                                <Button
                                                    type={"submit"}
                                                    name={
                                                        "Request a withdrawal"
                                                    }
                                                />
                                            </PDFDownloadLink>
                                        )}
                                </div>
                            </div>
                        )}

                        {isEdit && (
                            <FormEditCampaign
                                handleModal={handleModal}
                                handleIsEdit={handleIsEdit}
                            />
                        )}
                    </>
                )}

                {filter === "Report" && (
                    <>
                        {currentCampaign?.isWithdrawal === "APPROVED" && (
                            <>
                                {isFormReportOpen && (
                                    <FormCampaignReport
                                        handleFormReport={handleFormReport}
                                        handleModal={handleModal}
                                        handleSaveCampaignReport={
                                            handleSaveCampaignReport
                                        }
                                    />
                                )}

                                {!isFormReportOpen && (
                                    <div className="-mt-8">
                                        <Button
                                            type={"submit"}
                                            name={"Add Report"}
                                            onClick={handleFormReport}
                                        />
                                    </div>
                                )}

                                <div className="flex flex-row flex-wrap  pb-4 gap-4 -mt-3">
                                    <EachUtils
                                        of={campaignReports || []}
                                        render={(item) => (
                                            <CardCampaignReport item={item} />
                                        )}
                                    />
                                </div>
                            </>
                        )}

                        {currentCampaign?.isWithdrawal !== "APPROVED" && (
                            <div className="flex justify-center items-center mb-12 text-primary">
                                <h1>
                                    Access after the withdrawal process is
                                    complete
                                </h1>
                            </div>
                        )}
                    </>
                )}
            </main>
        </CustomModal>
    );
};

export default DetailCampaign;
