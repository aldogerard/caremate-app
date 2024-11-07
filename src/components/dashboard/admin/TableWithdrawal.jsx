import Button from "@/components/Button";
import IconDetail from "@/components/IconDetail";
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
        // <div className="relative overflow-x-auto border rounded-md shadow-sm">
        //     <table className="w-full text-sm lg:text-base text-left rtl:text-right text-gray-500">
        //         <thead className="text-gray-700">
        //             <tr className="border-b">
        //                 <th scope="col" className="p-4">
        //                     No
        //                 </th>
        //                 <th scope="col">Foundation Name</th>
        //                 <th scope="col">Campaign Title</th>
        //                 <th scope="col">Category</th>
        //                 <th scope="col">Total Withdrawal</th>
        //                 <th scope="col">Tax</th>
        //                 <th scope="col">Action</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             <EachUtils
        //                 of={withdrawals.filter((res) => filter === res.status)}
        //                 render={(item, index) => (
        //                     <tr
        //                         className={`${
        //                             index % 2 === 0 && "bg-accent/5"
        //                         }`}
        //                         key={item.id}
        //                     >
        //                         <td className="p-5">{index + 1}</td>
        //                         <td>{limitText(item.partnerName, 25)}</td>
        //                         <td>{limitText(item.title, 37)}</td>
        //                         <td>{limitText(item.category, 25)}</td>
        //                         <td>
        //                             <FormatRupiah value={item.totalAmount} />
        //                         </td>
        //                         <td>
        //                             <FormatRupiah value={item.totalTax} />
        //                         </td>
        //                         <td>
        //                             <Button
        //                                 type="button"
        //                                 name={"Detail"}
        //                                 onClick={() => handleClickDetail(item)}
        //                             />
        //                         </td>
        //                     </tr>
        //                 )}
        //             />
        //             {withdrawals.filter((res) => filter === res.status)
        //                 .length === 0 && (
        //                 <tr>
        //                     <td colSpan="7" className="p-5 text-center">
        //                         No withdrawal found
        //                     </td>
        //                 </tr>
        //             )}
        //         </tbody>
        //     </table>
        // </div>
        <div className="overflow-scroll text-dark">
            <div className="w-[1280px] xl:w-full border rounded-md">
                <div className="grid grid-cols-[.7fr,4fr,3fr,3fr,2fr,2fr,1fr] px-6 py-4 border-b gap-x-2">
                    <div className="col-start-1">
                        <h1>No</h1>
                    </div>
                    <div className="col-start-2">
                        <h1>Foundation Name</h1>
                    </div>
                    <div className="col-start-3">
                        <h1>Campaign Title</h1>
                    </div>
                    <div className="col-start-4">
                        <h1>Category</h1>
                    </div>
                    <div className="col-start-5">
                        <h1>Total Withdrawal</h1>
                    </div>
                    <div className="col-start-6">
                        <h1>Tax</h1>
                    </div>
                    <div className="col-start-7">
                        <h1>Action</h1>
                    </div>
                </div>
                <EachUtils
                    of={withdrawals}
                    render={(item, index) => (
                        <div
                            className={`
                                ${index % 2 == 0 && "bg-stone-50"}
                                ${index + 1 != withdrawals.length && "border-b"}
                                grid grid-cols-[.7fr,4fr,3fr,3fr,2fr,2fr,1fr] px-6 py-3 items-center gap-x-2`}
                        >
                            <div className="col-start-1">
                                <h1>{index + 1}</h1>
                            </div>
                            <div className="col-start-2">
                                <h1>{item.partnerName}</h1>
                            </div>
                            <div className="col-start-3">
                                <h1>{item.title}</h1>
                            </div>
                            <div className="col-start-4">
                                <h1>{item.category}</h1>
                            </div>
                            <div className="col-start-5">
                                <FormatRupiah value={item.totalAmount} />
                            </div>
                            <div className="col-start-6">
                                <FormatRupiah value={item.totalTax} />
                            </div>
                            <div className="col-start-7">
                                <div
                                    className="w-max"
                                    onClick={() => handleClickDetail(item)}
                                >
                                    <IconDetail />
                                </div>
                            </div>
                        </div>
                    )}
                />
                {withdrawals.length == 0 && (
                    <h1 className="text-center py-6">Withdrawal Not Found</h1>
                )}
            </div>
        </div>
    );
};

export default TableWithdrawal;
