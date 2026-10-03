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
  if (!blogs || blogs.length === 0) return null;

  const mostLikedBlog = blogs.reduce((max, current) => {
    return current.likes > max.likes ? current : max;
  }, blogs[0]);

  return mostLikedBlog;
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null;

  const counts = Object.create(null);
  let mostBlogsAuthor = null;
  let maxCount = 0;

  for (const blog of blogs) {
    const author = blog.author;

    counts[author] = (counts[author] || 0) + 1;
  
    if (counts[author] > maxCount) {
      maxCount = counts[author];
      mostBlogsAuthor = author;
    }
  }

  return mostBlogsAuthor;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}