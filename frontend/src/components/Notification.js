import React from 'react'
import { Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render () {
    const { notification } = this.props

    if (notification.slice(5,6) === ':') {
      return (
        <div >
          <Message error >
            {notification}
          </Message>
        </div>
      )
    }

    return (
      <div >
        { notification === '' ?
          <div></div> :
          <Message success >
            {notification}
          </Message>
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