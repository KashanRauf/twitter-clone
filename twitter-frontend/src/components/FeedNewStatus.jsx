import React, { useRef, useState } from "react";
import post from "../common/Post";
import { IconContext } from "react-icons/lib";
import { MdOutlineGifBox, MdOutlineEmojiEmotions } from "react-icons/md";  
import ProfilePic from "../components/ProfilePic";

const FeedNewStatus = ({borderless}) => {
    const [statusText, setStatusText] = useState("");
    const textarea = useRef(null);

    const heightUpdate = () => {
        textarea.current.style.height = "inherit";
        textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }

    return (
        <div className={borderless ? "feed-new-status borderless" : "feed-new-status"}>
            <ProfilePic />
            <textarea className="new-status-field" value={statusText}
                ref={textarea} placeholder="Anything to share?" onChange={(e) => {
                    setStatusText(e.target.value);
                    heightUpdate();
                }} />
            <div className="status-extras">
                <IconContext.Provider value={{ size: "20px" }}>
                    <span className="circular-button">
                        <MdOutlineGifBox />
                    </span>
                    <span className="circular-button">
                        <MdOutlineEmojiEmotions />
                    </span>
                </IconContext.Provider>
            </div>
            <button type="button" className="post-status white-button"
                onClick={() => { post({ body: statusText, gifLink: "", repliesTo: "", original: "" }) }}>Post</button>
        </div>
    );
}

export default FeedNewStatus;