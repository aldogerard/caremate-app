import Button from "@/components/Button";
import EachUtils from "@/utils/EachUtils";
import { limitText } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TableCampaign = (props) => {
    const { filter } = props;

    const { campaigns, paging } = useSelector((state) => state.adminCampaign);
    const { page, size } = paging;

    const calculateRowNumber = (index) => {
        return index + 1 + page * size;
    };

    return (
        <div className="relative overflow-x-auto border rounded-md shadow-sm mb-4">
            <table className="w-full text-sm lg:text-base text-left rtl:text-right text-gray-500">
                <thead className="text-gray-700">
                    <tr className="border-b">
                        <th scope="col" className="p-4">
                            No
                        </th>
                        <th scope="col">Foundation Name</th>
                        <th scope="col">Campaign Title</th>
                        <th scope="col">Category</th>
                        {(filter === "ACTIVE" || filter === "COMPLETED") && (
                            <th scope="col">Raise Ammount</th>
                        )}
                        <th scope="col">Goal Ammount</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <EachUtils
                        of={campaigns}
                        render={(item, index) => (
                            <tr
                                className={`${
                                    index % 2 === 0 && "bg-accent/5"
                                } text-left `}
                                key={item.id}
                            >
                                <td className="px-4 py-6">
                                    {calculateRowNumber(index)}
                                </td>
                                <td>{limitText(item.partnerName, 20)}</td>
                                <td>{limitText(item.title, 20)}</td>
                                <td>{item.category}</td>
                                {(filter === "ACTIVE" ||
                                    filter === "COMPLETED") && (
                                    <td>
                                        <FormatRupiah
                                            value={item.currentAmount}
                                        />
                                    </td>
                                )}
                                <td>
                                    <FormatRupiah value={item.goalAmount} />
                                </td>
                                <td>
                                    <Link
                                        to={`/dashboard/admin/campaign/${item.id}`}
                                    >
                                        <Button type="button" name={"Detail"} />
                                    </Link>
                                </td>
                            </tr>
                        )}
                    />
                    {campaigns.filter((res) => filter === res.status).length ===
                        0 && (
                        <tr>
                            <td colSpan="7" className="p-5 text-center">
                                No campaign found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableCampaign;
