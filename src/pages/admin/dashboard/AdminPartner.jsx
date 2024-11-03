import AdminDetailPartner from "@/components/dashboard/admin/AdminDetailPartner";
import TablePartner from "@/components/dashboard/admin/TablePartner";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import React, { useState } from "react";

import dummy from "@/data/dummyPartner.json";

const data = [
    {
        name: "IN REVIEW",
    },
    {
        name: "VERIFIED",
    },
    {
        name: "REJECTED",
    },
];

const AdminPartner = () => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [filter, setFilter] = useState(data[0].name);
    const [currentPartner, setCurrentPartner] = useState(null);

    const handleDetailModal = () => {
        setIsDetailModalOpen((state) => !state);
    };

    return (
        <>
            <Title name={"Partner"} />
            <Filter data={data} setFilter={setFilter} filter={filter} />
            <TablePartner
                item={dummy}
                filter={filter}
                handleDetailModal={handleDetailModal}
                setCurrentPartner={setCurrentPartner}
            />
            <AdminDetailPartner
                isOpen={isDetailModalOpen}
                closeModal={handleDetailModal}
                status={filter}
                currentPartner={currentPartner}
            />
        </>
    );
};

export default AdminPartner;
