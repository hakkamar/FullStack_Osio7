import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class UserList extends React.Component {
  render () {
    return (
      <div>
        <h2>users</h2>
        <div>
          {this.props.naytettavatJuuserit.map(user =>
            <div key={ user.id }>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
              {user.blogs.length}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    naytettavatJuuserit: state.juuserit
  }
}

const ConnectedUserList = connect(
  mapStateToProps,
  null
)(UserList)

export default ConnectedUserList