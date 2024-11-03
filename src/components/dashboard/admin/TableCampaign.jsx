import Button from "@/components/Button";
import EachUtils from "@/utils/EachUtils";
import { limitText } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";

const TableCampaign = (props) => {
    let iteration = 0;

    const { item, handleDetailModal, filter, setCurrentCampaign } = props;

    const handleClickDetail = (res) => {
        setCurrentCampaign(res);
        handleDetailModal();
    };

    return (
        <div className="w-full border rounded-md shadow-sm">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="p-4 w-[5%]">No</th>
                        <th className="w-[15%]">Foundation Name</th>
                        <th className="w-[25%]">Campaign Title</th>
                        <th className="w-[20%]">Category</th>
                        {(filter === "ACTIVE" || filter === "COMPLETED") && (
                            <th className="w-[15%]">Raise Ammount</th>
                        )}
                        <th className="w-[15%]">Goal Ammount</th>
                        <th className="w-[10%] pr-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {item.map((res, index) => {
                        if (filter === res.status) {
                            iteration++;
                            return (
                                <tr
                                    className={`${
                                        iteration % 2 == 0 && "bg-primary/10"
                                    }  `}
                                    key={index}
                                >
                                    <td className="p-5">{iteration}</td>
                                    <td>{limitText(res.partnerName, 20)}</td>
                                    <td>{limitText(res.title, 37)}</td>
                                    <td>{res.category}</td>
                                    {(filter === "ACTIVE" ||
                                        filter === "COMPLETED") && (
                                        <td>
                                            <FormatRupiah
                                                value={res.currentAmount}
                                            />
                                        </td>
                                    )}
                                    <td>
                                        <FormatRupiah value={res.goalAmount} />
                                    </td>
                                    <td className="pr-4">
                                        <Button
                                            type="button"
                                            name={"Detail"}
                                            onClick={() =>
                                                handleClickDetail(res)
                                            }
                                        />
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                    {/* <EachUtils
                        of={item}
                        render={(item, index) =>
                            filter === item.status ? (
                                <tr
                                    className={`${
                                        index % 2 == 0 && "bg-primary/10"
                                    }  `}
                                >
                                    <td className="p-5">{index + 1}</td>
                                    <td>
                                        {limitText("Yayasan engima camp", 20)}
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
                                                <FormatRupiah value={324000} />
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
                    /> */}
                </tbody>
            </table>
        </div>
    );
};

export default TableCampaign;
