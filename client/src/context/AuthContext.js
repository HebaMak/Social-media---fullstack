import {  createContext , useReducer } from "react";
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
  // user: {
  //   _id:"622280f95a6235a9cfaad36c",
  //   username:"Maia",
  //   email:"maia@gmail.com",
  //   profilePicture : "person/1.jpeg",
  //   coverPicture : "",
  //   isAdmin : false,
  //   followers : [],
  //   followings : []
  // },
  user: null,
  isFetching: false,
  error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {

  const [state , dispatch] = useReducer(AuthReducer, INITIAL_STATE) 


  
  const value = {
    user: state.user,
    isFetching: state.isFetching,
    error: state.error,
    dispatch
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}


