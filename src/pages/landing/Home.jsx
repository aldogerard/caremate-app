import BigHomeCard from "@/components/landing/BigHomeCard";
import CardHero from "@/components/landing/CardHero";
import HomeDonateCard from "@/components/landing/HomeDonateCard";
import HomeNewsCard from "@/components/landing/HomeNewsCard";
import SubCardHero from "@/components/landing/SubCardHero";
import Loader from "@/components/Loader";
import { getAllCampaignByStatus } from "@/redux/feature/admin/adminCampaignSlice";
import { fetchNews } from "@/redux/landing/newsSlice";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { GoArrowRight, GoPeople } from "react-icons/go";
import { PiHandsClappingLight } from "react-icons/pi";
import { SlEmotsmile } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const { newsItems, status } = useSelector((state) => state.news);
    const { campaigns } = useSelector((state) => state.adminCampaign);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                await dispatch(
                    getAllCampaignByStatus({ size: 6, status: "ACTIVE" })
                ).unwrap();
                await dispatch(fetchNews()).unwrap();
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    }, [status, dispatch]);

    return (
        <>
            {!isLoading ? (
                <>
                    <section className="flex xl:flex-row flex-col h-[93.5vh] gap-4 relative">
                        <div className=" hidden xl:block w-[480px] aspect-square bg-primary absolute right-0"></div>
                        <div className="w-full xl:w-[45%] flex flex-col justify-center h-3/4 z-10">
                            <h3 className="text-sm lg:text-xl font-semibold">
                                Healing Hearts, Healing Lives
                            </h3>
                            <h1 className="text-5xl lg:text-6xl lg:leading-[1.3] font-bold mt-2 lg:mt-4 mb-4 lg:mb-8">
                                Being Part Of Aid Foundation Is A Way To Share
                            </h1>
                            <p className="text-dark-70 text-sm lg:text-lg lg:leading-8">
                                Share your kindness with the world. By
                                supporting the Aid Foundation, you're not just
                                making a donation, you're investing in the
                                future. Your contributions help fund vital
                                programs, empower communities, and provide hope
                                to those who need it most.
                            </p>
                        </div>
                        <div className="w-full xl:w-[55%] hidden xl:flex justify-between h-full pt-16 z-10">
                            <CardHero />
                            <SubCardHero />
                        </div>
                    </section>

                    <div className="bg-primary absolute bottom-10 xl:bottom-0 left-0 w-full xl:w-[60%] flex justify-center text-light py-8 xl:py-20 xl:rounded-tr-[80px]">
                        <div className="flex gap-8 xl:gap-16 ml-2 xl:ml-12">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl xl:text-4xl font-bold ">
                                    145+
                                </h2>
                                <p className="xl:text-base text-sm font-medium">
                                    Achieved Campaigns
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl xl:text-4xl font-bold ">
                                    1200+
                                </h2>
                                <p className="xl:text-base text-sm font-medium">
                                    Donations Received
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl xl:text-4xl font-bold ">
                                    545+
                                </h2>
                                <p className="xl:text-base text-sm font-medium">
                                    Clarity in the Last Year
                                </p>
                            </div>
                        </div>
                    </div>

                    <BigHomeCard />

                    {/* <section className="pt-28 pb-16">
                        <div className="flex flex-col-reverse gap-4 xl:flex-row p-2 xl:p-4 rounded-[32px] bg-light border">
                            <div className="pb-6 px-1 xl:px-3 flex flex-col gap-2 xl:gap-4 w-full xl:w-1/2 xl:py-8">
                                <h1 className="text-dark/90 text-xl xl:text-6xl font-semibold">
                                    Berbagi Alat Tulis Kepada Penggapai Mimpi
                                </h1>
                                <div className="flex items-center gap-1 xl:mb-4 mb-2">
                                    <RiVerifiedBadgeFill className="text-primary text-lg xl:text-3xl" />
                                    <span className=" text-sm xl:text-xl">
                                        Griya Yatim Fathia
                                    </span>
                                </div>
                                <p className="text-dark/80 text-xs xl:text-base xl:font-medium">
                                    Dengan berbagi alat tulis kita tidak hanya
                                    memberikan benda, tetapi juga memberi
                                    harapan dan semangat belajar.
                                </p>
                                <div className="mb-6">
                                    <div className="flex justify-between items-end text-dark/80 font-medium">
                                        <h1 className="text-sm xl:text-base">
                                            <FormatRupiah value={370000} />
                                        </h1>
                                        <h1 className="text-sm xl:text-base">
                                            <FormatRupiah value={2500000} />
                                        </h1>
                                    </div>
                                    <div className="w-full h-2 xl:h-4 rounded-full overflow-hidden bg-accent/20 ">
                                        <div
                                            style={{ width: `22%` }}
                                            className="h-full bg-amber-500 rounded-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center items-center w-full xl:w-2/3  rounded-full cursor-pointer bg-amber-500 py-2">
                                    <h1 className="text-light font-semibold text-lg">
                                        Donate Now
                                    </h1>
                                </div>
                            </div>
                            <div className=" w-full xl:w-1/2 h-80 xl:h-auto rounded-[24px] xl:rounded-[28px] overflow-hidden">
                                <img
                                    src="https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg"
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </section> */}

                    <section className="pt-20 pb-16">
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-2xl lg:text-6xl text-primary text-center font-semibold">
                                How To Start Help
                            </h1>
                            <p className="text-sm lg:text-base max-w-4xl font-medium text-center mt-5">
                                In carrying out their duties, charitable
                                foundations provide a variety of social services
                                such as education, food, medicine, housing, and
                                others
                            </p>
                        </div>
                        <div className="mt-10 flex flex-wrap gap-12 justify-center">
                            <div className="w-full flex flex-col items-center gap-4 md:w-[45%] lg:w-[30%]">
                                <GoPeople size={56} color="#FBBF24" />
                                <h1 className="text-xl font-bold uppercase">
                                    Register Yourself
                                </h1>
                                <p className="text-center max-w-sm text-sm">
                                    Sign up to join and be part of the good
                                    people who love to share
                                </p>
                            </div>
                            <div className="w-full flex flex-col items-center gap-4 md:w-[45%] lg:w-[30%]">
                                <PiHandsClappingLight
                                    size={56}
                                    color="#FBBF24"
                                />
                                <h1 className="text-xl font-bold uppercase">
                                    Select Donate
                                </h1>
                                <p className="text-center max-w-sm text-sm">
                                    There are many things you can choose to
                                    share goodness with
                                </p>
                            </div>
                            <div className="w-full flex flex-col items-center gap-4 md:w-[45%] lg:w-[30%]">
                                <SlEmotsmile size={56} color="#FBBF24" />
                                <h1 className="text-xl font-bold uppercase">
                                    Professional Services
                                </h1>
                                <p className="text-center max-w-sm text-sm">
                                    Sharing happiness with those less and doing
                                    more good for others
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="pt-20 pb-16">
                        <div className="flex justify-between items-center pb-10">
                            <h2 className="text-lg lg:text-3xl font-bold">
                                Let's Give Help To Those In Need
                            </h2>
                            <Link
                                to={"/campaign"}
                                className="lg:bg-amber-500 flex items-center xl:gap-2 font-medium text-amber-500 lg:text-white rounded-3xl text-sm lg:text-lg xl:px-8 px-4 py-2"
                            >
                                <span>See More Campaign</span>
                                <GoArrowRight size={32} />
                            </Link>
                        </div>
                        {campaigns?.length > 0 && (
                            <main className="flex justify-between flex-wrap gap-y-4 gap-x-2">
                                <EachUtils
                                    of={campaigns}
                                    render={(item) => (
                                        <HomeDonateCard item={item} />
                                    )}
                                />
                            </main>
                        )}
                    </section>

                    {newsItems?.length > 0 && (
                        <section className="pt-20 pb-16">
                            <div className="flex justify-between mx-5">
                                <h2 className="text-xl lg:text-3xl font-bold">
                                    News and Articles
                                </h2>
                                {newsItems.length > 4 && (
                                    <Link
                                        to={"/news"}
                                        className="lg:bg-[#e17153] flex items-center text-[#e17153] lg:text-white rounded-3xl text-sm lg:text-lg lg:px-5 lg:py-2"
                                    >
                                        <span>See More</span>
                                        <GoArrowRight />
                                    </Link>
                                )}
                            </div>
                            <HomeNewsCard articles={newsItems} />
                        </section>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Home;
