import EachUtils from "@/utils/EachUtils";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import Modal from "react-modal";
import Datepicker from "react-tailwindcss-datepicker";

const option = [
    {
        value: "Select Category",
    },
    {
        value: "Educational Assistance",
    },
    {
        value: "Infrastructure Development",
    },
    {
        value: "Operational Costs",
    },
];

const FormCampaign = (props) => {
    const { isOpen, closeModal } = props;

    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Select Category");
    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
    });

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

    const handleSelect = () => {
        setIsSelectOpen((state) => !state);
    };

    const handleCloseModal = () => {
        setSelectedCategory("Select Category");
        setValue({
            startDate: null,
            endDate: null,
        });
        closeModal();
    };

    const handleChange = (e) => {
        if (e?.target) {
            const { name, value } = e.target;
        } else {
            const { startDate } = e;
            if (startDate >= oneWeekFromNow) {
                setValue(e);
            } else {
                setValue({
                    startDate: null,
                    endDate: null,
                });
            }
        }
    };

    return (
        <>
            <Modal style={customStyles} isOpen={isOpen}>
                <main className="flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl text-dark">Add Campaign</h1>
                        <div
                            onClick={handleCloseModal}
                            className="bg-rose-500 px-4 py-2 rounded-md shadow-md text-light cursor-pointer hover:bg-rose-700 transition-template"
                        >
                            <h2>Close</h2>
                        </div>
                    </div>
                    <form>
                        <div className="flex flex-col gap-4 w-full lg:flex-row lg:flex-wrap lg:justify-between">
                            <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="title"
                                        className="text-black/80"
                                    >
                                        Title
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    required
                                    id="title"
                                    autoComplete="off"
                                    name="title"
                                    placeholder="Enter the title of campaign"
                                    className={`px-5 py-4  outline-none rounded-md border focus:shadow-sm  bg-white`}
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="email"
                                        className="text-black/80"
                                    >
                                        Category
                                    </label>
                                </div>
                                <div
                                    onClick={handleSelect}
                                    className={`flex relative items-center justify-between w-full border h-full rounded-md px-5 py-4 bg-white cursor-pointer ${
                                        selectedCategory !==
                                            "Select Category" && "text-dark"
                                    }`}
                                >
                                    <h1>{selectedCategory}</h1>
                                    <FaAngleRight
                                        className={`transition-template ${
                                            isSelectOpen && "rotate-90"
                                        }`}
                                    />
                                    <div
                                        className={`absolute z-50 flex flex-col left-0 top-16 bg-light w-full rounded-md border shadow-md p-2 ${
                                            !isSelectOpen && "hidden"
                                        }`}
                                    >
                                        <EachUtils
                                            of={option}
                                            render={(item) => (
                                                <h1
                                                    onClick={() =>
                                                        setSelectedCategory(
                                                            item.value
                                                        )
                                                    }
                                                    className="w-full p-1 px-2 rounded-md  hover:bg-primary/10 text-accent transition-template"
                                                >
                                                    {item.value}
                                                </h1>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="goalAmount"
                                        className="text-black/80"
                                    >
                                        Goal Amount
                                    </label>
                                </div>
                                <CurrencyInput
                                    id="goalAmount"
                                    name="goalAmount"
                                    placeholder="Enter the donation goal amount"
                                    decimalsLimit={0}
                                    prefix="Rp"
                                    groupSeparator="."
                                    decimalSeparator=","
                                    intlConfig={{
                                        locale: "id-ID",
                                        currency: "IDR",
                                    }}
                                    className={`px-5 py-4 no-arrow outline-none rounded-md border focus:shadow-sm bg-white`}
                                />
                            </div>

                            <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="phoneNumber"
                                        className="text-black/80"
                                    >
                                        Range Date
                                    </label>
                                    <h1 className="text-xs text-warning font-medium">
                                        *Minimum start date is 1 week from now
                                    </h1>
                                </div>
                                <div className="w-full h-max border py-2 rounded-md">
                                    <Datepicker
                                        value={value}
                                        onChange={handleChange}
                                        primaryColor="blue"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor="phoneNumber"
                                        className="text-black/80"
                                    >
                                        Image
                                    </label>
                                </div>
                                <div className="border-dashed overflow-hidden border flex relative justify-center items-center border-accent rounded-md h-40">
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

                            <div className="flex flex-col gap-1 w-full lg:w-[49%]">
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
                                    maxLength={300}
                                    className={`px-5 py-4 h-40 lg:h-40 text-dark outline-none rounded-md border focus:shadow-sm  bg-white resize-none `}
                                />
                            </div>
                        </div>
                        <div className="text-lg mt-4 flex gap-2 justify-end">
                            <button
                                type="submit"
                                className={`bg-primary w-full lg:w-max py-3 lg:py-2 px-8 text-sm lg:text-lg rounded-md shadow-md text-light font-semibold outline-none hover:bg-emerald-600 `}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </main>
            </Modal>
        </>
    );
};

export default FormCampaign;
