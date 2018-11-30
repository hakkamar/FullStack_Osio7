import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class UserList extends React.Component {
  render () {
    return (
      <div>
        <h2>Users</h2>
        <Table striped celled>
          <Table.Body>
            {this.props.naytettavatJuuserit.map(user =>
              <Table.Row key={ user.id }>
                <Table.Cell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </Table.Cell>
                <Table.Cell>
                  {user.blogs.length}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
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