import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { Container, Button, Menu, Divider, Header, Flag, Segment } from 'semantic-ui-react'
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
    <p>Kuka vaan voi kommentoida blogeja.</p>
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
      return <em>{this.props.user.user.name} logged in <Button size='mini' inverted color='grey' onClick={ () => logout(this.props) }>logout</Button></em>
    }

    return (
      <Container>
        <div className="kokoSivu">
          <Header as='h1' color='grey'>
            <p></p>
            <Segment secondary textAlign='center'>
              Herra Hakkaraisen blogisivut
            </Segment>
          </Header>
          <Router>
            <div>
              <Menu inverted >
                <Menu.Item link>
                  <Link to="/blogs">blogs</Link>
                </Menu.Item>
                <Menu.Item link>
                  <Link to="/users">users</Link>
                </Menu.Item>
                <Menu.Item link>
                  {!this.props.user
                    ? <Link to="/login">login</Link>
                    : loggautunut(this.props)
                  }
                </Menu.Item>
              </Menu>
              <Notification />
              <Segment>
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
              </Segment>
            </div>
          </Router>

          <div>
            <Divider hidden/>
            <Header as='h5' color='grey'>
              <Segment secondary textAlign='center'>
                <em> Hakkiksen blogisivut. Hand made in Järvenpää <Flag name='fi' /> </em>
                <p>FullStack devausta vuodesta 2018</p>
              </Segment>
            </Header>
          </div>
        </div>
      </Container>
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