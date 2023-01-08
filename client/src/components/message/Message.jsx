import "./message.scss";
import { format } from "timeago.js";

export default function Message({ own }) {
  return (
    <div className={own === "true" ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">Hello there mr.</p>
      </div>
      <div className="messageBottom">{format(new Date())}</div>
    </div>
  );
}
