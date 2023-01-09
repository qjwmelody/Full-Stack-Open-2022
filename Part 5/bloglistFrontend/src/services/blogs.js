import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log('create run')
  return response.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const update = (blogId, newTargetBlog) => {
  const request = axios.put(`${baseUrl}/${blogId}`, newTargetBlog)
  return request.then(response => response.data)
}

const deleteBlog = (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${blogId}`, config)
  return request.then(response => response.data)
}

export default { getAll, create, setToken, update, deleteBlog}