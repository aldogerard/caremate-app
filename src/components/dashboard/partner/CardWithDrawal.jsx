import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";

const CardWithdrawal = (props) => {
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
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xs text-dark">Raise amount</h1>
                        <h1 className="text-primary text-xs font-medium">
                            <FormatRupiah value={10000000} />
                        </h1>
                    </div>
                    {status === "Completed" && (
                        <div className="px-6 py-2 bg-primary rounded-md shadow-sm hover:shadow-md transition-template text-white">
                            <h1 className="text-sm">Invoice</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardWithdrawal;
