const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);

  return sum;
}

const favoriteBlog = (blogs) => {
  const mostLikedBlog = blogs.reduce((max, current) => {
    return current.likes > max.likes ? current : max;
  }, blogs[0]);

  return mostLikedBlog;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}