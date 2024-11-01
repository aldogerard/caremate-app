import FormProfile from "@/components/dashboard/partner/FormProfile";
import FormVerif from "@/components/dashboard/partner/FormVerif";
import {
    createPartnerDoc,
    fetchPartnerDocByUserId,
} from "@/redux/feature/PartnerDocSlice";
import { fetchPartnerById, updatePartner } from "@/redux/feature/PartnerSlice";
import { Failed, SuccessUpdate } from "@/utils/AlertUtil";
import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const sub = [
    {
        name: "Edit Profile",
        filt: "edit",
    },
    {
        name: "Verification",
        filt: "verif",
    },
];

const Profile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [filter, setFilter] = useState("edit");

    const dispatch = useDispatch();
    const { id } = useSelector((state) => state.auth);
    const { currentPartner } = useSelector((state) => state.partner);
    const { currentPartnerDoc, url } = useSelector((state) => state.partnerDoc);

    const [status, setStatus] = useState("UNVERIFIED");

    useEffect(() => {
        if (currentPartner !== null) {
            setStatus(currentPartner.status);
        }
    }, [currentPartner]);

    useEffect(() => {
        try {
            dispatch(fetchPartnerById({ id }));
        } catch (error) {}
    }, [dispatch]);

    useEffect(() => {
        try {
            dispatch(fetchPartnerDocByUserId({ id }));
        } catch (error) {}
    }, [dispatch]);

    const handleClickEdit = () => {
        setIsEdit((state) => !state);
    };

    const handleSubmit = async (updatedPartner) => {
        try {
            const partner = { ...updatedPartner, userId: id };
            await dispatch(updatePartner(partner))
                .unwrap()
                .then(() => {
                    SuccessUpdate();
                })
                .catch(() => {
                    Failed("Failed to update");
                });
            dispatch(fetchPartnerById({ id }));
        } catch (error) {
        } finally {
            handleClickEdit();
        }
    };

    useEffect(() => {
        if (url) {
            window.open(url, "_blank");
        }
    }, [url]);

    const handleSubmitVerif = async (formData) => {
        const doc = new FormData();

        const entries = Object.entries(formData);
        entries.forEach(([key, value]) => {
            doc.append(key, value);
        });
        doc.append("userId", id);

        try {
            await dispatch(createPartnerDoc(doc))
                .unwrap()
                .then(() => {
                    alert("Successfully submit partner document");
                })
                .catch(() => {
                    alert("Failed submit partner document");
                });
        } catch (error) {}
    };

    return (
        <>
            <div className="w-full py-2 mb-10 border-b border-black/70">
                <h1 className="text-xl md:text-4xl font-medium text-black">
                    Profile
                </h1>
            </div>
            <div className="flex py-2 mb-6 gap-8 justify-start">
                <EachUtils
                    of={sub}
                    render={(item) => (
                        <h1
                            onClick={() => setFilter(item.filt)}
                            className={`font-normal text-center w-24 cursor-pointer ${
                                filter === item.filt &&
                                "text-black border-primary border-b transition-template"
                            } `}
                        >
                            {item.name}
                        </h1>
                    )}
                />
            </div>
            {filter === "edit" && (
                <FormProfile
                    handleClickEdit={handleClickEdit}
                    isEdit={isEdit}
                    currentPartner={currentPartner}
                    handleSubmit={handleSubmit}
                />
            )}
            {filter === "verif" && currentPartnerDoc === null && (
                <FormVerif
                    handleSubmitVerif={handleSubmitVerif}
                    currentPartnerDoc={currentPartnerDoc}
                />
            )}
            {filter === "verif" &&
                currentPartnerDoc !== null &&
                status === "UNVERIFIED" && (
                    <h1 className="text-primary text-center mt-32 text-xs lg:text-lg">
                        You have submitted a verification request, please wait
                        for approval
                    </h1>
                )}

            {filter === "verif" &&
                currentPartnerDoc !== null &&
                status === "VERIFIED" && (
                    <h1 className="text-primary text-center mt-32 text-xs lg:text-lg">
                        Your foundation has been successfully verified
                    </h1>
                )}
        </>
    );
};

export default Profile;
