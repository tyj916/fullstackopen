const { test, describe, beforeEach, expect } = require('@playwright/test')
const { initialBlogs, loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Playwright Test User',
        username: 'playwright',
        password: 'playwright'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByText('Login').click()
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()
  })

  describe.only('Login', () => {
    test('User can login', async ({ page }) => {
      await loginWith(page, 'playwright', 'playwright')

      await expect(page.getByRole('heading', { name: 'Blogs' })).toBeVisible()
      await expect(page.getByText('Logout')).toBeVisible()
    })

    test('login failed with wrong credentials', async ({ page }) => {
      await loginWith(page, 'playwright', 'wrong')

      await expect(page.getByText('Wrong credentials')).toBeVisible()
      await expect(page.getByText('Blogs')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'playwright', 'playwright')
    })

    test('a new blog can be created', async ({ page }) => {
      const title = 'Playwright blog'
      const author = 'Playwright'
      const url = 'http://localhost:5173'

      await createBlog(page, title, author, url)
      await expect(page.getByText(`${title} ${author}`)).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Playwright blog', 'Playwright', 'http://localhost:5173')
      })

      test('user can view blog details', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('http://localhost:5173')).toBeVisible()
        await expect(page.getByText(/Likes:/)).toBeVisible()
        await expect(page.getByText('Playwright Test User', { exact: true })).toBeVisible()
      })

      test('user can like the blog', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('Likes: 1')).toBeVisible()
      })

      test('user added the blog can delete the blog', async ({ page }) => {
        // handle window.confirm()
        page.on('dialog', dialog => dialog.accept())

        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'Remove' }).click()
        await expect(page.getByText('Playwright blog Playwright')).not.toBeVisible()
      })

      test('only the user who added the blog sees the blog delete button', async ({ page, request }) => {
        // current user who added the blog can see the remove button
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible()

        // log current user out
        await page.getByRole('button', { name: 'Logout' }).click()

        // create new user
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Playwright User 2',
            username: 'playwright2',
            password: 'playwright2'
          }
        })

        // login as new user
        await loginWith(page, 'playwright2', 'playwright2')

        // cannot see the Remove button
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
      })
    })

    describe('and multiple blogs exists', () => {
      beforeEach(async ({ page }) => {
        for (const blog of initialBlogs) {
          await createBlog(page, blog.title, blog.author, blog.url)
        }
      })

      test('blogs can be viewed', async ({ page }) => {
        const blogs = await page.locator('.blog').all()
        expect(blogs).toHaveLength(4)
      })

      test('blogs are sorted by likes count', async ({ page }) => {
        // 1 like for 'First blog'
        await likeBlog(page, 'First blog')

        // 2 likes for 'Second blog'
        await likeBlog(page, 'Second blog')
        await likeBlog(page, 'Second blog')

        // 3 likes for 'Blog with most likes'
        await likeBlog(page, 'Blog with most likes')
        await likeBlog(page, 'Blog with most likes')
        await likeBlog(page, 'Blog with most likes')
        
        // expect blogs are sorted by likes count
        // 'Blog with most likes' > 'Second blog' > 'First blog' > 'Blog without likes'
        const blogs = page.locator('.blog')
        await expect(blogs.nth(0)).toHaveText(/Blog with most likes/)
        await expect(blogs.nth(1)).toHaveText(/Second blog/)
        await expect(blogs.nth(2)).toHaveText(/First blog/)
        await expect(blogs.nth(3)).toHaveText(/Blog without likes/)
      })
    })
  })
})
