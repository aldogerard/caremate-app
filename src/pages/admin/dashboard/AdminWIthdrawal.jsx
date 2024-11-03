import AdminDetailWithdrawal from "@/components/dashboard/admin/AdminDetailWithdrawal";
import TableWithdrawal from "@/components/dashboard/admin/TableWithdrawal";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import React, { useState } from "react";
import dummy from "@/data/dummyWithdrawal.json";

const data = [
    {
        name: "PENDING",
    },
    {
        name: "COMPLETED",
    },
    {
        name: "REJECTED",
    },
];

const AdminWithdrawal = () => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [filter, setFilter] = useState(data[0].name);
    const [currentWithdrawal, setCurrentWithdrawal] = useState(null);

    function limitText(text, limit) {
        const words = text.split("");
        if (words.length > limit) {
            return words.slice(0, limit).join("") + "....";
        } else {
            return text;
        }
    }

    const handleDetailModal = () => {
        setIsDetailModalOpen((state) => !state);
    };

    return (
        <>
            <Title name={"Withdrawal"} />
            <Filter data={data} setFilter={setFilter} filter={filter} />
            <TableWithdrawal
                item={dummy}
                filter={filter}
                handleDetailModal={handleDetailModal}
                setCurrentWithdrawal={setCurrentWithdrawal}
            />
            <AdminDetailWithdrawal
                isOpen={isDetailModalOpen}
                closeModal={handleDetailModal}
                status={filter}
                currentWithdrawal={currentWithdrawal}
            />
        </>
    );
};

export default AdminWithdrawal;
