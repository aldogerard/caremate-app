import AdminDetailCampaign from "@/components/dashboard/admin/AdminDetailCampaign";
import TableCampaign from "@/components/dashboard/admin/TableCampaign";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import { useEffect, useState } from "react";

import dummy from "@/data/dummyCampaign.json";
import { useDispatch, useSelector } from "react-redux";
import { getAllCampaign } from "@/redux/feature/admin/adminCampaignSlice";
import Loader from "@/components/Loader";

const data = [
    {
        name: "IN_REVIEW",
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

    const dispatch = useDispatch();

    const { campaigns, currentCampaign } = useSelector(
        (state) => state.adminCampaign
    );

    useEffect(() => {
        const fetchAllCampaign = async () => {
            try {
                await dispatch(getAllCampaign()).unwrap();
            } catch (error) {
                console.error("Error fetching : ", error);
            }
        };

        fetchAllCampaign();
    }, [dispatch]);

    const handleDetailModal = () => {
        setIsDetailModalOpen((state) => !state);
    };

    return (
        <>
            <Title name={"Campaign"} />
            {campaigns !== null && (
                <>
                    <Filter data={data} setFilter={setFilter} filter={filter} />
                    <TableCampaign
                        campaigns={campaigns}
                        filter={filter}
                        handleDetailModal={handleDetailModal}
                    />
                    <AdminDetailCampaign
                        isOpen={isDetailModalOpen}
                        closeModal={handleDetailModal}
                        status={filter}
                        currentCampaign={currentCampaign}
                    />
                </>
            )}
            {campaigns === null && <Loader />}
        </>
    );
};

export default AdminCampaign;
