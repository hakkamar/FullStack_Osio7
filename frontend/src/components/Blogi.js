import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Label, Segment } from 'semantic-ui-react'
import { blogLike, blogDelete, blogComment } from './../reducers/blogReducer'
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
  constructor(props) {
    super(props)
    this.state = {
      kommentti: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({ kommentti: event.target.value })
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
            <p></p>
            <div><Button fluid size='tiny' onClick={ () => remove(this.props, blog, history) }>delete blog</Button></div>
          </div>
        )
      } else {
        return (
          <div>
            <div> added by { blog.user.name } </div>
            <p></p>
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
      var teksti = ''
      if (this.state.kommentti !== '') {
        this.props.blogComment(blogi, this.state.kommentti)

        teksti = `blogille '${blogi.title}' lisätty kommentti '${this.state.kommentti}'`
        this.props.notificationChange(teksti)

        this.setState({ kommentti: '' })
      } else {
        teksti = 'error: tyhjää ei kommnetoida'
        this.props.notificationChange(teksti)
      }
    }

    if (blogi === undefined) {
      return(<div>päivitetään sivu, malta hetki....</div>)
    }

    return(
      <div>
        <Segment>
          <h2>{blogi.title} - {blogi.author}</h2>
          <div>
            <a href={blogi.url} target="_blank" rel="noopener noreferrer" >{blogi.url}</a>
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
        </Segment>
        <p></p>
        <h2>comments</h2>
        <p></p>

        <form onSubmit={ () => addComment(blogi) }>
          <div>
            <input
              value={this.state.kommentti}
              name='comment'
              onChange={this.handleFieldChange}
            />
            <Button size='mini' type="submit">Kommentoi</Button>
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