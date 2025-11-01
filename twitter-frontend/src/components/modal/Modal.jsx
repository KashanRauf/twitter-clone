import { IconContext } from "react-icons/lib";
import { IoMdClose } from "react-icons/io";
import ModalBG from "./ModalBG";


// Base for all modals
// Props: children, classes, show, onClose
const Modal = ({children, classes, show, onClose}) => {

    if (!classes) {
        classes = "";
    }

    if (!show) {
        return;
    }

    return (
        <>
            <ModalBG show={show} onClose={onClose}/>
            <section className={"popup-modal " + classes}>
                <IconContext.Provider value={{size: 24}}>
                    <IoMdClose onClick={onClose} className="modal-close"/>
                </IconContext.Provider>

                {children}
            </section>
        </>
    );
}

export default Modal;