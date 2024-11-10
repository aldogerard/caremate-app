import HomeDonateCard from "@/components/landing/HomeDonateCard";
import {
    getAllCampaignByCategory,
    getAllCampaignByStatus,
} from "@/redux/feature/admin/adminCampaignSlice";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { GoArrowRight, GoChevronRight } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CampaignLandings = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const [campaignEduSupport, setCampaignEduSupport] = useState();
    const [campaignInfraSupport, setCampaignInfraSupport] = useState();
    const [campaignOperaNeeds, setCampaignOperaNeeds] = useState();

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                const edu = await dispatch(
                    getAllCampaignByCategory({
                        size: 3,
                        category: "Educational Support",
                        status: "ACTIVE",
                    })
                ).unwrap();
                setCampaignEduSupport(edu.data.content);

                const infra = await dispatch(
                    getAllCampaignByCategory({
                        size: 3,
                        category: "Infrastructure Support",
                        status: "ACTIVE",
                    })
                ).unwrap();
                setCampaignInfraSupport(infra.data.content);

                const opera = await dispatch(
                    getAllCampaignByCategory({
                        size: 3,
                        category: "Operational Needs",
                        status: "ACTIVE",
                    })
                ).unwrap();
                setCampaignOperaNeeds(opera.data.content);
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, [dispatch]);

    return (
        <>
            <section className="pt-20 pb-16 text-dark/90 px-8 xl:px-0">
                <div className="flex flex-col xl:flex-row justify-between items-center gap-6">
                    <div className="w-full xl:w-1/2 flex flex-col gap-4">
                        <h1 className="text-5xl font-medium">
                            Welcome to caremate
                        </h1>
                        <p className="mb-8">
                            To further engage our donors, CareMate offers a
                            point system where 1 point is earned for every
                            10,000 rupiahs donated, with 200 points redeemable
                            for tree donations supporting reforestation in
                            Indonesia. This unique initiative allows our donors
                            to make a positive environmental impact alongside
                            their support for children in need.
                        </p>
                        <a href="#partner-campaigns">
                            <div className="flex justify-center items-center gap-2 w-max px-8 py-3 xl:text-lg rounded-full bg-amber-500 text-light">
                                <h1 className="font-semibold">
                                    Check Our Campaign
                                </h1>
                                <GoArrowRight className="text-2xl" />
                            </div>
                        </a>
                    </div>
                    <div className="w-full xl:w-1/2 h-full">
                        <img
                            className="w-full h-full object-contain"
                            src="../src/assets/campaignLanding.png"
                            alt="About Us Image 1"
                        />
                    </div>
                </div>
            </section>

            <section
                id="partner-campaigns"
                className="pt-20 pb-16 text-dark/90 px-8 xl:px-0"
            >
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-2xl font-medium">
                        Our Partner Campaigns
                    </h1>
                </div>
                {campaignEduSupport?.filter((res) => res.status === "ACTIVE")
                    .length > 0 && (
                    <>
                        <div className="flex justify-between items-center mt-12 mb-2">
                            <h1 className="font-medium text-xl ">
                                Educational Support
                            </h1>
                            <Link
                                to={"/campaign/educational-support"}
                                className="flex justify-center items-center font-medium text-lg"
                            >
                                <h1>See More</h1>
                                <GoChevronRight size={20} />
                            </Link>
                        </div>
                        <main className="flex justify-between gap-y-4 gap-x-2 overflow-x-auto scrollbar-hide">
                            <EachUtils
                                of={campaignEduSupport
                                    .filter((res) => res.status === "ACTIVE")
                                    .slice(0, 3)}
                                render={(item) => (
                                    <HomeDonateCard item={item} />
                                )}
                            />
                        </main>
                    </>
                )}

                {campaignInfraSupport?.filter((res) => res.status === "ACTIVE")
                    .length > 0 && (
                    <>
                        <div className="flex justify-between items-center mt-12 mb-2">
                            <h1 className="font-medium text-xl ">
                                Infrastructure Support
                            </h1>
                            <Link
                                to={"/campaign/infrastructure-support"}
                                className="flex justify-center items-center font-medium text-lg"
                            >
                                <h1>See More</h1>
                                <GoChevronRight size={20} />
                            </Link>
                        </div>
                        <main className="flex justify-between gap-y-4 gap-x-2 overflow-x-auto scrollbar-hide">
                            <EachUtils
                                of={campaignInfraSupport
                                    .filter((res) => res.status === "ACTIVE")
                                    .slice(0, 3)}
                                render={(item, index) => (
                                    <HomeDonateCard item={item} />
                                )}
                            />
                        </main>
                    </>
                )}

                {campaignOperaNeeds?.filter((res) => res.status === "ACTIVE")
                    .length > 0 && (
                    <>
                        <div className="flex justify-between items-center mt-12 mb-2">
                            <h1 className="font-medium text-xl ">
                                Operational Needs
                            </h1>
                            <Link
                                to={"/campaign/operational-needs"}
                                className="flex justify-center items-center font-medium text-lg"
                            >
                                <h1>See More</h1>
                                <GoChevronRight size={20} />
                            </Link>
                        </div>
                        <main className="flex justify-between gap-y-4 gap-x-2 overflow-x-auto scrollbar-hide">
                            <EachUtils
                                of={campaignOperaNeeds
                                    .filter((res) => res.status === "ACTIVE")
                                    .slice(0, 3)}
                                render={(item, index) => (
                                    <HomeDonateCard item={item} />
                                )}
                            />
                        </main>
                    </>
                )}
            </section>
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

export default CampaignLandings;
