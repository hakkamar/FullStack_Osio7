import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import visibleReducer from './reducers/visibleReducer'
import userReducer from './reducers/userReducer'
import juuseritReducer from './reducers/juuseritReducer'

const reducer = combineReducers({
  blog: blogReducer,
  notification: notificationReducer,
  visible: visibleReducer,
  user: userReducer,
  juuserit: juuseritReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store