import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { IconContext } from "react-icons/lib";
import { LuRabbit } from "react-icons/lu";
import { IoMdBookmark, IoMdHeart, IoMdHome, IoMdPerson, IoMdSearch, IoMdExit, IoMdAdd } from "react-icons/io";
import { ProfilePic } from "./StaticAsset";
import PostModalContext from "../context/PostModalProvider";
import { Link } from "react-router-dom";


const NavSidebar = () => {
    const { auth } = useContext(AuthContext);
    // eslint-disable-next-line no-unused-vars
    const { show, setShow, setQuotes, setRepliesTo } = useContext(PostModalContext);

    const openPostModal = () => {
        console.log("OPEN")
        setQuotes("");
        setRepliesTo("");
        setShow(true);
    }

    return (
        <nav className="nav-sidebar">
            <div>
                <li className="sidebar-items">
                    <ul className="sidebar-item">
                        <IconContext.Provider value={{ size: "32px" }}>
                            <LuRabbit />
                        </IconContext.Provider>
                        {/* <p></p> */}
                    </ul>
                    <ul className="sidebar-item">
                        <Link to={"/home"}>
                            <IconContext.Provider value={{ size: "32px" }}>
                                <IoMdHome />
                            </IconContext.Provider>
                            <p>Home</p>
                        </Link>
                    </ul>
                    <ul className="sidebar-item">
                        <Link to={"/search"}>
                            <IconContext.Provider value={{ size: "32px" }}>
                                <IoMdSearch />
                            </IconContext.Provider>
                            <p>Search</p>
                        </Link>
                    </ul>
                    <ul className="sidebar-item">
                        <Link to={"/profile/" + auth.handle}>
                            <IconContext.Provider value={{ size: "32px" }}>
                                <IoMdPerson />
                            </IconContext.Provider>
                            <p>Profile</p>
                        </Link>
                    </ul>
                    <ul className="sidebar-item">
                        <Link to={"/likes"}>
                            <IconContext.Provider value={{ size: "32px" }}>
                                <IoMdHeart />
                            </IconContext.Provider>
                            <p>Likes</p>
                        </Link>
                    </ul>
                    <ul className="sidebar-item">
                        <Link to={"/bookmarks"}>
                            <IconContext.Provider value={{ size: "32px" }}>
                                <IoMdBookmark />
                            </IconContext.Provider>
                            <p>Bookmarks</p>
                        </Link>
                    </ul>
                </li>
                <button className="post-button white-button"
                    onClick={openPostModal}>Post</button>
                <div className="post-button-alt white-button circular-button"
                    onClick={openPostModal}>
                    <IconContext.Provider value={{ size: "32px" }}>
                        <IoMdAdd color="#1a1a1a" fill="#1a1a1a" />
                    </IconContext.Provider>
                </div>
            </div>

            <div className="sidebar-profile">
                <div className="profile-items">
                    <ProfilePic />
                    <div>
                        <p className="display-name">{auth.display}</p>
                        <p className="handle">{"@" + auth.handle}</p>
                    </div>
                </div>

                <IconContext.Provider value={{ size: "25px" }}>
                    <IoMdExit />
                </IconContext.Provider>
            </div>
        </nav>
    );
}

export default NavSidebar;