import { tweetReq } from "./Request";
import toast from "react-hot-toast";

// TODO Add support for giflinks

// Token should already be provided
// data should be in format of {body, gifLink, repliesTo, original}
const post = async (data) => {
    // console.log(data)
    await tweetReq
        .post("/new", data)
        .then((response) => {
            console.log(response);
            toast.success("Successfully posted.");
            // SHOULD RELOAD PAGE
        }).catch((error) => {
            console.error(error);
            toast.error("Failed to post.");
        });
}

export default post;