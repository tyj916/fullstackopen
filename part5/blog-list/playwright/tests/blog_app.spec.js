const { test, describe, beforeEach, expect } = require('@playwright/test')
const { loginWith } = require('./helper')

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
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()
  })

  describe('Login', () => {
    test('User can login', async ({ page }) => {
      await loginWith(page, 'playwright', 'playwright')

      await expect(page.getByText('Blogs')).toBeVisible()
      await expect(page.getByText('Playwright Test User logged in')).toBeVisible()
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

      await page.getByRole('button', { name: 'New blog' }).click()
      await page.getByRole('textbox', { name: 'title' }).fill(title)
      await page.getByRole('textbox', { name: 'author' }).fill(author)
      await page.getByRole('textbox', { name: 'url' }).fill(url)
      await page.getByRole('button', { name: 'Create' }).click()
      await expect(page.getByText(`${title} ${author}`)).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        const title = 'Playwright blog'
        const author = 'Playwright'
        const url = 'http://localhost:5173'

        await page.getByRole('button', { name: 'New blog' }).click()
        await page.getByRole('textbox', { name: 'title' }).fill(title)
        await page.getByRole('textbox', { name: 'author' }).fill(author)
        await page.getByRole('textbox', { name: 'url' }).fill(url)
        await page.getByRole('button', { name: 'Create' }).click()
      })

      test('user can view blog details', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('http://localhost:5173')).toBeVisible()
        await expect(page.getByText(/Likes:/)).toBeVisible()
        await expect(page.getByText('Playwright Test User', { exact: true })).toBeVisible()
      })
    })
  })
})
