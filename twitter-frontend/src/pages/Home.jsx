import React from "react";
import { IconContext } from "react-icons/lib";
import { LuRabbit } from "react-icons/lu";
import { IoMdBookmark, IoMdHeart, IoMdHome, IoMdPerson, IoMdSearch } from "react-icons/io";

const Home = () => {
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
                </div>

                <div className="sidebar-profile">
                    <img src="/pfp.jpg"/>
                    { /* Extract display name and check if it isn't empty, display */
                        /* If no display name then show only handle */
                    }
                </div>
            </header>

            <div className="home-timeline">
                <div className="feed-select">
                    <div className="feed-select-all">
                        <div>All</div>
                    </div>
                    <div className="feed-select-follow">
                        <div>Following</div>
                    </div>
                </div>
                <div className="home-new-status"></div>
                <div className="feed-posts"></div>
            </div>

            <aside className="home-right">

            </aside>
        </main>
    );
}

export default Home;