import { createContext, useState } from "react";

const NewPostContext = createContext({});

// { onClose, quotes, repliesTo }
export const NewPostProvider = ({ children }) => {
    const [quotes, setQuotes] = useState("");
    const [repliesTo, setRepliesTo] = useState("");

    return (
        <NewPostContext.Provider value={{quotes, setQuotes, repliesTo, setRepliesTo}}>
            {children}
        </NewPostContext.Provider>
    );
};

export default NewPostContext;
