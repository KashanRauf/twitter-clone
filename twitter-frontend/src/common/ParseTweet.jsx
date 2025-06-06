import React from "react";

const EMOTE_NAMES = ["despair", "devious", "huh", "insane", "nice", "true", "waaa"];

// Extracts emotes and gifs from text
const parseTweet = (text) => {
    if (typeof text != "string") {
        return;
    }
    
    var body = [];
    // Extracts the gifLink first to embed it and remove from text

    // Cases where it isn't possible for an emote to exist
    if (text.indexOf(":") == text.lastIndexOf(":")) {
        return (<span>{text}</span>);
    }

    var chunks = splitColons(text);

    // Parses through chunks between colons to find emotes
    let lastIsEmote = false;
    for (let i = 0; i < chunks.length-2; i++) {
        if (chunks[i] == ':' && EMOTE_NAMES.includes(chunks[i+1]) && chunks[i+2] == ':') {
            body.push(<span key={i}><img src={`emote/${chunks[i+1]}.webp`}/></span>);
            i += 2;
            lastIsEmote = true;
        } else {
            body.push(<span key={i}>{chunks[i]}</span>)
            lastIsEmote = false;
        }
    }

    if (!lastIsEmote) {
        body.push(<span key={chunks.length-1}>{chunks.pop()}</span>);
    }

    return <>{body}</>;
}

const splitColons = (text) => {
    const arr = [];
    var lastIndex = 0;

    for (var i = 0; i < text.length; i++) {
        if (text.charAt(i) == ':') {
            const prev = text.substring(lastIndex, i);
            if (prev.length > 0) {
                arr.push(prev);
            }
            arr.push(':');
            lastIndex = i + 1;
        }
    }

    if (lastIndex < text.length) {
        const rest = text.substring(lastIndex, i);
        if (rest.length > 0) {
            arr.push(rest);
        }
    }

    return arr;
}

export default parseTweet;