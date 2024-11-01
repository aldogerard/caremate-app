import React from "react";

const CardCampaign = () => {
    const image = "https://account.enigmacamp.com/2.jpg";
    const percent = (500000 / 1000000) * 100;

    return (
        <div className="flex flex-row border shadow-sm hover:shadow-md transition-template cursor-pointer p-3 w-full sm:w-[400px] lg:w-[500px] rounded-xl gap-4">
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
                <div>
                    <div className="flex justify-between items-end text-xs text-dark/80">
                        <h1>Raised : 5.000.000</h1>
                        <h1>Goal : 10.000.000</h1>
                    </div>
                    <div className="w-full h-1 lg:h-3 rounded-full overflow-hidden bg-primary/20 ">
                        <div
                            style={{ width: `${percent}%` }}
                            className="h-full bg-primary rounded-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardCampaign;
