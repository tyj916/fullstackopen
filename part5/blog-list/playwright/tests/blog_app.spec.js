const { test, describe, beforeEach, expect } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
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
      await loginWith(page, 'root', 'Sekret')

      await expect(page.getByText('Blogs')).toBeVisible()
      await expect(page.getByText('Superuser logged in')).toBeVisible()
    })

    test('login failed with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrong')

      await expect(page.getByText('Wrong credentials')).toBeVisible()
      await expect(page.getByText('Blogs')).not.toBeVisible()
    })
  })
})
