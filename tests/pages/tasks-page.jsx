export class TasksPage {
  constructor(page) {
    this.page = page
  }
  
  async navigateToTasksPage() {
    await this.page.goto(`http://localhost:5173/#/tasks`)
  }

  async navigateToUsersPage() {
    await this.page.goto('http://localhost:5173/#/users')
  } 

  async createTask(assigneeEmail, title, statusOption) {
    await this.page.getByRole('link', { name: 'Create' }).click()

    await this.page.getByLabel('Assignee').click()
    await this.page.getByRole('option', { name: assigneeEmail }).click()
    await this.page.getByLabel("Title",).fill(title)
    await this.page.getByLabel('Status').click()
    await this.page.getByRole('option', { name: statusOption }).click()
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  getCard(titleTask) {
    return this.page.locator('.MuiCard-root', { hasText: titleTask })
  }

  getColumn(statusName) {
    return this.page.locator('div', { hasText: statusName}, { exact: true })
  }

  async clickTaskEditButton(taskNumber) {
    await this.page.locator(`[href="#/tasks/${taskNumber}"][aria-label="Edit"]`).click()
  }

  async changeTaskName(taskNumber, newTitle) {
    await this.page.locator(`[href="#/tasks/${taskNumber}"][aria-label="Edit"]`).click()
    await this.page.getByLabel("Title").fill(newTitle)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }
  
  async showTask(taskNumber) {
    await this.page.locator(`[href="#/tasks/${taskNumber}/show"][aria-label="Show"]`).click()
  }

  async showTaskAndEditAssigneeFirstName(taskNumber, newFirstName) {
    await this.page.locator(`[href="#/tasks/${taskNumber}/show"][aria-label="Show"]`).click()
    await this.page.locator('text=@').click()
    await this.page.getByRole('link', { name: 'Edit' }).click()
    await this.page.getByLabel('First name').fill(newFirstName)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async clickAssigneeEmail() {
    await this.page.locator('text=@').click()
  }

  async deleteTask(taskNumber) {
    await this.page.locator(`[href="#/tasks/${taskNumber}"][aria-label="Edit"]`).click()
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }

  async filterTasks(assigneeFilterOption, statusFilterOption, labelFilterOption) { 
    await this.page.getByRole("combobox", { name: "Assignee" }).click()
    await this.page.getByRole('option', { name: assigneeFilterOption }).click()
    await this.page.getByRole('combobox', { name: 'Status' }).click()
    await this.page.getByRole('option', { name: statusFilterOption }).click()
    await this.page.getByRole('combobox', { name: 'Label' }).click()
    await this.page.getByRole('option', { name: labelFilterOption }).click()
  }

  async filterTasksByStatus(statusFilterOption) {
    await this.page.getByRole('combobox', { name: 'Status' }).click()
    await this.page.getByRole('option', { name: statusFilterOption }).click()
  }

  async moveToAnotherColumn(movedTaskTitle, destinationTaskTitle) {
    const movedTitle = this.page.getByText(movedTaskTitle, { exact: true })
    const destinationTitle = this.page.getByText(destinationTaskTitle, { exact: true })
    await movedTitle.dragTo(destinationTitle)
  }
}
