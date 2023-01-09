import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Create = ({blogs, setBlogs}) => {
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleCreate = async (event) => {
    event.preventDefault()
    setBlogs(blogs)
    try {
        blogService.create({title, author, url,})
        let Blogs = blogs.concat(createBlog)
        setBlogs(Blogs)
        setTitle('')
        setAuthor('')
        setUrl('')
        setSuccessMessage(`a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`)
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage('Failed')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  return(
    <div>
      <h2>{successMessage}</h2>
      <h2>{errorMessage}</h2>
      <form onSubmit={handleCreate}>
        <div>
          title: 
            <input 
            type="text" 
            value={title} 
            id='title' 
            name="title"
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: 
            <input 
            type="author" 
            value={author} 
            id='author' 
            name="author"
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
            <input 
            type="url" 
            value={url} 
            id='url' 
            name="url"
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit" id="creatButton">Create</button>
      </form>
    </div>
  )
}

export default Create