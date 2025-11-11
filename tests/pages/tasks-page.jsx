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

  async createTask(assigneeEmail, title, content, statusOption, labelOption) {
    await this.page.click(`[aria-label="Create"]`)
    await this.page.click(`(//*[contains(@role, 'combobox')])[1]`)
    await this.page.waitForSelector(`text="${assigneeEmail}"`, { timeout: 50000, })
    await this.page.click(`text="${assigneeEmail}"`)
    await this.page.fill(`input[name="title"]`, title)
    await this.page.fill(`textarea[name="content"]`, content) 
    await this.page.click(`(//*[contains(@role, 'combobox')])[2]`)
    await this.page.waitForSelector(`text="${statusOption}"`, { timeout: 50000, })
    await this.page.click(`text="${statusOption}"`)
    await this.page.waitForSelector(`(//*[contains(@role, 'combobox')])[3]`, { timeout: 50000, })
    await this.page.click(`(//*[contains(@role, 'combobox')])[3]`)
    await this.page.waitForSelector(`text="${labelOption}"`, { timeout: 50000, })
    await this.page.click(`text="${labelOption}"`)
    await this.page.click(`[aria-label="Save"]`)
  }

  async changeTaskName(taskNumber, newTitle) {
    const nameOfEditTaskButton = `textVault.task${taskNumber}`
    await this.page.click(`button[name="${eval(nameOfEditTaskButton)}"][aria-label="Edit"]`)
    await this.page.fill(`[aria-label="Title"]`, newTitle)
    await this.page.click(`[aria-label="Save"]`) 
  }
  
  async showTask(taskNumber) {
    const nameOfShowTaskButton = `textVault.task${taskNumber}`
    await this.page.click(`button[name="${eval(nameOfShowTaskButton)}"][aria-label="Show"]`)
  }

  async showTaskAndEditAssigneeFirstName(taskNumber, newFirstName) {
    const nameOfShowTaskButton = `textVault.task${taskNumber}`
    await this.page.click(`button[name="${eval(nameOfShowTaskButton)}"][aria-label="Show"]`)
    await this.page.click('text=@')
    await this.page.click(`[aria-label="Edit"]`)
    const saveButton = await this.page.waitForSelector('[aria-label="Save"]')
    await this.page.fill('input[name="firstName"]', newFirstName)
    await saveButton.click()
  }

  async clickAssigneeEmail() {
    await this.page.click('text=@')
  }

  async deleteTask(taskNumber) {
    const nameOfEditTaskButton = `textVault.task${taskNumber}`
    await this.page.click(`button[name="${eval(nameOfEditTaskButton)}"][aria-label="Edit"]`)
    await this.page.click(`[aria-label="Delete"]`)
  }

  async filterTasks(assigneeFilterOption, statusFilterOption, labelFilterOption) { 
    await this.page.selectOption(`[role="combobox"][name="Assignee"]`, { label: `${assigneeFilterOption}` })
    await this.page.selectOption(`[role="combobox"][name="Status"]`, { label: `${statusFilterOption}` })
    await this.page.selectOption(`[role="combobox"][name="Label"]`, { label: `${labelFilterOption}` })
  }
}
