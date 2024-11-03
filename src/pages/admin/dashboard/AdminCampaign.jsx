import AdminDetailCampaign from "@/components/dashboard/admin/AdminDetailCampaign";
import TableCampaign from "@/components/dashboard/admin/TableCampaign";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import { useState } from "react";

import dummy from "@/data/dummyCampaign.json";

const data = [
    {
        name: "PENDING",
    },
    {
        name: "ACTIVE",
    },
    {
        name: "COMPLETED",
    },
    {
        name: "REJECTED",
    },
];

const AdminCampaign = () => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [filter, setFilter] = useState(data[0].name);
    const [currentCampaign, setCurrentCampaign] = useState(null);
    const handleDetailModal = () => {
        setIsDetailModalOpen((state) => !state);
    };

    return (
        <>
            <Title name={"Campaign"} />
            <Filter data={data} setFilter={setFilter} filter={filter} />
            <TableCampaign
                item={dummy}
                filter={filter}
                handleDetailModal={handleDetailModal}
                setCurrentCampaign={setCurrentCampaign}
            />
            <AdminDetailCampaign
                isOpen={isDetailModalOpen}
                closeModal={handleDetailModal}
                status={filter}
                currentCampaign={currentCampaign}
            />
        </>
    );
};

export default AdminCampaign;
