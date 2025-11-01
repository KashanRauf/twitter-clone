import { Outlet } from "react-router-dom";
import NavSidebar from "../components/NavSidebar";
import PostModal from "../components/modal/PostModal";

const Base = () => {
    return (
        <>
            <main className="base-page">
                <NavSidebar/>

                <div className="specific-content">
                    <Outlet/>
                </div>

                <aside className="base-right">
                    {/* Maybe put most followed users or most liked posts? */}
                </aside>
            </main>
            <PostModal/>
        </>
    )
}

export default Base;