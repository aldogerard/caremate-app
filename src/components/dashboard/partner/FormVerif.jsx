import { Failed } from "@/utils/AlertUtil";
import React, { useEffect, useState } from "react";

const FormVerif = (props) => {
    const { handleSubmitVerif } = props;

    const [formData, setFormData] = useState({
        cfe: "",
        fr: "",
        rc: "",
        ffp: "",
        ba: "",
    });

    const handleChange = (e) => {
        const maxSize = 1 * 1024 * 1024;
        const { name, files } = e.target;
        if (files[0].size <= maxSize) {
            return setFormData({ ...formData, [name]: files[0] });
        }
        return Failed("Maximum files is 1MB");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitVerif(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <p className="text-xs lg:text-sm font-medium text-error mb-6">
                    *Maximum files is 1MB
                </p>
                <div className="flex flex-col gap-2 gap-y-6 w-full items-end lg:flex-row lg:flex-wrap lg:justify-between">
                    <div className="flex flex-col gap-1 w-full lg:w-[32%]">
                        <div className="flex justify-between items-center">
                            <label htmlFor="cfe" className="text-black/80">
                                Certification of Foundation Estabishment
                            </label>
                        </div>
                        <div className="border-dashed overflow-hidden border flex relative justify-center items-center border-accent rounded-md h-28">
                            <h1
                                className={`text-sm lg:text-lg font-medium text-accent ${
                                    formData.cfe?.name && "text-black/80"
                                }`}
                            >
                                {formData.cfe?.name || "Upload your file"}
                            </h1>
                            <input
                                type="file"
                                required
                                id="cfe"
                                name="cfe"
                                onChange={handleChange}
                                multiple
                                accept=".pdf"
                                className={`absolute w-full h-full opacity-0 cursor-pointer`}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full lg:w-[32%]">
                        <div className="flex justify-between items-center">
                            <label htmlFor="fr" className="text-black/80">
                                Financial Report
                            </label>
                        </div>
                        <div className="border-dashed overflow-hidden border flex relative justify-center items-center border-accent rounded-md h-28">
                            <h1
                                className={`text-sm lg:text-lg font-medium text-accent ${
                                    formData.fr?.name && "text-black/80"
                                }`}
                            >
                                {formData.fr?.name || "Upload your file"}
                            </h1>
                            <input
                                type="file"
                                required
                                id="fr"
                                name="fr"
                                onChange={handleChange}
                                accept=".pdf"
                                className="absolute w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full lg:w-[32%]">
                        <div className="flex justify-between items-center">
                            <label htmlFor="rc" className="text-black/80">
                                Registered Certificate
                            </label>
                        </div>
                        <div className="border-dashed overflow-hidden border flex relative justify-center items-center border-accent rounded-md h-28">
                            <h1
                                className={`text-sm lg:text-lg font-medium text-accent ${
                                    formData.rc?.name && "text-black/80"
                                }`}
                            >
                                {formData.rc?.name || "Upload your file"}
                            </h1>
                            <input
                                type="file"
                                required
                                id="rc"
                                name="rc"
                                onChange={handleChange}
                                accept=".pdf"
                                className="absolute w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full lg:w-[32%]">
                        <div className="flex justify-between items-center">
                            <label htmlFor="ffp" className="text-black/80">
                                Foundation Financial Plan
                            </label>
                        </div>
                        <div className="border-dashed overflow-hidden border flex relative justify-center items-center border-accent rounded-md h-28">
                            <h1
                                className={`text-sm lg:text-lg font-medium text-accent ${
                                    formData.ffp?.name && "text-black/80"
                                }`}
                            >
                                {formData.ffp?.name || "Upload your file"}
                            </h1>
                            <input
                                type="file"
                                required
                                id="ffp"
                                name="ffp"
                                onChange={handleChange}
                                accept=".pdf"
                                className="absolute w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full lg:w-[32%]">
                        <div className="flex justify-between items-center">
                            <label htmlFor="ba" className="text-black/80">
                                Bank Account
                            </label>
                        </div>
                        <div className="border-dashed overflow-hidden border flex relative justify-center items-center border-accent rounded-md h-28">
                            <h1
                                className={`text-sm lg:text-lg font-medium text-accent ${
                                    formData.ba?.name && "text-black/80"
                                }`}
                            >
                                {formData.ba?.name || "Upload your file"}
                            </h1>
                            <input
                                type="file"
                                required
                                id="ba"
                                name="ba"
                                onChange={handleChange}
                                accept=".pdf"
                                className="absolute w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full lg:w-[32%]" />
                </div>
                <div className="text-lg mt-8 flex gap-2 justify-end border-t pt-8">
                    <button
                        type="submit"
                        className={`bg-primary w-full lg:w-max py-3 lg:py-2 px-8 text-sm lg:text-lg rounded-md shadow-md text-light font-semibold outline-none hover:bg-emerald-600 `}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default FormVerif;
