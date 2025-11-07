export class LabelsPage {
  constructor(page) {
    this.page = page
  }

  async navigateToLoginPage() {
    await this.page.goto('http://localhost:5173/#/login')
  }

  async login(username, password) {
    await this.page.fill('input[name="username"]', username)
    await this.page.fill('input[name="password"]', password)
    await this.page.click('text="Sign in"')
  }
  
  async navigateToLabelsPage() {
    await this.page.goto('http://localhost:5173/labels')
  }

  async clickLabel(name) {
    await this.page.click(`text="${name}"`)
  }

  async clickLabelsOptionInMainMenu() {
    await this.page.click(`menuitem[name="Labels"]`)
  } 

  async createNewLabel(name) {
    await this.page.click(`[aria-label="Create"][exact=true]`)
    await this.page.fill(`[aria-label="Name"]`, name)
    await this.page.click(`[aria-label="Save"]`) 
  }
  
  async openCard(id) {
    await this.page.click(`cell[name="${id}"][exact=true]`)
  }

  async editLabelName(id, newName) {
    await this.openCard(id)
    await this.page.fill(`[aria-label="Name"]`, newName)
    await this.page.click(`[aria-label="Save"]`)
  }

  async showLabelSummary(id) {
    await this.openCard(id)
    await this.page.click(`[aria-label="Show"]`)
  }

  async showLabelSummaryAndEditLabelName(id, newName) {
    await this.showLabelSummary(id)
    await this.page.click(`[aria-label="Edit"]`)
    await this.page.fill(`[aria-label="Name"]`, newName)
    await this.page.click(`[aria-label="Save"]`)
  }

  async deleteLabels(labelsArr) {
    labelsArr.map(async(labels) => {await `row[name="Select this row ${labels}"]`.getByRole("checkbox").check()})   
    await this.page.click(`[aria-label="Delete"]`)
  }

  async deleteLabelsAndCancelDeletion(labelsArr) {
    await this.deleteLabels(labelsArr)
    await this.page.click(`button[name="Undo"]`)
  }

  async deleteAllLabels() {
    await `[aria-label="Select all"]`.getByRole("checkbox").check()
    await this.page.click(`[aria-label="Delete"]`)
  }

  async deleteAllLabelsAndCancelDeletion() {
    await this.deleteAllLabels()
    await this.page.click(`button[name="Undo"]`)
  }
}
