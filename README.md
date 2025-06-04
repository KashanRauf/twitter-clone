# Twitter Clone

A clone of Twitter (now X but that nobody calls it that) using SQL, Java Spring, and ReactJS with Vite. Implements a variety of features, but not all of them.
(I hope this goes without saying but this is a personal project to learn and consolidate technical skills.)

## Planned features (may change)
- Users can change their display name, handle, and some other info
- Users can follow and block(+mute) other users
- Users can like and bookmark tweets, and view them specifically
    - May add the ability to sort to this feature and the above
- Tweets will consist of text and up to 1 gif
- Tweets will show the number of likes and bookmarks (subject to change)
- Tweets can have tags
- Users can retweet or quote-retweet
- Users can reply to tweets
- ~~Text formatting like Discord messages~~

## In Progress
- Users can scroll through a feed of all tweets or following tweets
    - Have not yet implemented for following
- Users can write text posts (tweets) with gifs but no photos/videos (subject to change)
    - Partially implemented in frontend
    - Tweets don't display gifs yet
    - Have not tried retweets/replies yet either


## Implemented features
- Users can have a unique handle and a non-unique, optional display name
- Stateless security/authentication allowing users to make an account and log in to it in order to use account-specific features
- Emotes: Like Discord where specific strings translate to an emoji