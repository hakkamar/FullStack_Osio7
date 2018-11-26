import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import blogService from './services/blogs'
import { connect } from 'react-redux'
import { blogInitialization } from './reducers/blogReducer'
import { userUpdate, userDelete } from './reducers/userReducer'
import { notificationChange } from './reducers/notificationReducer'
import { juuuseritInitialization } from './reducers/juuseritReducer'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Blogi from './components/Blogi'
import Juuseri from './components/Juuseri'

const Home = () => (
  <div>
    <p>Tervetuloa sivuille. Liiku valikossa olevilla valinnoilla.</p>
    <p>Vain kirjautunut käyttäjä voi lisätä blogeja.</p>
  </div>
)

const logout = async (props) => {
  window.localStorage.removeItem('loggedBlogAppUser')

  props.notificationChange('logged out')
  props.userDelete()
}

class App extends React.Component {
  componentDidMount () {
    this.props.blogInitialization()
    this.props.juuuseritInitialization()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if ( loggedUserJSON ) {
      const user = JSON.parse(loggedUserJSON)
      this.props.userUpdate({ user })
      blogService.setToken(user.token)
    }
  }

  render() {
    const userById = (props, id) => {
      return props.juuserit.find(u => u.id === id)
    }

    const blogById = (props, id) => {
      return props.blog.find(u => u._id === id)
    }

    const loggautunut = (props) => {
      if (!props.user.user) {
        return <em>loggaudutaan...</em>
      }
      return <em>{this.props.user.user.name} logged in <button onClick={ () => logout(this.props) }>logout</button></em>
    }

    return (
      <div className="kokoSivu">
        <h1>Herra Hakkaraisen blogisivut</h1>
        <Notification />
        <Router>
          <div>
            <div>
              <Link to="/blogs">blogs</Link> &nbsp;
              <Link to="/users">users</Link> &nbsp;
              {!this.props.user
                ? <Link to="/login">login</Link>
                : loggautunut(this.props)
              }
            </div>
            <Route exact path="/" render={() =>
              this.props.user
                ? <Redirect to="/blogs" />
                : <Home />
            } />
            <Route exact path="/blogs" render={() => <BlogList /> } />
            <Route exact path="/blogs/:id" render={({ match, history }) =>
              <Blogi history={history} blogi={blogById(this.props, match.params.id)} />}
            />
            <Route exact path="/users" render={() => <UserList />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <Juuseri juuseri={userById(this.props, match.params.id)} />}
            />
            <Route exact path="/login" render={() =>
              this.props.user
                ? <Redirect to="/blogs" />
                : <LoginForm />
            } />
          </div>
        </Router>

        <div>
          <p></p>
          <div>----------------------------------------------------------------------------</div>
          <em>Hakkiksen blogisivut, FullStack devausta vuodesta 2018</em>
          <div>----------------------------------------------------------------------------</div>
          <p></p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blog: state.blog,
    juuserit: state.juuserit
  }
}

export default connect(
  mapStateToProps,
  { blogInitialization, userUpdate, userDelete, juuuseritInitialization, notificationChange }
)(App)