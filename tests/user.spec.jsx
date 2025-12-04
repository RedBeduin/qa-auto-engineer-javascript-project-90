import { test, expect, describe } from "@playwright/test";
import textVault from '../__fixtures__/text-vault.jsx'
import { LoginPage } from "./pages/login-page.jsx";
import { PersonAccPage } from "./pages/person-acc-page.jsx";
import { UsersPage } from "./pages/user-page.jsx";
import users from '../__fixtures__/users.jsx'

describe('application display test', () => {
  test('application display', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await expect(page.getByLabel('Username *')).toBeVisible()
    await expect(page.getByLabel('Password *')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
  })
})

describe('testing of the login function', () => {
  test("login", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
    await expect(page.getByText("Welcome to the administration")).toBeVisible()
    await expect(page.getByText("Lorem ipsum sic dolor amet...")).toBeVisible()
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

describe('testing of the logout function', () => {
  beforeEach(async() => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
  })
  
  test("logout", async ({ page }) => {
    const personAccPage = new PersonAccPage(page)
    await expect(page.getByText('Welcome to the administration')).toBeVisible()
    await expect(page.getByText('Lorem ipsum sic dolor amet...')).toBeVisible()
    await personAccPage.logOut()
    await expect(page.getByLabel('Username *')).toBeVisible()
    await expect(page.getByLabel('Password *')).toBeVisible()
    await expect(page.getByRole('button', { name: "Sign in" })).toBeVisible()
  })
})


describe('testing of the users section', () => {
  beforeEach(async() => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
  })

  test("create user", async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.navigateToUsersPage()
    await usersPage.createUser('email@gmail.com', textVault.userFirstName, textVault.userLastName)
    await expect(page.getByText("Element created")).toBeVisible()
    await expect(page.locator(`input[value="email@gmail.com"]`)).toBeVisible() 
    await expect(page.locator(`input[value="${textVault.userFirstName}"]`)).toBeVisible()
    await expect(page.locator(`input[value="${textVault.userLastName}"]`)).toBeVisible()
    await expect(page.getByLabel("Show")).toBeVisible()
    await expect(page.locator(`[disabled][aria-label="Save"]`)).toBeVisible()
    await expect(page.getByLabel("Delete")).toBeVisible()
    await usersPage.clickShowButton()
    await expect(page.getByText("email@gmail.com", { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.userFirstName, { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.userLastName, { exact: true })).toBeVisible()
    await expect(page.getByLabel("Edit")).toBeVisible()
    await usersPage.navigateToUsersPage()  
    await expect(page.getByText("email@gmail.com", { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.userFirstName, { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.userLastName, { exact: true })).toBeVisible() 
  })

  test("user list", async ({ page }) => {
    const loginPage = new LoginPage(page)
    const usersPage = new UsersPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
    await usersPage.navigateToUsersPage()
    for(const user of users)
    {
      await expect(page.getByText(user.Email, { exact: true })).toBeVisible()
      await expect(page.getByText(user.FirstName, { exact: true })).toBeVisible()
      await expect(page.getByText(user.LastName, { exact: true })).toBeVisible()
    }
  })

  test("editing form", async ({ page }) => {
    const loginPage = new LoginPage(page)
    const usersPage = new UsersPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
    await usersPage.navigateToUsersPage()
    await usersPage.openUserData('john@google.com')
    await expect(page.locator(`input[value="${users[0].Email}"]`)).toBeVisible()
    await expect(page.locator(`input[value="${users[0].FirstName}"]`)).toBeVisible()
    await expect(page.locator(`input[value="${users[0].LastName}"]`)).toBeVisible()
    await expect(page.getByLabel("Show")).toBeVisible()
    await expect(page.locator(`[disabled][aria-label="Save"]`)).toBeVisible()
    await expect(page.getByLabel("Delete")).toBeVisible()
  })

  test("edit user", async ({ page }) => {
    const loginPage = new LoginPage(page)
    const usersPage = new UsersPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
    await usersPage.navigateToUsersPage()
    await usersPage.editUser('john@google.com', 'ChangedFirstName')
    await usersPage.navigateToUsersPage()
    await expect(page.getByText(users[0].Email, { exact: true })).toBeVisible()
    await expect(page.getByText("ChangedFirstName", { exact: true })).toBeVisible()
    await expect(page.getByText(users[0].LastName, { exact: true })).toBeVisible()
    await expect(page.getByText(users[0].FirstName, { exact: true })).not.toBeVisible()  
  })

  test("edit user from create form", async ({ page }) => {
    const loginPage = new LoginPage(page)
    const usersPage = new UsersPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
    await usersPage.navigateToUsersPage()
    await usersPage.createUser('useremail@gmail.com', textVault.userFirstName, textVault.userLastName)
    await usersPage.clickShowButton()
    await usersPage.editUserClickingEditButton('ChangedFirstName')
    await usersPage.navigateToUsersPage()
    await expect(page.getByText("useremail@gmail.com", { exact: true })).toBeVisible()
    await expect(page.getByText("ChangedFirstName", { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.userLastName, { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.userFirstName, { exact: true })).not.toBeVisible() 
  })

  test("negative - edit user", async ({ page }) => {
    const loginPage = new LoginPage(page)
    const usersPage = new UsersPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
    await usersPage.navigateToUsersPage()
    await usersPage.editUser('john@google.com', '')
    await expect(page.getByText(textVault.errorTextLoginPage, { exact: true })).toBeVisible()
  })

  test("delete user", async ({ page }) => {
    const loginPage = new LoginPage(page)
    const usersPage = new UsersPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
    await usersPage.navigateToUsersPage()
    await usersPage.deleteUser('john@google.com')
    await usersPage.navigateToUsersPage()
    await expect(page.getByText(users[0].Email, { exact: true })).not.toBeVisible()
    await expect(page.getByText(users[0].FirstName, { exact: true })).not.toBeVisible()
    await expect(page.getByText(users[0].LastName, { exact: true })).not.toBeVisible()
  })

  test("delete all user", async ({ page }) => {
    const loginPage = new LoginPage(page)
    const usersPage = new UsersPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
    await usersPage.navigateToUsersPage()
    await usersPage.deleteAllUsers()
    await usersPage.navigateToUsersPage()
    await expect(page.getByText("No Users yet.")).toBeVisible()
  })
})
