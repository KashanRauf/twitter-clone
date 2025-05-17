import axios from "axios";
import React, { useRef, useState, useContext } from "react";
import { IconContext } from "react-icons/lib";
import { IoIosInformationCircle, IoMdClose } from "react-icons/io";
import { LuRabbit } from "react-icons/lu";
import AuthContext from "../context/AuthProvider";
import { jwtDecode } from "jwt-decode";

// Login modal
const Login = ({ show, onClose, setIsAuthenticated }) => {
    const { setAuth } = useContext(AuthContext);
    const [handle, setHandle] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const userRef = useRef();

    // Sends username/password to backend to attempt sign in
    const handleLogin = async (e) => {
        e.preventDefault();

        const data = {
            "handle": handle,
            "password": password
        }

        await axios
            .post("http://127.0.0.1:8080/api/auth/authenticate", data)
            .then((response) => {
                // Adds token to authentication context and triggers redirect
                console.log(response);
                const token = response?.data?.token;
                const decoded = jwtDecode(token);
                const handle = decoded.sub;
                const display = decoded.display;
                const bdate = decoded.birthDate;

                setAuth({ token, handle, display, bdate });
                setIsAuthenticated(true);
            }).catch((error) => {
                console.error(error);
                if (!error?.response) {
                    setErrMsg("No response.");
                } else if (error.response?.status === 403) {
                    setErrMsg("Incorrect handle or password.");
                } else {
                    setErrMsg("Failed to log in.");
                }
            });
    }

    if (!show) return null;

    return (
        <section className="lr-modal">
            <IconContext.Provider value={{ size: 24 }}>
                <IoMdClose onClick={onClose} className="modal-close" />
            </IconContext.Provider>
            <IconContext.Provider value={{ size: 36 }}>
                <LuRabbit className="lr-modal-icon" />
            </IconContext.Provider>

            <h2>Login</h2>
            <form className="login-form">
                <div className="login-form-pair">
                    <label htmlFor="handle">Handle</label>
                    <input id="handle" name="handle" type="text" ref={userRef} autoComplete="off"
                        required value={handle} onChange={(e) => { setHandle(e.target.value) }} />
                </div>
                <div className="login-form-pair">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="err-msg" style={{gridColumn:"1/2"}}>
                    <IoIosInformationCircle className={errMsg.length <= 0 ? "hidden" : undefined}/>
                    <p>{errMsg}</p>
                </div>

                <button type="button" className="lr-button" style={{gridRow:"4/5"}}
                    onClick={handleLogin}>Login</button>
            </form>
        </section>


    );
}

export default Login;