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
import { io } from "socket.io-client";

export const Messenger = () => {
    const API = process.env.REACT_APP_BACKEND_URL;
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const { user } = useContext(AuthContext);
    const [otherUser, setOtherUser] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([])
    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);

    console.log(onlineUsers);
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
    }, [API, user._id]);

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

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

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
                    <div className="chatOnlineWrapper">
                        <Online />
                        <Online />
                        <Online />
                        <Online />
                        <Online />
                    </div>
                </div>
            </div>
        </div>
    )
}
