export const loginStart = userCredential => ({
  type: "LOGIN_START"
})

export const loginSuccess = user => ({
  type: "LOGIN_SUCCESS",
  payload: user
})

export const loginFailure = error => ({
  type: "LOGIN_FAILURE",
  payload: error
})

export const Follow = userId => ({
  type: 'FOLLOW',
  payload: userId
})

export const UnFollow = userId => ({
  type: 'UNFOLLOW',
  payload: userId
})