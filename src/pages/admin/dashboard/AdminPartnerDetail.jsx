import ButtonFile from "@/components/ButtonFile";
import SectionListCampaign from "@/components/dashboard/admin/SectionListCampaign";
import Title from "@/components/dashboard/Title";
import { getDetailPartner } from "@/redux/feature/admin/adminPartnerSlice";
import {
    capitalizeFirstLetter,
    formatDate,
    formatPhoneNumber,
} from "@/utils/Utils";
import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AdminPartnerDetail = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { currentPartner } = useSelector((state) => state.adminPartner);

    useEffect(() => {
        fetchData();
    }, [slug, dispatch]);

    const fetchData = async () => {
        try {
            await dispatch(getDetailPartner(slug)).unwrap();
        } catch (error) {
            console.log("Erorr : ", error);
        }
    };

    return (
        <>
            {currentPartner && (
                <>
                    <Title name={"Detail Partner"}>
                        {currentPartner.status === "IN_REVIEW" && (
                            <div className="flex gap-4 pb-2">
                                <Button
                                    type="submit"
                                    name={"Approve Campaign"}
                                />
                                <Button type="reset" name={"Reject Campaign"} />
                            </div>
                        )}
                    </Title>
                    <div className="flex flex-col w-full text-dark/85">
                        <h1 className="text-4xl mb-8 capitalize">
                            {currentPartner.title}
                        </h1>
                        <div className="flex mb-8 items-center">
                            <div className="lg:w-1/2">
                                <h1 className="font-light">Foundation Name</h1>
                                <h1 className="text-lg font-medium">
                                    {currentPartner.name}
                                </h1>
                            </div>
                            <div>
                                <h1 className="font-light">Email</h1>
                                <h1 className="text-lg font-medium">
                                    {currentPartner.email}
                                </h1>
                            </div>
                        </div>
                        <div className="flex mb-8 items-center">
                            <div className="lg:w-1/2">
                                <h1 className="font-light">Address</h1>
                                <h1 className="text-lg font-medium">
                                    {currentPartner.address}
                                </h1>
                            </div>
                            <div>
                                <h1 className="font-light">Status</h1>
                                <h1 className="text-lg font-medium">
                                    {capitalizeFirstLetter(
                                        currentPartner.status
                                    )}
                                </h1>
                            </div>
                        </div>
                        <div className="flex mb-8 items-center">
                            <div className="lg:w-1/2">
                                <h1 className="font-light">Contact</h1>
                                <h1 className="text-lg font-medium">
                                    {formatPhoneNumber(
                                        currentPartner.phoneNumber
                                    )}
                                </h1>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-light">Description</h1>
                            <h1 className="text-lg font-medium break-words">
                                {currentPartner.description}
                            </h1>
                        </div>
                    </div>
                    {(currentPartner.status === "IN_REVIEW" ||
                        currentPartner.status === "VERIFIED") && (
                        <>
                            <div className="mt-8">
                                <h1 className="text-dark/70 mb-2">Document</h1>
                                <div className="flex flex-row gap-2 flex-wrap items-center">
                                    <ButtonFile
                                        fileName={currentPartner?.cfeFileName}
                                        name={
                                            "Certification of Foundation Estabishment"
                                        }
                                    />
                                    <ButtonFile
                                        fileName={currentPartner?.frFileName}
                                        name={"Financial Report"}
                                    />
                                    <ButtonFile
                                        fileName={currentPartner?.rcFileName}
                                        name={"Registered Certificate"}
                                    />
                                    <ButtonFile
                                        fileName={currentPartner?.ffpFileName}
                                        name={"Foundation Financial Plan"}
                                    />
                                    <ButtonFile
                                        fileName={currentPartner?.baFileName}
                                        name={"Bank Account"}
                                    />
                                </div>
                            </div>
                            {status === "IN_REVIEW" && (
                                <div className="flex flex-row gap-2 flex-wrap justify-end items-center">
                                    <Button
                                        type="submit"
                                        name={"Approve"}
                                        onClick={handleApprove}
                                    />
                                    <Button
                                        type="reset"
                                        name={"Reject"}
                                        onClick={handleReject}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
            <SectionListCampaign />
        </>
    );
};

export default AdminPartnerDetail;
