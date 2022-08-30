import { useContext } from "react";
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext'
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "./topbar.css";


function Topbar() {

  const {user} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER 

  return (
    <div className="topbarContainer">
    <div className="topbarLeft">
      <Link to='/'>
        <span className="logo">LikeSocial</span>
      </Link>
    </div>
    <div className="topbarCenter">
      <div className="searchbar">
        <SearchIcon className="searchIcon" />
        <input
          placeholder="Search for friend, post or video"
          className="searchInput"
        />
      </div>
    </div>
    <div className="topbarRight">
      <div className="topbarLinks">
        <span className="topbarLink">Homepage</span>
        <span className="topbarLink">Timeline</span>
      </div>
      <div className="topbarIcons">
        <div className="topbarIconItem">
          <PersonIcon/>
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <ChatIcon />
          <span className="topbarIconBadge">2</span>
        </div>
        <div className="topbarIconItem">
          <NotificationsIcon />
          <span className="topbarIconBadge">1</span>
        </div>
      </div>
      <Link to={`/profile/${user.username}`}>
        <img src={ user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="topbar img" className="topbarImg"/>
      </Link>
    </div>
  </div>
  )
}

export default Topbar
