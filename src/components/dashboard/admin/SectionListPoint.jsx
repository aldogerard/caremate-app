import { getPointById } from "@/redux/feature/admin/adminPointSlice";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminCardPoint from "./AdminCardPoint";
import Pagination from "@/components/Pagination";

const SectionListPoint = () => {
    const dispatch = useDispatch();

    const { currentDonor } = useSelector((state) => state.adminDonor);
    const { points, paging } = useSelector((state) => state.adminPoint);

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        if (currentDonor) {
            fetchData();
        }
    }, [dispatch, currentDonor, currentPage]);

    const fetchData = async () => {
        try {
            await dispatch(
                getPointById({
                    id: currentDonor.id,
                    page: currentPage,
                    size: 8,
                })
            ).unwrap();
        } catch (error) {
            console.log("Erorr : ", error);
        }
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };
    return (
        <>
            <h1 className="text-dark/85 text-3xl mb-8 mt-10">
                List Point Redeem
            </h1>
            {points && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-rows-1 gap-4">
                        {points.length > 0 && (
                            <>
                                <EachUtils
                                    of={points}
                                    render={(item) => (
                                        <AdminCardPoint item={item} />
                                    )}
                                />
                            </>
                        )}
                    </div>
                    {points.length > 0 ? (
                        <Pagination
                            paging={paging}
                            handlePageClick={handlePageClick}
                        />
                    ) : (
                        <div className="flex justify-center items-center py-20 w-full">
                            <h1 className="text-xl">Point redeem not found</h1>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default SectionListPoint;
