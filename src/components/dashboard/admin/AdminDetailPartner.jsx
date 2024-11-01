import React from "react";
import Modal from "react-modal";

const AdminDetailPartner = (props) => {
    const { isOpen, closeModal, status } = props;

    const customStyles = {
        content: {
            width: "50%",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            borderRadius: "12px",
            transform: "translate(-40%, -50%)",
        },
    };

    return (
        <Modal style={customStyles} isOpen={isOpen}>
            <main className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl text-dark">Detail Partner</h1>
                    <div
                        onClick={closeModal}
                        className="bg-rose-500 px-4 py-2 rounded-md shadow-md text-light cursor-pointer hover:bg-rose-700 transition-template"
                    >
                        <h2>Close</h2>
                    </div>
                </div>
                <div className="flex flex-row gap-2 flex-wrap justify-between items-center">
                    <div className="w-[49%]">
                        <h1 className="text-dark/70">Foundation Name</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm">
                            <h1 className="text-dark">Yayasan Enigma Camp</h1>
                        </div>
                    </div>
                    <div className="w-[49%]">
                        <h1 className="text-dark/70">Phone Number</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm">
                            <h1 className="text-dark">0812394129381</h1>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-dark/70">Address</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm overflow-scroll">
                            <h1 className="text-dark">Jalan Topaz No 7</h1>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-dark/70">Address</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm overflow-scroll h-32">
                            <h1 className="text-dark">
                                Lorem ipsum dolor sit amet elementum phasellus
                                mus dignissim ullamcorper eros sed libero cras
                                risus fermentum magna aenean mollis iaculis
                                sociosqu si pharetra lacinia habitasse gravida
                                suspendisse lacus placerat per sapien bibendum
                                rhoncus litora dis porta dui ex class interdum
                                enim leo nostra ridiculus auctor vel tempor
                            </h1>
                        </div>
                    </div>
                </div>
                {status === "In Review" && (
                    <>
                        <div>
                            <h1 className="text-dark/70 mb-2">Document</h1>
                            <div className="flex flex-row gap-2 flex-wrap items-center">
                                <div className="px-4 py-3 border rounded-lg border-primary cursor-pointer">
                                    <h1 className="text-base text-dark">
                                        Certification of Foundation Estabishment
                                    </h1>
                                </div>
                                <div className="px-4 py-3 border rounded-lg border-primary cursor-pointer">
                                    <h1 className="text-base text-dark">
                                        Financial Report
                                    </h1>
                                </div>
                                <div className="px-4 py-3 border rounded-lg border-primary cursor-pointer">
                                    <h1 className="text-base text-dark">
                                        Registered Certificate
                                    </h1>
                                </div>
                                <div className="px-4 py-3 border rounded-lg border-primary cursor-pointer">
                                    <h1 className="text-base text-dark">
                                        Foundation Financial Plan
                                    </h1>
                                </div>
                                <div className="px-4 py-3 border rounded-lg border-primary cursor-pointer">
                                    <h1 className="text-base text-dark">
                                        Bank Account
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-2 flex-wrap justify-end items-center">
                            <div className="w-28 py-3 flex justify-center shadow-md items-center bg-primary cursor-pointer rounded-md hover:bg-emerald-600 transition-template">
                                <h1 className="text-sm text-light">Approve</h1>
                            </div>
                            <div className="w-28 py-3 flex justify-center shadow-md items-center bg-rose-600 cursor-pointer rounded-md hover:bg-error transition-template">
                                <h1 className="text-sm text-light">Reject</h1>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </Modal>
    );
};

export default AdminDetailPartner;
