import EachUtils from "@/utils/EachUtils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useState } from "react";
import Modal from "react-modal";

const sub = [
    {
        name: "Detail",
    },
    {
        name: "Report",
    },
];
const image = "https://account.enigmacamp.com/2.jpg";

const DetailCampaign = (props) => {
    const { isOpen, closeModal, status } = props;
    const [filter, setFilter] = useState("Detail");

    const [isFormReportOpen, setIsFormReportOpen] = useState(false);

    const customStyles = {
        content: {
            width: "50%",
            maxHeight: "80%",
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

    const handleFormReport = () => {
        setIsFormReportOpen((state) => !state);
    };

    const handleModal = () => {
        setIsFormReportOpen(false);
        setFilter("Detail");
        closeModal();
    };

    return (
        <Modal style={customStyles} isOpen={isOpen}>
            <main className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl text-dark">Detail Campaign</h1>
                    <div
                        onClick={handleModal}
                        className="bg-rose-500 px-4 py-2 rounded-md shadow-md text-light cursor-pointer hover:bg-rose-700 transition-template"
                    >
                        <h2>Close</h2>
                    </div>
                </div>
                {status === "Completed" && (
                    <div className="flex py-2 gap-8 justify-start overflow-scroll">
                        <EachUtils
                            of={sub}
                            render={(item) => (
                                <h1
                                    onClick={() => setFilter(item.name)}
                                    className={`font-normal text-center w-24 cursor-pointer ${
                                        filter === item.name &&
                                        "text-black border-primary border-b transition-template"
                                    } `}
                                >
                                    {item.name}
                                </h1>
                            )}
                        />
                    </div>
                )}
                {filter === "Detail" && (
                    <>
                        <div className="flex flex-row gap-4 flex-wrap justify-between items-center">
                            <div className="flex justify-start items-end w-full mb-2">
                                <div className="w-72 rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src={image}
                                        alt=""
                                        className="object-contain"
                                    />
                                </div>
                                {status === "Completed" && (
                                    <div className="flex justify-end items-center gap-1 w-full">
                                        <>
                                            <div className="flex justify-center items-center cursor-pointer py-4 px-6 bg-primary text-light hover:shadow-md hover:bg-emerald-600 transition-template rounded-md shadow-sm">
                                                <h1>Request a withdrawal</h1>
                                            </div>
                                        </>
                                    </div>
                                )}
                            </div>

                            <div className="w-[49%]">
                                <h1 className="text-dark/70">
                                    Foundation Name
                                </h1>
                                <div className="px-4 py-3 border rounded-md shadow-sm">
                                    <h1 className="text-dark">
                                        Yayasan Enigma Camp
                                    </h1>
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
                                        adipisicing elit. Odit atque dolorem,
                                        aperiam unde reprehenderit consequatur
                                        nobis iste quis voluptatum voluptates,
                                        obcaecati officia ducimus nostrum
                                        mollitia veniam.
                                    </h1>
                                </div>
                            </div>
                            <div className="flex w-full gap-4">
                                {(status === "Active" ||
                                    status === "Completed") && (
                                    <div className="w-[33%]">
                                        <h1 className="text-dark/70">
                                            Raise Amount
                                        </h1>
                                        <div className="px-4 py-3 border rounded-md shadow-sm">
                                            <h1 className="text-dark">
                                                <FormatRupiah value={324000} />
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
                                            <FormatRupiah value={1000000} />
                                        </h1>
                                    </div>
                                </div>
                                <div className="w-[33%]">
                                    <h1 className="text-dark/70">Start Date</h1>
                                    <div className="px-4 py-3 border rounded-md shadow-sm">
                                        <h1 className="text-dark">
                                            28 October 2024
                                        </h1>
                                    </div>
                                </div>
                                <div className="w-[33%]">
                                    <h1 className="text-dark/70">End Date</h1>
                                    <div className="px-4 py-3 border rounded-md shadow-sm">
                                        <h1 className="text-dark">
                                            30 December 2024
                                        </h1>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <h1 className="text-dark/70">Description</h1>
                                <div className="px-4 py-3 border rounded-md shadow-sm min-h-24">
                                    <h1 className="text-dark">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Aliquam maiores
                                        explicabo incidunt sunt ex, nulla
                                        sapiente est dolore quibusdam quia
                                        voluptatibus! Impedit rem quo sapiente
                                        saepe voluptatibus beatae sunt optio
                                        veniam aliquam nemo, non maxime in vero,
                                        omnis unde debitis.
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {filter === "Report" && (
                    <>
                        {isFormReportOpen && (
                            <div className="flex flex-col gap-2">
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
                                    <div className="bg-primary w-max px-5 py-2 rounded-md shadow-md text-light cursor-pointer hover:bg-emerald-600 transition-template">
                                        <h2>Submit</h2>
                                    </div>
                                    <div
                                        onClick={handleFormReport}
                                        className="bg-rose-500 w-max px-5 py-2 rounded-md shadow-md text-light cursor-pointer hover:bg-rose-600 transition-template"
                                    >
                                        <h2>Cancel</h2>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!isFormReportOpen && (
                            <div
                                onClick={handleFormReport}
                                className="bg-primary w-max px-5 py-2 rounded-md shadow-md text-light cursor-pointer hover:bg-primary-600 transition-template"
                            >
                                <h2>Add Report</h2>
                            </div>
                        )}
                        <div className="flex flex-row flex-wrap pb-4 gap-4 -mt-3">
                            <div className="w-72 rounded-xl cursor-pointer hover:border-primary transition-template shadow-md border flex flex-col overflow-hidden">
                                <div className="w-full ">
                                    <img src={image} alt="" />
                                </div>
                                <div className="p-2 pb-3">
                                    <h1 className="text-dark text-sm">
                                        Lorem ipsum dolor sit amet suscipit
                                        phasellus tempor mus parturient turpis
                                        pharetra aenean sodales per sagittis
                                        fermentum proin tincidunt morbi et
                                        scelerisque purus
                                    </h1>
                                </div>
                            </div>
                            <div className="w-72 rounded-xl cursor-pointer hover:border-primary transition-template shadow-md border flex flex-col overflow-hidden">
                                <div className="w-full ">
                                    <img src={image} alt="" />
                                </div>
                                <div className="p-2 pb-3">
                                    <h1 className="text-dark text-sm">
                                        Lorem ipsum dolor sit amet suscipit
                                        phasellus tempor mus parturient turpis
                                        pharetra aenean sodales per sagittis
                                        fermentum proin tincidunt morbi et
                                        scelerisque purus
                                    </h1>
                                </div>
                            </div>
                            <div className="w-72 rounded-xl cursor-pointer hover:border-primary transition-template shadow-md border flex flex-col overflow-hidden">
                                <div className="w-full ">
                                    <img src={image} alt="" />
                                </div>
                                <div className="p-2 pb-3">
                                    <h1 className="text-dark text-sm">
                                        Lorem ipsum dolor sit amet suscipit
                                        phasellus tempor mus parturient turpis
                                        pharetra aenean sodales per sagittis
                                        fermentum proin tincidunt morbi et
                                        scelerisque purus
                                    </h1>
                                </div>
                            </div>
                            <div className="w-72 rounded-xl cursor-pointer hover:border-primary transition-template shadow-md border flex flex-col overflow-hidden">
                                <div className="w-full ">
                                    <img src={image} alt="" />
                                </div>
                                <div className="p-2 pb-3">
                                    <h1 className="text-dark text-sm">
                                        Lorem ipsum dolor sit amet suscipit
                                        phasellus tempor mus parturient turpis
                                        pharetra aenean sodales per sagittis
                                        fermentum proin tincidunt morbi et
                                        scelerisque purus
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </Modal>
    );
};

export default DetailCampaign;
