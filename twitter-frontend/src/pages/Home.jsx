import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { LuRabbit } from "react-icons/lu";
import { IoMdBookmark, IoMdHeart, IoMdHome, IoMdPerson, IoMdSearch, IoMdExit, IoMdAdd } from "react-icons/io";
import ProfilePic from "../components/ProfilePic";

const Home = () => {
    // 0 = All, 1 = Following
    const [selectedFeed, setSelectedFeed] = useState(0);
    const [statusText, setStatusText] = useState("");

    useEffect(() => {
        // Fetches tweets and updates feed
        // Should they be cached?
    }, [selectedFeed]);

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
                    <div className="post-button-alt white-button">
                        <IconContext.Provider value={{size:"32px"}}>
                            <IoMdAdd color="#1a1a1a" fill="#1a1a1a"/>
                        </IconContext.Provider>
                    </div>
                </div>

                <div className="sidebar-profile">
                    <div className="profile-items">
                        <ProfilePic/>
                        { /* Extract display name and check if it isn't empty, display */
                            /* If no display name then show only handle */
                        }
                        <div>
                            <p className="display-name">Display Name</p>
                            <p className="handle">@handle</p>
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
                    <input type="text" className="new-status-field" value={statusText}
                        onChange={(e) => setStatusText(e.target.value)}/>    
                    <div class="status-extras">
                        {/* Buttons to add GIF, emoji, etc. */}
                        <span>a </span>
                        <span>a </span>
                        <span>a </span>
                    </div>
                    <button type="button" className="post-status white-button">Post</button>
                </div>
                <div className="feed-posts"></div>
            </div>

            <aside className="home-right">

            </aside>
        </main>
    );
}

export default Home;