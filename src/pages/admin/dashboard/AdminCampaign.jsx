import AdminDetailCampaign from "@/components/dashboard/admin/AdminDetailCampaign";
import AdminDetailPartner from "@/components/dashboard/admin/AdminDetailPartner";
import EachUtils from "@/utils/EachUtils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useState } from "react";

const sub = [
    {
        name: "Pending",
    },
    {
        name: "Active",
    },
    {
        name: "Completed",
    },
    {
        name: "Rejected",
    },
];

const AdminCampaign = () => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [filter, setFilter] = useState("Pending");

    function limitText(text, limit) {
        const words = text.split("");
        if (words.length > limit) {
            return words.slice(0, limit).join("") + "....";
        } else {
            return text;
        }
    }

    const handleDetailModal = () => {
        setIsDetailModalOpen((state) => !state);
    };

    return (
        <>
            <div className="w-full py-2 mb-10 border-b border-black/70">
                <h1 className="text-xl md:text-4xl font-medium text-black">
                    Campaign
                </h1>
            </div>
            <div className="flex py-2 mb-6 gap-8 justify-start">
                <EachUtils
                    of={sub}
                    render={(item) => (
                        <h1
                            onClick={() => setFilter(item.name)}
                            className={`font-normal text-center w-24 cursor-pointer ${
                                filter === item.name &&
                                "text-black border-primary border-b transition-template"
                            } `}
                        >
                            {item.name}
                        </h1>
                    )}
                />
            </div>
            <div className="w-full border rounded-md shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4 w-[5%]">No</th>
                            <th className="w-[15%]">Foundation Name</th>
                            <th className="w-[25%]">Campaign Title</th>
                            <th className="w-[20%]">Category</th>
                            {filter === "Active" ||
                                (filter === "Completed" && (
                                    <th className="w-[15%]">Raise Ammount</th>
                                ))}
                            <th className="w-[15%]">Goal Ammount</th>
                            <th className="w-[10%] pr-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <EachUtils
                            of={sub}
                            render={(item, index) =>
                                filter === "Pending" ? (
                                    <tr
                                        className={`${
                                            index % 2 == 0 && "bg-primary/10"
                                        }  `}
                                    >
                                        <td className="p-5">{index + 1}</td>
                                        <td>
                                            {limitText(
                                                "Yayasan engima camp",
                                                20
                                            )}
                                        </td>
                                        <td>
                                            {limitText(
                                                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit atque dolorem, aperiam unde reprehenderit consequatur nobis iste quis voluptatum voluptates, obcaecati officia ducimus nostrum mollitia veniam.",
                                                40
                                            )}
                                        </td>
                                        <td>Infrastructure Development</td>
                                        {filter === "Active" ||
                                            (filter === "Completed" && (
                                                <td>
                                                    <FormatRupiah
                                                        value={324000}
                                                    />
                                                </td>
                                            ))}
                                        <td>
                                            <FormatRupiah value={1000000} />
                                        </td>
                                        <td className="pr-4">
                                            <div
                                                onClick={handleDetailModal}
                                                className=" cursor-pointer px-4 py-2 rounded-md shadow-sm hover:shadow-sm transition-template bg-primary flex justify-center items-center w-max text-light"
                                            >
                                                <h1>Detail</h1>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    index === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="py-6 text-center"
                                            >
                                                Partner not found
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        />
                    </tbody>
                </table>
            </div>
            <AdminDetailCampaign
                isOpen={isDetailModalOpen}
                closeModal={handleDetailModal}
                status={filter}
            />
        </>
    );
};

export default AdminCampaign;
