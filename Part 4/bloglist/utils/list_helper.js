const dummy = (blogs) => {
    return 1
}

const totallikes = (array) => {
    let sum = 0
    array.forEach(element => {
        sum = sum + element.likes
    })
    return sum
}
const favoriteBlog = (array) => {
    let max = 0
    let maxIndex = 0
    array.forEach((element,index) => {
        if (element.likes > max){
            max = element.likes
            maxIndex = index
        }
    })
    return({
      title: array[maxIndex].title,
      author: array[maxIndex].author,
      likes: array[maxIndex].likes
    })
}

const authorBlogs = (array, string) => {
    if(array.length == 1 && array[0].author != string){
        return 0
    }
    if(array.length == 1 && array[0].author === string){
        return 1
    }
    if(array[0].author != string){
        return 0 + authorBlogs(array.slice(1), string)
    }else{
        return 1 + authorBlogs(array.slice(1), string)
    }
}

const authorLikes = (array, string) => {
    if(array.length == 1 && array[0].author != string){
        return 0
    }
    if(array.length == 1 && array[0].author === string){
        return array[0].likes
    }
    if(array[0].author === string){
        return array[0].likes + authorLikes(array.slice(1), string)
    }else{
        return 0 + authorLikes(array.slice(1), string)
    }
}

const mostBlogsAuthor  = (array) => {
    let maxBlogNum = 0
    let maxIndex = 0
    array.forEach((element, index) => {
      let blognum = authorBlogs(array, element.author)
      if(blognum > maxBlogNum){
        maxIndex = index
        maxBlogNum = blognum
      }
    })

    return({
        author: array[maxIndex].author,
        blogs: maxBlogNum
    })
}

const favoriteAuthor = (array) => {
    let maxLikeNum = 0
    let maxIndex = 0
    array.forEach((element, index) => {
      let likenum = authorLikes(array, element.author)
      if(likenum > maxLikeNum){
        maxIndex = index
        maxLikeNum = likenum
      }
    })

    return({
        author: array[maxIndex].author,
        likes: maxLikeNum
    })
}

module.exports = {
    dummy,
    totallikes,
    favoriteBlog,
    mostBlogsAuthor,
    favoriteAuthor
}