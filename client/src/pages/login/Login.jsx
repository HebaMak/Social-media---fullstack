import { useContext , useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from '@material-ui/core'
import "./login.css";

const Login = () => {

  const {user , isFetching , error , dispatch} = useContext(AuthContext)

  const email = useRef()
  const password = useRef()

  const handleClick = e => {
    e.preventDefault()
    loginCall({
              email: email.current.value, 
              password: password.current.value
              } , dispatch)
  }
  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">LikeSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input type='email' placeholder="Email" className="loginInput" ref={email} required />
            <input type='password' placeholder="Password" className="loginInput" ref={password} required minLength="6" />
            <button type='submit' className="loginButton" disabled={isFetching}>
              {isFetching ? <CircularProgress color='white' size='20px' /> : 'Log In'}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? <CircularProgress color='white' size='20px' /> : 'Create a New Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login