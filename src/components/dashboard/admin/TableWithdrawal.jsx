import Button from "@/components/Button";
import { setCurrentWithdrawal } from "@/redux/feature/admin/adminWithdrawalSlice";
import { limitText } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { useDispatch } from "react-redux";

const TableWithdrawal = (props) => {
    const { withdrawals, handleDetailModal, filter } = props;

    const dispatch = useDispatch();

    const handleClickDetail = (res) => {
        dispatch(setCurrentWithdrawal({ item: res }));
        handleDetailModal();
    };

    return (
        <div className="w-full border rounded-md shadow-sm">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="p-4 w-[5%]">No</th>
                        <th className="w-[17%]">Foundation Name</th>
                        <th className="w-[24%]">Campaign Title</th>
                        <th className="w-[20%]">Category</th>
                        <th className="w-[15%]">Total Withdrawal</th>
                        <th className="w-[15%]">Tax</th>
                        <th className="w-[10%] pr-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {withdrawals
                        .filter((res) => filter === res.status)
                        .map((res, index) => (
                            <tr
                                className={`${
                                    index % 2 !== 0 && "bg-primary/10"
                                }  `}
                                key={res.id}
                            >
                                <td className="p-5">{index + 1}</td>
                                <td>{limitText(res.partnerName, 25)}</td>
                                <td>{limitText(res.title, 37)}</td>
                                <td>{limitText(res.category, 25)}</td>
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
                                        onClick={() => handleClickDetail(res)}
                                    />
                                </td>
                            </tr>
                        ))}
                    {withdrawals.filter((res) => filter === res.status)
                        .length === 0 && (
                        <tr>
                            <td colSpan="7" className="p-5 text-center">
                                No withdrawal found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableWithdrawal;
