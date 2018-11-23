import userService from './../services/users'

const juuseritReducer = (store = [], action) => {
  switch (action.type) {
  case 'INIT_JUUSERIT':
    return action.data
  default:
    return store
  }
}

export const juuuseritInitialization = () => {
  return async (dispatch) => {
    const juuserit = await userService.getAll()
    dispatch({
      type: 'INIT_JUUSERIT',
      data: juuserit
    })
  }
}

export default juuseritReducer