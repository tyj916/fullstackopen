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

  const authorList = [];
  let mostBlogsAuthorIndex = 0;

  blogs.forEach(blog => {
    const authorIndex = authorList.findIndex((author) => author.name === blog.author);

    if (authorIndex === -1) {
      authorList.push({
        name: blog.author,
        count: 1,
      });
    } else {
      authorList[authorIndex].count++;

      if (authorList[authorIndex].count > mostBlogsAuthorIndex) {
        mostBlogsAuthorIndex = authorIndex;
      } 
    }
  });

  return authorList[mostBlogsAuthorIndex].name;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}