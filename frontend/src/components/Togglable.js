import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { visibleChange } from './../reducers/visibleReducer'

const toggleVisibility = async (props) => {
  props.visibleChange()
}

const Togglable = (props) => (
  <div>
    <p></p>
    <div style={ { display: props.visible ? 'none' : '' } }>
      <Button onClick={ () => toggleVisibility(props) }> create new blog </Button>
    </div>
    <div style={ { display: props.visible ? '' : 'none' } }>
      {props.children}
      <p></p>
      <Button onClick={ () => toggleVisibility(props) }>close "create new blog" form</Button>      
    </div>
    <p></p>
  </div>
)

const mapStateToProps = (state) => {
  return {
    visible: state.visible
  }
}

const ConnectedTogglable = connect(
  mapStateToProps,
  { visibleChange }
)(Togglable)

export default ConnectedTogglable