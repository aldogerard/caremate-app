import Title from "@/components/dashboard/Title";
import { getDonorById } from "@/redux/feature/admin/adminDonorSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatPhoneNumber } from "@/utils/Utils";

const AdminDonorDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentDonor } = useSelector((state) => state.adminDonor);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            await dispatch(getDonorById(id)).unwrap();
        } catch (error) {
            console.log("Erorr : ", error);
        }
    };

    return (
        <>
            {currentDonor && (
                <>
                    <Title name={"Detail Donor"} />
                    <div className="flex flex-col w-full text-dark/85 mb-10">
                        <div className="flex mb-8 items-center">
                            <div className="lg:w-1/2">
                                <h1 className="font-light">Name</h1>
                                <h1 className="text-lg font-medium">
                                    {currentDonor.name}
                                </h1>
                            </div>
                            <div>
                                <h1 className="font-light">Phone Number</h1>
                                <h1 className="text-lg font-medium">
                                    {formatPhoneNumber(currentDonor.phone)}
                                </h1>
                            </div>
                        </div>
                        <div className="flex mb-8 items-center">
                            <div className="lg:w-1/2">
                                <h1 className="font-light">Total Point</h1>
                                <h1 className="text-lg font-medium">120</h1>
                            </div>
                            <div className="lg:w-1/2">
                                <h1 className="font-light">Total Donation</h1>
                                <h1 className="text-lg font-medium">5</h1>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default AdminDonorDetail;
