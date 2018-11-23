import React from 'react'
import { connect } from 'react-redux'
import { blogLike, blogDelete } from './../reducers/blogReducer'
import { notificationChange } from './../reducers/notificationReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const like = async (props, blog) => {
  props.blogLike(blog)

  const teksti = `you liked '${blog.title}' by ${blog.author}`
  props.notificationChange(teksti)
}

const remove =  async (props, blog) => {
  const ok = window.confirm(`remove blog '${ blog.title }' by ${ blog.author }?`)
  if ( ok === false) {
    return
  }
  props.blogDelete(blog)
  const teksti = `blog '${ blog.title }' by ${ blog.author } removed`
  props.notificationChange(teksti)
}

class BlogList extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }

  lisaaja = (blog) => {
    if (blog === undefined || this.props.user === null ) {
      return <div> added by anonymous </div>
    }
    if (this.props.user.user !== undefined) {
      if (blog.user.name === this.props.user.user.name) {
        return (
          <div>
            <div> added by { blog.user.name } </div>
            <div><button onClick={ () => remove(this.props, blog) }>delete</button></div>
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

  render () {
    const contentStyle = {
      display: this.state.visible? '' : 'none',
      margin: 5,
    }

    return (
      <div>
        <div>
          {this.props.user !== null ?
            <Togglable>
              <BlogForm />
            </Togglable>
            : <div> <p>Blogeja voi luoda vain kirjautunut käyttäjä</p> </div>
          }
        </div>
        <h2>blogs</h2>
        {this.props.naytettavatBlogit.map(blog =>
          <div key={ blog._id } style={ blogStyle }>
            <div
              onClick={ () => this.setState({ visible: !this.state.visible }) }
              className='name'
            >
              {blog.title} {blog.author}
            </div>
            <div style={ contentStyle } className='content'>
              <div>
                <a href={blog.url}>{blog.url}</a>
              </div>
              <div>
                {blog.likes} likes <button onClick={ () => like(this.props, blog) }>like</button>
              </div>
              <div> {this.lisaaja(blog) }</div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const blogitJarjestyksessa = (blogit) => {
  return blogit.sort((b1, b2) => b2.likes - b1.likes)
}

const mapStateToProps = (state) => {
  return {
    naytettavatBlogit: blogitJarjestyksessa(state.blog),
    user: state.user
  }
}

const ConnectedBlogList = connect(
  mapStateToProps,
  { blogLike, blogDelete, notificationChange }
)(BlogList)

export default ConnectedBlogList