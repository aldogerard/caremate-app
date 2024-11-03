import axiosInstance from "@/api/axios";
import Button from "@/components/Button";
import ButtonFile from "@/components/ButtonFile";
import CustomModal from "@/components/CustomModal";
import { Confirm, InputMessage, Success } from "@/utils/AlertUtil";
import React, { useEffect, useState } from "react";

const AdminDetailPartner = (props) => {
    const { currentPartner, isOpen, closeModal, status } = props;
    const [message, setMessage] = useState("");

    const handleApprove = () => {
        Confirm("Approved a partner", () => {
            Success("Successfully approved a new partner");
            closeModal();
        });
    };

    const handleReject = () => {
        Confirm("Rejected a partner", () => {
            InputMessage(setMessage, () => {
                Success("Successfully rejected a partner");
                closeModal();
            });
        });
    };

    return (
        <CustomModal isOpen={isOpen}>
            <main className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl text-dark">Detail Partner</h1>
                    <Button
                        type={"button"}
                        onClick={closeModal}
                        name={"Close"}
                    />
                </div>
                <div className="flex flex-row gap-2 flex-wrap justify-between items-center">
                    <div className="w-[49%]">
                        <h1 className="text-dark/70">Foundation Name</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm">
                            <h1 className="text-dark">
                                {currentPartner?.name}
                            </h1>
                        </div>
                    </div>
                    <div className="w-[49%]">
                        <h1 className="text-dark/70">Email</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm">
                            <h1 className="text-dark">
                                {currentPartner?.email}
                            </h1>
                        </div>
                    </div>
                    <div className="w-[49%]">
                        <h1 className="text-dark/70">Phone Number</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm">
                            <h1 className="text-dark">
                                {currentPartner?.phoneNumber}
                            </h1>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-dark/70">Address</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm overflow-scroll">
                            <h1 className="text-dark">
                                {currentPartner?.address}
                            </h1>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-dark/70">Description</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm overflow-scroll h-32">
                            <h1 className="text-dark">
                                {currentPartner?.description}
                            </h1>
                        </div>
                    </div>
                </div>
                {(status === "IN REVIEW" || status === "VERIFIED") && (
                    <>
                        <div>
                            <h1 className="text-dark/70 mb-2">Document</h1>
                            <div className="flex flex-row gap-2 flex-wrap items-center">
                                <ButtonFile
                                    fileName={currentPartner?.cfeFileName}
                                    name={
                                        "Certification of Foundation Estabishment"
                                    }
                                />
                                <ButtonFile
                                    fileName={currentPartner?.frFileName}
                                    name={"Financial Report"}
                                />
                                <ButtonFile
                                    fileName={currentPartner?.rcFileName}
                                    name={"Registered Certificate"}
                                />
                                <ButtonFile
                                    fileName={currentPartner?.ffpFileName}
                                    name={"Foundation Financial Plan"}
                                />
                                <ButtonFile
                                    fileName={currentPartner?.baFileName}
                                    name={"Bank Account"}
                                />
                            </div>
                        </div>
                        {status === "IN REVIEW" && (
                            <div className="flex flex-row gap-2 flex-wrap justify-end items-center">
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
                    </>
                )}
            </main>
        </CustomModal>
    );
};

export default AdminDetailPartner;
