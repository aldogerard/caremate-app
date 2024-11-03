import React from "react";
import Modal from "react-modal";

const CustomModal = ({ children, isOpen }) => {
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
        <Modal
            style={customStyles}
            isOpen={isOpen}
            appElement={document.getElementById("root")}
        >
            {children}
        </Modal>
    );
};

export default CustomModal;
