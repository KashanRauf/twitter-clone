import React from "react";

// Background for modals, makes it possible to close the modal by clicking the background
const ModalBG = ({ show, onClose, transparent }) => {
    if (!show) return null; 

    return (
        <div className="modal-bg" style={transparent ? {backgroundColor:"transparent"} : {}} onClick={onClose} />
    );
}

export default ModalBG;