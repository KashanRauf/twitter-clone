import { IconContext } from "react-icons/lib";
import { LuCalendarDays, LuPartyPopper } from "react-icons/lu";
import { ProfileBG, ProfilePic } from "../components/StaticAsset";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { userReq, tweetReq } from "../common/Request";
import Feed from "../components/Feed";
import axios from "axios";

// Make sure middle column is taking full height of column (update style universally, not individually per module)
// Make feed scrollability toggleable
// Make modules fully scrollable (optionally)
// Add an onClose to PostModal so the modal closes when the post operation succeeds
// Clean up the CSS so assigning classes to things like buttons is actually useful isntead of making new ones
// e.g. white button, black button, circle button, post button -> long button(?) with text types
// Maybe make a button component to streamline

const fetchProfile = async (handle, setUser, setPosts, setLoading) => {
    let id = "";
    await userReq
        .get(handle)
        .then((response) => {
            setUser(response.data)
            id = response.data.id
        }).catch((error) => {
            console.log(error);
        });

    await tweetReq
        .get(`/user/${id}`)
        .then((response) => {
            setPosts(response.data.reverse());
        }).catch((error) => {
            console.log(error);
        });

    setLoading(false);
}

const Profile = () => {
    // Extract display name from URL to make request (might be possible to pass into <Profile/> from Routes)
    const { handle } = useParams();
    const { auth } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth?.token) return;
        fetchProfile(handle, setUser, setPosts, setLoading);
        console.log(user);
        console.log(posts);
    }, [auth.token])

    if (loading) {
        return (<p>Loading profile</p>);
    }

    return (
        <div className="profile">
            <div className="profile-header">
                <h3 className="profile-displayname">{user?.displayName}</h3>
                <p className="profile-postcount">{posts.length} posts</p>
            </div>
            <div className="profile-main">
                <ProfileBG />
                <div className="banner-beneath">
                    <ProfilePic classes="profile-pfp" />
                    <div className="profile-btns">
                        <button type="button" className="profile-button block unblock">Block</button>
                        <button type="button" className="profile-button white-button follow unfollow">Follow</button>
                    </div>
                </div>
                <div className="profile-info">
                    <h3 className="profile-displayname">{user?.displayName}</h3>
                    <h4 className="profile-handle">@{user?.handle}</h4>
                    <div className="profile-dates">
                        <IconContext.Provider value={{ size: "18px" }}>
                            <span>
                                <LuPartyPopper />
                                <p>{new Date(user?.birthDate).toLocaleDateString('en-US', { timeZone: "UTC" })}</p>
                            </span>
                            <span>
                                <LuCalendarDays />
                                <p>{new Date(user?.creationDateTime).toLocaleDateString('en-US', { timeZone: "UTC" })}</p>
                            </span>
                        </IconContext.Provider>
                    </div>
                    <div className="profile-follows">
                        <span>
                            <p>{user?.following?.length}</p>
                            <p>Following</p>
                        </span>
                        <span>
                            <p>{user?.followers?.length}</p>
                            <p>Followers</p>
                        </span>
                    </div>
                </div>
            </div>
            <Feed postList={posts} isLoading={loading} topType={""} />
        </div>

    );
}

export default Profile;