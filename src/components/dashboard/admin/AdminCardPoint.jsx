import { formatDate } from "@/utils/Utils";
import React from "react";

const AdminCardPoint = ({ item }) => {
    return (
        <div className="text-dark/85 w-full bg-light p-4 relative gap-2 border rounded-md cursor-pointer transition-template shadow-sm flex flex-row justify-between">
            <div>
                <h1 className="text-primary font-medium">
                    {item.pointUsed} Point
                </h1>
            </div>
            <h1 className="text-sm font-medium">
                {formatDate(item.transactionDate)}
            </h1>
        </div>
    );
};

export default AdminCardPoint;
