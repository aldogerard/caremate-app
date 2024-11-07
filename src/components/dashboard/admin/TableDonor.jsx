import Button from "@/components/Button";
import EachUtils from "@/utils/EachUtils";
import { capitalizeFirstLetter, formatPhoneNumber } from "@/utils/Utils";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TableDonor = () => {
    const { donors, paging } = useSelector((state) => state.adminDonor);
    const { page, size } = paging;

    const calculateRowNumber = (index) => {
        return index + 1 + page * size;
    };

    return (
        <div className="overflow-scroll text-dark">
            <div className="w-[1280px] xl:w-full border rounded-md">
                <div className="grid grid-cols-12 grid-rows-1 px-6 py-4 border-b gap-x-4">
                    <div className="col-start-1 col-span-1">
                        <h1>No</h1>
                    </div>
                    <div className="col-start-2 col-span-3">
                        <h1>Name</h1>
                    </div>
                    <div className="col-start-5 col-span-3">
                        <h1>Phone Number</h1>
                    </div>
                    <div className="col-start-8 col-span-3">
                        <h1>Total Point</h1>
                    </div>
                    <div className="col-start-11 col-span-2">
                        <h1>Action</h1>
                    </div>
                </div>
                <EachUtils
                    of={donors}
                    render={(item, index) => (
                        <div
                            className={`
                                ${index % 2 == 0 && "bg-stone-50"} 
                                ${index + 1 != donors.length && "border-b"}
                                grid grid-cols-12 px-6 py-3 items-center gap-x-4 break-words`}
                        >
                            <div className="col-start-1 col-span-1">
                                <h1>{index + 1}</h1>
                            </div>
                            <div className="col-start-2 col-span-3">
                                <h1>{capitalizeFirstLetter(item.name)}</h1>
                            </div>
                            <div className="col-start-5 col-span-3">
                                <h1>{formatPhoneNumber(item.phone)}</h1>
                            </div>
                            <div className="col-start-8 col-span-3">
                                <h1>{item.totalPoints}</h1>
                            </div>
                            <div className="col-start-11 col-span-2">
                                <Link to={`/dashboard/admin/donor/${item.id}`}>
                                    <Button type="button" name={"Detail"} />
                                </Link>
                            </div>
                        </div>
                    )}
                />
                {donors.length == 0 && (
                    <div className="grid grid-cols-1 py-6">
                        <div className="col-start-1 col-span-1">
                            <h1 className="text-center">Donor Not Found</h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableDonor;
