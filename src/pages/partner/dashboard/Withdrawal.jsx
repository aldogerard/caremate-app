import CardCampaign from "@/components/dashboard/partner/CardCampaign";
import CardWithdrawal from "@/components/dashboard/partner/CardWithDrawal";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";

import dummy from "@/data/dummyWithdrawal.json";
import { getWithdrawalByPartnerId } from "@/redux/feature/partner/withdrawalSlice";
import { useDispatch, useSelector } from "react-redux";

const data = [
    {
        name: "PENDING",
    },
    {
        name: "COMPLETED",
    },
    {
        name: "REJECTED",
    },
];

const Withdrawal = () => {
    const [filter, setFilter] = useState(data[0].name);

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { partner } = useSelector((state) => state.partner);
    const { withdrawals } = useSelector((state) => state.withdrawal);

    useEffect(() => {
        if (user?.id) {
            fetchCampaign();
        }
    }, [user]);

    const fetchCampaign = async () => {
        try {
            await dispatch(getWithdrawalByPartnerId(user.id)).unwrap();
        } catch (error) {
            console.error("Error fetching partner details:", error);
        }
    };

    return (
        <>
            <Title name={"Withdrawal"} />

            {withdrawals?.length > 0 ? (
                <>
                    <Filter data={data} setFilter={setFilter} filter={filter} />
                    <div className="flex flex-col gap-4 w-full mt-10 lg:flex-row lg:flex-wrap lg:justify-start">
                        <EachUtils
                            of={dummy}
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
                    <h1>Campaign Not Found</h1>
                </div>
            )}
        </>
    );
};

export default Withdrawal;
