import React from 'react'
import { connect } from 'react-redux'

const infoStyle = {
  color: 'green',
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

/*
const errorStyle = {
  color: 'red',
  paddingTop: 10,
  paddingLeft: 5,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
*/

class Notification extends React.Component {
  render () {
    const { notification } = this.props
    return (
      <div >
        { notification === '' ?
          <div></div> :
          <div style={ infoStyle } > {notification} </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification