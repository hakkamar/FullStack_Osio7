import React from 'react'
import { connect } from 'react-redux'
import { blogLike, blogDelete } from './../reducers/blogReducer'
import { notificationChange } from './../reducers/notificationReducer'

const remove =  async (props, blog, history) => {
  const ok = window.confirm(`remove blog '${ blog.title }' by ${ blog.author }?`)
  if ( ok === false) {
    return
  }
  props.blogDelete(blog)
  const teksti = `blog '${ blog.title }' by ${ blog.author } removed`
  props.notificationChange(teksti)
  history.push('/')
}

class Blogi extends React.Component {

  lisaaja = (blog, history) => {
    if (blog === undefined || this.props.user === null ) {
      return <div> added by anonymous </div>
    }
    if (this.props.user.user !== undefined) {
      if (blog.user.name === this.props.user.user.name) {
        return (
          <div>
            <div> added by { blog.user.name } </div>
            <div><button onClick={ () => remove(this.props, blog, history) }>delete</button></div>
          </div>
        )
      } else {
        return (
          <div>
            <div> added by { blog.user.name } </div>
          </div>
        )
      }
    }
    return <div>miten tässä näin kävi???</div>
  }

  render() {
    const { blogi, history } = this.props

    const like = async (blogi) => {
      this.props.blogLike(blogi)

      const teksti = `you liked '${blogi.title}' by ${blogi.author}`
      this.props.notificationChange(teksti)
    }

    return(
      <div>
        <h2>{blogi.title} - {blogi.author}</h2>
        <div>
          <a href={blogi.url}>{blogi.url}</a>
        </div>
        <div> {blogi.likes} likes <button onClick={ () => like(blogi) }>like</button> </div>
        <div> {this.lisaaja(blogi, history) } </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const ConnectedBlogi = connect(
  mapStateToProps,
  { blogLike, blogDelete, notificationChange }
)(Blogi)

export default ConnectedBlogi