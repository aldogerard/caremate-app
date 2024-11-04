import CardCampaign from "@/components/dashboard/partner/CardCampaign";
import CardWithdrawal from "@/components/dashboard/partner/CardWithDrawal";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";

import { getWithdrawalByPartnerId } from "@/redux/feature/partner/withdrawalSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import { getDetailPartner } from "@/redux/feature/partner/partnerSlice";

const data = [
    {
        name: "PENDING",
    },
    {
        name: "APPROVED",
    },
    {
        name: "REJECTED",
    },
];

const Withdrawal = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { partner } = useSelector((state) => state.partner);
    const { withdrawals } = useSelector((state) => state.withdrawal);

    const [filter, setFilter] = useState(data[0].name);

    useEffect(() => {
        if (user?.id) {
            fetchCampaign();
        }
    }, [user]);

    const fetchCampaign = async () => {
        try {
            await dispatch(getDetailPartner(user.id)).unwrap();
            await dispatch(getWithdrawalByPartnerId(user.id)).unwrap();
        } catch (error) {
            console.error("Error fetching partner details:", error);
        }
    };

    console.log(withdrawals);

    return (
        <>
            <Title name={"Withdrawal"} />
            {partner && (
                <>
                    {withdrawals?.length > 0 ? (
                        <>
                            <Filter
                                data={data}
                                setFilter={setFilter}
                                filter={filter}
                            />
                            <div className="flex flex-col gap-4 w-full mt-10 lg:flex-row lg:flex-wrap lg:justify-start">
                                <EachUtils
                                    of={withdrawals}
                                    render={(item) =>
                                        filter === item.status && (
                                            <CardWithdrawal
                                                withdrawal={item}
                                                status={filter}
                                            />
                                        )
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex text-black justify-center items-center h-[50vh]">
                            <h1>Withdrawal Not Found</h1>
                        </div>
                    )}
                </>
            )}
            {!partner && <Loader />}
        </>
    );
};

export default Withdrawal;
