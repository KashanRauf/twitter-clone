import "bootstrap/dist/css/bootstrap.min.css";
import { React, useEffect, useState, createContext, useContext, useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";


function App() {
    // const [cookies, setCookie] = useCookies(["jwt", "user"]);
    // const [user, setUser] = useState({});
    // const nav = useNavigate();
    // const loc = useLocation();
    
    // // If the user is not authenticated -> login/signup page
    // useEffect(() => {
    //     if (!loc.pathname.startsWith("/login") && !cookies.jwt) {
    //         nav("/login");
    //     }
    // }, [loc, nav, cookies.jwt]);

    // useEffect(() => {
    //     if (cookies.jwt) {
    //         const token = useJwt(cookies.jwt);
    //         const obj = JSON.parse(token);
    //         console.log(obj)
    //         // setUser()
    //     }
    // }, [cookies.jwt]);

    // const authContext = createContext();

    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/*" element={<Home/>}/>
        </Routes>
    );
}

export default App;