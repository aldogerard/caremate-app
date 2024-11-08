import { capitalizeFirstLetter } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { Link } from "react-router-dom";

const AdminCardCampaign = ({ item }) => {
    return (
        <Link
            to={`/dashboard/admin/campaign/${item.id}`}
            className="text-dark/85 bg-light shadow-md w-full p-4 border rounded-md grid grid-cols-2 grid-rows-2 cursor-pointer transition-templates"
        >
            <h1 className="font-medium">{item.title}</h1>
            <h1 className="text-primary font-medium text-right">
                {capitalizeFirstLetter(item.status)}
            </h1>
            <h1>
                <FormatRupiah value={item.currentAmount} />
            </h1>
            <h1 className="text-right">
                <FormatRupiah value={item.goalAmount} />
            </h1>
        </Link>
    );
};

export default AdminCardCampaign;
