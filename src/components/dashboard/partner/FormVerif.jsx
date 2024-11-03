import { Failed, Message } from "@/utils/AlertUtil";
import { validateFile } from "@/utils/Utils";
import React, { useEffect, useState } from "react";
import FileVerif from "./Input/FileVerif";
import EachUtils from "@/utils/EachUtils";
import Button from "@/components/Button";

const data = [
    {
        title: "Certification of Foundation Estabishment",
        name: "cfe",
    },
    {
        title: "Financial Report",
        name: "fr",
    },
    {
        title: "Registered Certificate",
        name: "rc",
    },
    {
        title: "Foundation Financial Plan",
        name: "ffp",
    },
    {
        title: "Bank Account",
        name: "ba",
    },
];

const FormVerif = (props) => {
    const { handleSubmitVerification } = props;

    const [formData, setFormData] = useState({
        cfe: "",
        fr: "",
        rc: "",
        ffp: "",
        ba: "",
    });

    const handleChangeFile = (e) => {
        const { name, files } = e.target;
        if (files.length < 1) {
            return setFormData({ ...formData, [name]: "" });
        }
        if (validateFile(files, "pdf")) {
            return setFormData({ ...formData, [name]: files[0] });
        } else {
            return setFormData({ ...formData, [name]: "" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitVerification(formData);
    };

    const handleClickMessage = () => {
        Message("Lorem ipsum dolor impe");
    };

    return (
        <>
            <div className="flex justify-between items-end mb-6">
                <p className="text-xs lg:text-sm font-medium text-error">
                    Maximum files is 1MB (.pdf)
                </p>
                {"REJECTED" === "REJECTED" && (
                    <Button
                        type={"button"}
                        name={"Message"}
                        onClick={handleClickMessage}
                    />
                )}
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-col gap-2 gap-y-6 w-full items-end lg:flex-row lg:flex-wrap lg:justify-between">
                    <EachUtils
                        of={data}
                        render={(item) => (
                            <FileVerif
                                title={item.title}
                                name={item.name}
                                formData={formData}
                                handleChangeFile={handleChangeFile}
                            />
                        )}
                    />
                    <div className="w-[32%]"></div>
                </div>
                <div className="text-lg mt-8 flex gap-2 justify-end">
                    <Button type={"submit"} name={"Submit"} />
                </div>
            </form>
        </>
    );
};

export default FormVerif;
