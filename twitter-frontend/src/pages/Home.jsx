import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Feed from "../components/Feed";
import NavSidebar from "../components/NavSidebar";
import { tweetReq } from "../common/Request";
import PostModal from "../components/PostModal";


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
    const [feedPosts, setFeedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth?.token) return;
        fetchTweets(auth.token, setFeedPosts, setLoading);

    }, [auth.token]);

    useEffect(() => {
        console.log(feedPosts);
    }, [feedPosts])



    return (
        <>
            <main className="home-page">
                <NavSidebar />

                <div className="home-timeline">
                    <div className="feed-select">
                        <div className={selectedFeed === 0 ? "feed-select-all selected-feed" : "feed-select-all"}
                            onClick={() => { setSelectedFeed(0) }}>
                            <div>All</div>
                            <div className="feed-indicator" />
                        </div>
                        <div className={selectedFeed === 1 ? "feed-select-follow selected-feed" : "feed-select-follow"}
                            onClick={() => { setSelectedFeed(1) }}>
                            <div>Following</div>
                            <div className="feed-indicator" />
                        </div>
                    </div>
                    <Feed postList={feedPosts} isLoading={loading} topType="new-status" />
                </div>

                <aside className="home-right">
                    {/* Maybe put most followed users or most liked posts? */}
                </aside>
            </main>
            <PostModal />
        </>
    );
}

export default Home;