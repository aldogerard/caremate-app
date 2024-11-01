import AdminDetailPartner from "@/components/dashboard/admin/AdminDetailPartner";
import EachUtils from "@/utils/EachUtils";
import React, { useState } from "react";

const sub = [
    {
        name: "In Review",
    },
    {
        name: "Verified",
    },
    {
        name: "Reject",
    },
];

// inreview, reject, approved

const AdminPartner = () => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [filter, setFilter] = useState("In Review");

    function limitText(text, limit) {
        const words = text.split("");
        if (words.length > limit) {
            return words.slice(0, limit).join("") + "....";
        } else {
            return text;
        }
    }

    const handleDetailModal = () => {
        setIsDetailModalOpen((state) => !state);
    };

    return (
        <>
            <div className="w-full py-2 mb-10 border-b border-black/70">
                <h1 className="text-xl md:text-4xl font-medium text-black">
                    Partner
                </h1>
            </div>
            <div className="flex py-2 mb-6 gap-8 justify-start">
                <EachUtils
                    of={sub}
                    render={(item) => (
                        <h1
                            onClick={() => setFilter(item.name)}
                            className={`font-normal text-center w-24 cursor-pointer ${
                                filter === item.name &&
                                "text-black border-primary border-b transition-template"
                            } `}
                        >
                            {item.name}
                        </h1>
                    )}
                />
            </div>
            <div className="w-full border rounded-md shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4 w-[5%]">No</th>
                            <th className="w-[20%]">Foundation Name</th>
                            <th className="w-[15%]">Phone</th>
                            <th className="w-[20%]">Address</th>
                            <th className="w-[40%]">Desc</th>
                            <th className="w-[20%] pr-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <EachUtils
                            of={sub}
                            render={(item, index) =>
                                filter === "In Review" ? (
                                    <tr
                                        className={`${
                                            index % 2 == 0 && "bg-primary/10"
                                        }  `}
                                    >
                                        <td className="p-5">{index + 1}</td>
                                        <td>
                                            {limitText("Yayasan Enigma", 25)}
                                        </td>
                                        <td>08126384124</td>
                                        <td>
                                            {limitText("Jalan topaz No 7", 25)}
                                        </td>
                                        <td>
                                            {limitText(
                                                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi natus, soluta distinctio consequuntur quisquam quis at dolores suscipit quasi doloremque consequatur, adipisci omnis. Sunt, consequuntur. Laborum illum odio quam voluptas cupiditate quos dicta alias earum. Ex natus quidem vero, sit vitae eligendi impedit quia nesciunt optio incidunt fuga delectus nisi.",
                                                60
                                            )}
                                        </td>
                                        <td className="pr-4">
                                            <div
                                                onClick={handleDetailModal}
                                                className=" cursor-pointer px-4 py-2 rounded-md shadow-sm hover:shadow-sm transition-template bg-primary flex justify-center items-center w-max text-light"
                                            >
                                                <h1>Detail</h1>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    index === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="py-6 text-center"
                                            >
                                                Partner not found
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        />
                    </tbody>
                </table>
            </div>
            <AdminDetailPartner
                isOpen={isDetailModalOpen}
                closeModal={handleDetailModal}
            />
        </>
    );
};

export default AdminPartner;
