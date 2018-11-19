const visibleReducer = (state = true, action) => {
  switch (action.type) {
  case 'CHANGE':
    return !state
  default:
    return state
  }
}

export const visibleChange = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CHANGE'
    })
  }
}

export default visibleReducer