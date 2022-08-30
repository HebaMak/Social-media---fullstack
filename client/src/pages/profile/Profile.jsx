import {useState , useEffect} from 'react';
import {useParams} from 'react-router'
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from 'axios'
import "./profile.css";


const Profile = () => {

  const {username} = useParams()

  const PF = process.env.REACT_APP_PUBLIC_FOLDER 
  const [user , setUser] = useState({})

  useEffect(()=> {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8800/api/users?username=${username}`)
      setUser(res.data)
    }
    fetchUser()
  }, [username])

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={ user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.png"  }
                alt="profile cover"
              />
              <img
                className="profileUserImg"
                src= { user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"  }
                alt="profile picture"
                />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile