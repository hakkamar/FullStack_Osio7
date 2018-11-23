import React from 'react'
import { connect } from 'react-redux'
import { visibleChange } from './../reducers/visibleReducer'

const toggleVisibility = async (props) => {
  props.visibleChange()
}

//       {this.props.children} ????????

const Togglable = (props) => (
  <div>
    <div style={ { display: props.visible ? 'none' : '' } }>
      <button onClick={ () => toggleVisibility(props) }> create new blog </button>
    </div>
    <div style={ { display: props.visible ? '' : 'none' } }>
      {props.children}
      <button onClick={ () => toggleVisibility(props) }>cancel</button>
    </div>
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