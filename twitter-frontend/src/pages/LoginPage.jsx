import { useState } from "react";
import { IconContext } from "react-icons/lib";
import { LuRabbit } from "react-icons/lu";
import Login from "../components/Login";
import Register from "../components/Register";
import ModalBG from "../components/ModalBG";

const LoginPage = () => {

    const [showSignin, setShowSignin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    // const handleLogin = (user) => {
    //     // Authenticate and save token
    //     axios
    //         .post("http://127.0.0.1:8080/api/auth/authenticate", { "handle": user.username, "password": user.password })
    //         .then((response) => {
    //             setCookie("jwt", response.data, { path: "/" });

    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }

    return (
        <main className="login-register">
            <div>
                <div className="login-register-left-half">
                    <IconContext.Provider value={{ className: "lr-big-logo" }}>
                        <LuRabbit />
                    </IconContext.Provider>
                </div>
                <div className="login-register-right-half">
                    <div>
                        <h1>Happening perchance</h1>
                        <br /><br />
                        <h3>Join eventually.</h3>
                        <br />
                        <button className="lr-button" onClick={() => setShowRegister(true)}>Register</button>
                        <div className="lr-button-sep">
                            <div>
                                <div />
                            </div>
                            <span>OR</span>
                            <div>
                                <div />
                            </div>
                        </div>
                        <button className="lr-button" onClick={() => setShowSignin(true)}>Sign in</button>
                    </div>
                </div>
            </div>
            <footer>
                <div>
                    <a href="#">Developed by Kashan Rauf</a> | <a href="https://react-icons.github.io/react-icons/">Icons provided by react-icons</a> | <a href="https://github.com/KashanRauf/twitter-clone">GitHub repository link</a>
                </div>
            </footer>

            <ModalBG show={showSignin || showRegister} onClose={() => {setShowRegister(false); setShowSignin(false)}}/>
            <Register show={showRegister} onClose={() => {setShowRegister(false)}}/>
            <Login show={showSignin} onClose={() => {setShowSignin(false)}}/>
        </main>
    );
}

export default LoginPage;