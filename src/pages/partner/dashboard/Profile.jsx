import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import FormProfile from "@/components/dashboard/partner/FormProfile";
import FormVerif from "@/components/dashboard/partner/FormVerif";
import { Failed, Message, Success, SuccessUpdate } from "@/utils/AlertUtil";
import {
    getDetailPartner,
    updateDocumentPartner,
    updateProfilePartner,
} from "@/redux/feature/partner/partnerSlice";

import ButtonFile from "@/components/ButtonFile";
import Loader from "@/components/Loader";
import Button from "@/components/Button";

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
    const [isEditDocument, setIsEditDocument] = useState(false);

    useEffect(() => {
        if (user?.id) {
            fetchPartnerDetails();
        }
    }, [user]);

    const fetchPartnerDetails = async () => {
        try {
            await dispatch(getDetailPartner(user.id)).unwrap();
        } catch (error) {
            console.error("Error fetching : ", error);
        }
    };

    const handleClickEditProfile = () => {
        setIsEdit((state) => !state);
    };

    const handleSubmitFormProfile = async (data) => {
        try {
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
            setIsEditDocument(false);
        } catch (error) {
            Failed("Failed verification document");
        }
    };

    const handleIsEditDocument = () => {
        setIsEditDocument((state) => !state);
    };

    const handleClickMessage = () => {
        Message(partner.message);
    };

    const StatusMessage = ({ status }) => {
        if (status === "VERIFIED") {
            return (
                <h1 className="text-dark mb-4 text-xs lg:text-lg">
                    Your foundation has been successfully verified
                </h1>
            );
        }
        if (status === "IN_REVIEW") {
            return (
                <h1 className="text-dark mb-4 text-xs lg:text-lg">
                    You have submitted a verification request, please wait for
                    approval
                </h1>
            );
        }
        if (status === "REJECTED") {
            return (
                <div className="flex mb-4 items-end ">
                    <h1 className="text-xs text-dark lg:text-lg">
                        Please correct the document according to the{" "}
                        <span
                            onClick={handleClickMessage}
                            className="underline cursor-pointer text-primary font-semibold"
                        >
                            this message
                        </span>
                    </h1>
                </div>
            );
        }
        return null;
    };

    const DocumentButtons = ({ partner }) => (
        <div className="flex flex-row gap-2 flex-wrap items-center">
            <ButtonFile
                fileName={partner?.cfeFileName}
                name={"Certification of Foundation Establishment"}
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
            <ButtonFile fileName={partner?.baFileName} name={"Bank Account"} />
        </div>
    );

    return (
        <>
            <Title name={"Profile"} />
            {partner && (
                <>
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
                        (isEditDocument ||
                            partner?.status === "UNVERIFIED") && (
                            <FormVerif
                                partner={partner}
                                handleSubmitVerification={
                                    handleSubmitVerification
                                }
                                handleIsEditDocument={handleIsEditDocument}
                            />
                        )}

                    {filter === "Verification" &&
                        !isEditDocument &&
                        partner?.status !== "UNVERIFIED" && (
                            <>
                                <StatusMessage status={partner?.status} />
                                <DocumentButtons partner={partner} />
                                <div className="flex justify-end mt-6">
                                    <Button
                                        name={"Edit Document"}
                                        type={"button"}
                                        onClick={handleIsEditDocument}
                                    />
                                </div>
                            </>
                        )}
                </>
            )}

            {!partner && <Loader />}
        </>
    );
};

export default Profile;
