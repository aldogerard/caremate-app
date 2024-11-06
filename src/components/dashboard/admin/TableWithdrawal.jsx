import Button from "@/components/Button";
import { setCurrentWithdrawal } from "@/redux/feature/admin/adminWithdrawalSlice";
import EachUtils from "@/utils/EachUtils";
import { limitText } from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TableWithdrawal = (props) => {
    const { handleDetailModal, filter } = props;

    const dispatch = useDispatch();
    const { withdrawals } = useSelector((state) => state.adminWithdrawal);

    const handleClickDetail = (res) => {
        dispatch(setCurrentWithdrawal({ item: res }));
        handleDetailModal();
    };

    return (
        <div className="relative overflow-x-auto border rounded-md shadow-sm">
            <table className="w-full text-sm lg:text-base text-left rtl:text-right text-gray-500">
                <thead className="text-gray-700">
                    <tr className="border-b">
                        <th scope="col" className="p-4">
                            No
                        </th>
                        <th scope="col">Foundation Name</th>
                        <th scope="col">Campaign Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Total Withdrawal</th>
                        <th scope="col">Tax</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <EachUtils
                        of={withdrawals.filter((res) => filter === res.status)}
                        render={(item, index) => (
                            <tr
                                className={`${
                                    index % 2 === 0 && "bg-accent/5"
                                }`}
                                key={item.id}
                            >
                                <td className="p-5">{index + 1}</td>
                                <td>{limitText(item.partnerName, 25)}</td>
                                <td>{limitText(item.title, 37)}</td>
                                <td>{limitText(item.category, 25)}</td>
                                <td>
                                    <FormatRupiah value={item.totalAmount} />
                                </td>
                                <td>
                                    <FormatRupiah value={item.totalTax} />
                                </td>
                                <td>
                                    <Button
                                        type="button"
                                        name={"Detail"}
                                        onClick={() => handleClickDetail(item)}
                                    />
                                </td>
                            </tr>
                        )}
                    />
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
