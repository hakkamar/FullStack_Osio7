import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Segment } from 'semantic-ui-react'
import { blogCreation } from './../reducers/blogReducer'
import { notificationChange } from './../reducers/notificationReducer'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = async (props) => {
    var teksti = ''
    if (this.state.title === '' || this.state.author === '' || this.state.url === '') {
      teksti = 'error: Anna title, author ja url'
    } else {
      const Uusiblog = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }
      props.blogCreation(Uusiblog)
      teksti = `blog '${Uusiblog.title}' by ${Uusiblog.author} added`

      this.setState({
        title: '',
        author: '',
        url: ''
      })
    }
    props.notificationChange(teksti)
  }

  render() {
    return (
      <div>
        <Segment raised>
          <h2>Luo uusi blogi</h2>
          <Form onSubmit={() => this.addBlog(this.props)}>
            <Form.Field>
              <label>title</label>
              <input
                placeholder='Joku kivan Blogin otsikko...'
                value={this.state.title}
                name='title'
                onChange={this.handleFieldChange}
              />
            </Form.Field>
            <Form.Field>
              <label>author</label>
              <input
                placeholder='Blogin kirjoittaja...'
                value={this.state.author}
                name='author'
                onChange={this.handleFieldChange}
              />
            </Form.Field>
            <Form.Field>
              <label>url</label>
              <input
                placeholder='JeeJeeJee -sivu mistä blogi löytyy'
                value={this.state.url}
                name='url'
                onChange={this.handleFieldChange}
              />
            </Form.Field>
            <Button type="submit">Luo</Button>
          </Form>
        </Segment>
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