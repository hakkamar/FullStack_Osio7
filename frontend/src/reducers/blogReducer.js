import blogService from './../services/blogs'

const blogReducer = (store = [], action) => {

  switch (action.type) {
  case 'LIKE': {
    const old = store.filter(a => a.id !== action.data.id)
    const liked = store.find(a => a.id === action.data.id)

    return [...old, { ...liked, likes: liked.likes + 1 } ]
  }
  case 'CREATE':
    return [...store, action.data]
  case 'DELETE': {
    const old = store.filter(a => a.id !== action.data.id)
    return [...old]
  }
  case 'INIT_BLOGS':
    return action.data
  default:
    return store
  }
}

export const blogInitialization = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const blogCreation = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const blogDelete = (blog) => {
  /*
  console.log('blogDelete - -----------')
  console.log('blogDelete - id ', blog.id)
  console.log('blogDelete - _id ', blog._id)
  console.log('blogDelete - -----------')
  */
  return async (dispatch) => {
    await blogService.remove(blog._id)
    dispatch({
      type: 'DELETE',
      data: {
        id: blog._id
      }
    })
  }
}

export const blogLike = (blog) => {
  /*
  console.log('blogLike - -----------')
  console.log('blogLike - id ', blog.id)
  console.log('blogLike - _id ', blog._id)
  console.log('blogLike - likes ', blog.likes)
  console.log('blogLike - user ', blog.user)
  console.log('blogLike - author ', blog.author)
  console.log('blogLike - title ', blog.title)
  console.log('blogLike - url ', blog.url)
  console.log('blogLike - -----------')
  */
  return async (dispatch) => {
    const uusiLike = blog.likes + 1
    const updatedBlog = {
      id: blog._id,
      user: blog.user,
      likes: uusiLike,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogService.update(blog._id, updatedBlog)
    dispatch({
      type: 'LIKE',
      data: {
        id: blog.id
      }
    })
  }
}

export default blogReducer