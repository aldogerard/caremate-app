import Button from "@/components/Button";
import { Confirm } from "@/utils/AlertUtil";
import { validateFile } from "@/utils/Utils";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const FormEditCampaign = (props) => {
    const { handleModal, handleEditCampaign, handleIsEdit } = props;

    const { currentCampaign, currentCampaignUrl } = useSelector(
        (state) => state.campaign
    );

    const [formData, setFormData] = useState({
        title: currentCampaign?.title,
        description: currentCampaign?.description,
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            if (files.length === 0) {
                setFormData((prevData) => ({ ...prevData, [name]: null }));
                return;
            }

            const newFile = validateFile(files, "image") ? files[0] : "";
            setFormData((prevData) => ({ ...prevData, [name]: newFile }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        Confirm("Update a campaign", () => {
            handleEditCampaign(formData);
            setFormData({
                title: currentCampaign.title,
                description: currentCampaign.description,
                image: null,
            });
            handleModal();
        });
    };

    const handleCancelEdit = () => {
        setFormData({
            title: currentCampaign.title,
            description: currentCampaign.description,
            image: null,
        });
        handleIsEdit();
    };

    return (
        <form onSubmit={handleSubmitEdit}>
            <div className="flex flex-col gap-4 w-full lg:flex-row lg:flex-wrap lg:justify-between">
                <div className="flex items-end gap-8 w-max mb-4">
                    <div className="w-80 h-[85%] rounded-xl overflow-hidden shadow-md">
                        <img
                            src={currentCampaignUrl}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-center">
                            <label htmlFor="image" className="text-black/80">
                                Image
                            </label>
                        </div>
                        <div className="border-dashed overflow-hidden border flex relative justify-center items-center border-accent rounded-md h-40">
                            <h1
                                className={`text-sm lg:text-base font-medium text-accent ${
                                    formData.image?.name && "text-black/70"
                                }`}
                            >
                                {formData.image?.name ||
                                    "Upload new image of campaign"}
                            </h1>
                            <input
                                type="file"
                                onChange={handleChange}
                                id="image"
                                name="image"
                                accept="image/*"
                                className={`absolute w-full h-full opacity-0 cursor-pointer`}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-center">
                        <label htmlFor="title" className="text-black/80">
                            Title
                        </label>
                    </div>
                    <input
                        value={formData.title}
                        type="text"
                        required
                        onInput={handleChange}
                        id="title"
                        autoComplete="off"
                        name="title"
                        placeholder="Enter the title of campaign"
                        className={`px-5 py-4  outline-none rounded-md border focus:shadow-sm  bg-white`}
                    />
                </div>

                <div className="flex flex-col gap-1 w-full ">
                    <div className="flex justify-between items-center">
                        <label htmlFor="description" className="text-black/80">
                            Description
                        </label>
                    </div>
                    <textarea
                        value={formData.description}
                        type="text"
                        id="description"
                        autoComplete="off"
                        onInput={handleChange}
                        name="description"
                        required
                        placeholder="Enter description for your foundation"
                        maxLength={300}
                        className={`px-5 py-4 h-40 lg:h-40 text-dark outline-none rounded-md border focus:shadow-sm  bg-white resize-none `}
                    />
                </div>
            </div>
            <div className="flex justify-end items-center py-4 gap-2">
                <Button type={"submit"} name={"Submit"} />
                <Button
                    type={"reset"}
                    name={"Cancel"}
                    onClick={handleCancelEdit}
                />
            </div>
        </form>
    );
};

export default FormEditCampaign;
