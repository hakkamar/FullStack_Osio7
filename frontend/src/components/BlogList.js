import React from 'react'
import { connect } from 'react-redux'
import { Table, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

class BlogList extends React.Component {
  render () {
    return (
      <div>
        <div className='blogiFormi'>
          {this.props.user !== null ?
            <Togglable>
              <BlogForm />
            </Togglable>
            : <div> <p>Blogeja voi luoda vain kirjautunut käyttäjä</p> </div>
          }
        </div>
        <p></p>
        <div>
          <Segment>
            <h2>Blogs</h2>
            <Table striped celled>
              <Table.Body>
                {this.props.naytettavatBlogit.map(blog =>
                  <Table.Row key={ blog._id }>
                    <Table.Cell>
                      <Link to={`/blogs/${blog._id}`}>{blog.title} </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {blog.author}
                    </Table.Cell>
                  </Table.Row>
                )} 
              </Table.Body>
            </Table>
          </Segment>
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