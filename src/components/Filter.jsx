import EachUtils from "@/utils/EachUtils";
import { capitalizeFirstLetter } from "@/utils/Utils";
import React from "react";

const Filter = ({ data, filter, setFilter }) => {
    return (
        <div className="flex py-2 mb-6 gap-8 justify-start">
            <EachUtils
                of={data}
                render={(item) => (
                    <h1
                        onClick={() => setFilter(item.name)}
                        className={`font-normal text-center w-24 cursor-pointer ${
                            filter === item.name &&
                            "text-black border-primary border-b transition-template"
                        } `}
                    >
                        {capitalizeFirstLetter(item.name)}
                    </h1>
                )}
            />
        </div>
    );
};

export default Filter;
