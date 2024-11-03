import Button from "@/components/Button";
import CardCampaign from "@/components/dashboard/partner/CardCampaign";
import DetailCampaign from "@/components/dashboard/partner/DetailCampaign";
import FormCampaign from "@/components/dashboard/partner/FormCampaign";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import { Failed } from "@/utils/AlertUtil";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCampaignByPartnerId } from "@/redux/feature/partner/CampaignSlice";

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
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { partner } = useSelector((state) => state.partner);
    const { campaign } = useSelector((state) => state.campaign);

    const [filter, setFilter] = useState(data[0].name);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    useEffect(() => {
        if (user?.id) {
            fetchCampaign();
        }
    }, [user]);

    const fetchCampaign = async () => {
        try {
            await dispatch(getCampaignByPartnerId(user.id)).unwrap();
        } catch (error) {
            console.error("Error fetching partner details:", error);
        }
    };

    const handleFromModal = () => {
        if (partner.status !== "VERIFIED") {
            return Failed("Your foundation has not been verified");
        }
        setIsFormModalOpen((state) => !state);
    };

    const handleDetailModal = () => {
        setIsDetailModalOpen((state) => !state);
    };

    return (
        <>
            {partner && (
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

                    {campaign?.length > 0 ? (
                        <>
                            <Filter
                                data={data}
                                setFilter={setFilter}
                                filter={filter}
                            />

                            <div className="flex flex-col gap-4 w-full mt-10 lg:flex-row lg:flex-wrap lg:justify-start">
                                <EachUtils
                                    of={campaign}
                                    render={(item) =>
                                        filter === item.status && (
                                            <CardCampaign
                                                item={item}
                                                status={filter}
                                                openModal={handleDetailModal}
                                            />
                                        )
                                    }
                                />
                            </div>
                            <DetailCampaign
                                isOpen={isDetailModalOpen}
                                closeModal={handleDetailModal}
                                status={filter}
                            />
                        </>
                    ) : (
                        <div className="flex text-black justify-center items-center h-[50vh]">
                            <h1>Campaign Not Found</h1>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Campaign;
