import textVault from '../../__fixtures__/text-vault.jsx'

export class TasksPage {
  constructor(page) {
    this.page = page
  }
  
  async navigateToTasksPage() {
    await this.page.goto(`http://localhost:5173/#/tasks`, { timeout: 90000, })
  }

  async navigateToUsersPage() {
    await this.page.goto('http://localhost:5173/#/users', { timeout: 90000, })
  } 

  async createTask(assigneeEmail, title, statusOption) {
    await this.page.getByRole('button', { name: 'Create' }, { timeout: 90000, }).click({ timeout: 90000, })

    await this.page.getByLabel('Assignee', { timeout: 90000, }).click({ timeout: 90000, })
    await this.page.getByRole('option', { name: assigneeEmail }, { timeout: 90000, }).click({ timeout: 90000, })
    await this.page.getByLabel("Title", { timeout: 90000, }).fill(title, { timeout: 90000, })
    await this.page.getByLabel('Status', { timeout: 90000, }).click({ timeout: 90000, })
    await this.page.getByRole('option', { name: statusOption }, { timeout: 90000, }).click({ timeout: 90000, })
    await this.page.getByRole('button', { name: 'Save' }, { timeout: 90000, }).click({ timeout: 90000, })
  }

  getCard(titleTask) {
    return this.page.locator('.MuiCard-root', { hasText: titleTask }, { timeout: 90000, })
  }

  getColumn(statusName) {
    return this.page.locator('div', { hasText: statusName}, { exact: true }, { timeout: 90000, })
  }

  async changeTaskName(taskNumber, newTitle) {
    const nameOfEditTaskButton = `textVault.task${taskNumber}`
    await this.page.click(`button[name="${eval(nameOfEditTaskButton)}"][aria-label="Edit"]`, { timeout: 90000, })
    await this.page.getByLabel("Title", { timeout: 90000, }).fill(newTitle, { timeout: 90000, })
    await this.page.getByRole('button', { name: 'Save' }, { timeout: 90000, }).click({ timeout: 90000, })
  }
  
  async showTask(taskNumber) {
    const nameOfShowTaskButton = `textVault.task${taskNumber}`
    await this.page.click(`button[name="${eval(nameOfShowTaskButton)}"][aria-label="Show"]`, { timeout: 90000, })
  }

  async showTaskAndEditAssigneeFirstName(taskNumber, newFirstName) {
    const nameOfShowTaskButton = `textVault.task${taskNumber}`
    await this.page.click(`button[name="${eval(nameOfShowTaskButton)}"][aria-label="Show"]`, { timeout: 90000, })
    await this.page.click('text=@', { timeout: 90000, })
    await this.page.getByRole('button', { name: 'Edit' }, { timeout: 90000, }).click({ timeout: 90000, })
    await this.page.getByLabel('First name', { timeout: 90000, }).fill(newFirstName, { timeout: 90000, })
    await this.page.getByRole('button', { name: 'Save' }, { timeout: 90000, }).click({ timeout: 90000, })
  }

  async clickAssigneeEmail() {
    await this.page.click('text=@', { timeout: 90000, })
  }

  async deleteTask(taskNumber) {
    const nameOfEditTaskButton = `textVault.task${taskNumber}`
    await this.page.click(`button[name="${eval(nameOfEditTaskButton)}"][aria-label="Edit"]`, { timeout: 90000, })
    await this.page.getByRole('button', { name: 'Delete' }, { timeout: 90000, }).click({ timeout: 90000, })
  }

  async filterTasks(assigneeFilterOption, statusFilterOption, labelFilterOption) { 
    await this.page.selectOption(`[role="combobox"][name="Assignee"]`, { label: `${assigneeFilterOption}` }, { timeout: 90000, })
    await this.page.selectOption(`[role="combobox"][name="Status"]`, { label: `${statusFilterOption}` }, { timeout: 90000, })
    await this.page.selectOption(`[role="combobox"][name="Label"]`, { label: `${labelFilterOption}` }, { timeout: 90000, })
  }
}
