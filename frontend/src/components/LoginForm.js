import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { notificationChange } from './../reducers/notificationReducer'
import { userUpdate, userDelete  } from './../reducers/userReducer'
import loginService from './../services/login'
import blogService from './../services/blogs'

var kayttajatunnus = ''
var salasana = ''

const login = async (props) => {

  props.userUpdate({ username: kayttajatunnus, password: salasana })

  try {
    const user = await loginService.login({
      username: kayttajatunnus,
      password: salasana
    })
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)

    props.notificationChange('welcome back!')
    props.userUpdate({ user })

  } catch (exception) {
    props.userDelete()
    props.notificationChange('error: käyttäjätunnus tai salasana virheellinen')
  }
}

class LoginForm extends React.Component {

  handleUserFieldChange = async (e) => {
    e.preventDefault()
    kayttajatunnus = e.target.value
  }

  handlePasswFieldChange = async (e) => {
    e.preventDefault()
    salasana = e.target.value
  }

  render () {
    return (
      <div className="kirjauduDiv">
        <h2>Kirjaudu</h2>
        <Form onSubmit={() => login(this.props)}>
          <Form.Field>
            <label>käyttäjätunnus</label>
            <input
              type="text"
              name="username"
              onChange={this.handleUserFieldChange }
            />
          </Form.Field>
          <Form.Field>
            <label>salasana</label>
            <input
              type="password"
              name="password"
              onChange={this.handlePasswFieldChange}
            />
          </Form.Field>
          <Button size='tiny'>kirjaudu</Button>
        </Form>
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