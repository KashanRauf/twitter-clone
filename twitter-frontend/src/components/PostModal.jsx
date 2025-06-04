import React, { useContext, useRef, useState } from "react";
import post from "../common/Post";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import PostModalContext from "../context/PostModalProvider";
import ModalBG from "./ModalBG";
import FeedNewStatus from "./FeedNewStatus";

// quotes is a tweet being quote retweeted
// repliesTo is a tweet being replied to
// mutually exclusive, can't have both
const PostModal = () => {
    const { show, setShow, quotes, repliesTo } = useContext(PostModalContext);
    const [text, setText] = useState("");
    const textarea = useRef(null);

    const heightUpdate = () => {
        textarea.current.style.height = "inherit";
        textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }

    if (!show) {
        return;
    }

    if (quotes != "" && repliesTo != "") {
        toast.error("Unexpected error: Can not quote and reply in the same tweet.");
    }

    return (
        <>
            <ModalBG show={show} onClose={() => {setShow(false); console.log(show)}}/>
            <section className="lr-modal" style={{width:"40vw"}}>
                <IconContext.Provider value={{ size: 24 }}>
                    <IoMdClose onClick={() => {setShow(false); console.log(show)}} className="modal-close" />
                </IconContext.Provider>

                <FeedNewStatus borderless={true}/>
            </section>
        </>
    );
}

export default PostModal;