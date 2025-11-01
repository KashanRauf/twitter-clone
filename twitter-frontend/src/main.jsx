import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./react-aria.css"
// import "./index.css";
import "./bettercss.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { PostModalProvider } from "./context/PostModalProvider.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <PostModalProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </PostModalProvider>
    </BrowserRouter>,
);
