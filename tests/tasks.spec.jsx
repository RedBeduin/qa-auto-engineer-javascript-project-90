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
  await tasksPage.createTask("john@google.com", "Title", "To Review")
  await tasksPage.navigateToTasksPage()
  await expect(tasksPage.getColumn('To Review').getByText('Title')).toBeVisible()
  await expect(tasksPage.getCard('Title')).toBeVisible()
})

test('tasks list', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await tasksPage.navigateToTasksPage()
  for(const task of tasks) {
    await expect(page.getByText(task.name, { exact: true })).toBeVisible()
    await expect(page.getByText(task.description, { exact: true })).toBeVisible()
  }
})

test('menu of edition of task', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await tasksPage.navigateToTasksPage()
  await tasksPage.clickTaskEditButton('1')
  await expect(page.getByLabel('Assignee')).toBeVisible()
  await expect(page.locator(`input[name="title"]`)).toBeVisible()
  await expect(page.locator(`textarea[name="content"]`)).toBeVisible()
  await expect(page.getByLabel('Status')).toBeVisible()
  await expect(page.getByLabel('Label')).toBeVisible()
  await expect(page.getByRole('button', { name: "Save" })).toBeVisible()
  await expect(page.getByRole('button', { name: "Delete" })).toBeVisible()
})

test('edit tasks', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await tasksPage.navigateToTasksPage()
  await tasksPage.changeTaskName('1', 'ChangedTitle')
  await tasksPage.navigateToTasksPage()
  await expect(page.getByText("ChangedTitle")).toBeVisible()
  await expect(page.getByText("Task 1", { exact: true })).not.toBeVisible()
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
  await expect(page.getByText("ChangedFirstName")).toBeVisible()
  await tasksPage.navigateToUsersPage()
  await expect(page.getByText("ChangedFirstName")).toBeVisible()
})

test('delete tasks', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await tasksPage.navigateToTasksPage()
  await tasksPage.deleteTask('1')
  await expect(page.getByText("Task 1", { exact: true })).not.toBeVisible()
})

test('filter tasks', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login(textVault.username, textVault.password)
  await tasksPage.navigateToTasksPage()
  await tasksPage.filterTasks('john@google.com', 'Published', 'critical')
  await expect(page.getByText("Task 15", { exact: true })).toBeVisible()
})
