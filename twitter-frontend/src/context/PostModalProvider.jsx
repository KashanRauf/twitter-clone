import { createContext, useState } from "react";

const PostModalContext = createContext({});

// { show, onClose, quotes, repliesTo }
export const PostModalProvider = ({ children }) => {
    const [show, setShow] = useState(false);
    const [quotes, setQuotes] = useState("");
    const [repliesTo, setRepliesTo] = useState("");

    return (
        <PostModalContext.Provider value={{show, setShow, quotes, setQuotes, repliesTo, setRepliesTo}}>
            {children}
        </PostModalContext.Provider>
    );
};

export default PostModalContext;
