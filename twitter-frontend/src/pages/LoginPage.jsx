import { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { LuRabbit } from "react-icons/lu";
import Login from "../components/Login";
import Register from "../components/Register";
import ModalBG from "../components/ModalBG";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const [showSignin, setShowSignin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const nav = useNavigate();

    // Checks if the user has been authenticated, when updated by modals the user is redirected to home page
    useEffect(() => {
        if (isAuthenticated) {
            nav("/home");
        }
    }, [isAuthenticated, nav]);

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
            <Register show={showRegister} onClose={() => {setShowRegister(false)}} setIsAuthenticated={setIsAuthenticated}/>
            <Login show={showSignin} onClose={() => {setShowSignin(false)}} setIsAuthenticated={setIsAuthenticated}/>
        </main>
    );
}

export default LoginPage;