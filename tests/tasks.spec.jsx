import { test, expect } from '@playwright/test'
import textVault from '../__fixtures__/text-vault.jsx'
import { LoginPage } from './pages/login-page.jsx'
import { TasksPage } from './pages/tasks-page.jsx'
import tasks from '../__fixtures__/tasks.jsx'

test('create tasks', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await tasksPage.navigateToTasksPage()
  await tasksPage.createTask('john@google.com', 'Title', 'Content', 'Published', 'critical')
  await tasksPage.navigateToTasksPage()
  await expect(this.page.locator(`text="Title"`)).toBeVisible()
  await expect(this.page.locator(`text="Content"`)).toBeVisible()
}); 


test('tasks list', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await tasksPage.navigateToTasksPage()
  for(const task of tasks) {
    await expect(this.page.locator(`text="${task.name}"`)).toBeVisible()
  }  
})  

test('menu of edition of task', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await tasksPage.navigateToTasksPage()
  await tasksPage.showTask('1')
  await expect(this.page.locator(`combobox[name="Assignee"]`)).toBeVisible()
  await expect(this.page.locator(`input[name="Title"]`)).toBeVisbile()
  await expect(this.page.locator(`input[name="Content"]`)).toBeVisible()
  await expect(this.page.locator(`combobox[name="Status"]`)).toBeVisible()
  await expect(this.page.locator(`combobox[name="Label"]`)).toBeVisible()
  await expect(this.page.locator(`[disabled][aria-label="Save"]`)).toBeVisible()
  await expect(this.page.locator(`[aria-label="Delete"]`)).toBeVisible()
})

test('edit tasks', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await tasksPage.navigateToTasksPage()
  await tasksPage.changeTaskName('1', 'ChangedTitle')
  await tasksPage.navigateToTasksPage()
  await expect(this.page.locator(`text="ChangedTitle"`)).toBeVisible()
  await expect(this.page.locator(`text="Task 1"`)).not.toBeVisible()
})

test('edit tasks from summary screen', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await tasksPage.navigateToTasksPage()
  await tasksPage.showTaskAndEditAssigneeFirstName('1', 'ChangedFirstName')
  await tasksPage.navigateToTasksPage()
  await tasksPage.showTask('1')
  await tasksPage.clickAssigneeEmail()
  await expect(this.page.locator(`text="ChangedFirstName"`)).toBeVisible()
  await tasksPage.navigateToUsersPage()
  await expect(this.page.locator(`text="ChangedFirstName"`)).toBeVisible()
})

test('delete tasks', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await tasksPage.navigateToTasksPage()
  await tasksPage.deleteTask('1')
  await expect(this.page.locator(`text="Task 1"`)).not.toBeVisible()
})

test('filter tasks', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await tasksPage.navigateToTasksPage()
  await tasksPage.filterTasks('john@google.com', 'Published', 'critical')
  await expect(this.page.locator(`text="Task 15"`)).toBeVisible()
})
