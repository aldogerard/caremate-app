import { formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const CardDonation = ({ item }) => {
    const location = useLocation();
    return (
        <>
            {location.pathname.includes("admin") ? (
                <Link
                    to={`/dashboard/admin/donor/${item.donorId}`}
                    className="text-dark/85 w-full bg-light p-4 border rounded-md  cursor-pointer flex flex-col gap-2 transition-template shadow-sm"
                >
                    <div>
                        <h1 className="font-medium">
                            {item.isAnonymous ? "Good People" : item.name}
                        </h1>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium">
                        <h1 className="text-primary">
                            <FormatRupiah value={item.amount} />
                        </h1>
                        <h1 className="text-right">
                            {formatDate(item.donationDate)}
                        </h1>
                    </div>
                </Link>
            ) : (
                <div className="text-dark/85 w-full bg-light p-4 border rounded-md flex flex-col gap-2 transition-template shadow-sm">
                    <div>
                        <h1 className="font-medium">
                            {item.isAnonymous ? "Good People" : item.name}
                        </h1>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium">
                        <h1 className="text-primary">
                            <FormatRupiah value={item.amount} />
                        </h1>
                        <h1 className="text-right">
                            {formatDate(item.donationDate)}
                        </h1>
                    </div>
                </div>
            )}
        </>
    );
};

export default CardDonation;
