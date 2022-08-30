import "./closeFriend.css";

const CloseFriend = ({user}) => {

  const {profilePicture , username} = user
  const PF = process.env.REACT_APP_PUBLIC_FOLDER 

  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF+profilePicture} alt="sidebar img" />
      <span className="sidebarFriendName">{username}</span>
    </li>
  );
}

export default CloseFriend