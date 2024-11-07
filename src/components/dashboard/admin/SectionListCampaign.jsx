import { getCampaignByPartnerId } from "@/redux/feature/partner/campaignSlice";
import EachUtils from "@/utils/EachUtils";
import { capitalizeFirstLetter, formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SectionListCampaign = () => {
    const dispatch = useDispatch();
    const { currentPartner } = useSelector((state) => state.adminPartner);
    const { currentCampaign } = useSelector((state) => state.adminCampaign);

    useEffect(() => {
        if (currentPartner) {
            fetchData();
        }
    }, [dispatch, currentPartner]);

    const fetchData = async () => {
        try {
            await dispatch(
                getCampaignByPartnerId({ id: currentPartner.id })
            ).unwrap();
        } catch (error) {
            console.log("Erorr : ", error);
        }
    };

    return (
        <div>
            <h1 className="text-dark/85 text-3xl mb-8 mt-10">List Campaign</h1>
            {currentCampaign && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-4">
                    {currentCampaign.length > 0 && (
                        <EachUtils
                            of={currentCampaign}
                            render={(item) => (
                                <div className="text-dark/85 w-full p-4 border rounded-md grid grid-cols-2 grid-rows-2 cursor-pointer transition-template hover:border-primary">
                                    <h1 className="font-medium">
                                        {item.title}
                                    </h1>
                                    <h1 className="text-primary font-medium text-right">
                                        {capitalizeFirstLetter(item.status)}
                                    </h1>
                                    <h1>
                                        <FormatRupiah
                                            value={item.currentAmount}
                                        />
                                    </h1>
                                    <h1 className="text-right">
                                        <FormatRupiah value={item.goalAmount} />
                                    </h1>
                                </div>
                            )}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default SectionListCampaign;
