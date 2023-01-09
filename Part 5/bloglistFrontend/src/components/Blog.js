import React, { useState, useEffect } from 'react'
const [blogDetailVisible, setBlogDetailVisible] = useState(false)

const Blog = ({blog, logedUsername, handleDelete, handlelike}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2.5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = () =>{
    if(blog.author === logedUsername){
      return(
        <div>
          <button onClick={()=>handleDelete(blog.id)} id='deleteButton'>delete</button>
        </div>
      )
    }
  }

  if(blogDetailVisible)
  {
    return(
      <div style={blogStyle}>
        <div>{blog.title}<button onClick={()=>setBlogDetailVisible(false)}>hide</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes}<button onClick={()=>handlelike(blog.id)} id='likeButton'>like</button></div>
        <div>{blog.author}</div>
        {deleteBlog()}
      </div> 
      )
  }else{
    return(
      <div style={blogStyle} className='displayBlog'>
        <div>{blog.title}</div>
        <div>{blog.author}</div>
        <button onClick={()=>setBlogDetailVisible(true)} id='viewButton'>view</button>
      </div> 
    )
  }
}
export default Blog