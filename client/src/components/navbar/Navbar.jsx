import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useContext, useState } from "react"
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const Navbar = () => {
  const [submenu, setSubmenu] = useState(false);


  const { dispatch } = useContext(DarkModeContext)
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item" onClick={() => dispatch({ type: "TOGGLE" })}>
            <DarkModeOutlinedIcon
              className="icon"

            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item" onClick={() => setSubmenu(!submenu)}>
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />

            <div className={submenu ? "sub-menu-wrapper open" : "sub-menu-wrapper"}>
              <div className="sub-menu">
                <div className="user-info">
                  <img
                    src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                    className="avatar"
                  />
                  <h2>James Doe</h2>
                </div>
                <hr />

                <Link to="#" className="sub-menu-link">
                  <PersonIcon className="icon" />
                  <p>Edit Profile</p>
                  <span><KeyboardArrowRight /></span>
                </Link>

                <Link href="#" className="sub-menu-link">
                  <SettingsIcon className="icon" />
                  <p>Settings & Privacy</p>
                  <span><KeyboardArrowRight /></span>
                </Link>
                <Link href="#" className="sub-menu-link">
                  <HelpOutlineIcon className="icon" />
                  <p>Help & Support</p>
                  <span><KeyboardArrowRight /></span>
                </Link>
                <Link href="#" className="sub-menu-link">
                  <LogoutIcon className="icon" />
                  <p>Logout</p>
                  <span><KeyboardArrowRight /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
