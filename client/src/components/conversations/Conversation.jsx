import "./conversation.scss";

export default function Conversation() {

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={"https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
        alt="avatar"
      />
      <span className="conversationName">John Doe</span>
    </div>
  );
}
