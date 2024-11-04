import Button from "@/components/Button";
import { setCurrentCampaign } from "@/redux/feature/admin/adminCampaignSlice";
import { limitText } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { useDispatch } from "react-redux";

const TableCampaign = (props) => {
    const { campaigns, handleDetailModal, filter } = props;

    const dispatch = useDispatch();

    const handleClickDetail = (res) => {
        dispatch(setCurrentCampaign({ item: res }));
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
                    {campaigns
                        .filter((res) => filter === res.status)
                        .map((res, index) => (
                            <tr
                                className={`${
                                    index % 2 !== 0 && "bg-primary/10"
                                }  `}
                                key={res.id}
                            >
                                <td className="p-5">{index + 1}</td>
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
                                        onClick={() => handleClickDetail(res)}
                                    />
                                </td>
                            </tr>
                        ))}
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
