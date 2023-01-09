import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from '.components/Notifcation'
import Login from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from '../services/login'
import Create from './components/Createblog'
const [createVisible, setCreateVisible] = useState(false)

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [logedUser, setLogedUser] = useState([])
  const [logoutinfo, setLogoutinfo] = useState('') 
  const [user, setUser] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => { 
    const getBlogs = async () => {
      const blogs = await blogService.getAllBlogs()
      sortByLikes(blogs)
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      setLogedUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
}

  const handleCreateBlog  = () =>{
    const hideWhenVisible = {display: createVisible ? 'none' : ''}
    const showWhenVisible = {display: createVisible ? '' : 'none'}
    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={()=>setCreateVisible(true)} id='createNewBlogButton'>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <Create blogs={blogs} setBlogs={setBlogs}/>
          <button onClick={()=>setCreateVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleDelete = (blogId) =>{
    const blog = blogs.find(blog => blog.id === blogId)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      blogService.deleteBlog(blogId)
      const tempBlogs = [...blogs]
        tempBlogs.splice(blogs.findIndex((x) => x.id === blog.id),1)
        setBlogs(tempBlogs)
    }
  }

  const handleLike = (blogId) => {
    const targetBlog = blogs.find(blog => blog.id === blogId)
    const newTarget = {...targetBlog, likes: targetBlog.likes+1}
    blogService.update(blogId, newTarget)
    setBlogs(blogs.map(blog => blog.id !== blogId ? blog : newTarget))
  }

  return (
    <div>
      <Notification message={message} />
      if(user === null){
        <div>
          <h2>Log in to application</h2>
          <Login handleLogin={handleLogin} username={username} password={password}/>
        </div>
      }
      <div>{username} logged in 
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog" buttonLabel1="cancel">{handleCreateBlog()}</Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} 
          handleLike={handleLike} logedUserName={logedUser.name} handleDelete={handleDelete} />
      )}
      
    </div>
  )
}

export default App
