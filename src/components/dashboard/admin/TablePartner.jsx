import Button from "@/components/Button";
import EachUtils from "@/utils/EachUtils";
import { limitText } from "@/utils/Utils";
import React from "react";

const TablePartner = (props) => {
    let iteration = 0;
    const { item, handleDetailModal, filter, setCurrentPartner } = props;

    const handleClickDetail = (res) => {
        setCurrentPartner(res);
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
                    {item.map((res, index) => {
                        if (filter === res.status) {
                            iteration++;
                            return (
                                <tr
                                    className={`${
                                        iteration % 2 === 0
                                            ? "bg-primary/10"
                                            : ""
                                    }`}
                                    key={index}
                                >
                                    <td className="p-5">{iteration}</td>{" "}
                                    <td>{limitText(res.name, 25)}</td>
                                    <td>{limitText(res.email, 25)}</td>
                                    <td>{limitText(res.phoneNumber, 12)}</td>
                                    <td>{limitText(res.address, 25)}</td>
                                    <td>{limitText(res.description, 40)}</td>
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
                </tbody>
            </table>
        </div>
    );
};

export default TablePartner;
