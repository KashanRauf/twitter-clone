import React, { useEffect, useState, useContext, useRef } from "react";
import { IconContext } from "react-icons/lib";
import { LuRabbit } from "react-icons/lu";
import { IoMdBookmark, IoMdHeart, IoMdHome, IoMdPerson, IoMdSearch, IoMdExit, IoMdAdd } from "react-icons/io";
import { MdOutlineGifBox, MdOutlineEmojiEmotions } from "react-icons/md";  

import ProfilePic from "../components/ProfilePic";
import AuthContext from "../context/AuthProvider";
import FeedTweet from "../components/FeedTweet";
import axios from "axios";


const fetchTweets = async (token, setData, setLoading) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    var data = [];

    await axios
        .get("http://127.0.0.1:8080/api/tweets", config)
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
            <header className="home-left">
                <div>
                    <li className="sidebar-items">
                        <ul className="sidebar-item">
                            <IconContext.Provider value={{ size: "32px" }}>
                                <LuRabbit />
                            </IconContext.Provider>
                            {/* <p></p> */}
                        </ul>
                        <ul className="sidebar-item">
                            <IconContext.Provider value={{ size: "32px" }}>
                                <IoMdHome />
                            </IconContext.Provider>
                            <p>Home</p>
                        </ul>
                        <ul className="sidebar-item">
                            <IconContext.Provider value={{ size: "32px" }}>
                                <IoMdSearch />
                            </IconContext.Provider>
                            <p>Search</p>
                        </ul>
                        <ul className="sidebar-item">
                            <IconContext.Provider value={{ size: "32px" }}>
                                <IoMdPerson />
                            </IconContext.Provider>
                            <p>Profile</p>
                        </ul>
                        <ul className="sidebar-item">
                            <IconContext.Provider value={{ size: "32px" }}>
                                <IoMdHeart />
                            </IconContext.Provider>
                            <p>Likes</p>
                        </ul>
                        <ul className="sidebar-item">
                            <IconContext.Provider value={{ size: "32px" }}>
                                <IoMdBookmark />
                            </IconContext.Provider>
                            <p>Bookmarks</p>
                        </ul>
                    </li>
                    <button className="post-button white-button">Post</button>
                    <div className="post-button-alt white-button circular-button">
                        <IconContext.Provider value={{size:"32px"}}>
                            <IoMdAdd color="#1a1a1a" fill="#1a1a1a"/>
                        </IconContext.Provider>
                    </div>
                </div>

                <div className="sidebar-profile">
                    <div className="profile-items">
                        <ProfilePic/>
                        <div>
                            <p className="display-name">{auth.display}</p>
                            <p className="handle">{"@" + auth.handle}</p>
                        </div>
                    </div>
                    
                    <IconContext.Provider value={{size:"25px"}}>
                        <IoMdExit/>
                    </IconContext.Provider>
                </div>
            </header>

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
                <div className="feed-posts">
                    {loading && feedPosts.length > 0 ? 
                        <p>Loading posts</p> : 
                        feedPosts.map((item) => <FeedTweet key={item.id} tweet={item}/>)
                    }
                </div>
            </div>

            <aside className="home-right">

            </aside>
        </main>
    );
}

export default Home;