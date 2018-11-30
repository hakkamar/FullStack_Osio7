import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { blogCreation } from './../reducers/blogReducer'
import { notificationChange } from './../reducers/notificationReducer'

var title = ''
var url = ''
var author = ''

const addBlog = async (props) => {
  var teksti = ''
  if (title === '' || author === '' || url === '') {
    teksti = 'error: Anna title, author ja url'
  } else {
    const Uusiblog = {
      title: title,
      author: author,
      url: url
    }
    props.blogCreation(Uusiblog)
    teksti = `blog '${Uusiblog.title}' by ${Uusiblog.author} added`
    title = ''
    url = ''
    author = ''
  }
  props.notificationChange(teksti)
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
        <Form onSubmit={() => addBlog(this.props)}>
          <Form.Field>
            <label>title</label>
            <input
              placeholder='Joku kivan Blogin otsikko...'
              value={this.value}
              name='title'
              onChange={this.handleFieldChange}
            />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input
              placeholder='Blobgin kirjoittaja...'
              value={this.value}
              name='author'
              onChange={this.handleFieldChange}
            />
          </Form.Field>
          <Form.Field>
            <label>url</label>
            <input
              placeholder='JeeJeeJee -sivu mistä blogi löytyy'
              value={this.value}
              name='url'
              onChange={this.handleFieldChange}
            />
          </Form.Field>
          <Button type="submit">Luo</Button>
        </Form>
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