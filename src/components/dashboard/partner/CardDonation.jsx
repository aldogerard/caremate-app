import { formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";

const CardDonation = ({ item }) => {
    return (
        <div className="text-dark/85 w-full p-4 border rounded-md grid grid-cols-2 cursor-pointer transition-template hover:border-primary">
            <div>
                <h1 className="font-medium">
                    {item.isAnonymous ? "Good People" : item.name}
                </h1>
                <h1 className="text-primary font-medium">
                    <FormatRupiah value={item.amount} />
                </h1>
            </div>
            <h1 className="text-right">{formatDate(item.donationDate)}</h1>
        </div>
    );
};

export default CardDonation;
