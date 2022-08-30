import {useState , useEffect , useContext } from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import { MoreVert } from '@material-ui/icons'
import axios from 'axios'
import {format} from 'timeago.js'
import './post.css'

const Post = ({post}) => {
  const [like , setLike] = useState(post.likes.length)
  const [isLiked , setIsLiked] = useState(false)
  const [user , setUser] = useState({})
  const {user: currentUser} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER 

  useEffect(()=> {
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id , post.likes])

  useEffect(()=> {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`)
      setUser(res.data)
    }
    fetchUser()
  }, [post.userId])
  

  const likeHandler = () => {
    try {
      axios.put("/posts/"+ post._id +"/like", {userId:currentUser._id})
    }
    catch(err){}
    setLike(isLiked ? like -1 : like +1)
    setIsLiked(!isLiked)
  }

  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img src={ user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"  } alt="post profile img" className="postProfileImg" />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          <img src={PF+post.img} alt="post img" className='postImg'/>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src={`${PF}like.png`} alt="like img" className='likeIcon' onClick={likeHandler}/>
            <img src={`${PF}heart.png`} alt="heart img" className='likeIcon' onClick={likeHandler}/>
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
