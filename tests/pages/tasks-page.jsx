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
    await this.page.click(`[aria-label="Create"][exact=true]`)
    await this.page.selectOption(`combobox[name="Assignee"]`, assignee)
    await this.page.fill(`[aria-label="Title"][exact=true]`, title)
    await this.page.fill(`[aria-label="Content"][exact=true]`, content)
    await this.page.selectOption(`combobox[name="Status"]`, statusOption)
    await this.page.selectOption(`combobox[name="Label"]`, label)
    await this.page.click(`[aria-label="Save"]`)
  }

  async changeTaskName(taskNumber, newTitle) {
    const nameOfEditTaskButton = `textVault.task${taskNumber}`
    await this.page.click(`button[name="${eval(nameOfEditTaskButton)}"][aria-label="Edit"]`)
    await this.page.fill(`[aria-label="Title"][exact=true]`, newTitle)
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
    await this.page.selectOption(`combobox[name="Assignee"]`, { label: `${assigneeFilterOption}` })
    await this.page.selectOption(`combobox[name="Status"]`, { label: `${statusFilterOption}` })
    await this.page.selectOption(`combobox[name="Label"]`, { label: `${labelFilterOption}` })
  }
 
  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
  }
}
