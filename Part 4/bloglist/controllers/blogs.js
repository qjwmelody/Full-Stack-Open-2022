const blogsRouter = require("express").Router();
const jwt = require('jsonwebtoken')
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({}).populate("user", "-blogs -passwordHash");
  return response.status(200).json(blogs).end();
});


blogsRouter.post("/", async (request, response) => {
  const body = request.body
  if(!request.token){
    return response.status(401).json({error: 'Unauthorized'})
  }
  if (!body["title"] || !body["url"]) {
    response.sendStatus(400);
    return;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  // const user = await User.findById(decodedToken.id)
  const user = await request.user

  const savedBlog = await blog.save();

  user["blogs"] = user["blogs"].concat(savedBlog);
  await user.save();

  return response.status(201).json(blog).end();
});

blogsRouter.delete('/blogs/:id', async (request, response, next) =>{
  const user = await request.user

  const blog = await Blog.findById(request.params.id)
  if(!blog){
    response.status(403).json({ error: 'The user does not have any blog' })
  }
  if (blog.user.toString() === user.id.toString()) {
    blog.remove()
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'You are not authorized' })
  }
})

blogsRouter.put('/blogs/:id', async (request, response) => {
  const body = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { returnDocument: "after" });
  return response.status(200).json(updatedBlog.end())
})

module.exports = blogsRouter;