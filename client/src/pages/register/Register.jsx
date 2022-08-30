import { useRef } from "react";
import {useNavigate} from 'react-router'
import axios from "axios";
import "./register.css";

const Register = () => {

  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try { 
        await axios.post('http://localhost:8800/api/auth/register' , user) 
        navigate('/login')
      } 
      catch (err) { console.log(err) }
    }
  }
  
  return (
    <div className="login">
      <div className="loginWrapper" >
        <div className="loginLeft">
          <h3 className="loginLogo">LikeSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input type='text' placeholder="Username" className="loginInput" ref={username} required/>
            <input type='email' placeholder="Email" className="loginInput" ref={email} required/>
            <input type='password' placeholder="Password" className="loginInput" ref={password} required minLength="6"/>
            <input type='password' placeholder="Password Again" className="loginInput" ref={passwordAgain} required/>
            <button type='submit' className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register