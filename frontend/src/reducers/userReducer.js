
const userReducer = (store = null, action) => {
  switch (action.type) {
  case 'UPDATE_USER': {
    //console.log('user update: ', action.data)
    //return [...store, action.data]
    return action.data
  }
  /*
  case 'INIT_USERS':
    return action.data
  */
  case 'DELETE_USER':
    return null
  default:
    return store
  }
}
/*
export const userInitialization = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}
*/

export const userUpdate = (content) => {
  //console.log('userUpdate -----------', content)
  return async (dispatch) => {
    await dispatch({
      type: 'UPDATE_USER',
      data: content
    })
  }
}

export const userDelete = () => {
  //console.log('userDelete -----------', )
  return async (dispatch) => {
    await dispatch({
      type: 'DELETE_USER'
    })
  }
}

export default userReducer