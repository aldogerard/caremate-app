import HomeDonateCard from "@/components/landing/HomeDonateCard";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { getAllCampaignByCategory } from "@/redux/feature/admin/adminCampaignSlice";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const CampaignCategorys = () => {
    const { category } = useParams();
    const categorys =
        category === "educational-support"
            ? "Educational Support"
            : category === "infrastructure-support"
            ? "Infrastructure Support"
            : category === "operational-needs"
            ? "Operational Needs"
            : "Unknown Category";

    const dispatch = useDispatch();
    const { campaigns, paging } = useSelector((state) => state.adminCampaign);

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentQuery, setCurrentQuery] = useState("");

    useEffect(() => {
        const fetch = async () => {
            try {
                await dispatch(
                    getAllCampaignByCategory({
                        category: categorys,
                        page: currentPage,
                        query: currentQuery,
                        status: "ACTIVE",
                        size: 6,
                    })
                ).unwrap();
            } catch (error) {}
        };
        fetch();
    }, [dispatch, currentPage]);

    const handleChange = (e) => {
        setCurrentQuery(e.target.value || "");

        if (e.target.value.length === 0) {
            return handleSearch("");
        }
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch("");
    };

    const handleSearch = async (query) => {
        try {
            setCurrentQuery(query);
            setIsLoading(true);
            await dispatch(
                getAllCampaignByCategory({
                    query: query,
                    size: 6,
                    status: "ACTIVE",
                    page: 0,
                    category: categorys,
                })
            ).unwrap();
            setCurrentPage(0);
        } catch (error) {
            console.error("Error fetching : ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <section className="pt-20 pb-16 text-dark/90 px-8 xl:px-0">
                <div className="flex flex-col xl:flex-row gap-4 items-center">
                    <div className="w-full xl:w-1/2 flex flex-col gap-4">
                        <h1 className="text-black text-4xl font-bold">
                            {categorys}
                        </h1>
                        <p className="text-xl font-normal">
                            Join us in unlocking opportunities through
                            education. Each donation, each share, and each
                            gesture of kindness brings us nearer to a future
                            where every child has the chance to grow, learn, and
                            thrive.
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center w-full h-16 bg-light rounded border border-dark overflow-hidden"
                        >
                            <button className="w-16 h-full flex items-center justify-center bg-[#e17153] rounded-l">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                    className="h-6 w-6 opacity-100"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M11 4a7 7 0 015.467 11.746l4.193 4.194a1 1 0 01-1.414 1.414l-4.194-4.193A7 7 0 1111 4zm-5 7a5 5 0 1010 0 5 5 0 00-10 0z"
                                    />
                                </svg>
                            </button>
                            <input
                                type="text"
                                onChange={handleChange}
                                placeholder="Search"
                                className="w-full h-full px-4 font-medium bg-transparent outline-none"
                            />
                        </form>
                    </div>
                    <div className="w-full xl:w-1/2 h-[500px]">
                        <img
                            className="w-full h-full object-contain"
                            src="../src/assets/Campaign details.png"
                            alt="About Us Image 1"
                        />
                    </div>
                </div>
            </section>

            {campaigns?.length ? (
                <section className="pt-20 pb-16 text-dark/90 px-8 xl:px-0">
                    {!isLoading ? (
                        <>
                            <main className="flex flex-wrap justify-between gap-y-4 gap-x-2">
                                <EachUtils
                                    of={campaigns}
                                    render={(item) => (
                                        <HomeDonateCard item={item} />
                                    )}
                                />
                            </main>
                            <Pagination
                                handlePageClick={handlePageClick}
                                paging={paging}
                            />
                        </>
                    ) : (
                        <div className="flex justify-center items-center">
                            <h1 className="text-lg font-medium">
                                Campaign not found
                            </h1>
                        </div>
                    )}
                </section>
            ) : (
                <Loader />
            )}

            <section className="pt-14 pb-16 text-dark/90 px-8 xl:px-0">
                <div className="flex flex-col justify-center items-center gap-4">
                    <h2 className="text-dark/90 text-3xl font-semibold text-center">
                        Want to make your own campaign?
                    </h2>
                    <Link
                        to="/partner/signup"
                        className="bg-amber-500 text-light px-10 py-4 flex justify-center items-center w-max rounded-full"
                    >
                        <h1 className="text-lg font-medium">Register Now</h1>
                    </Link>
                    <p className="text-dark/90 text-center">
                        Register now as a partner, and give many children new
                        hope
                    </p>
                </div>
            </section>
        </>
    );
};

export default CampaignCategorys;
