import { Update } from "@/utils/AlertUtil";
import React, { useEffect, useState } from "react";

const FormProfile = (props) => {
    const { handleClickEdit, isEdit, currentPartner, handleSubmit } = props;
    const [updatedPartner, setUpdatedPartner] = useState(currentPartner);
    const [isMount, setIsMount] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);

    useEffect(() => {
        setUpdatedPartner(currentPartner);
    }, [currentPartner]);

    useEffect(() => {
        if (!isMount) {
            setIsMount(true);
            return;
        }
        const { email } = updatedPartner;

        setIsEmailInvalid(
            validateEmail(email) || email.length <= 0 ? false : true
        );
    }, [updatedPartner]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPartner({ ...updatedPartner, [name]: value });
    };

    const validateEmail = (str) => {
        const regex = /^[\w.-]+@[\w.-]+\.\w+$/;
        return regex.test(str);
    };

    const handleCancel = () => {
        setUpdatedPartner(currentPartner);
        handleClickEdit();
    };

    const onSave = (e) => {
        e.preventDefault();
        Update(() => {
            return handleSubmit(updatedPartner);
        });
    };

    return (
        <>
            <form onSubmit={onSave}>
                <div className="flex flex-col gap-4 w-full lg:flex-row lg:flex-wrap lg:justify-between">
                    <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                        <div className="flex justify-between items-center">
                            <label htmlFor="name" className="text-black/80">
                                Foundation name
                            </label>
                        </div>
                        <input
                            value={updatedPartner?.name}
                            type="text"
                            required
                            onInput={handleChange}
                            id="name"
                            autoComplete="off"
                            disabled={!isEdit}
                            name="name"
                            placeholder="Enter your foundation name"
                            className={`px-5 py-4  outline-none rounded-md border focus:shadow-sm  bg-white ${
                                !isEdit
                                    ? "text-black/40 cursor-not-allowed"
                                    : "text-black/80"
                            }`}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                        <div className="flex justify-between items-center">
                            <label htmlFor="email" className="text-black/80">
                                Email
                            </label>
                            {isEmailInvalid && (
                                <p className="text-xs font-medium text-error">
                                    *Invalid format email
                                </p>
                            )}
                        </div>
                        <input
                            value={updatedPartner?.email}
                            type="email"
                            required
                            id="email"
                            autoComplete="off"
                            disabled={!isEdit}
                            onInput={handleChange}
                            name="email"
                            placeholder="Enter your email"
                            className={`px-5 py-4  outline-none rounded-md border focus:shadow-sm  bg-white 
                            ${
                                !isEdit
                                    ? "text-black/40 cursor-not-allowed"
                                    : "text-black/80"
                            }
                            `}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                        <div className="flex justify-between items-center">
                            <label
                                htmlFor="contactAddress"
                                className="text-black/80"
                            >
                                Contact Address
                            </label>
                        </div>
                        <input
                            value={updatedPartner?.contactAddress}
                            type="text"
                            required
                            id="contactAddress"
                            autoComplete="off"
                            onInput={handleChange}
                            disabled={!isEdit}
                            name="contactAddress"
                            placeholder="Enter your contact address"
                            className={`px-5 py-4 no-arrow outline-none rounded-md border focus:shadow-sm bg-white
                            ${
                                !isEdit
                                    ? "text-black/40 cursor-not-allowed"
                                    : "text-black/80"
                            }`}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full lg:w-[49%]">
                        <div className="flex justify-between items-center">
                            <label
                                htmlFor="phoneNumber"
                                className="text-black/80"
                            >
                                Phone Number
                            </label>
                        </div>
                        <input
                            value={updatedPartner?.phoneNumber}
                            type="number"
                            required
                            id="phoneNumber"
                            autoComplete="off"
                            onInput={handleChange}
                            disabled={!isEdit}
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            className={`px-5 py-4 no-arrow outline-none rounded-md border focus:shadow-sm bg-white ${
                                !isEdit
                                    ? "text-black/40 cursor-not-allowed"
                                    : "text-black/80"
                            }`}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-center">
                            <label
                                htmlFor="description"
                                className="text-black/80"
                            >
                                Description
                            </label>
                        </div>
                        <textarea
                            value={updatedPartner?.description || ""}
                            type="text"
                            id="description"
                            autoComplete="off"
                            onInput={handleChange}
                            disabled={!isEdit}
                            name="description"
                            placeholder="Enter description for your foundation"
                            maxLength={300}
                            className={`px-5 py-4 h-40 lg:h-32 outline-none rounded-md border focus:shadow-sm  bg-white resize-none ${
                                !isEdit
                                    ? "text-black/40 cursor-not-allowed"
                                    : "text-black/80"
                            }`}
                        />
                    </div>
                </div>
                <div className="text-lg mt-4 flex gap-2 justify-end">
                    {!isEdit ? (
                        <div
                            onClick={handleClickEdit}
                            className={`bg-primary text-center cursor-pointer w-full lg:w-max py-3 lg:py-2 px-8 text-sm lg:text-lg rounded-md shadow-md text-light font-semibold outline-none hover:bg-emerald-600 `}
                        >
                            Edit
                        </div>
                    ) : (
                        <>
                            <button
                                type="submit"
                                className={`bg-primary w-full lg:w-max py-3 lg:py-2 px-8 text-sm lg:text-lg rounded-md shadow-md text-light font-semibold outline-none hover:bg-emerald-600 `}
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                type="reset"
                                className={`bg-rose-500 w-full lg:w-max py-3 lg:py-2 px-7 text-sm lg:text-lg rounded-md shadow-md text-light font-semibold outline-none hover:bg-rose-600 `}
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </form>
        </>
    );
};

export default FormProfile;
