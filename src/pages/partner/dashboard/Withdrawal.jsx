import CardCampaign from "@/components/dashboard/partner/CardCampaign";
import CardWithdrawal from "@/components/dashboard/partner/CardWithDrawal";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import EachUtils from "@/utils/EachUtils";
import React, { useState } from "react";

import dummy from "@/data/dummyWithdrawal.json";

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

    return (
        <>
            <Title name={"Withdrawal"} />
            <Filter data={data} setFilter={setFilter} filter={filter} />

            <div className="flex flex-col gap-4 w-full mt-10 lg:flex-row lg:flex-wrap lg:justify-start">
                <EachUtils
                    of={dummy}
                    render={(item) =>
                        filter === item.status && (
                            <CardWithdrawal item={item} status={filter} />
                        )
                    }
                />
            </div>
        </>
    );
};

export default Withdrawal;
