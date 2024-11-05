import Button from "@/components/Button";
import CardCampaign from "@/components/dashboard/partner/CardCampaign";
import FormCampaign from "@/components/dashboard/partner/FormCampaign";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import { Failed } from "@/utils/AlertUtil";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCampaignByPartnerId } from "@/redux/feature/partner/campaignSlice";
import { getDetailPartner } from "@/redux/feature/partner/partnerSlice";
import Loader from "@/components/Loader";

const data = [
    {
        name: "IN_REVIEW",
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
    const { campaigns } = useSelector((state) => state.campaign);

    const [filter, setFilter] = useState(data[0].name);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    useEffect(() => {
        if (user?.id) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            await dispatch(getDetailPartner(user.id)).unwrap();
            await dispatch(getCampaignByPartnerId(user.id)).unwrap();
        } catch (error) {
            console.error("Error fetching : ", error);
        }
    };

    const handleFromModal = () => {
        if (partner?.status !== "VERIFIED") {
            return Failed("Your foundation has not been verified");
        }
        setIsFormModalOpen((state) => !state);
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
            {partner && (
                <>
                    <FormCampaign
                        isOpen={isFormModalOpen}
                        closeModal={handleFromModal}
                    />

                    {campaigns?.length > 0 ? (
                        <>
                            <Filter
                                data={data}
                                setFilter={setFilter}
                                filter={filter}
                            />

                            <div className="flex flex-col gap-4 w-full mt-10 lg:flex-row lg:flex-wrap lg:justify-start">
                                <EachUtils
                                    of={campaigns.filter(
                                        (res) => filter === res.status
                                    )}
                                    render={(item) =>
                                        filter === item.status && (
                                            <CardCampaign
                                                item={item}
                                                status={filter}
                                            />
                                        )
                                    }
                                />
                                {campaigns.filter(
                                    (res) => filter === res.status
                                ).length === 0 && (
                                    <div className="flex justify-center items-center w-full text-black h-[50vh]">
                                        <h1>No campaign found</h1>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex text-black justify-center items-center h-[50vh]">
                            <h1>Campaign Not Found</h1>
                        </div>
                    )}
                </>
            )}
            {!partner && <Loader />}
        </>
    );
};

export default Campaign;
