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

  async createTask(assignee, title, content, statusOption, label) {
    await this.page.click(`[aria-label="Create"]`)
    await this.page.selectOption(page.locator(`div[role="combobox"]`).nth(1), assignee)
    await this.page.fill(`input[name="title"]`, title)
    await this.page.fill(`textarea[name="content"]`, content)
    await this.page.selectOption(page.locator(`div[role="combobox"]`).nth(2), statusOption)
    await this.page.selectOption(page.locator(`div[role="combobox"]`).nth(3), label)
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
 
  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
  }
}
