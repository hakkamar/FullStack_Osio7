
const userReducer = (store = null, action) => {
  switch (action.type) {
  case 'UPDATE_USER': {
    return action.data
  }
  case 'DELETE_USER':
    return null
  default:
    return store
  }
}

export const userUpdate = (content) => {
  return async (dispatch) => {
    await dispatch({
      type: 'UPDATE_USER',
      data: content
    })
  }
}

export const userDelete = () => {
  return async (dispatch) => {
    await dispatch({
      type: 'DELETE_USER'
    })
  }
}

export default userReducer