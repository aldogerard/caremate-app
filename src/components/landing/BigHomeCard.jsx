import axiosInstance from "@/api/axios";
import NOT_FOUND from "@/assets/images/NotFound.jpg";
import { limitText } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BigHomeCard = () => {
    const { campaigns } = useSelector((state) => state.adminCampaign);

    const [imageUrl, setImageUrl] = useState("");
    const percent =
        (campaigns[2]?.currentAmount / campaigns[2]?.goalAmount) * 100;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchImageUrl = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(
                    `/file/${campaigns[2]?.campaignImageName}`
                );
                return setImageUrl(response.data);
            } catch (error) {
                setImageUrl("");
            } finally {
                setIsLoading(false);
            }
        };

        fetchImageUrl();
    }, [campaigns[2]?.campaignImageName]);

    return (
        <>
            {!isLoading && campaigns[2] != undefined ? (
                <section className="pt-28 pb-16">
                    <Link
                        to={`campaign/details/${campaigns[2]?.id}`}
                        className="flex flex-col-reverse gap-4 xl:flex-row p-2 xl:p-4 rounded-[32px] bg-light border"
                    >
                        <div className="pb-6 px-1 xl:px-3 flex flex-col justify-between gap-2 xl:gap-4 w-full xl:w-1/2 xl:py-8">
                            <h1 className="text-dark/90 text-xl xl:text-6xl font-semibold">
                                {limitText(campaigns[2]?.title, 20)}
                            </h1>
                            <div className="flex items-center gap-1 xl:mb-4 mb-2">
                                <RiVerifiedBadgeFill className="text-primary text-lg xl:text-3xl" />
                                <span className=" text-sm xl:text-xl">
                                    {campaigns[2]?.partnerName}
                                </span>
                            </div>
                            <p className="text-dark/80 text-xs xl:text-base xl:font-medium">
                                {limitText(campaigns[2]?.description, 130)}
                            </p>
                            <div className="mb-6">
                                <div className="flex justify-between items-end text-dark/80 font-medium">
                                    <h1 className="text-sm xl:text-base">
                                        <FormatRupiah
                                            value={campaigns[2]?.currentAmount}
                                        />
                                    </h1>
                                    <h1 className="text-sm xl:text-base">
                                        <FormatRupiah
                                            value={campaigns[2]?.goalAmount}
                                        />
                                    </h1>
                                </div>
                                <div className="w-full h-2 xl:h-4 rounded-full overflow-hidden bg-accent/20 ">
                                    <div
                                        style={{ width: `${percent}%` }}
                                        className="h-full bg-amber-500 rounded-full"
                                    />
                                </div>
                            </div>
                            <Link
                                to={"/download"}
                                className="flex justify-center items-center w-full xl:w-2/3  rounded-full cursor-pointer bg-amber-500 py-3"
                            >
                                <h1 className="text-light font-semibold text-lg">
                                    Donate Now
                                </h1>
                            </Link>
                        </div>
                        <div className=" w-full xl:w-1/2 h-80 xl:h-[440px] rounded-[24px] xl:rounded-[28px] overflow-hidden">
                            <img
                                src={imageUrl}
                                alt=""
                                className="w-full h-full object-cover"
                                onError={(e) => (e.target.src = NOT_FOUND)}
                            />
                        </div>
                    </Link>
                </section>
            ) : (
                <section className="pt-28 pb-16">
                    <div className="flex flex-col-reverse gap-4 xl:flex-row p-2 xl:p-4 rounded-[32px] bg-light border">
                        {/* Skeleton untuk Konten Kiri */}
                        <div className="pb-6 px-1 xl:px-3 flex flex-col justify-between gap-2 xl:gap-4 w-full xl:w-1/2 xl:py-8">
                            {/* Skeleton untuk Judul */}
                            <div className="w-full h-8 bg-gray-300 animate-pulse rounded-md mb-2 xl:mb-4"></div>

                            {/* Skeleton untuk Nama Partner */}
                            <div className="flex items-center gap-1 xl:mb-4 mb-2">
                                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>{" "}
                                {/* Skeleton untuk Icon */}
                                <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div>{" "}
                                {/* Skeleton untuk Partner Name */}
                            </div>

                            {/* Skeleton untuk Deskripsi */}
                            <div className="w-full h-16 bg-gray-300 animate-pulse rounded-md mb-4 xl:h-24 xl:mb-6"></div>

                            {/* Skeleton untuk Jumlah dan Goal */}
                            <div className="mb-6">
                                <div className="flex justify-between items-end text-dark/80 font-medium">
                                    <div className="w-20 h-4 bg-gray-300 animate-pulse rounded-md"></div>{" "}
                                    {/* Skeleton untuk Current Amount */}
                                    <div className="w-20 h-4 bg-gray-300 animate-pulse rounded-md"></div>{" "}
                                    {/* Skeleton untuk Goal Amount */}
                                </div>
                                {/* Skeleton untuk Progress Bar */}
                                <div className="w-full h-2 xl:h-4 rounded-full overflow-hidden bg-accent/20">
                                    <div className="h-full bg-gray-300 animate-pulse rounded-full" />
                                </div>
                            </div>

                            {/* Skeleton untuk Tombol Donate */}
                            <div className="flex justify-center items-center w-full xl:w-2/3 rounded-full cursor-pointer bg-gray-300 animate-pulse py-2">
                                <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div>{" "}
                                {/* Skeleton untuk Tombol Donate */}
                            </div>
                        </div>

                        {/* Skeleton untuk Gambar */}
                        <div className="w-full xl:w-1/2 h-80 xl:h-[440px] rounded-[24px] xl:rounded-[28px] overflow-hidden">
                            <div className="w-full h-full bg-gray-300 animate-pulse"></div>{" "}
                            {/* Skeleton untuk Gambar */}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default BigHomeCard;
