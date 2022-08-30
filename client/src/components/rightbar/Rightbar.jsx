import { useEffect , useState , useContext} from "react";
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from 'axios'
import {Add , Remove} from '@material-ui/icons'
import "./rightbar.css";

const Rightbar = ({user}) => {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER 
  const [friends , setFriends] = useState([])
  const {user: currentUser , dispatch} = useContext(AuthContext)
  const [followed , setFollowed]= useState(currentUser.followings.includes(user?.id))

  
  const handleFollwing = async () => {
    try {
      if(followed) {
        await axios.put("/users/" + user._id + "/unfollow" , {userId: currentUser._id})
        dispatch({type: 'UNFOLLOW' , payload: user._id})
      } else {
        await axios.put("/users/" + user._id + "/follow" , {userId: currentUser._id})
        dispatch({type: "FOLLOW" , payload: user._id})
      }
    } 
    catch (err) {
      console.log(err)
    }
    setFollowed(!followed)
  }


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id)
        setFriends(friendList.data)
      }
      catch (err) {console.log(err)}
    }
    getFriends()
  },[user])


  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="birthday img" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b> 3 other friends </b> have a birthday today
          </span>
        </div>
        <img src="assets/ad.png" alt="ad img" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {
            Users.map(user => ( <Online user={user} key={user.id}/> ))
          }
        </ul>  
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleFollwing}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Married' : ''}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {
            friends.map(friend => (
              <Link to={`/profile/${friend.username}`}>
                <div className="rightbarFollowing">
                  <img
                    src={friend.profilePicture ? PF + friend.profilePicture  : PF + 'person/noAvatar.png'}
                    alt="rightbar img"
                    className="rightbarFollowingImg"
                    />
                  <span className="rightbarFollowingName">{friend.username}</span>
                </div> 
              </Link>
            ))
          }

        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar