import userService from './../services/users'

const userReducer = (store = null, action) => {
  switch (action.type) {
  case 'UPDATE': {
    console.log('user update: ', action.data)

    //return [...store, action.data]
    return action.data
  }
  case 'INIT_USERS':
    return action.data
  default:
    return store
  }
}

export const userInitialization = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const userUpdate = (content) => {

  console.log('userUpdate -----------', content)
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE',
      data: content
    })
  }
}

export default userReducer