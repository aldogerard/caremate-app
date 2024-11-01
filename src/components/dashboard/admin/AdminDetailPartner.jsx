import React from "react";
import Modal from "react-modal";

const AdminDetailPartner = (props) => {
    const { isOpen, closeModal } = props;

    const customStyles = {
        content: {
            width: "50%",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            borderRadius: "12px",
            transform: "translate(-40%, -50%)",
        },
    };

    return (
        <Modal style={customStyles} isOpen={isOpen}>
            <main className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl text-dark">Detail Partner</h1>
                    <div
                        onClick={closeModal}
                        className="bg-rose-500 px-4 py-2 rounded-md shadow-md text-light cursor-pointer hover:bg-rose-700 transition-template"
                    >
                        <h2>Close</h2>
                    </div>
                </div>
                <div className="flex flex-row gap-2 flex-wrap justify-between items-center">
                    <div className="w-[49%]">
                        <h1 className="text-dark/70">Foundation Name</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm">
                            <h1 className="text-dark">Yayasan Enigma Camp</h1>
                        </div>
                    </div>
                    <div className="w-[49%]">
                        <h1 className="text-dark/70">Phone Number</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm">
                            <h1 className="text-dark">0812394129381</h1>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-dark/70">Address</h1>
                        <div className="px-4 py-3 border rounded-md shadow-sm overflow-scroll">
                            <h1 className="text-dark">Jalan Topaz No 7</h1>
                        </div>
                    </div>
                </div>
            </main>
        </Modal>
    );
};

export default AdminDetailPartner;
