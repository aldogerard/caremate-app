import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Title from "@/components/dashboard/Title";
import Filter from "@/components/Filter";
import FormProfile from "@/components/dashboard/partner/FormProfile";
import FormVerif from "@/components/dashboard/partner/FormVerif";
import { Failed, SuccessUpdate } from "@/utils/AlertUtil";
import {
    createPartnerDoc,
    fetchPartnerDocByUserId,
} from "@/redux/feature/PartnerDocSlice";
import { fetchPartnerById, updatePartner } from "@/redux/feature/PartnerSlice";

import dummy from "@/data/dummyPartner.json";
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

    const { id } = useSelector((state) => state.auth);
    const { currentPartner } = useSelector((state) => state.partner);
    const { currentPartnerDoc } = useSelector((state) => state.partnerDoc);

    const [filter, setFilter] = useState(data[0].name);
    const [isEdit, setIsEdit] = useState(false);
    const [status, setStatus] = useState("UNVERIFIED");

    const [dummyPartner, setDummyPartner] = useState(dummy[0]);
    const [dummyStatusPartner, setDummyStatusPartner] = useState(
        dummy[0].status
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchPartnerById(id)).unwrap();
                await dispatch(fetchPartnerDocByUserId(id)).unwrap();
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };
        if (currentPartner !== null) {
            setStatus(currentPartner?.status);
        }
        fetchData();
    }, [dispatch, currentPartner, id]);

    const handleClickEditProfile = () => {
        setIsEdit((state) => !state);
    };

    const handleSubmitFormProfile = async (updatedPartner) => {
        try {
            const partner = { ...updatedPartner, userId: id };
            await dispatch(updatePartner(partner)).unwrap();
            SuccessUpdate();
            await dispatch(fetchPartnerById(id)).unwrap();
        } catch (error) {
            Failed("Failed to update");
        } finally {
            handleClickEditProfile();
        }
    };

    const handleSubmitVerification = async (formData) => {
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        data.append("userId", id);

        try {
            await dispatch(createPartnerDoc(data))
                .unwrap()
                .then(() => {
                    alert("Successfully submit partner document");
                });
        } catch (error) {
            Failed("Failed verification document");
        }
    };

    return (
        <>
            <Title name={"Profile"} />
            <Filter data={data} setFilter={setFilter} filter={filter} />

            {filter === "Edit Profile" && (
                <FormProfile
                    isEdit={isEdit}
                    currentPartner={dummyPartner}
                    handleClickEditProfile={handleClickEditProfile}
                    handleSubmitFormProfile={handleSubmitFormProfile}
                />
            )}

            {filter === "Verification" &&
                (dummyStatusPartner === "UNVERIFIED" ||
                    dummyStatusPartner === "REJECTED") && (
                    <FormVerif
                        currentPartnerDoc={currentPartnerDoc}
                        handleSubmitVerification={handleSubmitVerification}
                    />
                )}

            {filter === "Verification" &&
                dummyStatusPartner === "IN REVIEW" && (
                    <h1 className="text-primary text-center mt-32 text-xs lg:text-lg">
                        You have submitted a verification request, please wait
                        for approval
                    </h1>
                )}

            {filter === "Verification" && dummyStatusPartner === "VERIFIED" && (
                <>
                    <h1 className="text-primary mb-4 text-xs lg:text-xl ">
                        Your foundation has been successfully verified
                    </h1>
                    <div className="flex flex-row gap-2 flex-wrap items-center">
                        <ButtonFile
                            fileName={dummyPartner?.cfeFileName}
                            name={"Certification of Foundation Estabishment"}
                        />
                        <ButtonFile
                            fileName={dummyPartner?.frFileName}
                            name={"Financial Report"}
                        />
                        <ButtonFile
                            fileName={dummyPartner?.rcFileName}
                            name={"Registered Certificate"}
                        />
                        <ButtonFile
                            fileName={dummyPartner?.ffpFileName}
                            name={"Foundation Financial Plan"}
                        />
                        <ButtonFile
                            fileName={dummyPartner?.baFileName}
                            name={"Bank Account"}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default Profile;
