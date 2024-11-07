import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";
import { Link } from "react-router-dom";

const CardBasic = (props) => {
    const { name, data, link, icon } = props;

    const style =
        link === "withdrawal" ? "bg-emerald-500/15" : "bg-fuchsia-500/15";

    return (
        <Link
            to={link}
            className="flex flex-col min-w-60 text-dark/80 h-max border rounded-2xl px-5 py-6 bg-light shadow-md hover:shadow-lg"
        >
            <div
                className={`flex w-max justify-center items-center rounded-2xl ${style} p-3`}
            >
                {icon}
            </div>
            <h1 className="font-semibold mt-4">{name}</h1>
            {link == "withdrawal" && (
                <h1 className="text-3xl font-bold">
                    <FormatRupiah value={data} />
                </h1>
            )}
            {link != "withdrawal" && (
                <h1 className="text-3xl font-bold">{data}</h1>
            )}
        </Link>
    );
};

export default CardBasic;
