import { test, expect } from "@playwright/test";
import textVault from '../__fixtures__/text-vault.js'
import { LoginPage } from "./pages/login-page.jsx";
import { PersonAccPage } from "./pages/person-acc-page.jsx";
import { UsersPage } from "./pages/user-page.jsx";
import users from '../__fixtures__/users.js'

test.describe('application display test', () => {
  test('application display', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await expect(page.getByLabel('Username *')).toBeVisible()
    await expect(page.getByLabel('Password *')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
  })
})

test.describe('testing of the login function', () => {
  test("login", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
    await expect(page.getByText(textVault.welcomeText)).toBeVisible()
    await expect(page.getByText(textVault.additionalWelcomeText)).toBeVisible()
  })

  test("negative - login without username and password", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login('', '')
    await loginPage.waitForSelector(`text="${textVault.errorTextLoginPage}"`)
    await expect(page.getByText(textVault.errorTextLoginPage)).toBeVisible()
  })

  test("negative - login without username", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.loginWithoutUsername(textVault.password)
    await loginPage.waitForSelector(`text="${textVault.errorTextLoginPage}"`)
    await expect(page.getByText(textVault.errorTextLoginPage)).toBeVisible()
  })

  test("negative - login without password", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.loginWithoutPassword(textVault.username)
    await loginPage.waitForSelector(`text="${textVault.errorTextLoginPage}"`)
    await expect(page.getByText(textVault.errorTextLoginPage)).toBeVisible() 
  })
})

test.describe('testing of the logout function', () => {
  test.beforeEach(async({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
  })
  
  test("logout", async ({ page }) => {
    const personAccPage = new PersonAccPage(page)
    await expect(page.getByText(textVault.welcomeText)).toBeVisible()
    await expect(page.getByText(textVault.additionalWelcomeText)).toBeVisible()
    await personAccPage.logOut()
    await expect(page.getByLabel('Username *')).toBeVisible()
    await expect(page.getByLabel('Password *')).toBeVisible()
    await expect(page.getByRole('button', { name: "Sign in" })).toBeVisible()
  })
})


test.describe('testing of the users section', () => {
  test.beforeEach(async({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
  })

  test("create user", async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.navigateToUsersPage()
    await usersPage.createUser(textVault.userEmail, textVault.userFirstName, textVault.userLastName)
    await expect(page.getByText(textVault.userPageElementCreatedMessage)).toBeVisible()
    await expect(page.locator(`input[value="${textVault.userEmail}"]`)).toBeVisible() 
    await expect(page.locator(`input[value="${textVault.userFirstName}"]`)).toBeVisible()
    await expect(page.locator(`input[value="${textVault.userLastName}"]`)).toBeVisible()
    await expect(page.getByLabel("Show")).toBeVisible()
    await expect(page.locator(`[disabled][aria-label="Save"]`)).toBeVisible()
    await expect(page.getByLabel("Delete")).toBeVisible()
    await usersPage.clickShowButton()
    await expect(page.getByText(textVault.userEmail, { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.userFirstName, { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.userLastName, { exact: true })).toBeVisible()
    await expect(page.getByLabel("Edit")).toBeVisible()
    await usersPage.navigateToUsersPage()  
    await expect(page.getByText(textVault.userEmail, { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.userFirstName, { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.userLastName, { exact: true })).toBeVisible() 
  })

  test("user list", async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.navigateToUsersPage()
    for(const user of users)
    {
      await expect(page.getByText(user.Email, { exact: true })).toBeVisible()
      await expect(page.getByText(user.FirstName, { exact: true })).toBeVisible()
      await expect(page.getByText(user.LastName, { exact: true })).toBeVisible()
    }
  })

  test("editing form", async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.navigateToUsersPage()
    await usersPage.openUserData(textVault.firstUserEmail)
    await expect(page.locator(`input[value="${users[0].Email}"]`)).toBeVisible()
    await expect(page.locator(`input[value="${users[0].FirstName}"]`)).toBeVisible()
    await expect(page.locator(`input[value="${users[0].LastName}"]`)).toBeVisible()
    await expect(page.getByLabel("Show")).toBeVisible()
    await expect(page.locator(`[disabled][aria-label="Save"]`)).toBeVisible()
    await expect(page.getByLabel("Delete")).toBeVisible()
  })

  test("edit user", async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.navigateToUsersPage()
    await usersPage.editUser(textVault.firstUserEmail, textVault.changedUserFirstName)
    await usersPage.navigateToUsersPage()
    await expect(page.getByText(users[0].Email, { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.changedUserFirstName, { exact: true })).toBeVisible()
    await expect(page.getByText(users[0].LastName, { exact: true })).toBeVisible()
    await expect(page.getByText(users[0].FirstName, { exact: true })).not.toBeVisible()  
  })

  test("edit user from create form", async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.navigateToUsersPage()
    await usersPage.createUser(textVault.userEmail, textVault.userFirstName, textVault.userLastName)
    await usersPage.clickShowButton()
    await usersPage.editUserClickingEditButton(textVault.changedUserFirstName)
    await usersPage.navigateToUsersPage()
    await expect(page.getByText(textVault.userEmail, { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.changedUserFirstName, { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.userLastName, { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.userFirstName, { exact: true })).not.toBeVisible() 
  })

  test("negative - edit user", async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.navigateToUsersPage()
    await usersPage.editUser(textVault.firstUserEmail, '')
    await expect(page.getByText(textVault.errorTextLoginPage, { exact: true })).toBeVisible()
  })

  test("delete user", async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.navigateToUsersPage()
    await usersPage.deleteUser(textVault.firstUserEmail)
    await usersPage.navigateToUsersPage()
    await expect(page.getByText(users[0].Email, { exact: true })).not.toBeVisible()
    await expect(page.getByText(users[0].FirstName, { exact: true })).not.toBeVisible()
    await expect(page.getByText(users[0].LastName, { exact: true })).not.toBeVisible()
  })

  test("delete all user", async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.navigateToUsersPage()
    await usersPage.deleteAllUsers()
    await usersPage.navigateToUsersPage()
    await expect(page.getByText(textVault.noUsersText)).toBeVisible()
  })
})
