import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthProvider";
import Base from "./pages/Base";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";

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
        <>
            <Toaster containerClassName="toast-container" toastOptions={{
                style: {
                    color: "#F9F9F9",
                },
                success: {
                    style: {
                        backgroundColor: "#1D9BF0",
                    },
                    iconTheme: {
                        primary: "#1D9BF0",
                    },
                },
                error: {
                    style: {
                        backgroundColor: "#F03E3E",
                    },
                    iconTheme: {
                        primary: "#F03E3E",
                    },
                },
            }}/>

            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route element={<Base/>}>
                    <Route path="/home" element={<Home/>}/>
                    {/* Using Home as placeholders for now */}
                    <Route path="/search" element={<Home/>}/>
                    <Route path="/profile/:handle" element={<Profile/>}/>
                    <Route path="/likes" element={<Home/>}/>
                    <Route path="/bookmarks" element={<Home/>}/>
                    <Route path="/*" element={<Home/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;