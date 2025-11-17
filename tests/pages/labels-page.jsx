export class LabelsPage {
  constructor(page) {
    this.page = page
  }

  async navigateToLoginPage() {
    await this.page.goto('http://localhost:5173/#/login')
  }

  async login(username, password) {
    await this.page.getByLabel('Username *').fill(username)
    await this.page.getByLabel('Password *').fill(password)
    await this.page.getByRole('button', { name: 'Sign in' }).click()
  }
  
  async navigateToLabelsPage() {
    await this.page.goto('http://localhost:5173/#/labels')
  }

  async clickLabel(name) {
    await this.page.click(`text="${name}"`)
  }

  async createNewLabel(name) {
    await this.page.getByRole('button', { name: "Create" }).click()
    await this.page.getByLabel('Name').fill(name)
    await this.page.getByRole('button', { name: "Save" }).click()
  }
  
  async openCard(id) {
    await this.page.locator(`td.column-id:has-text("${id}")`).click()
  }

  async editLabelName(id, newName) {
    await this.openCard(id)
    await this.page.getByLabel('Name').fill(newName)
    await this.page.getByRole('button', { name: "Save" }).click()
  }

  async showLabelSummary(id) {
    await this.openCard(id)
    await this.page.getByRole('button', { name: "Show" }).click()
  }

  async showLabelSummaryAndEditLabelName(id, newName) {
    await this.showLabelSummary(id)
    await this.page.getByRole('button', { name: "Edit" }).click()
    await this.page.getByLabel('Name').fill(newName)
    await this.page.getByRole('button', { name: "Save" }).click()
  }

  async deleteLabels(labelsArr) {
    labelsArr.map(async(labels) => {await `row[name="Select this row ${labels}"]`.getByRole("checkbox").check()})   
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }

  async deleteLabelsAndCancelDeletion(labelsArr) {
    await this.deleteLabels(labelsArr)
    await this.page.getByRole('button', { name: 'Undo' }).click()
  }

  async deleteAllLabels() {
    await `[aria-label="Select all"]`.getByRole("checkbox").check()
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }

  async deleteAllLabelsAndCancelDeletion() {
    await this.deleteAllLabels()
    await this.page.getByRole('button', { name: 'Undo' }).click()
  }
}
