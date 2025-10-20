import React from "react";
import FeedTweet from "./FeedTweet";
import FeedNewStatus from "./FeedNewStatus";

const Feed = ({postList, isLoading, topType}) => {
    var top = <></>;

    if (topType == "new-status") {
        top = <FeedNewStatus borderless={false}/>
    }

    return (
        <div className="feed-posts">
            {top}
            {isLoading && postList.length > 0 ?
                <p>Loading posts</p> :
                postList.map((item) => <FeedTweet key={item.id} tweet={item} />)
            }
        </div>
    );
}

export default Feed;