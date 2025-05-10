import React, { useRef, useState, useEffect } from "react";

const Login = ({show, onClose /*, onLogin */}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    if (!show) return null; 

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onLogin({username, password});
    // }

    return (
        <></>
    );
}

export default Login;