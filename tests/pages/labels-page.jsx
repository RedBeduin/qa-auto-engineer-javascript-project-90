export class LabelsPage {
  constructor(page) {
    this.page = page
  }

  async navigateToLoginPage() {
    await this.page.goto('http://localhost:5173/#/login', { timeout: 90000, })
  }

  async login(username, password) {
    await this.page.getByLabel('Username *', { timeout: 90000, }).fill(username, { timeout: 90000, })
    await this.page.getByLabel('Password *', { timeout: 90000, }).fill(password, { timeout: 90000, })
    await this.page.getByRole('button', { name: 'Sign in' }, { timeout: 90000, }).click({ timeout: 90000, })
  }
  
  async navigateToLabelsPage() {
    await this.page.goto('http://localhost:5173/#/labels', { timeout: 90000, })
  }

  async clickLabel(name) {
    await this.page.click(`text="${name}"`, { timeout: 90000, })
  }

  async createNewLabel(name) {
    await this.page.getByRole('button', { name: "Create" }, { timeout: 90000, }).click({ timeout: 90000, })
    await this.page.locator('input[name="name"]', { timeout: 90000, }).fill(name, { timeout: 90000, })
    await this.page.getByRole('button', { name: "Save" }, { timeout: 90000,}).click({ timeout: 90000, })
  }
  
  async openCard(id) {
    await this.page.locator(`td.column-id:has-text("${id}")`, { timeout: 90000, }).click({ timeout: 90000, })
  }

  async editLabelName(id, newName) {
    await this.openCard(id)
    await this.page.getByLabel('Name', { timeout: 90000, }).fill(newName, { timeout: 90000, })
    await this.page.getByRole('button', { name: "Save" }, { timeout: 90000, }).click({ timeout: 90000, })
  }

  async showLabelSummary(id) {
    await this.openCard(id)
    await this.page.getByRole('button', { name: "Show" }, {timeout: 90000, }).click({ timeout: 90000, })
  }

  async showLabelSummaryAndEditLabelName(id, newName) {
    await this.showLabelSummary(id)
    await this.page.getByRole('button', { name: "Edit" }, { timeout: 90000, }).click()
    await this.page.getByLabel('Name').fill(newName)
    await this.page.getByRole('button', { name: "Save" }, { timeout: 90000, }).click()
  }

  async deleteLabels(labelsArr) {
    labelsArr.map(async(labels) => {await this.page.locator(`row[name="Select this row ${labels}"]`, { timeout: 90000, }).getByRole("checkbox", { timeout: 90000, }).check( { timeout: 90000, })})
    await this.page.getByRole('button', { name: 'Delete' }, { timeout: 90000, }).click({ timeout: 90000, })
  }

  async deleteLabelsAndCancelDeletion(labelsArr) {
    await this.deleteLabels(labelsArr)
    await this.page.getByRole('button', { name: 'Undo' }, { timeout: 90000, }).click({ timeout: 90000, })
  }

  async deleteAllLabels() {
    await this.page.locator(`[aria-label="Select all"]`, { timeout: 90000, }).getByRole("checkbox", { timeout: 90000, }).check({ timeout: 90000, })
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }

  async deleteAllLabelsAndCancelDeletion() {
    await this.deleteAllLabels({ timeout: 90000, })
    await this.page.getByRole('button', { name: 'Undo' }, { timeout: 90000, }).click({ timeout: 90000, })
  }
}
