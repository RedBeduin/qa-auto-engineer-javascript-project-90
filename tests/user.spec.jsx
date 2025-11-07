import { test, expect } from "@playwright/test";
import textVault from '../__fixtures__/text-vault.jsx'
import { LoginPage } from "./pages/login-page.jsx";
import { PersonAccPage } from "./pages/person-acc-page.jsx";
import { UsersPage } from "./pages/user-page.jsx";
import users from '../__fixtures__/users.jsx'

test('application display', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.navigateToLoginPage()
  await expect(page.locator(`input[name="username"]`)).toBeVisible()
  await expect(page.locator(`input[name="password"]`)).toBeVisible()
  await expect(page.locator('text="Sign in"')).toBeVisible()
})

test("login", async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await expect('text="Welcome to the administration"').toBeVisible()
  await expect('text="Lorem ipsum sic dolor amet..."').toBeVisible()
})

test("negative - login", async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login('', '')
  await expect(page.locator(`text="${textVault.errorTextLoginPage}"`)).toBeVisible()
  await loginPage.loginWithoutUsername(textVault.password)
  await expect(page.locator(`text="${textVault.errorTextLoginPage}"`)).toBeVisible()
  await loginPage.loginWithoutPassword(textVault.username)
  await expect(page.locator(`text="${textVault.errorTextLoginPage}"`)).toBeVisible()
})

test("logout", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await expect('text="Welcome to the administration"').toBeVisible()
  await expect(page.locator(`text="Lorem ipsum sic dolor amet..."`)).toBeVisible()
  await personAccPage.logOut()
  await expect(page.locator(`input[name="username"]`)).toBeVisible()
  await expect(page.locator(`input[name="password"]`)).toBeVisible()
  await expect(page.locator(`text="Sign in"`)).toBeVisible()
})

test("create user", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const usersPage = new UsersPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await usersPage.navigateToUsersPage()
  await usersPage.createUser('email@gmail.com', textVault.userFirstName, textVault.userLastName)
  await expect(page.locator(`text="Element created"`)).toBeVisible()
  await expect(page.locator(`text="email@gmail.com"`)).toBeVisible() 
  await expect(page.locator(`text="${textVault.userFirstName}"`)).toBeVisible()
  await expect(page.locator(`text="${textVault.userLastName}"`)).toBeVisible()
  await expect(page.locator(`[aria-label="Show"]`)).toBeVisible()
  await expect(page.locator(`[disabled][aria-label="Save"]`)).toBeVisible()
  await expect(page.locator(`[aria-label="Delete"]`)).toBeVisible()
  await usersPage.clickShowButton()
  await expect(page.locator(`text="email@gmail.com"`)).toBeVisible()
  await expect(page.locator(`text="${textVault.userFirstName}"`)).toBeVisible()
  await expect(page.locator(`text="${textVault.userLastName}"`)).toBeVisible()
  await expect(page.locator(`[aria-label="Edit"]`)).toBeVisible()
  await usersPage.navigateToUsersPage()  
  await expect(page.locator(`text="email@gmail.com"`)).toBeVisible()
  await expect(page.locator(`text="${textVault.userFirstName}"`)).toBeVisible()
  await expect(page.locator(`text="${textVault.userLastName}"`)).toBeVisible() 
})

test("user list", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const usersPage = new UsersPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await usersPage.navigateToUsersPage()
  for(const user of users)
  {
    await expect(page.locator(`text="${user.Email}"`)).toBeVisible()
    await expect(page.locator(`text="${user.FirstName}"`)).toBeVisible()
    await expect(page.locator(`text="${user.LastName}"`)).toBeVisible()
  }
})

test("editing form", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const usersPage = new UsersPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await usersPage.navigateToUsersPage()
  await usersPage.openUserData('john@google.com')
  await expect(page.locator(`text="${users[0].Email}"`)).toBeVisible()
  await expect(page.locator(`text="${users[0].FirstName}"`)).toBeVisible()
  await expect(page.locator(`text="${users[0].LastName}"`)).toBeVisible()
  await expect(page.locator(`[aria-label="Show"]`)).toBeVisible()
  await expect(page.locator(`[disabled][aria-labels="Save"]`)).toBeVisible()
  await expect(page.locator(`[aria-label="Delete"]`)).toBeVisible()
})

test("edit user", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const usersPage = new UsersPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await usersPage.navigateToUsersPage()
  await usersPage.editUser('john@google.com', 'ChangedFirstName')
  await usersPage.navigateToUsersPage()
  await expect(page.locator(`text="${users[0].Email}"`)).toBeVisible()
  await expect(page.locator(`text="ChangedFirstName"`)).toBeVisible()
  await expect(page.locator(`text="${users[0].LastName}"`)).toBeVisible()
  await expect(page.locator(`text="${users[0].FirstName}"`)).not.toBeVisible()  
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
  await expect(page.locator(`text="useremail@gmail.com"`)).toBeVisible()
  await expect(page.locator(`text="ChangedFirstName"`)).toBeVisible()
  await expect(page.locator(`text="${textVault.userLastName}"`)).toBeVisible()
  await expect(page.locator(`text="${textVault.userFirstName}"`)).not.toBeVisible() 
})

test("negative - edit user", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const usersPage = new UsersPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await usersPage.navigateToUsersPage()
  await usersPage.editUser('john@google.com', '')
  await expect(page.locator(`text="${textVault.errorTextLoginPage}"`)).toBeVisible()
})

test("delete user", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const usersPage = new UsersPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await usersPage.navigateToUsersPage()
  await usersPage.deleteUser('john@google.com')
  await usersPage.navigateToUsersPage()
  await expect(page.locator(`text="${users[0].Email}"`)).not.toBeVisible()
  await expect(page.locator(`text="${users[0].FirstName}"`)).not.toBeVisible()
  await expect(page.locator(`text="${users[0].LastName}"`)).not.toBeVisible()
})

test("delete all user", async ({ page }) => {
  const loginPage = new LoginPage(page)
  const usersPage = new UsersPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await usersPage.navigateToUsersPage()
  await usersPage.deleteAllUsers()
  await usersPage.navigateToUsersPage()
  await expect(page.locator(`text="No Users yet."`)).toBeVisible()
})
