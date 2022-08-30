import { useContext , useRef , useState} from "react";
import {AuthContext} from '../../context/AuthContext'
import {PermMedia, Label, Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import axios from 'axios'
import "./share.css";

export default function Share() {

  const {user} = useContext(AuthContext)
  const [file , setFile] = useState(null)
  const description = useRef()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const fileHandler = e => {
    setFile(e.target.files[0])
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const newPost = {
      userId: user._id,
      description: description.current.value
    }

    if(file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      newPost.img = fileName;
      data.append("name" , fileName)
      data.append("file" , file);
      console.log(newPost)
      try {
        await axios.post("/upload" , data);
      }
      catch (err) {console.log(err)}
    }
    
    try { 
      await axios.post('/posts' , newPost) 
      window.location.reload()
    } 
    catch (err) { console.log(err) }
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} alt="profile img" />
          <input
            placeholder={`What's in your mind ${user.username} ?`}
            className="shareInput"
            ref={description}
          />
        </div>
        <hr className="shareHr"/>
        {
          file && (
            <div className="shareImgContainer">
              <img  src={URL.createObjectURL(file)} 
                    alt="shared file" 
                    className="shareImg" 
                  />  
              <Cancel className='shareCancelImg' onClick={()=>setFile(null)}/>
            </div> )
        }
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor='file' className="shareOption">
                  <PermMedia htmlColor="tomato" className="shareIcon"/>
                  <span className="shareOptionText">Photo or Video</span>
                  <input 
                      className="fileupload"
                      type="file" 
                      id='file' 
                      accept='.png , .jpeg , .jpg' 
                      onChange={fileHandler}
                      />
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type='submit'>Share</button>
        </form>
      </div>
    </div>
  );
}