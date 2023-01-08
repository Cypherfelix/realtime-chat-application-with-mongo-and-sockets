import { Link } from "react-router-dom";
import Conversation from "../../components/conversations/Conversation";
import Navbar from "../../components/navbar/Navbar";
import "./messenger.scss";

export const Messenger = () => {
    return (
        <div className="messenger">
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Admin</span>
                </Link>
                <Navbar />
            </div>
            <div className="messengerContainer">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper"></div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper"></div>
                </div>
            </div>
        </div>
    )
}
