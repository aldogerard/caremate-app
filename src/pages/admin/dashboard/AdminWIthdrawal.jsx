import AdminDetailWithdrawal from "@/components/dashboard/admin/AdminDetailWithdrawal";
import TableWithdrawal from "@/components/dashboard/admin/TableWithdrawal";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWithdrawal } from "@/redux/feature/admin/adminWithdrawalSlice";
import Loader from "@/components/Loader";

const data = [
    {
        name: "PENDING",
    },
    {
        name: "APPROVED",
    },
    {
        name: "REJECTED",
    },
];

const AdminWithdrawal = () => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [filter, setFilter] = useState(data[0].name);

    const dispatch = useDispatch();

    const { withdrawals, currentWithdrawal } = useSelector(
        (state) => state.adminWithdrawal
    );

    useEffect(() => {
        const fetchAllWithdrawal = async () => {
            try {
                await dispatch(getAllWithdrawal()).unwrap();
            } catch (error) {
                console.error("Error fetching : ", error);
            }
        };

        fetchAllWithdrawal();
    }, [dispatch]);

    const handleDetailModal = () => {
        setIsDetailModalOpen((state) => !state);
    };

    return (
        <>
            <Title name={"Withdrawal"} />
            {withdrawals !== null && (
                <>
                    <Filter data={data} setFilter={setFilter} filter={filter} />
                    <TableWithdrawal
                        withdrawals={withdrawals}
                        filter={filter}
                        handleDetailModal={handleDetailModal}
                    />
                    <AdminDetailWithdrawal
                        isOpen={isDetailModalOpen}
                        closeModal={handleDetailModal}
                        status={filter}
                        currentWithdrawal={currentWithdrawal}
                    />
                </>
            )}
            {withdrawals === null && <Loader />}
        </>
    );
};

export default AdminWithdrawal;
