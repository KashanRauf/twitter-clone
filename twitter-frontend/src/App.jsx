import "bootstrap/dist/css/bootstrap.min.css";
import { React, useEffect, useContext } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AuthContext from "./context/AuthProvider";

function App() {
    const { auth } = useContext(AuthContext);
    const nav = useNavigate();
    const loc = useLocation();
    
    // If the user is not authenticated -> login/signup page
    useEffect(() => {
        // console.log("auth" + auth.token);
        if (!loc.pathname.startsWith("/login") && !auth?.token ) {
            nav("/login");
        }
    }, [loc, nav, auth]);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/home" element={<Home/>}/>
            {/* Using Home as placeholders for now */}
            <Route path="/search" element={<Home/>}/>
            <Route path="/profile/:handle" element={<Home/>}/>
            <Route path="/likes" element={<Home/>}/>
            <Route path="/bookmarks" element={<Home/>}/>
            <Route path="/*" element={<Home/>}/>
        </Routes>
    );
}

export default App;