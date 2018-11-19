import React from 'react'
import blogService from './services/blogs'
import { connect } from 'react-redux'
import { blogInitialization } from './reducers/blogReducer'
import { userUpdate } from './reducers/userReducer'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedAndLogOut from './components/LoggedAndLogOut'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

class App extends React.Component {
  componentDidMount () {
    console.log('componentDidMount->')
    this.props.blogInitialization()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    console.log(' loggedUserJSON', loggedUserJSON)
    if ( loggedUserJSON ) {
      const user = JSON.parse(loggedUserJSON)
      this.props.userUpdate({ user })
      blogService.setToken(user.token)
    }
    console.log('componentDidMount<-')
  }

  render() {
    console.log('App - render')
    return (
      <div className="kokoSivu">
        <h1>Herra Hakkaraisen blogisivut</h1>
        <Notification />
        {this.props.user === null ?
          <LoginForm />
          :
          <div>
            <LoggedAndLogOut />
            <Togglable>
              <BlogForm />
            </Togglable>

            <h2>blogs</h2>
            <BlogList />
          </div>
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { blogInitialization, userUpdate }
)(App)