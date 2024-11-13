import axiosInstance from "@/api/axios";
import { limitText } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "swiper/css";

const HomeDonateCard = ({ item }) => {
    const [imageUrl, setImageUrl] = useState("");
    const percent = (item.currentAmount / item.goalAmount) * 100;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchImageUrl = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(
                    `/file/${item.campaignImageName}`
                );
                return setImageUrl(response.data);
            } catch (error) {
                setImageUrl("");
            } finally {
                setIsLoading(false);
            }
        };

        fetchImageUrl();
    }, [item.campaignImageName]);

    return (
        <>
            {!isLoading ? (
                <Link
                    to={`/campaign/details/${item.slug}`}
                    className="flex flex-col w-full max-w-[440px] p-2 rounded-[36px] border gap-4 bg-light h-max"
                >
                    <div className="w-full h-60 xl:h-72 rounded-t-[28px] rounded-b-[24px] overflow-hidden">
                        <img
                            src={imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="pb-6 px-3 flex flex-col gap-1">
                        <h1 className="text-dark/90 text-xl font-semibold">
                            {limitText(item.title, 30)}
                        </h1>
                        <div className="flex items-center gap-1 mb-3">
                            <RiVerifiedBadgeFill
                                className="text-primary"
                                size={16}
                            />
                            <span className="text-xs font-light">
                                {limitText(item.partnerName, 40)}
                            </span>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between items-end text-xs text-dark/80">
                                <h1>
                                    <FormatRupiah value={item.currentAmount} />
                                </h1>
                                <h1>
                                    <FormatRupiah value={item.goalAmount} />
                                </h1>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden bg-accent/20 ">
                                <div
                                    style={{ width: `${percent}%` }}
                                    className="h-full bg-amber-500 rounded-full"
                                />
                            </div>
                        </div>
                        {item.status === "ACTIVE" && (
                            <Link
                                to={"/download"}
                                className="flex justify-center items-center cursor-pointer w-full rounded-full bg-amber-500 py-3"
                            >
                                <h1 className="text-light font-semibold">
                                    Donate Now
                                </h1>
                            </Link>
                        )}
                        {item.status === "COMPLETED" && (
                            <div className="flex justify-center items-center cursor-pointer w-full rounded-full bg-primary py-3">
                                <h1 className="text-light font-semibold">
                                    Completed
                                </h1>
                            </div>
                        )}
                    </div>
                </Link>
            ) : (
                <div className="flex flex-col w-full max-w-[440px] p-2 rounded-[36px] border gap-4 bg-light h-max">
                    {/* Skeleton untuk gambar */}
                    <div className="w-full h-60 xl:h-72 rounded-t-[28px] rounded-b-[24px] bg-gray-300 animate-pulse"></div>

                    {/* Skeleton untuk konten */}
                    <div className="pb-6 px-3 flex flex-col gap-1">
                        {/* Skeleton untuk judul */}
                        <div className="w-full h-6 bg-gray-300 animate-pulse rounded-md mb-2"></div>

                        {/* Skeleton untuk partner name */}
                        <div className="flex items-center gap-1 mb-3">
                            <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>{" "}
                            {/* Skeleton untuk icon */}
                            <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div>{" "}
                            {/* Skeleton untuk partnerName */}
                        </div>

                        {/* Skeleton untuk amount dan progress bar */}
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

export default HomeDonateCard;
