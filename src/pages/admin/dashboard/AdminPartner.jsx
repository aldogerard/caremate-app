import AdminDetailPartner from "@/components/dashboard/admin/AdminDetailPartner";
import TablePartner from "@/components/dashboard/admin/TablePartner";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import React, { useEffect, useState } from "react";

import dummy from "@/data/dummyPartner.json";
import { useDispatch, useSelector } from "react-redux";
import { getAllPartner } from "@/redux/feature/admin/adminPartnerSlice";
import Loader from "@/components/Loader";

const data = [
    {
        name: "IN_REVIEW",
    },
    {
        name: "VERIFIED",
    },
    {
        name: "REJECTED",
    },
];

const AdminPartner = () => {
    const dispatch = useDispatch();

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [filter, setFilter] = useState(data[0].name);

    const { partners, currentPartner } = useSelector(
        (state) => state.adminPartner
    );

    useEffect(() => {
        const fetchPartnerDetails = async () => {
            try {
                await dispatch(getAllPartner()).unwrap();
            } catch (error) {
                console.error("Error fetching : ", error);
            }
        };

        fetchPartnerDetails();
    }, [dispatch]);

    const handleDetailModal = () => {
        setIsDetailModalOpen((state) => !state);
    };

    return (
        <>
            <Title name={"Partner"} />
            {partners !== null && (
                <>
                    <Filter data={data} setFilter={setFilter} filter={filter} />
                    <TablePartner
                        partners={partners}
                        filter={filter}
                        handleDetailModal={handleDetailModal}
                    />
                    <AdminDetailPartner
                        isOpen={isDetailModalOpen}
                        closeModal={handleDetailModal}
                        status={filter}
                        currentPartner={currentPartner}
                    />
                </>
            )}
            {partners === null && <Loader />}
        </>
    );
};

export default AdminPartner;
