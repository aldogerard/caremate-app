import { formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { Link } from "react-router-dom";

const CardDonation = ({ item }) => {
    return (
        <Link
            to={`/dashboard/admin/donor/${item.id}`}
            className="text-dark/85 w-full bg-light p-4 border rounded-md grid grid-cols-2 cursor-pointer transition-template hover:border-primary"
        >
            <div>
                <h1 className="font-medium">
                    {item.isAnonymous ? "Good People" : item.donorName}
                </h1>
                <h1 className="text-primary font-medium">
                    <FormatRupiah value={item.amount} />
                </h1>
            </div>
            <h1 className="text-right">{formatDate(item.donationDate)}</h1>
        </Link>
    );
};

export default CardDonation;
