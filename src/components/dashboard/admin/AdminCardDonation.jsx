import { formatDate, limitText } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { Link } from "react-router-dom";

const AdminCardDonation = ({ item }) => {
    return (
        <Link
            to={`/dashboard/admin/campaign/${item.id}`}
            className="text-dark/85 w-full bg-light p-4 gap-2 border rounded-md cursor-pointer transition-template shadow-sm flex flex-col"
        >
            <div className="w-full flex justify-between items-center">
                <h1 className="font-medium">{limitText(item.donorName, 24)}</h1>
            </div>
            <div className="w-full flex flex-row justify-between items-end">
                <div>
                    <h1 className="text-sm">Donation</h1>
                    <h1 className="text-primary font-medium">
                        <FormatRupiah value={item.amount} />
                    </h1>
                </div>
                <h1 className="text-sm">{formatDate(item.donationDate)}</h1>
            </div>
        </Link>
    );
};

export default AdminCardDonation;
