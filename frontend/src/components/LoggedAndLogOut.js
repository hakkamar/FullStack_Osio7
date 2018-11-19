import React from 'react'
import { connect } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'
import { userUpdate } from '../reducers/userReducer'

const logout = async (props) => {

  window.localStorage.removeItem('loggedBlogAppUser')

  props.notificationChange('logged out')
  props.userUpdate({ username: '', password: '', user: null })

}

class LoggedAndLogOut extends React.Component {
  render() {
    return (
      <div>
        {this.props.user.user === null || this.props.user.user === undefined ?
          <div></div> :
          <div className="uloskirjausDiv">
            { this.props.user.user.username } logged in <button onClick={ () => logout(this.props) }>logout</button>
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

const ConnectedLogOut = connect(
  mapStateToProps,
  { notificationChange, userUpdate }
)(LoggedAndLogOut)

export default ConnectedLogOut