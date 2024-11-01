import CardCampaign from "@/components/dashboard/partner/CardCampaign";
import FormCampaign from "@/components/dashboard/partner/FormCampaign";
import { Failed } from "@/utils/AlertUtil";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const sub = [
    {
        name: "Active",
    },
    {
        name: "Pending",
    },
    {
        name: "Completed",
    },
    {
        name: "Rejected",
    },
];

const Campaign = () => {
    const [filter, setFilter] = useState("Active");

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const { currentPartner } = useSelector((state) => state.partner);
    const [status, setStatus] = useState("UNVERIFIED");

    useEffect(() => {
        if (currentPartner !== null) {
            setStatus(currentPartner.status);
        }
    }, [currentPartner]);

    const handleFromModal = () => {
        if (status === "VERIFIED") {
            return Failed("Your foundation has not been verified");
        }
        setIsFormModalOpen((state) => !state);
    };

    return (
        <>
            <div className="w-full py-2 pb-4 flex justify-between items-center mb-10 border-b border-black/70">
                <h1 className="text-xl md:text-4xl font-medium text-black">
                    Campaign
                </h1>
                <div
                    onClick={handleFromModal}
                    className=" bg-primary px-3 py-2 cursor-pointer  rounded-lg hover:shadow-md transition-template"
                >
                    <h1 className="font-medium text-light text-xs lg:text-sm">
                        Add Campaign
                    </h1>
                </div>
            </div>
            <FormCampaign
                isOpen={isFormModalOpen}
                closeModal={handleFromModal}
            />
            <div className="flex py-2 mb-6 gap-8 justify-start overflow-scroll">
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
            <div className="flex flex-col gap-4 w-full mt-10 lg:flex-row lg:flex-wrap lg:justify-start">
                <EachUtils
                    of={sub}
                    render={(item) =>
                        filter === "Completed" && (
                            <CardCampaign status={filter} />
                        )
                    }
                />
            </div>
        </>
    );
};

export default Campaign;
