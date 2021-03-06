import blogService from './../services/blogs'

const blogReducer = (store = [], action) => {

  switch (action.type) {
  case 'LIKE_BLOG': {
    const old = store.filter(a => a._id !== action.data.id)
    const liked = store.find(a => a._id === action.data.id)

    return [...old, { ...liked, likes: liked.likes + 1 } ]
  }
  case 'COMMENT_BLOG': {
    const old = store.filter(a => a._id !== action.data.blogi)
    const commented = store.find(a => a._id === action.data.blogi)
    const kommentoitu = commented.comment.concat(action.data)

    return [...old, { ...commented, comment: kommentoitu } ]
  }
  case 'CREATE_BLOG':
    return [...store, action.data]
  case 'DELETE_BLOG': {
    const old = store.filter(a => a._id !== action.data.id)
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
      type: 'CREATE_BLOG',
      data: newBlog
    })
  }
}

export const blogDelete = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog._id)
    dispatch({
      type: 'DELETE_BLOG',
      data: {
        id: blog._id
      }
    })
  }
}

export const blogLike = (blog) => {
  return async (dispatch) => {
    const uusiLike = blog.likes + 1
    const updatedBlog = {
      id: blog._id,
      user: blog.user,
      likes: uusiLike,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comment: blog.comment
    }
    await blogService.update(blog._id, updatedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: {
        id: blog._id
      }
    })
  }
}

export const blogComment = (blog, kommentti) => {
  return async (dispatch) => {
    const newComment = {
      blogi: blog._id,
      comment: kommentti
    }
    const uusiCommentti = await blogService.updateComment(blog._id, newComment)
    dispatch({
      type: 'COMMENT_BLOG',
      data: uusiCommentti
    })
  }
}

export default blogReducer