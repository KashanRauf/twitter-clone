import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { IconContext } from "react-icons/lib";
import { LuRabbit } from "react-icons/lu";
import { IoMdBookmark, IoMdHeart, IoMdHome, IoMdPerson, IoMdSearch, IoMdExit, IoMdAdd } from "react-icons/io";
import ProfilePic from "../components/ProfilePic";


const NavSidebar = () => {
    const { auth } = useContext(AuthContext);

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