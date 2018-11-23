import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const config = () => {
  return {
    headers: { 'Authorization': token }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  console.log('createtaan... >')
  console.log('createtaan... newObject >', newObject)
  console.log('createtaan... baseUrl >', baseUrl)
  console.log('createtaan... token >', token)
  const response = await axios.post(baseUrl, newObject, config())
  console.log('createtaan... response', response)
  console.log('createtaan... <')
  return response.data
}

const update = (id, newObject) => {
  console.log('updatetaan... >')
  console.log('updatetaan... newObject >', newObject)
  console.log('updatetaan... baseUrl >', baseUrl)
  console.log('updatetaan... id >', id)
  const request = axios.put(`${baseUrl}/${id}`, newObject, config())
  console.log('updatetaan... <')
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, config())
  return request.then(response => response.data)
}

export default { getAll, getOne, create, update, remove, setToken }