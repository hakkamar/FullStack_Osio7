import React from 'react'
import { connect } from 'react-redux'
import { blogCreation } from './../reducers/blogReducer'
import { notificationChange } from './../reducers/notificationReducer'

var title = ''
var url = ''
var author = ''

const addBlog = async (props) => {
  //
  //event.preventDefault()
  //
  //

  const Uusiblog = {
    title: title,
    author: author,
    url: url
  }

  console.log('* addBlog - ---------------------------------')
  console.log('* addBlog - Uusiblog', Uusiblog)
  props.blogCreation(Uusiblog)
  console.log('* addBlog - ---------------------------------')

  const teksti = `blog '${Uusiblog.title}' by ${Uusiblog.author} added`
  props.notificationChange(teksti)

  title = ''
  url = ''
  author = ''
}

class BlogForm extends React.Component {

  handleFieldChange = async (event) => {
    //event.preventDefault()
    switch (event.target.name) {
    case 'title': {
      title = event.target.value
      break
    }
    case 'author': {
      author = event.target.value
      break
    }
    case 'url': {
      url = event.target.value
      break
    }
    default: {
      console.log(' no nyt pomppas... BlogForm/handleFieldChange ????')
      break
    }
    }
  }

  render() {
    return (
      <div>
        <h2>Luo uusi blogi</h2>

        <form onSubmit={() => addBlog(this.props)}>
          <div>
            title
            <input
              value={this.value}
              name='title'
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            author
            <input
              value={this.value}
              name='author'
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            url
            <input
              value={this.value}
              name='url'
              onChange={this.handleFieldChange}
            />
          </div>

          <button type="submit">Luo</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blog: state.blog,
    notification: state.notification
  }
}

const ConnectedBlogForm = connect(
  mapStateToProps,
  { blogCreation, notificationChange }
)(BlogForm)

export default ConnectedBlogForm