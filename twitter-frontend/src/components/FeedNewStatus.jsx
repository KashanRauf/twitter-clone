import React, { useEffect, useRef, useState } from "react";
import post from "../common/Post";
import { IconContext } from "react-icons/lib";
import { MdOutlineGifBox, MdOutlineEmojiEmotions } from "react-icons/md";  
import ProfilePic from "../components/ProfilePic";
import OpenGifPicker from "./OpenGifPicker";
import TweetGif from "./TweetGif";

const FeedNewStatus = ({borderless}) => {
    const [statusText, setStatusText] = useState("");
    const [showGifs, setShowGifs] = useState(false);
    const [gifLink, setGifLink] = useState("");
    const textarea = useRef(null);

    const heightUpdate = () => {
        textarea.current.style.height = "inherit";
        textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }

    useEffect(() => {
        console.log(gifLink);
    }, [gifLink])

    return (
        <div className={borderless ? "feed-new-status borderless" : "feed-new-status"}>
            <ProfilePic />
            <div className="new-status-field">
                <textarea  value={statusText}
                ref={textarea} placeholder="Anything to share?" onChange={(e) => {
                    setStatusText(e.target.value);
                    heightUpdate();
                }} />
                <TweetGif link={gifLink}/>
            </div>
            <div className="status-extras">
                <IconContext.Provider value={{ size: "20px" }}>
                    <span className="circular-button" onClick={() => {setShowGifs(true)}}>
                        <MdOutlineGifBox/>
                    </span>
                    <OpenGifPicker show={showGifs} onclose={() => {setShowGifs(false)}} target={setGifLink}/>
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