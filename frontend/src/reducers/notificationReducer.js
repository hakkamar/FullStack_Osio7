const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return action.teksti
  default:
    return state
  }
}

export const notificationChange = (teksti) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFICATION',
      teksti
    })

    teksti = ''
    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        teksti
      })
    }, 10000)
  }
}

export default notificationReducer