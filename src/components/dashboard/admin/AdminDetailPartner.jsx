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
                <div className="flex flex-col gap-2">
                    <div>
                        <h1 className="text-dark">Name</h1>
                        <h1 className="text-dark text-lg">
                            Yayasan Enigma Camp
                        </h1>
                    </div>
                </div>
            </main>
        </Modal>
    );
};

export default AdminDetailPartner;
