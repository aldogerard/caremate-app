import React, { useEffect, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";
import { FormatRupiah } from "@arismun/format-rupiah";
import { limitText } from "@/utils/Utils";
import axiosInstance from "@/api/axios";

const HomeDonateCard = ({ item }) => {
    const navigate = useNavigate();

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
        // <div className="">
        //     <div className="block xl:hidden">
        //         <Swiper
        //             spaceBetween={16}
        //             slidesPerView={1}
        //             loop={true} // Enable looping
        //         >
        //             {campaigns.slice(0, 6).map((campaign) => {
        //                 const width = (campaign.raised / campaign.goal) * 100;
        //                 return (
        //                     <SwiperSlide key={campaign.id}>
        //                         <div className="rounded-[50px] bg-white border border-black relative h-[450px] w-10/12 p-2">
        //                             <img
        //                                 className="rounded-[40px] h-1/2 object-cover -mb-4"
        //                                 src={campaign.image}
        //                                 alt={campaign.title}
        //                             />
        //                             <div className="mx-2">
        //                                 <h3 className="text-[#25292c] text-base font-medium mt-8">
        //                                     {campaign.title}
        //                                 </h3>
        //                                 <div className="flex items-center">
        //                                     <RiVerifiedBadgeFill
        //                                         style={{ color: "green" }}
        //                                     />
        //                                     <span className="opacity-60 text-[#3d3d3d] text-xs font-normal">
        //                                         {campaign.organization}
        //                                     </span>
        //                                 </div>
        //                                 <div className="flex justify-between items-center mt-6">
        //                                     <span className="text-xs opacity-60 text-[#191919]">
        //                                         Raised: Rp {campaign.raised}
        //                                     </span>
        //                                     <span className="text-xs opacity-60 text-[#191919]">
        //                                         Goal: Rp {campaign.goal}
        //                                     </span>
        //                                 </div>
        //                                 <div className="w-full">
        //                                     <div className="h-1.5 bg-[#d9d9d9] rounded-lg mt-1">
        //                                         <div
        //                                             className="h-1 bg-[#e17052] rounded-lg"
        //                                             style={{
        //                                                 width: `${width}%`,
        //                                             }}
        //                                         ></div>
        //                                     </div>
        //                                     <button
        //                                         className="bg-[#e17153] text-white rounded-3xl py-1 px-1 mt-6 text-sm w-full"
        //                                         onClick={() =>
        //                                             navigate(`/download`)
        //                                         }
        //                                     >
        //                                         Donate Now
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </SwiperSlide>
        //                 );
        //             })}
        //         </Swiper>
        //     </div>

        //     {/* Grid layout for tablet and desktop */}
        //     <div className="hidden xl:grid grid-cols-3 gap-6">
        //         {campaigns.slice(0, 6).map((campaign) => {
        //             const width = (campaign.raised / campaign.goal) * 100;
        //             return (
        //                 <div
        //                     key={campaign.id}
        //                     className="rounded-[50px] bg-white border border-black relative h-[450px] w-11/12 p-2"
        //                 >
        //                     <img
        //                         className="rounded-[40px] h-1/2 object-cover -mb-4"
        //                         src={campaign.image}
        //                         alt={campaign.title}
        //                     />
        //                     <div className="mx-2">
        //                         <h3 className="text-[#25292c] text-base font-medium mt-8">
        //                             {campaign.title}
        //                         </h3>
        //                         <div className="flex items-center">
        //                             <RiVerifiedBadgeFill
        //                                 style={{ color: "green" }}
        //                             />
        //                             <span className="opacity-60 text-[#3d3d3d] text-xs font-normal">
        //                                 {campaign.organization}
        //                             </span>
        //                         </div>
        //                         <div className="flex justify-between items-center mt-6">
        //                             <span className="text-xs opacity-60 text-[#191919]">
        //                                 Raised: Rp {campaign.raised}
        //                             </span>
        //                             <span className="text-xs opacity-60 text-[#191919]">
        //                                 Goal: Rp {campaign.goal}
        //                             </span>
        //                         </div>
        //                         <div className="w-full">
        //                             <div className="h-1.5 bg-[#d9d9d9] rounded-lg mt-1">
        //                                 <div
        //                                     className="h-1 bg-[#e17052] rounded-lg"
        //                                     style={{ width: `${width}%` }}
        //                                 ></div>
        //                             </div>
        //                             <button
        //                                 className="bg-[#e17153] text-white rounded-3xl py-1 px-1 mt-6 text-sm w-full"
        //                                 onClick={() => navigate(`/download`)}
        //                             >
        //                                 Donate Now
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             );
        //         })}
        //     </div>

        // </div>
        <>
            {!isLoading ? (
                <Link
                    to={`/campaign/details/${item.id}`}
                    className="flex flex-col w-full xl:w-[32%] min-w-[360px] p-2 rounded-[36px] border gap-4 bg-light h-max"
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
                <div className="flex flex-col w-full xl:w-[32%] p-2 min-w-[360px] rounded-[36px] border gap-4 bg-light h-max">
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
