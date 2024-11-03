import Button from "@/components/Button";
import CardCampaign from "@/components/dashboard/partner/CardCampaign";
import DetailCampaign from "@/components/dashboard/partner/DetailCampaign";
import FormCampaign from "@/components/dashboard/partner/FormCampaign";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import { Failed } from "@/utils/AlertUtil";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import dummy from "@/data/dummyCampaign.json";

const data = [
    {
        name: "PENDING",
    },
    {
        name: "ACTIVE",
    },
    {
        name: "COMPLETED",
    },
    {
        name: "REJECTED",
    },
];

const Campaign = () => {
    const { currentPartner } = useSelector((state) => state.partner);

    const [filter, setFilter] = useState(data[0].name);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [statusPartner, setStatusPartner] = useState("UNVERIFIED");
    const [currentCampaign, setCurrentCampaign] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState("");

    useEffect(() => {
        if (currentPartner !== null) {
            setStatusPartner(currentPartner.status);
        }
    }, [currentPartner]);

    const handleFromModal = () => {
        if (statusPartner === "VERIFIED") {
            return Failed("Your foundation has not been verified");
        }
        setIsFormModalOpen((state) => !state);
    };

    const handleDetailModal = () => {
        setIsDetailModalOpen((state) => !state);
    };

    return (
        <>
            <Title name={"Campaign"}>
                <div className="pb-2">
                    <Button
                        type={"button"}
                        name={"Add Campaign"}
                        onClick={handleFromModal}
                    />
                </div>
            </Title>

            <FormCampaign
                isOpen={isFormModalOpen}
                closeModal={handleFromModal}
            />

            <Filter data={data} setFilter={setFilter} filter={filter} />

            <div className="flex flex-col gap-4 w-full mt-10 lg:flex-row lg:flex-wrap lg:justify-start">
                <EachUtils
                    of={dummy}
                    render={(item) =>
                        filter === item.status && (
                            <CardCampaign
                                item={item}
                                status={filter}
                                openModal={handleDetailModal}
                                setCurrentCampaign={setCurrentCampaign}
                                setCurrentImageUrl={setCurrentImageUrl}
                            />
                        )
                    }
                />
            </div>
            <DetailCampaign
                isOpen={isDetailModalOpen}
                closeModal={handleDetailModal}
                status={filter}
                item={currentCampaign}
                currentImageUrl={currentImageUrl}
            />
        </>
    );
};

export default Campaign;
