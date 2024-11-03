import axiosInstance from "@/api/axios";
import Button from "@/components/Button";
import ButtonFile from "@/components/ButtonFile";
import CustomModal from "@/components/CustomModal";
import { Confirm, InputMessage, Success } from "@/utils/AlertUtil";
import { formatDate, validateFile } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";

const AdminDetailWithdrawal = (props) => {
    const { isOpen, closeModal, status, currentWithdrawal } = props;
    const [isApprove, setIsApprove] = useState(false);
    const [invoice, setInvoice] = useState("");
    const [message, setMessage] = useState("");

    const handleChangeFile = (e) => {
        const { files } = e.target;
        if (files.length < 1) {
            return setInvoice("");
        }
        if (validateFile(files, "pdf")) {
            return setInvoice(files[0]);
        } else {
            return setInvoice("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("invoice", invoice);
        data.append("id", "id");

        Confirm("Approved a withdrawal", () => {
            Success("Successfully approved a withdrawal");
            e.target.reset();
            handleCloseModal();
        });
    };

    const handleReject = () => {
        Confirm("Rejected a withdrawal", () => {
            InputMessage(setMessage, () => {
                Success("Successfully rejected a withdrawal");
                handleCloseModal();
            });
        });
    };

    const handleCloseModal = () => {
        setInvoice("");
        closeModal();
        setIsApprove(false);
    };

    const handleIsApprove = () => {
        setInvoice("");
        setIsApprove((state) => !state);
    };

    return (
        <CustomModal isOpen={isOpen}>
            <main className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl text-dark">Detail Withdrawal</h1>
                    <Button
                        type={"button"}
                        onClick={handleCloseModal}
                        name={"Close"}
                    />
                </div>
                <div className="flex flex-row gap-4 flex-wrap justify-between items-center">
                    <div className="w-[49%]">
                        <h1 className="text-dark/70">Foundation Name</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm">
                            <h1 className="text-dark">
                                {currentWithdrawal?.partnerName}
                            </h1>
                        </div>
                    </div>
                    <div className="w-[49%]">
                        <h1 className="text-dark/70">Category</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm">
                            <h1 className="text-dark">
                                {currentWithdrawal?.category}
                            </h1>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-dark/70">Campaign Title</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm min-h-20">
                            <h1 className="text-dark">
                                {currentWithdrawal?.title}
                            </h1>
                        </div>
                    </div>
                    <div className="flex w-full gap-4">
                        <div className="w-[33%]">
                            <h1 className="text-dark/70">Total Withdrawal</h1>
                            <div className="px-4 py-3 border rounded-md shadow-sm">
                                <h1 className="text-dark">
                                    <FormatRupiah
                                        value={currentWithdrawal?.totalAmount}
                                    />
                                </h1>
                            </div>
                        </div>
                        <div className="w-[33%]">
                            <h1 className="text-dark/70">Tax</h1>
                            <div className="px-4 py-3 border rounded-md shadow-sm">
                                <h1 className="text-dark">
                                    <FormatRupiah
                                        value={currentWithdrawal?.totalTax}
                                    />
                                </h1>
                            </div>
                        </div>
                        <div className="w-[33%]">
                            <h1 className="text-dark/70">Start Date</h1>
                            <div className="px-4 py-3 border rounded-md shadow-sm">
                                <h1 className="text-dark">
                                    {formatDate(currentWithdrawal?.startDate)}
                                </h1>
                            </div>
                        </div>
                        <div className="w-[33%]">
                            <h1 className="text-dark/70">End Date</h1>
                            <div className="px-4 py-3 border rounded-md shadow-sm">
                                <h1 className="text-dark">
                                    {formatDate(currentWithdrawal?.endDate)}
                                </h1>
                            </div>
                        </div>
                    </div>
                    {status === "REJECTED" && (
                        <div className="w-full">
                            <h1 className="text-dark/70">Message</h1>
                            <div className="px-4 py-3 border rounded-md shadow-sm min-h-16">
                                <h1 className="text-dark">
                                    {currentWithdrawal?.message}
                                </h1>
                            </div>
                        </div>
                    )}

                    {status === "PENDING" && (
                        <>
                            <form className="w-full" onSubmit={handleSubmit}>
                                {isApprove && (
                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="flex justify-between items-center">
                                            <label
                                                htmlFor="invoice"
                                                className="text-black/80"
                                            >
                                                Invoice
                                            </label>
                                        </div>
                                        <div className="border-dashed w-full overflow-hidden border flex relative justify-center items-center border-accent rounded-md h-28">
                                            <h1
                                                className={`text-sm lg:text-base font-medium text-accent ${
                                                    invoice?.name &&
                                                    "text-black/70"
                                                }`}
                                            >
                                                {invoice?.name ||
                                                    "Upload invoice withdrawal"}
                                            </h1>
                                            <input
                                                type="file"
                                                required
                                                id="invoice"
                                                name="invoice"
                                                onChange={handleChangeFile}
                                                accept=".pdf"
                                                className={`absolute w-full h-full opacity-0 cursor-pointer`}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-row gap-2 flex-wrap justify-end items-center w-full mt-4">
                                    {!isApprove && (
                                        <>
                                            <Button
                                                type={"button"}
                                                name={"Upload invoice"}
                                                onClick={handleIsApprove}
                                            />
                                            <Button
                                                type={"reset"}
                                                name={"Reject"}
                                                onClick={handleReject}
                                            />
                                        </>
                                    )}
                                    {isApprove && (
                                        <>
                                            <Button
                                                type={"submit"}
                                                name={"Submit"}
                                                disabled={invoice === ""}
                                            />
                                            <Button
                                                type={"reset"}
                                                name={"Cancel"}
                                                onClick={handleIsApprove}
                                            />
                                        </>
                                    )}
                                </div>
                            </form>
                        </>
                    )}
                    {status === "COMPLETED" && (
                        <div>
                            <h1 className="text-dark/70 mb-2">Invoice</h1>
                            <ButtonFile
                                fileName={currentWithdrawal?.invoiceFileName}
                                name={"Invoice withdrawal"}
                            />
                        </div>
                    )}
                </div>
            </main>
        </CustomModal>
    );
};

export default AdminDetailWithdrawal;
