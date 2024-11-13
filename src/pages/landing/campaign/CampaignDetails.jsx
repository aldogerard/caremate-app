import CardCampaignReport from "@/components/landing/CardCampaignReport";
import ProgressRing from "@/components/landing/ProgressRing";
import Loader from "@/components/Loader";
import { getCampaignReportByCampaignId } from "@/redux/feature/partner/campaignReportSlice";
import {
    getCampaignDetailById,
    getCampaignDetailBySlug,
    getCampaignImageByName,
} from "@/redux/feature/partner/campaignSlice";
import { getDonationByCampaignId } from "@/redux/feature/partner/donationSlice";
import EachUtils from "@/utils/EachUtils";
import { formatDate } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { PiDotOutlineFill } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const CampaignDetails = () => {
    const { id } = useParams();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showAllMessage, setShowAllMessage] = useState(false);
    const [showAllDonate, setShowAllDonate] = useState(false);
    const [showAllCampaignReport, setShowAllCampaignReport] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const { currentCampaign, currentCampaignUrl } = useSelector(
        (state) => state.campaign
    );
    const { campaignReports } = useSelector((state) => state.campaignReport);

    const { donations } = useSelector((state) => state.donation);

    const messagesToDisplay = showAllMessage
        ? donations
        : donations?.slice(0, 3);
    const donateToDisplay = showAllDonate ? donations : donations?.slice(0, 5);

    const campaignReportsToDisplay = showAllCampaignReport
        ? campaignReports
        : campaignReports?.slice(0, 1);

    const percent =
        (currentCampaign?.currentAmount / currentCampaign?.goalAmount) * 100;

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { data } = await dispatch(
                    getCampaignDetailBySlug(id)
                ).unwrap();
                await dispatch(
                    getCampaignImageByName(data.campaignImageName)
                ).unwrap();
                await dispatch(
                    getDonationByCampaignId({ id: data.id, size: 8 })
                ).unwrap();
                await dispatch(
                    getCampaignReportByCampaignId({ id: data.id, size: 100000 })
                ).unwrap();
            } catch (error) {
                console.log("Erorr : ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, currentCampaign?.campaignImageName]);

    return (
        <>
            {!isLoading && currentCampaign ? (
                <div className="p-4 lg:m-6 h-auto">
                    <h1 className="text-2xl lg:text-4xl font-bold">
                        {currentCampaign.title}
                    </h1>
                    <div className="flex flex-col md:flex-row md:space-x-5 mt-10">
                        <div className="flex-1">
                            <div className="w-full h-[500px]">
                                <img
                                    src={currentCampaignUrl}
                                    alt="Campaign 1"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-row items-center mt-6 space-x-1">
                                <RiVerifiedBadgeFill
                                    style={{
                                        color: "#0b826c",
                                        width: "40px",
                                        height: "40px",
                                    }}
                                />
                                <h3 className="text-sm md:text-base">
                                    {currentCampaign.partnerName}
                                </h3>
                            </div>

                            <div className="w-full border mt-5" />
                            <div className="relative">
                                <p
                                    className={`mt-5 lg:text-lg text-justify ${
                                        isExpanded ? "" : "line-clamp-6"
                                    }`}
                                >
                                    {currentCampaign.description}
                                </p>
                                {!isExpanded && (
                                    <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#F9F5E8] to-transparent pointer-events-none" />
                                )}
                            </div>
                            {!isExpanded && (
                                <div className="flex justify-center mt-2">
                                    <button
                                        onClick={toggleReadMore}
                                        className="hover:underline flex flex-row items-center"
                                    >
                                        Read More
                                        <GoChevronDown />
                                    </button>
                                </div>
                            )}
                            {isExpanded && (
                                <div className="flex justify-center mt-2">
                                    <button
                                        onClick={toggleReadMore}
                                        className="hover:underline flex flex-row items-center"
                                    >
                                        Read Less
                                        <GoChevronUp />
                                    </button>
                                </div>
                            )}
                            <div>
                                <div className="w-full border mt-5" />
                                <h2 className="text-lg lg:text-2xl font-semibold mt-5">
                                    Updates ({campaignReports?.length})
                                </h2>
                                <EachUtils
                                    of={campaignReportsToDisplay}
                                    render={(item) => (
                                        <CardCampaignReport item={item} />
                                    )}
                                />
                                {campaignReports.length > 1 && (
                                    <button
                                        className="bg-primary rounded-lg py-2 px-4 text-white mt-5 text-sm"
                                        onClick={() =>
                                            setShowAllCampaignReport(
                                                !showAllCampaignReport
                                            )
                                        }
                                    >
                                        {showAllCampaignReport
                                            ? "Show Less"
                                            : "Show More"}
                                    </button>
                                )}
                            </div>

                            <div>
                                <div className="w-full border mt-5" />
                                <h2 className="text-lg lg:text-2xl font-semibold mt-5">
                                    Words of Hope ({donations.length})
                                </h2>
                                <p className="text-[#3d3d3d] text-xs">
                                    Please donate to share words of hope
                                </p>
                                <div className="">
                                    {messagesToDisplay.map((item, index) => (
                                        <div
                                            className="flex flex-row space-x-2 mt-5"
                                            key={index}
                                        >
                                            <RxAvatar
                                                style={{
                                                    color: "#e17153",
                                                    width: "40px",
                                                    height: "40px",
                                                }}
                                            />
                                            <div className="flex flex-col">
                                                <h3 className="lg:text-lg font-semibold">
                                                    {item.isAnonymous
                                                        ? "Anonymous"
                                                        : item.name}
                                                </h3>
                                                <div className="flex flex-row text-sm items-center">
                                                    <FormatRupiah
                                                        value={item.amount}
                                                    />
                                                    <PiDotOutlineFill className="mx-1" />
                                                    <p>
                                                        {formatDate(
                                                            item.donationDate
                                                        )}
                                                    </p>
                                                </div>
                                                <p className="text-sm">
                                                    {item.personalMessage}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {donations.length > 3 && (
                                    <button
                                        className="bg-primary rounded-lg py-2 px-4 text-white mt-5 text-sm"
                                        onClick={() =>
                                            setShowAllMessage(!showAllMessage)
                                        }
                                    >
                                        {showAllMessage
                                            ? "Show Less"
                                            : "Show More"}
                                    </button>
                                )}
                            </div>
                            <div className="mt-10">
                                <div className="w-full border mt-5" />
                                <div className="flex flex-row items-center mt-5 text-xs lg:text-sm">
                                    <span>
                                        Created at{" "}
                                        {formatDate(
                                            currentCampaign.createDate ||
                                                "1-1-2024"
                                        )}
                                    </span>
                                    <PiDotOutlineFill />
                                    <span>{currentCampaign.category}</span>
                                </div>
                                <div className="w-full border mt-5" />
                            </div>
                        </div>
                        <div className="h-auto">
                            <div className="flex flex-col sticky top-20 bg-[#FDFAF1] p-5 rounded-lg shadow-xl">
                                <div className="flex flex-row items-center space-x-4">
                                    <div>
                                        <h2 className="text-lg lg:text-2xl font-bold">
                                            <FormatRupiah
                                                value={
                                                    currentCampaign.currentAmount
                                                }
                                            />{" "}
                                            raised
                                        </h2>
                                        <div className="flex flex-row items-center space-x-2 text-xs lg:text-sm">
                                            <span>
                                                <FormatRupiah
                                                    value={
                                                        currentCampaign.goalAmount
                                                    }
                                                />{" "}
                                                goal
                                            </span>
                                            <PiDotOutlineFill className="text-gray-400" />
                                            <span>
                                                {donations.length} donations
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <ProgressRing
                                            percentage={
                                                percent > 100
                                                    ? 100
                                                    : percent >= 10
                                                    ? Math.floor(percent)
                                                    : percent >= 1
                                                    ? percent.toFixed(1)
                                                    : percent.toFixed(2)
                                            }
                                        />
                                    </div>
                                </div>
                                <Link
                                    to={"/download"}
                                    className="bg-gradient-to-b from-[#f8b8a6] to-[#e17052] py-3 px-6 rounded-xl mx-5 text-white text-lg font-semibold"
                                >
                                    Donate Now
                                </Link>
                                <div className="mt-8">
                                    {donateToDisplay.map((item, index) => (
                                        <div
                                            className="flex flex-row space-x-2 mt-5"
                                            key={index}
                                        >
                                            <RxAvatar
                                                style={{
                                                    color: "#e17153",
                                                    width: "40px",
                                                    height: "40px",
                                                }}
                                            />
                                            <div className="flex flex-col">
                                                <h3 className="text-lg font-semibold">
                                                    {item.isAnonymous
                                                        ? "Anonymous"
                                                        : item.name}
                                                </h3>
                                                <div className="flex flex-row text-sm items-center">
                                                    <FormatRupiah
                                                        value={item.amount}
                                                    />
                                                    <PiDotOutlineFill className="mx-1" />
                                                    <p>
                                                        {formatDate(
                                                            item.donationDate
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {donations.length > 5 && (
                                    <button
                                        className="bg-gradient-to-b from-[#f8b8a6] to-[#e17052] rounded-lg py-2 px-4 text-white mt-5 text-sm self-start"
                                        onClick={() =>
                                            setShowAllDonate(!showAllDonate)
                                        }
                                    >
                                        {showAllDonate
                                            ? "Show Less"
                                            : "Show All"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default CampaignDetails;
