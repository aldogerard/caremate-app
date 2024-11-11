import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import axiosInstance from "@/api/axios";
import { Link } from "react-router-dom";
import NOT_FOUND from "@/assets/images/NotFound.jpg";

const CardHero = () => {
    const { campaigns } = useSelector((state) => state.adminCampaign);

    const [imageUrl, setImageUrl] = useState("");
    const percent =
        (campaigns[0]?.currentAmount / campaigns[0]?.goalAmount) * 100;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchImageUrl = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(
                    `/file/${campaigns[0]?.campaignImageName}`
                );
                return setImageUrl(response.data);
            } catch (error) {
                setImageUrl("");
            } finally {
                setIsLoading(false);
            }
        };

        fetchImageUrl();
    }, [campaigns[0]?.campaignImageName]);

    return (
        <>
            {!isLoading && campaigns[0] !== undefined ? (
                <Link
                    to={`campaign/details/${campaigns[0]?.id}`}
                    className="flex scale-110 translate-y-4 flex-col w-[380px] p-2 rounded-[36px] border gap-4 bg-light h-max"
                >
                    <div className="w-full h-72 rounded-t-[28px] rounded-b-[24px] overflow-hidden">
                        <img
                            src={imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target.src = NOT_FOUND)}
                        />
                    </div>
                    <div className="pb-6 px-3 flex flex-col gap-1">
                        <h1 className="text-dark/90 text-xl font-semibold">
                            {campaigns[0].title}
                        </h1>
                        <div className="flex items-center gap-1 mb-3">
                            <RiVerifiedBadgeFill
                                className="text-primary"
                                size={16}
                            />
                            <span className="text-xs font-light">
                                {campaigns[0].partnerName}
                            </span>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between items-end text-xs text-dark/80">
                                <h1>
                                    <FormatRupiah
                                        value={campaigns[0].currentAmount}
                                    />
                                </h1>
                                <h1>
                                    <FormatRupiah
                                        value={campaigns[0].goalAmount}
                                    />
                                </h1>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden bg-accent/20 ">
                                <div
                                    style={{ width: `${percent}%` }}
                                    className="h-full bg-amber-500 rounded-full"
                                />
                            </div>
                        </div>
                        <Link
                            to={"/download"}
                            className="flex justify-center items-center cursor-pointer w-full rounded-full bg-amber-500 py-2"
                        >
                            <h1 className="text-light font-semibold">
                                Donate Now
                            </h1>
                        </Link>
                    </div>
                </Link>
            ) : (
                <div className="flex scale-110 translate-y-4 flex-col w-[380px] p-2 rounded-[36px] border gap-4 bg-light h-max">
                    {/* Skeleton untuk gambar */}
                    <div className="w-full h-72 rounded-t-[28px] rounded-b-[24px] bg-gray-300 animate-pulse"></div>

                    {/* Skeleton untuk konten */}
                    <div className="pb-6 px-3 flex flex-col gap-1">
                        <div className="w-full h-6 bg-gray-300 animate-pulse rounded-md mb-2"></div>{" "}
                        {/* Skeleton untuk title */}
                        {/* Skeleton untuk partner name */}
                        <div className="flex items-center gap-1 mb-3">
                            <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>{" "}
                            {/* Skeleton untuk icon */}
                            <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div>{" "}
                            {/* Skeleton untuk partnerName */}
                        </div>
                        {/* Skeleton untuk amount and progress bar */}
                        <div className="mb-6">
                            <div className="flex justify-between items-end text-xs text-dark/80">
                                <div className="w-16 h-4 bg-gray-300 animate-pulse rounded-md"></div>{" "}
                                {/* Skeleton untuk currentAmount */}
                                <div className="w-16 h-4 bg-gray-300 animate-pulse rounded-md"></div>{" "}
                                {/* Skeleton untuk goalAmount */}
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden bg-accent/20">
                                <div className="h-full bg-gray-300 animate-pulse rounded-full" />
                            </div>
                        </div>
                        {/* Skeleton untuk tombol donate */}
                        <div className="flex justify-center items-center cursor-pointer w-full rounded-full bg-gray-300 animate-pulse py-2">
                            <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CardHero;
