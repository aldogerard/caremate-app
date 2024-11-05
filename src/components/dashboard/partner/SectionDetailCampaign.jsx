import { capitalizeFirstLetter, formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { useSelector } from "react-redux";

const SectionDetailCampaign = () => {
    const { currentCampaign, currentCampaignUrl } = useSelector(
        (state) => state.campaign
    );

    return (
        <div className="flex flex-wrap h-max gap-4 text-dark/85">
            <div className="w-[44%]">
                <div className="w-full aspect-video h-full max-h-[500px] rounded-md overflow-hidden shadow-md">
                    <img
                        src={currentCampaignUrl}
                        alt="Campaign Image"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="flex flex-col w-[54%]">
                <h1 className="text-4xl mb-8 capitalize">
                    {currentCampaign.title}
                </h1>
                <div className="flex mb-8 items-center">
                    <div className="lg:w-1/2">
                        <h1 className="font-light">Raised Amount</h1>
                        <h1 className="text-lg font-medium">
                            <FormatRupiah
                                value={currentCampaign.currentAmount}
                            />
                        </h1>
                    </div>
                    <div>
                        <h1 className="font-light">Goal Amount</h1>
                        <h1 className="text-lg font-medium">
                            <FormatRupiah value={currentCampaign.goalAmount} />
                        </h1>
                    </div>
                </div>
                <div className="flex mb-8 items-center">
                    <div className="lg:w-1/2">
                        <h1 className="font-light">Start Data</h1>
                        <h1 className="text-lg font-medium">
                            {formatDate(currentCampaign.startDate)}
                        </h1>
                    </div>
                    <div>
                        <h1 className="font-light">End Date</h1>
                        <h1 className="text-lg font-medium">
                            {formatDate(currentCampaign.endDate)}
                        </h1>
                    </div>
                </div>
                <div className="flex mb-8 items-center">
                    <div className="lg:w-1/2">
                        <h1 className="font-light">Category</h1>
                        <h1 className="text-lg font-medium">
                            {currentCampaign.category}
                        </h1>
                    </div>
                    <div>
                        <h1 className="font-light">Status</h1>
                        <h1 className="text-lg font-medium">
                            {capitalizeFirstLetter(currentCampaign.status)}
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="font-light">Description</h1>
                    <h1 className="text-lg font-medium break-words">
                        {currentCampaign.description}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default SectionDetailCampaign;
