import Button from "@/components/Button";
import { Update } from "@/utils/AlertUtil";
import { validateEmail } from "@/utils/Utils";
import React, { useEffect, useState } from "react";
import InputProfile from "./Input/InputProfile";
import EachUtils from "@/utils/EachUtils";

const data = [
    {
        title: "Foundation Name",
        name: "name",
        type: "text",
    },
    {
        title: "Email",
        name: "email",
        type: "email",
    },
    {
        title: "Contact Address",
        name: "contactAddress",
        type: "text",
    },
    {
        title: "Phone Number",
        name: "phoneNumber",
        type: "number",
    },
    {
        title: "Description",
        name: "description",
        type: "text",
    },
];

const FormProfile = (props) => {
    const {
        isEdit,
        currentPartner,
        handleSubmitFormProfile,
        handleClickEditProfile,
    } = props;

    const [isMount, setIsMount] = useState(false);
    const [updatedPartner, setUpdatedPartner] = useState(currentPartner);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);

    useEffect(() => {
        if (isMount) {
            const email = updatedPartner?.email;
            setIsEmailInvalid(!validateEmail(email) && email?.length > 0);
        } else {
            setUpdatedPartner(currentPartner);
            setIsMount(true);
        }
    }, [currentPartner, updatedPartner, isMount]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUpdatedPartner({ ...updatedPartner, [name]: value });
    };

    const handleCancelForm = () => {
        setUpdatedPartner(currentPartner);
        handleClickEditProfile();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Update(() => {
            return handleSubmitFormProfile(updatedPartner);
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 w-full lg:flex-row lg:flex-wrap lg:justify-between">
                    <EachUtils
                        of={data}
                        render={(item) => (
                            <InputProfile
                                title={item.title}
                                name={item.name}
                                type={item.type}
                                updatedPartner={updatedPartner}
                                handleChangeInput={handleChangeInput}
                                isEdit={isEdit}
                                isEmailInvalid={isEmailInvalid}
                            />
                        )}
                    />
                </div>

                <div className="text-lg mt-4 flex gap-2 justify-end">
                    {!isEdit && (
                        <Button
                            type={"button"}
                            name={"Edit"}
                            onClick={handleClickEditProfile}
                        />
                    )}
                    {isEdit && (
                        <>
                            <Button type={"submit"} name={"Save"} />
                            <Button
                                type={"reset"}
                                name={"Cancel"}
                                onClick={handleCancelForm}
                            />
                        </>
                    )}
                </div>
            </form>
        </>
    );
};

export default FormProfile;
