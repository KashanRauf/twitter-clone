import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Feed from "../components/Feed";
import NavSidebar from "../components/NavSidebar";
import { tweetReq } from "../common/Request";
import PostModal from "../components/PostModal";

const Base = () => {
    const { auth } = useContext(AuthContext)
}
