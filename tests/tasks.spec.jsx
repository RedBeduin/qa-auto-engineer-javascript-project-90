import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/login-page.jsx'
import { TasksPage } from './pages/tasks-page.jsx'
import tasks from '../__fixtures__/tasks.jsx'

test('create tasks', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login('Username', 'Password')
  await tasksPage.navigateToTasksPage()
  await tasksPage.createTask('john@google.com', 'Title', 'Content', 'Published', 'critical')
  await tasksPage.navigateToTasksPage()
  await expect(`text="Title"`).toBeVisible()
  await expect(`text="Content"`).toBeVisible()
}); 


test('tasks list', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login('Username', 'Password')
  await tasksPage.navigateToTasksPage()
  for(const task of tasks) {
    await expect(`text="${task.name}"`).toBeVisible()
  }  
})  

test('menu of edition of task', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login('Username', 'Password')
  await tasksPage.navigateToTasksPage()
  await tasksPage.showTask('1')
  await expect(`combobox[name="Assignee"]`).toBeVisible()
  await expect(`input[name="Title"]`).toBeVisbile()
  await expect(`input[name="Content"]`).toBeVisible()
  await expect(`combobox[name="Status"]`).toBeVisible()
  await expect(`combobox[name="Label"]`).toBeVisible()
  await expect(`[disabled][aria-label="Save"]`).toBeVisible()
  await expect(`[aria-label="Delete"]`).toBeVisible()
})

test('edit tasks', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login('Username', 'Password')
  await tasksPage.navigateToTasksPage()
  await tasksPage.changeTaskName('1', 'ChangedTitle')
  await tasksPage.navigateToTasksPage()
  await expect(`text="ChangedTitle"`).toBeVisible()
  await expect(`text="Task 1"`).not.toBeVisible()
})

test('edit tasks from summary screen', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login('Username', 'Password')
  await tasksPage.navigateToTasksPage()
  await tasksPage.showTaskAndEditAssigneeFirstName('1', 'ChangedFirstName')
  await tasksPage.navigateToTasksPage()
  await tasksPage.showTask('1')
  await tasksPage.clickAssigneeEmail()
  await expect(`text="ChangedFirstName"`).toBeVisible()
  await tasksPage.navigateToUsersPage()
  await expect(`text="ChangedFirstName"`).toBeVisible()
})

test('delete tasks', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login('Username', 'Password')
  await tasksPage.navigateToTasksPage()
  await tasksPage.deleteTask('1')
  await expect(`text="Task 1"`).not.toBeVisible()
})

test('filter tasks', async({ page }) => {
  const loginPage = new LoginPage(page)
  const tasksPage = new TasksPage(page)
  await loginPage.navigateToLoginPage()
  await loginPage.login('Username', 'Password')
  await tasksPage.navigateToTasksPage()
  await tasksPage.filterTasks('john@google.com', 'Published', 'critical')
  await expect(`text="Task 15"`).toBeVisible()
})
