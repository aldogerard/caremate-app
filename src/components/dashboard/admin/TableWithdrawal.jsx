import Button from "@/components/Button";
import EachUtils from "@/utils/EachUtils";
import { limitText } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";

const TableWithdrawal = (props) => {
    const { item, handleDetailModal, filter, setCurrentWithdrawal } = props;

    let iteration = 0;

    const handleClickDetail = (res) => {
        setCurrentWithdrawal(res);
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
                        <th className="w-[15%]">Total Withdrawal</th>
                        <th className="w-[10%]">Tax</th>
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
                                    <td>{limitText(res.partnerName, 25)}</td>
                                    <td>{limitText(res.title, 40)}</td>
                                    <td>{res.category}</td>
                                    <td>
                                        <FormatRupiah value={res.totalAmount} />
                                    </td>
                                    <td>
                                        <FormatRupiah value={res.totalTax} />
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
                        of={data}
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

export default TableWithdrawal;
