import React from "react";

const ModalBG = ({ show, onClose }) => {
    if (!show) return null; 

    return (
        <div className="modal-bg" onClick={onClose} />
    );
}

export default ModalBG;