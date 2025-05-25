import React from "react";
import FeedTweet from "./FeedTweet";

const Feed = ({postList, isLoading}) => {

    // if (!(postList && !isLoading)) {
    //     console.log(postList)
    //     console.log(isLoading)
    //     return;
    // }

    return (
        <div className="feed-posts">
            {isLoading && postList.length > 0 ?
                <p>Loading posts</p> :
                postList.map((item) => <FeedTweet key={item.id} tweet={item} />)
            }
        </div>
    );
}

export default Feed;