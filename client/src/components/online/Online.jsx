import "./online.scss";

export default function Online() {

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">Felix Marvin</span>
    </li>
  );
}
