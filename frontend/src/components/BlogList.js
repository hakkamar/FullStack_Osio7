import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

class BlogList extends React.Component {
  render () {
    return (
      <div>
        <div className='formi'>
          {this.props.user !== null ?
            <Togglable>
              <BlogForm />
            </Togglable>
            : <div> <p>Blogeja voi luoda vain kirjautunut käyttäjä</p> </div>
          }
        </div>
        <h2>blogs</h2>
        <div className='blogiLista'>
          {this.props.naytettavatBlogit.map(blog =>
            <div key={ blog._id } style={ blogStyle }>
              <Link to={`/blogs/${blog._id}`}>{blog.title} {blog.author}</Link>
            </div>
          )}
        </div>
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
  null
)(BlogList)

export default ConnectedBlogList