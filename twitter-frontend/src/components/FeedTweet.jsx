import React from "react";
import ProfilePic from "./ProfilePic";
import { Link } from "react-router-dom";
import { IoIosMore, IoMdShare } from "react-icons/io";
import { BiCommentDetail, BiBookmark } from "react-icons/bi";
import { LuCarrot } from "react-icons/lu";


const FeedTweet = (data) => {

  const tweet = data.tweet
  
  return (
    <div className="feed-post">
        <ProfilePic/>
        <div className="post-info-tb post-info-top">
          <div className="post-info-main">
            <span className="post-info-display">
              <Link to={`/profile/${tweet.user.handle}`}>{tweet.user.displayName}</Link>
            </span>
            <span className="post-info-handle">{"@" + tweet?.user.handle}</span>
            <span>·</span>
            <span className="post-info-time">{(new Date(tweet?.postDate)).toLocaleDateString("UTC")}</span>
          </div>
          <div className="post-info-aside">
            <span className="post-info-button circular-button"
              onClick={() => {/* Open context menu */}}>
                <IoIosMore/>
            </span>
          </div>
        </div>
        <div className="post-body">
            <p>{tweet?.body}</p>
            {/* Gif or sm */}
        </div>
        <div className="post-info-tb post-info-bottom">
          <div className="post-info-main">
            <span className="post-info-button post-interact"><BiCommentDetail/> {6}</span>
            <span className="post-info-button post-interact"><LuCarrot className="thin-stroke"/> {25}</span>
            <span className="post-info-button post-interact"><BiBookmark/> {1}</span>
          </div>
          <div className="post-info-aside">
            <span className="post-info-button circular-button">
              <IoMdShare/>
            </span>
          </div>
        </div>
    </div>
  );
}

export default FeedTweet;