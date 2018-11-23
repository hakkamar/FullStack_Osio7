import React from 'react'
import { connect } from 'react-redux'
import { notificationChange } from './../reducers/notificationReducer'
import { userUpdate, userDelete  } from './../reducers/userReducer'
import loginService from './../services/login'
import blogService from './../services/blogs'

var kayttajatunnus = ''
var salasana = ''

const login = async (props) => {
  console.log('login ->')

  props.userUpdate({ username: kayttajatunnus, password: salasana })

  //console.log('notification', props.notification)
  //console.log('user', props.user)

  try {
    const user = await loginService.login({
      username: kayttajatunnus,
      password: salasana
    })
    //console.log(' user', user)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    //console.log(' user.token', user.token)

    const teksti = 'welcome back!'
    props.notificationChange(teksti)
    props.userUpdate({ user })
    //props.juseriUpdate({ username: '', password: '', user })

  } catch (exception) {

    console.log(' kiville meni?????')
    props.userDelete()
    const teksti = 'käyttäjätunnus tai salasana virheellinen'
    props.notificationChange(teksti)
  }
  console.log('login <-')
}



class LoginForm extends React.Component {

  handleUserFieldChange = async (e) => {
    e.preventDefault()
    kayttajatunnus = e.target.value
  }

  handlePasswFieldChange = async (e) => {
    e.preventDefault()
    salasana = e.target.value
    /*
    e.target.value = ''
    this.props.anecdoteCreation(content)

    const teksti = 'Created new anecdote: ' + content
    this.props.notificationChange(teksti, 5)
    */
  }

  render () {
    return (
      <div className="kirjauduDiv">
        <h2>Kirjaudu</h2>

        <form onSubmit={() => login(this.props)}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              onChange={this.handleUserFieldChange }
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              onChange={this.handlePasswFieldChange}
            />
          </div>
          <button>kirjaudu</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    notification: state.notification
  }
}

const ConnectedLoginForm = connect(
  mapStateToProps,
  { notificationChange, userUpdate, userDelete }
)(LoginForm)

export default ConnectedLoginForm