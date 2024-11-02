import CardCampaign from "@/components/dashboard/partner/CardCampaign";
import CardWithdrawal from "@/components/dashboard/partner/CardWithDrawal";
import EachUtils from "@/utils/EachUtils";
import React, { useState } from "react";

const sub = [
    {
        name: "Pending",
    },
    {
        name: "Completed",
    },
];

const Withdrawal = () => {
    const [filter, setFilter] = useState("Pending");

    return (
        <>
            <div className="w-full py-2 pb-4 flex justify-between items-center mb-10 border-b border-black/70">
                <h1 className="text-xl md:text-4xl font-medium text-black">
                    Withdrawal
                </h1>
            </div>
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
                            <CardWithdrawal status={filter} />
                        )
                    }
                />
            </div>
        </>
    );
};

export default Withdrawal;
