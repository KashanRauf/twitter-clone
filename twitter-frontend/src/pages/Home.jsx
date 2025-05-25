import React, { useEffect, useState, useContext, useRef } from "react";
import { IconContext } from "react-icons/lib";
import { MdOutlineGifBox, MdOutlineEmojiEmotions } from "react-icons/md";  
import ProfilePic from "../components/ProfilePic";
import AuthContext from "../context/AuthProvider";
import Feed from "../components/Feed";
import NavSidebar from "../components/NavSidebar";
import { tweetReq } from "../common/Request";


const fetchTweets = async (token, setData, setLoading) => {
    var data = [];

    await tweetReq
        .get()
        .then((response) => {
            data = response.data;
        }).catch((error) => {
            console.log(error);
        })
    

    setData(data.reverse());
    setLoading(false);
}

const Home = () => {
    const { auth } = useContext(AuthContext);

    // 0 = All, 1 = Following
    const [selectedFeed, setSelectedFeed] = useState(0);
    const [statusText, setStatusText] = useState("");
    const [feedPosts, setFeedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const textarea = useRef(null);

    // useEffect(() => {
    //     // Fetches tweets and updates feed
    //     // Should they be cached?
    // }, [selectedFeed]);

    useEffect(() => {
        if (!auth?.token) return;
        fetchTweets(auth.token, setFeedPosts, setLoading);
        
    }, [auth.token]);

    useEffect(() => {
        console.log(feedPosts);
    }, [feedPosts])

    const heightUpdate = () => {
        textarea.current.style.height = "inherit";
        textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }

    return (
        <main className="home-page">
            <NavSidebar/>

            <div className="home-timeline">
                <div className="feed-select">
                    <div className={selectedFeed === 0 ? "feed-select-all selected-feed" : "feed-select-all"}
                        onClick={() => {setSelectedFeed(0)}}>
                        <div>All</div>
                        <div className="feed-indicator"/>
                    </div>
                    <div className={selectedFeed === 1 ? "feed-select-follow selected-feed" : "feed-select-follow"}
                        onClick={() => {setSelectedFeed(1)}}>
                        <div>Following</div>
                        <div className="feed-indicator"/>
                    </div>
                </div>
                <div className="home-new-status">
                    <ProfilePic/>
                    <textarea className="new-status-field" value={statusText}
                        ref={textarea} placeholder="Anything to share?" onChange={(e) => {
                            setStatusText(e.target.value);
                            heightUpdate();
                        }}/>
                    <div className="status-extras">
                        <IconContext.Provider value={{size:"20px"}}>
                            <span className="circular-button">
                                <MdOutlineGifBox />
                            </span>
                            <span className="circular-button">
                                <MdOutlineEmojiEmotions/>
                            </span>
                        </IconContext.Provider>
                    </div>
                    <button type="button" className="post-status white-button">Post</button>
                </div>
                <Feed postList={feedPosts} isLoading={loading}/>
            </div>

            <aside className="home-right">
                {/* Maybe put most followed users or most liked posts? */}
            </aside>
        </main>
    );
}

export default Home;