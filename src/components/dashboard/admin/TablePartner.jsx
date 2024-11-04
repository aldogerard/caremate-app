import Button from "@/components/Button";
import { setCurrentPartner } from "@/redux/feature/admin/adminPartnerSlice";
import { limitText } from "@/utils/Utils";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const TablePartner = (props) => {
    const { partners, handleDetailModal, filter } = props;

    const dispatch = useDispatch();

    const handleClickDetail = (res) => {
        dispatch(setCurrentPartner({ item: res }));
        handleDetailModal();
    };

    return (
        <div className="w-full border rounded-md shadow-sm">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="p-4 w-[4%]">No</th>
                        <th className="w-[18%]">Foundation Name</th>
                        <th className="w-[18%]">Email</th>
                        <th className="w-[10%]">Phone</th>
                        <th className="w-[20%]">Address</th>
                        <th className="w-[30%]">Desc</th>
                        <th className="w-[20%] pr-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {partners
                        .filter((res) => filter === res.status)
                        .map((res, index) => (
                            <tr
                                className={
                                    index % 2 === 0 ? "bg-primary/10" : ""
                                }
                                key={res.id}
                            >
                                <td className="p-5">{index + 1}</td>{" "}
                                <td>{limitText(res.name, 25)}</td>
                                <td>{limitText(res.email, 25)}</td>
                                <td>{limitText(res.phoneNumber, 12)}</td>
                                <td>{limitText(res.address, 25)}</td>
                                <td>{limitText(res.description, 40)}</td>
                                <td className="pr-4">
                                    <Button
                                        type="button"
                                        name={"Detail"}
                                        onClick={() => handleClickDetail(res)}
                                    />
                                </td>
                            </tr>
                        ))}
                    {partners.filter((res) => filter === res.status).length ===
                        0 && (
                        <tr>
                            <td colSpan="7" className="p-5 text-center">
                                No partners found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TablePartner;
