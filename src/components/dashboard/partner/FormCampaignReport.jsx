import Button from "@/components/Button";
import {
    createCampaignReport,
    getCampaignReportByCampaignId,
} from "@/redux/feature/partner/campaignReportSlice";
import { Confirm, Success } from "@/utils/AlertUtil";
import { validateFile } from "@/utils/Utils";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormCampaignReport = (props) => {
    const { handleModal, handleFormReport } = props;

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [formDataReport, setFormDataReport] = useState({
        description: null,
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            if (files.length === 0) {
                setFormDataReport((prevData) => ({
                    ...prevData,
                    [name]: null,
                }));
                return;
            }

            const newFile = validateFile(files, "image") ? files[0] : "";
            setFormDataReport((prevData) => ({ ...prevData, [name]: newFile }));
        } else {
            setFormDataReport((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmitReport = (e) => {
        e.preventDefault();
        Confirm("Create a campaign report", () => {
            handleSaveCampaignReport(formDataReport);
            setFormDataReport({
                description: null,
                image: null,
            });
            handleModal();
        });
        e.target.reset();
    };

    const handleSaveCampaignReport = async (request) => {
        try {
            const data = new FormData();

            data.append("description", request.descrtiption);
            data.append("file", request.image);
            data.append("campaignId", currentCampaign.id);

            await dispatch(createCampaignReport(data)).unwrap();
            Success("Successfully create campaign report");
            await dispatch(getCampaignReportByCampaignId(user.id)).unwrap();
            await fetchData();
        } catch (error) {
            console.log(error);
            Failed("Failed create campaign report");
        }
    };

    const handleCancel = () => {
        setFormDataReport({
            description: null,
            image: null,
        });
        handleFormReport();
    };

    return (
        <form
            onSubmit={handleSubmitReport}
            className="flex flex-col gap-2 -mt-8"
        >
            <div className="flex gap-2">
                <div className="flex flex-col gap-1 w-full lg:w-[30%]">
                    <div className="flex justify-between items-center">
                        <label htmlFor="phoneNumber" className="text-black/80">
                            Image
                        </label>
                    </div>
                    <div className="border-dashed overflow-hidden border flex relative px-4 justify-center items-center border-accent rounded-md h-24">
                        <h1
                            className={`text-sm lg:text-base font-medium text-accent ${
                                formDataReport.image?.name && "text-black/70"
                            }`}
                        >
                            {formDataReport.image?.name || "Upload your file"}
                        </h1>
                        <input
                            type="file"
                            onChange={handleChange}
                            required
                            id="image"
                            name="image"
                            accept="image/*"
                            className={`absolute w-full h-full opacity-0 cursor-pointer`}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1 w-full lg:w-[70%]">
                    <div className="flex justify-between items-center">
                        <label htmlFor="description" className="text-black/80">
                            Description
                        </label>
                    </div>
                    <textarea
                        type="text"
                        id="description"
                        autoComplete="off"
                        onInput={handleChange}
                        name="description"
                        placeholder="Enter description for your foundation"
                        maxLength={165}
                        className={`px-5 py-4 h-24 lg:h-24 text-dark outline-none rounded-md border focus:shadow-sm  bg-white resize-none `}
                    />
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <Button type={"submit"} name={"Submit"} />
                <Button type={"reset"} name={"Cancel"} onClick={handleCancel} />
            </div>
        </form>
    );
};

export default FormCampaignReport;
