import "./message.scss";
import { format } from "timeago.js";

export default function Message({ message, own, user, otherUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {!own && (
          <img
            className="messageImg"
            src={
              own ?
                user?.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
                :
                otherUser?.profilePicture
                  ? PF + otherUser.profilePicture
                  : PF + "person/noAvatar.png"
            }
            alt=""
          />)}

        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
