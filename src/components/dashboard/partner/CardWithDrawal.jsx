import axiosInstance from "@/api/axios";
import Button from "@/components/Button";
import ButtonFile from "@/components/ButtonFile";
import CardCampaignSkleton from "@/components/Skleton/CardCampaignSkleton";
import { Message } from "@/utils/AlertUtil";
import { formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";

const CardWithdrawal = (props) => {
    const { item, status } = props;
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await axiosInstance.get(
                    `/file/${item.campaignImageName}`
                );
                return setImageUrl(response.data);
            } catch (error) {
                setImageUrl("");
            }
        };

        fetchImageUrl();
    }, [item.campaignImageName]);

    const handleClickMessage = () => {
        Message(item?.message);
    };

    return imageUrl !== "" ? (
        <div className="flex flex-row border shadow-sm cursor-pointer p-3 w-full sm:w-[400px] lg:w-[500px] rounded-xl gap-4">
            <img
                src={imageUrl}
                alt=""
                className="h-24 lg:h-40 aspect-square object-cover rounded-lg"
            />
            <div className="flex flex-col w-max justify-between">
                <h1 className="text-sm lg:text-lg  text-dark">{item.title}</h1>
                <div className="lg:flex justify-between hidden">
                    <div>
                        <h1 className="text-xs text-dark">Start date</h1>
                        <h1 className="text-primary text-xs font-medium">
                            {formatDate(item.startDate)}
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-xs text-dark">End date</h1>
                        <h1 className="text-primary text-xs font-medium">
                            {formatDate(item.endDate)}
                        </h1>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xs text-dark">Total amount</h1>
                        <h1 className="text-primary text-xs font-medium">
                            <FormatRupiah value={item.totalAmount} />
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-xs text-dark">Tax</h1>
                        <h1 className="text-primary text-xs font-medium">
                            <FormatRupiah value={item.totalTax} />
                        </h1>
                    </div>
                    {status === "COMPLETED" && (
                        <ButtonFile
                            fileName={item.invoiceFileName}
                            name={"Invoice"}
                        />
                    )}
                    {status === "REJECTED" && (
                        <Button
                            type={"button"}
                            name={"Message"}
                            onClick={handleClickMessage}
                        />
                    )}
                </div>
            </div>
        </div>
    ) : (
        <CardCampaignSkleton />
    );
};

export default CardWithdrawal;
