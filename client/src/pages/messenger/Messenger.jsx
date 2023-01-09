import axios from "axios";
import { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import Navbar from "../../components/navbar/Navbar";
import Online from "../../components/online/Online";
import { AuthContext } from "../../context/auth/AuthContext"
import "./messenger.scss";

export const Messenger = () => {
    const API = process.env.REACT_APP_BACKEND_URL;
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const { user } = useContext(AuthContext);
    const [otherUser, setOtherUser] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef();


    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`${API}/conversations/${user._id}`);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, []);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`${API}/messages/` + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (currentChat) {
            getMessages();
        }
    }, [currentChat, API]);


    const getOtherUsers = async (c) => {
        const friendId = c.members.find((m) => m !== user._id);
        try {
            const res = await axios(`${API}/users?userId=${friendId}`);
            setOtherUser(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        try {
            const res = await axios.post(`${API}/messages`, message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
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
                        {conversations.map((c) => (
                            <div id={c._id} onClick={async () => {
                                setCurrentChat(c);
                                await getOtherUsers(c);
                            }}>
                                <Conversation conversation={c} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div id={m._id} ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id} user={user} otherUser={otherUser} />
                                        </div>

                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                                Open a conversation to start a chat.
                            </span>
                        )}
                    </div>
                </div>
                <div className="chatOnline">
                    <ul className="chatOnlineWrapper">
                        <Online />
                        <Online />
                        <Online />
                        <Online />
                        <Online />
                    </ul>
                </div>
            </div>
        </div>
    )
}
