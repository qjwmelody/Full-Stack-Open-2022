const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require("bcrypt");

const app = require('../app')
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require('jsonwebtoken')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({});
    let blog = new Blog(initialBlogs[0]);
    await blog.save();
    blog = new Blog(initialBlogs[1]);
    await blog.save();
  
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash: passwordHash });
    await user.save();
});


test('the return number of blogs should be right', async() => {
    const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(4)

})

test('id is deifned right', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('posting a blog', async() => {
    const myLogin = {
        username: "test1",
        password: "huo",
    }
    const login = await api.post("/api/login").send(myLogin)

    const initialLength = (await api.get('/api/blogs')).body.length
    const newBlog = {
        "title": "test5",
        "author": "Author4",
        "url": "url4",
        "likes": 19
    } 

    await api.post('/api/blogs').set('Authorization',`bearer ${login.body.token}`).send(newBlog)
    
    const addedLength = await api.get('/api/blogs')
    expect(addedLength.body).toHaveLength(initialLength + 1)
})

test('deleting the blog', async() => {
    const allBlogs = (await api.get('/api/blogs')).body
    await api.delete(`/api/blogs/${allBlogs[0].id}`).expect(204)
})


test('updating the blog', async() => {
    const allBlogs = (await api.get('/api/blogs')).body
    const newBlog = {
        "title": "test9",
        "author": "Author9",
        "url": "url9",
        "likes": 9
    }
    await api.put(`/api/blogs/${allBlogs[0].id}`).send(newBlog).expect(200)
})

test('addition without likes', async()=>{
    let added = {}
    const newBlog = {
        title: "test4",
        author: "Author3",
        url: "url3"
    }

    await api.post('/api/blogs').send(newBlog)

    const allBlogs = (await api.get('/api/blogs')).body
    allBlogs.forEach(value => {
        if (value.title === newBlog.title){
            added = value
        }
    })
    console.log(added.likes)
    expect(added.likes).toBe(0)
})

test('token does not exist, return 401', async() =>{
    const newBlog = {
        "title": "test7",
        "author": "Author7",
        "url": "url7",
        "likes": 14
    } 
    await api.post('/api/blogs').set('Authorization','').send(newBlog).expect(401)
})

test('title or author missing, return 404', async() => {
    const missingBlog = {
        "author": "Author10",
        "likes": 2
    }
    await api.post('/api/blogs').send(missingBlog).expect(400)
})


afterAll(() => {
    mongoose.connection.close()
})