import { LuPartyPopper, LuCalendarDays } from "react-icons/lu";
import { IconContext } from "react-icons/lib";
import { ProfileBG, ProfilePic } from "../components/StaticAsset";

const Profile = () => {
    // Extract display name from URL to make request (might be possible to pass into <Profile/> from Routes)
    return (
        <>
            <div className="profile">
                <div className="profile-header">
                    <h3 className="profile-displayname">name placeholder</h3>
                    <p className="profile-postcount">count placeholder</p>
                </div>
                <div className="profile-main">
                    <ProfileBG/>
                    <div className="banner-beneath">
                        {/* <img className="profile-pfp" src="/pfp.jpg"/> */}
                        <ProfilePic classes="profile-pfp"/>
                        <div className="profile-btns">
                            <div className="profile-btn block unblock"></div>
                            <div className="profile-btn follow unfollow"></div>
                        </div>
                    </div>
                    <div className="profile-info">
                        <h3 className="profile-displayname">name placeholder</h3>
                        <h4 className="profile-handle">@handleplaceholder</h4>
                        <div className="profile-dates">
                            <IconContext.Provider value={{size: "18px"}}>
                                <span>
                                    <LuPartyPopper/>
                                    <p>birthday</p>
                                </span>
                                <span>
                                    <LuCalendarDays/>
                                    <p>join day</p>
                                </span>
                            </IconContext.Provider>
                        </div>
                        <div className="profile-follows">
                            <span>
                                <p>##</p>
                                <p>Following</p>
                            </span>
                            <span>
                                <p>##</p>
                                <p>Followers</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Feed postList={userPosts} isLoading={loading} topType={""} */}
        </>
    );
}

export default Profile;