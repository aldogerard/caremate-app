import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import Modal from "react-modal";

const AdminDetailCampaign = (props) => {
    const { isOpen, closeModal, status } = props;

    console.log(status);

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
    const image = "https://account.enigmacamp.com/2.jpg";

    return (
        <Modal style={customStyles} isOpen={isOpen}>
            <main className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl text-dark">Detail Campaign</h1>
                    <div
                        onClick={closeModal}
                        className="bg-rose-500 px-4 py-2 rounded-md shadow-md text-light cursor-pointer hover:bg-rose-700 transition-template"
                    >
                        <h2>Close</h2>
                    </div>
                </div>
                <div className="flex flex-row gap-4 flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center w-full mb-2">
                        <div className="w-72 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={image}
                                alt=""
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="w-[49%]">
                        <h1 className="text-dark/70">Foundation Name</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm">
                            <h1 className="text-dark">Yayasan Enigma Camp</h1>
                        </div>
                    </div>
                    <div className="w-[49%]">
                        <h1 className="text-dark/70">Category</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm">
                            <h1 className="text-dark">
                                Infrastructure Development
                            </h1>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-dark/70">Campaign Title</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm min-h-20">
                            <h1 className="text-dark">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Odit atque dolorem, aperiam
                                unde reprehenderit consequatur nobis iste quis
                                voluptatum voluptates, obcaecati officia ducimus
                                nostrum mollitia veniam.
                            </h1>
                        </div>
                    </div>
                    <div className="flex w-full gap-4">
                        {(status === "Active" || status === "Completed") && (
                            <div className="w-[33%]">
                                <h1 className="text-dark/70">Raise Amount</h1>
                                <div className="px-4 py-3 border rounded-md shadow-sm">
                                    <h1 className="text-dark">
                                        <FormatRupiah value={324000} />
                                    </h1>
                                </div>
                            </div>
                        )}
                        <div className="w-[33%]">
                            <h1 className="text-dark/70">Goal Amount</h1>
                            <div className="px-4 py-3 border rounded-md shadow-sm">
                                <h1 className="text-dark">
                                    <FormatRupiah value={1000000} />
                                </h1>
                            </div>
                        </div>
                        <div className="w-[33%]">
                            <h1 className="text-dark/70">Start Date</h1>
                            <div className="px-4 py-3 border rounded-md shadow-sm">
                                <h1 className="text-dark">28 October 2024</h1>
                            </div>
                        </div>
                        <div className="w-[33%]">
                            <h1 className="text-dark/70">End Date</h1>
                            <div className="px-4 py-3 border rounded-md shadow-sm">
                                <h1 className="text-dark">30 December 2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-dark/70">Description</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm min-h-24">
                            <h1 className="text-dark">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aliquam maiores explicabo
                                incidunt sunt ex, nulla sapiente est dolore
                                quibusdam quia voluptatibus! Impedit rem quo
                                sapiente saepe voluptatibus beatae sunt optio
                                veniam aliquam nemo, non maxime in vero, omnis
                                unde debitis.
                            </h1>
                        </div>
                    </div>
                    {status === "Pending" && (
                        <div className="flex flex-row gap-2 flex-wrap justify-end items-center w-full mt-6">
                            <div className="w-28 py-3 flex justify-center shadow-md items-center bg-primary cursor-pointer rounded-md hover:bg-emerald-600 transition-template">
                                <h1 className="text-sm text-light">Approve</h1>
                            </div>
                            <div className="w-28 py-3 flex justify-center shadow-md items-center bg-rose-600 cursor-pointer rounded-md hover:bg-error transition-template">
                                <h1 className="text-sm text-light">Reject</h1>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </Modal>
    );
};

export default AdminDetailCampaign;
