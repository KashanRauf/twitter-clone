import React from "react";

const regex = /^https:\/\/media.tenor.com\/[a-zA-Z0-9-_]+\/(\w|-)+.gif$/;

const TweetGif = ({ link }) => {
    if (!link || !link.match(regex)) return null;

    return (
        <img src={link} className="tweet-embed"/>
    );
}

export default TweetGif;