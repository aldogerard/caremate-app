import TablePartner from "@/components/dashboard/admin/TablePartner";
import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import React, { useEffect, useState } from "react";

import InputSearch from "@/components/dashboard/InputSearch";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { getAllPartner } from "@/redux/feature/admin/adminPartnerSlice";
import { useDispatch, useSelector } from "react-redux";

const data = [
    {
        name: "UNVERIFIED",
    },
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

    const [filter, setFilter] = useState(data[0].name);
    const [isLoading, setIsloading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentQuery, setCurrentQuery] = useState("");

    const { partners, paging } = useSelector((state) => state.adminPartner);

    useEffect(() => {
        const fetchAllPartner = async () => {
            try {
                await dispatch(
                    getAllPartner({
                        status: filter,
                        page: currentPage,
                        query: currentQuery,
                    })
                ).unwrap();
            } catch (error) {
                console.log(error);
                console.error("Error fetching : ", error);
            }
        };

        fetchAllPartner();
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (partners) {
            handleSearch("");
        }
    }, [filter]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleSearch = async (query) => {
        try {
            setCurrentQuery(query);
            setIsloading(true);
            await dispatch(
                getAllPartner({
                    query: query,
                    status: filter,
                    page: 0,
                })
            ).unwrap();
            setCurrentPage(0);
        } catch (error) {
            console.error("Error fetching : ", error);
        } finally {
            setIsloading(false);
        }
    };

    return (
        <>
            <Title name={"Partner"} />
            {partners !== null && (
                <>
                    <Filter data={data} setFilter={setFilter} filter={filter} />
                    <InputSearch
                        name="partner"
                        handleSearch={handleSearch}
                        filter={filter}
                    />
                    {!isLoading && (
                        <>
                            <TablePartner />
                            {partners.length > 0 && (
                                <Pagination
                                    paging={paging}
                                    handlePageClick={handlePageClick}
                                />
                            )}
                        </>
                    )}

                    {isLoading && <Loader />}
                </>
            )}
            {partners === null && <Loader />}
        </>
    );
};

export default AdminPartner;
