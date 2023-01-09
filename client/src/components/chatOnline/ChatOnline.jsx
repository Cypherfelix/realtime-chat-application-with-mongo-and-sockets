import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.scss";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const API = process.env.REACT_APP_BACKEND_URL;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(API + "/users/" + currentId);
      setFriends(res.data);
    };
    getFriends();
  }, [currentId, API]);

  useEffect(() => {
    setOnlineFriends(friends.filter((obj2) => {
      return onlineUsers.some((obj1) => obj1.userId === obj2._id);
    }));
  }, [friends, onlineUsers]);


  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `${API}/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="chatOnline">
      {friends.map((o, index) => (
        <div key={index} className="chatOnlineFriend" onClick={() => handleClick(o)} >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className={onlineFriends.includes(o) ? "chatOnlineBadge online" : "chatOnlineBadge"}></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
