import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";

const CardCampaign = (props) => {
    const { status } = props;

    console.log(status);

    const image = "https://account.enigmacamp.com/2.jpg";
    const percent = (500000 / 1000000) * 100;

    return (
        <div className="flex flex-row border shadow-sm cursor-pointer p-3 w-full sm:w-[400px] lg:w-[500px] rounded-xl gap-4">
            <img
                src={image}
                alt=""
                className="h-24 lg:h-40 aspect-square object-cover rounded-lg"
            />
            <div className="flex flex-col w-max justify-between">
                <h1 className="text-sm lg:text-lg  text-dark">
                    Sedekah sembako untuk 100 anak yatim
                </h1>
                {status !== "Completed" && status !== "Rejected" && (
                    <div className="lg:flex justify-between hidden">
                        <div>
                            <h1 className="text-xs text-dark">Start date</h1>
                            <h1 className="text-primary text-xs font-medium">
                                2024 October 28
                            </h1>
                        </div>
                        <div>
                            <h1 className="text-xs text-dark">End date</h1>
                            <h1 className="text-primary text-xs font-medium">
                                2024 October 28
                            </h1>
                        </div>
                    </div>
                )}

                {status === "Active" && (
                    <div>
                        <div className="flex justify-between items-end text-xs text-dark/80">
                            <h1>
                                <FormatRupiah value={5000000} />
                            </h1>
                            <h1>
                                <FormatRupiah value={10000000} />
                            </h1>
                        </div>
                        <div className="w-full h-1 lg:h-3 rounded-full overflow-hidden bg-primary/20 ">
                            <div
                                style={{ width: `${percent}%` }}
                                className="h-full bg-primary rounded-full"
                            />
                        </div>
                    </div>
                )}

                {status === "Pending" ||
                    (status === "Rejected" && (
                        <div>
                            <h1 className="text-xs text-dark">Goal amount</h1>
                            <h1 className="text-primary text-xs font-medium">
                                <FormatRupiah value={10000000} />
                            </h1>
                        </div>
                    ))}

                {status === "Completed" && (
                    <div>
                        <h1 className="text-xs text-dark">Raise amount</h1>
                        <h1 className="text-primary text-xs font-medium">
                            <FormatRupiah value={10000000} />
                        </h1>
                    </div>
                )}

                {status === "Completed" && (
                    <div className="flex justify-end items-center gap-3">
                        <div className="flex justify-center items-center w-1/2 py-2 bg-primary text-light hover:shadow-md transition-template rounded-md shadow-sm">
                            <h1 className="text-sm">Withdrawal</h1>
                        </div>
                        <div className="flex justify-center items-center w-1/2 py-2 bg-cyan-500 text-light hover:shadow-md transition-template rounded-md shadow-sm">
                            <h1 className="text-sm">Report</h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardCampaign;
