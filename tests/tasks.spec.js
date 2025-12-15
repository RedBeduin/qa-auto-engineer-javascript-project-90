import { test, expect } from '@playwright/test'
import textVault from '../__fixtures__/text-vault.js'
import { LoginPage } from './pages/login-page.jsx'
import { TasksPage } from './pages/tasks-page.jsx'
import tasks from '../__fixtures__/tasks.js'

test.describe('testing of the tasks section', () => {
  test.beforeEach(async({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
  })

  test('create tasks', async ({ page }) => {
    const tasksPage = new TasksPage(page)
    await tasksPage.navigateToTasksPage()
    await tasksPage.createTask(textVault.taskAssigneeEmail, textVault.taskTitle, textVault.taskStatusOption)
    await tasksPage.navigateToTasksPage()
    await expect(tasksPage.getColumn(textVault.taskStatusOption).getByText(textVault.taskTitle)).toBeVisible()
    await expect(tasksPage.getCard(textVault.taskTitle)).toBeVisible()
  })

  test('tasks list', async ({ page }) => {
    const tasksPage = new TasksPage(page)
    await tasksPage.navigateToTasksPage()
    for(const task of tasks) {
      await expect(page.getByText(task.name, { exact: true })).toBeVisible()
      await expect(page.getByText(task.description, { exact: true })).toBeVisible()
    }
  })

  test('menu of edition of task', async({ page }) => {
    const tasksPage = new TasksPage(page)
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
    const tasksPage = new TasksPage(page)
    await tasksPage.navigateToTasksPage()
    await tasksPage.changeTaskName('1', textVault.taskTitleChanged)
    await tasksPage.navigateToTasksPage()
    await expect(page.getByText(textVault.taskTitleChanged)).toBeVisible()
    await expect(page.getByText(textVault.taskTitle1, { exact: true })).not.toBeVisible()
  })

  test('edit tasks from summary screen', async({ page }) => {
    const tasksPage = new TasksPage(page)
    await tasksPage.navigateToTasksPage()
    await tasksPage.showTaskAndEditAssigneeFirstName('1', textVault.changedUserFirstName)
    await tasksPage.navigateToTasksPage()
    await tasksPage.showTask('1')
    await tasksPage.clickAssigneeEmail()
    await expect(page.getByText(textVault.changedUserFirstName)).toBeVisible()
    await tasksPage.navigateToUsersPage()
    await expect(page.getByText(textVault.changedUserFirstName)).toBeVisible()
  })

  test('delete tasks', async({ page }) => {
    const tasksPage = new TasksPage(page)
    await tasksPage.navigateToTasksPage()
    await tasksPage.deleteTask('1')
    await expect(page.getByText(textVault.taskTitle1, { exact: true })).not.toBeVisible()
  })

  test('filter tasks', async({ page }) => {
    const tasksPage = new TasksPage(page)
    await tasksPage.navigateToTasksPage()
    await tasksPage.filterTasks(textVault.assigneeFilterOption, textVault.statusFilterOption, textVault.labelFilterOption)
    await expect(page.getByText(textVault.taskTitle15, { exact: true })).toBeVisible()
  })

  test('move task from one status column to another', async({ page }) => {
    const tasksPage = new TasksPage(page)
    await tasksPage.navigateToTasksPage()
    await tasksPage.moveToAnotherColumn(textVault.taskTitle1, textVault.taskTitle2)
    await tasksPage.filterTasksByStatus(textVault.taskStatusOption)
    await expect(page.getByText(textVault.taskTitle1, { exact: true })).toBeVisible()
    await expect(page.getByText(textVault.taskTitle2, { exact: true })).toBeVisible()
  })
})
