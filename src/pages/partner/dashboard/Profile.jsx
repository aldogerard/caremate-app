import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import FormProfile from "@/components/dashboard/partner/FormProfile";
import FormVerif from "@/components/dashboard/partner/FormVerif";
import { Failed, Success, SuccessUpdate } from "@/utils/AlertUtil";
import {
    getDetailPartner,
    updateDocumentPartner,
    updateProfilePartner,
} from "@/redux/feature/partner/partnerSlice";

import ButtonFile from "@/components/ButtonFile";

const data = [
    {
        name: "Edit Profile",
    },
    {
        name: "Verification",
    },
];

const Profile = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { partner } = useSelector((state) => state.partner);

    const [filter, setFilter] = useState(data[0].name);
    const [isEdit, setIsEdit] = useState(false);

    const fetchPartnerDetails = async () => {
        try {
            await dispatch(getDetailPartner(user.id)).unwrap();
        } catch (error) {
            console.error("Error fetching partner details:", error);
        }
    };

    const handleClickEditProfile = () => {
        setIsEdit((state) => !state);
    };

    const handleSubmitFormProfile = async (data) => {
        try {
            console.log(data);
            await dispatch(
                updateProfilePartner({ id: user.id, data: data })
            ).unwrap();
            SuccessUpdate();
            await fetchPartnerDetails();
        } catch (error) {
            Failed("Failed to update");
        } finally {
            handleClickEditProfile();
        }
    };

    const handleSubmitVerification = async (data) => {
        try {
            await dispatch(
                updateDocumentPartner({ id: user.id, data: data })
            ).unwrap();
            Success("Successfully submit document");
            await fetchPartnerDetails();
        } catch (error) {
            console.log(error);
            Failed("Failed verification document");
        }
    };

    return (
        <>
            {partner && (
                <>
                    <Title name={"Profile"} />
                    <Filter data={data} setFilter={setFilter} filter={filter} />

                    {filter === "Edit Profile" && (
                        <FormProfile
                            isEdit={isEdit}
                            partner={partner}
                            handleClickEditProfile={handleClickEditProfile}
                            handleSubmitFormProfile={handleSubmitFormProfile}
                        />
                    )}

                    {filter === "Verification" &&
                        (partner.status === "UNVERIFIED" ||
                            partner.status === "REJECTED") && (
                            <FormVerif
                                partner={partner}
                                handleSubmitVerification={
                                    handleSubmitVerification
                                }
                            />
                        )}

                    {filter === "Verification" && (
                        <>
                            {partner.status === "VERIFIED" && (
                                <h1 className="text-primary mb-4 text-xs lg:text-xl ">
                                    Your foundation has been successfully
                                    verified
                                </h1>
                            )}
                            {partner.status === "IN_REVIEW" && (
                                <h1 className="text-primary mb-4 text-xs lg:text-xl ">
                                    You have submitted a verification request,
                                    please wait for approval
                                </h1>
                            )}
                            <div className="flex flex-row gap-2 flex-wrap items-center">
                                <ButtonFile
                                    fileName={partner?.cfeFileName}
                                    name={
                                        "Certification of Foundation Estabishment"
                                    }
                                />
                                <ButtonFile
                                    fileName={partner?.frFileName}
                                    name={"Financial Report"}
                                />
                                <ButtonFile
                                    fileName={partner?.rcFileName}
                                    name={"Registered Certificate"}
                                />
                                <ButtonFile
                                    fileName={partner?.ffpFileName}
                                    name={"Foundation Financial Plan"}
                                />
                                <ButtonFile
                                    fileName={partner?.baFileName}
                                    name={"Bank Account"}
                                />
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Profile;
