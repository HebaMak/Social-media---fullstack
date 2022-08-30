import './online.css'

const Online = ({user}) => {

  const {username , profilePicture} = user
  const PF = process.env.REACT_APP_PUBLIC_FOLDER 

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img src={PF+profilePicture} alt="profile img" className="rightbarProfileImg"/>
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{username}</span>
    </li>
  )
}

export default Online
