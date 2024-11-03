import Button from "@/components/Button";
import Filter from "@/components/Filter";
import { formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useState } from "react";
import dummy from "@/data/dummyCampaignReport.json";
import EachUtils from "@/utils/EachUtils";
import CardCampaignReport from "./CardCampaignReport";
import { Confirm, Success } from "@/utils/AlertUtil";
import CustomModal from "@/components/CustomModal";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "@/components/PDF/Invoice";
import { useSelector } from "react-redux";

const data = [
    {
        name: "Detail",
    },
    {
        name: "Report",
    },
];

const DetailCampaign = (props) => {
    const { isOpen, closeModal, status } = props;

    const { currentCampaign, currentCampaignUrl } = useSelector(
        (state) => state.campaign
    );

    const [filter, setFilter] = useState("Detail");
    const [isFormReportOpen, setIsFormReportOpen] = useState(false);

    const handleFormReport = () => {
        setIsFormReportOpen((state) => !state);
    };

    const handleModal = () => {
        setIsFormReportOpen(false);
        setFilter("Detail");
        closeModal();
    };

    const handleRequestWithdrawal = (e) => {
        e.preventDefault();

        Confirm("Request a withdrawal", async () => {
            handleModal();
            Success("Successfully request a withdrawal");

            const blob = await pdf(<Invoice item={currentCampaign} />).toBlob();

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "invoice.pdf");
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
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
                            <h1 className="text-dark/70">Campaign Title</h1>
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

                        <div className="flex justify-between items-end w-full mb-2">
                            <div className="w-[49%]">
                                <h1 className="text-dark/70">Category</h1>
                                <div className="px-4 py-3 border rounded-md shadow-sm">
                                    <h1 className="text-dark">
                                        {currentCampaign?.category}
                                    </h1>
                                </div>
                            </div>
                            {status === "COMPLETED" &&
                                !currentCampaign?.isWithdrawal && (
                                    <>
                                        <PDFDownloadLink
                                            document={
                                                <Invoice
                                                    item={currentCampaign}
                                                />
                                            }
                                            fileName="invoice.pdf"
                                            onClick={handleRequestWithdrawal}
                                        >
                                            <Button
                                                type={"submit"}
                                                name={"Request a withdrawal"}
                                            />
                                        </PDFDownloadLink>
                                    </>
                                )}
                        </div>
                    </div>
                )}

                {filter === "Report" && !currentCampaign?.isWithdrawal && (
                    <>
                        {isFormReportOpen && (
                            <div className="flex flex-col gap-2 -mt-8">
                                <div className="flex gap-2">
                                    <div className="flex flex-col gap-1 w-full lg:w-[30%]">
                                        <div className="flex justify-between items-center">
                                            <label
                                                htmlFor="phoneNumber"
                                                className="text-black/80"
                                            >
                                                Image
                                            </label>
                                        </div>
                                        <div className="border-dashed overflow-hidden border flex relative justify-center items-center border-accent rounded-md h-24">
                                            <h1
                                                className={`text-sm lg:text-lg font-medium text-accent`}
                                            >
                                                Upload your file
                                            </h1>
                                            <input
                                                type="file"
                                                required
                                                id="image"
                                                name="image"
                                                accept="image/*"
                                                className={`absolute w-full h-full opacity-0 cursor-pointer`}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 w-full lg:w-[70%]">
                                        <div className="flex justify-between items-center">
                                            <label
                                                htmlFor="description"
                                                className="text-black/80"
                                            >
                                                Description
                                            </label>
                                        </div>
                                        <textarea
                                            type="text"
                                            id="description"
                                            autoComplete="off"
                                            name="description"
                                            placeholder="Enter description for your foundation"
                                            maxLength={165}
                                            className={`px-5 py-4 h-24 lg:h-24 text-dark outline-none rounded-md border focus:shadow-sm  bg-white resize-none `}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type={"submit"} name={"Submit"} />
                                    <Button
                                        type={"reset"}
                                        name={"Cancel"}
                                        onClick={handleFormReport}
                                    />
                                </div>
                            </div>
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
                                of={dummy}
                                render={(item) => (
                                    <CardCampaignReport item={item} />
                                )}
                            />
                        </div>
                    </>
                )}
            </main>
        </CustomModal>
    );
};

export default DetailCampaign;
