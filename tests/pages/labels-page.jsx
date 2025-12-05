export class LabelsPage {
  constructor(page) {
    this.page = page
  }
  
  async navigateToLabelsPage() {
    await this.page.goto('http://localhost:5173/#/labels')
  }

  async clickLabel(name) {
    await this.page.click(`text="${name}"`)
  }

  async createNewLabel(name) {
    await this.page.getByRole('link', { name: "Create" }).click()
    await this.page.locator('input[name="name"]').fill(name)
    await this.page.getByRole('button', { name: "Save" }).click()
  }
  
  async openCard(id) {
    await this.page.locator(`td.column-id:has-text("${id}")`).click()
  }

  async editLabelName(id, newName) {
    await this.openCard(id)
    await this.page.locator('input[name="name"]').fill(newName)
    await this.page.getByRole('button', { name: "Save" }).click()
  }

  async showLabelSummary(id) {
    await this.openCard(id)
    await this.page.getByRole('link', { name: "Show" }).click()
  }

  async showLabelSummaryAndEditLabelName(id, newName) {
    await this.showLabelSummary(id)
    await this.page.getByRole('link', { name: "Edit" }).click()
    await this.page.locator('input[name="name"]').fill(newName)
    await this.page.getByRole('button', { name: "Save" }).click()
  }

  async deleteLabel(rowNum) {
    await this.page.getByRole('row', { name: `Select this row ${rowNum}` }).getByRole("checkbox").click()
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }

  async deleteLabelAndCancelDeletion(rowNum) {
    await this.deleteLabel(rowNum)
    await this.page.getByRole('button', { name: 'Undo' }).click()
  }

  async deleteAllLabels() {
    await this.page.locator('input[aria-label="Select all"]').click()
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }

  async deleteAllLabelsAndCancelDeletion() {
    await this.deleteAllLabels()
    await this.page.getByRole('button', { name: 'Undo' }).click()
  }
}
