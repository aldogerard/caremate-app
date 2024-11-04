import axiosInstance from "@/api/axios";
import Button from "@/components/Button";
import ButtonFile from "@/components/ButtonFile";
import CardCampaignSkleton from "@/components/Skleton/CardCampaignSkleton";
import { Message } from "@/utils/AlertUtil";
import { formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";

const CardWithdrawal = (props) => {
    const { withdrawal, status } = props;
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await axiosInstance.get(
                    `/file/${withdrawal.campaignImageName}`
                );
                return setImageUrl(response.data);
            } catch (error) {
                setImageUrl("");
            }
        };

        fetchImageUrl();
    }, [withdrawal.campaignImageName]);

    const handleClickMessage = () => {
        Message(withdrawal?.message || "Lorem  ipsum");
    };

    return imageUrl !== "" ? (
        <div className="flex flex-row border shadow-sm cursor-pointer p-3 w-full sm:w-[400px] lg:w-[500px] rounded-xl gap-4">
            <img
                src={imageUrl}
                alt=""
                className="h-24 lg:h-40 aspect-square object-cover rounded-lg"
            />
            <div className="flex flex-col w-full justify-between">
                <h1 className="text-sm lg:text-lg  text-dark">
                    {withdrawal.title}
                </h1>
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-xs text-dark">Start date</h1>
                        <h1 className="text-primary text-xs font-medium">
                            {formatDate(withdrawal.startDate)}
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-xs text-dark">End date</h1>
                        <h1 className="text-primary text-xs font-medium">
                            {formatDate(withdrawal.endDate)}
                        </h1>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xs text-dark">Total amount</h1>
                        <h1 className="text-primary text-xs font-medium">
                            <FormatRupiah value={withdrawal.totalAmount} />
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-xs text-dark">Tax</h1>
                        <h1 className="text-primary text-xs font-medium">
                            <FormatRupiah value={withdrawal.totalTax} />
                        </h1>
                    </div>
                    {status === "APPROVED" && (
                        <ButtonFile
                            fileName={"SuratKeteranganLulus.pdf"}
                            name={"Invoice"}
                        />
                    )}
                    {status === "REJECTED" && (
                        <Button
                            type={"reset"}
                            name={">"}
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
