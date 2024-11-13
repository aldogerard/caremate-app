import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "@/redux/landing/newsSlice";
import NewsCard from "@/components/landing/NewsCard";
import Pagination from "@/components/Pagination";

const News = () => {
    const dispatch = useDispatch();

    const { newsItems, status, error, paging } = useSelector(
        (state) => state.news
    );

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetch = async () => {
            try {
                await dispatch(
                    fetchNews({
                        page: currentPage,
                    })
                ).unwrap();
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, [dispatch, currentPage]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    return (
        <section className="min-h-screen flex flex-col py-10">
            <div>
                <div className="flex justify-center items-center h-[50vh]">
                    {status === "loading" && <p>Loading...</p>}
                    {status === "failed" && <p>Server is not responding</p>}
                </div>
                {status === "succeeded" && (
                    <>
                        <h1 className="text-4xl font-semibold">News</h1>
                        <NewsCard articles={newsItems} />
                        <Pagination
                            handlePageClick={handlePageClick}
                            paging={paging}
                        />
                    </>
                )}
            </div>
        </section>
    );
};

export default News;
