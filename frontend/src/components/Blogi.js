import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Label } from 'semantic-ui-react'
import { blogLike, blogDelete, blogComment } from './../reducers/blogReducer'
import { notificationChange } from './../reducers/notificationReducer'

var kommentti = ''

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

  handleFieldChange = async (event) => {
    event.preventDefault()

    switch (event.target.name) {
    case 'comment': {
      kommentti = event.target.value
      break
    }
    default: {
      console.log(' no nyt pomppas... CommentForm/handleFieldChange ????')
      break
    }
    }
  }

  lisaaja = (blog, history) => {
    if (blog === undefined || this.props.user === null ) {
      return <div> added by anonymous </div>
    }
    if (this.props.user.user !== undefined) {
      if (blog.user.name === this.props.user.user.name) {
        return (
          <div>
            <div> added by { blog.user.name } </div>
            <div><Button fluid size='tiny' onClick={ () => remove(this.props, blog, history) }>delete blog</Button></div>
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

    const addComment = async (blogi) => {
      this.props.blogComment(blogi, kommentti)

      const teksti = `blogille '${blogi.title}' lisätty kommentti '${kommentti}'`
      this.props.notificationChange(teksti)
      kommentti = ''

      //console.log('addComment - history.location.pathname', history.location.pathname)
      //history.push(history.location.pathname)
      history.push('/blogs')
    }

    return(
      <div>
        <h2>{blogi.title} - {blogi.author}</h2>
        <div>
          <a href={blogi.url}>{blogi.url}</a>
        </div>
        <p></p>
        <div>
          <Button as='div' labelPosition='left'>
            <Label as='a' basic pointing='right'>
              {blogi.likes} likes
            </Label>
            <Button icon color='red' onClick={ () => like(blogi) }>
              <Icon name='heart' />
                Like
            </Button>
          </Button>
        </div>
        <p></p>
        <div> {this.lisaaja(blogi, history) } </div>
        <p></p>
        <h2>comments</h2>
        <p></p>


        <form onSubmit={ () => addComment(blogi) }>
          <div>
            <input
              value={this.value}
              name='comment'
              onChange={this.handleFieldChange}
            />
            <Button type="submit">Kommentoi</Button>
          </div>
        </form>


        <p></p>
        <ul>
          {blogi.comment.map(c =>
            <li key={ c._id }>
              <div> {c.comment} </div>
            </li>
          )}
        </ul>
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
  { blogLike, blogDelete, blogComment, notificationChange }
)(Blogi)

export default ConnectedBlogi