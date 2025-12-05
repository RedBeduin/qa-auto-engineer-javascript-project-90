export class StatusPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToStatusesPage() {
    await this.page.goto('http://localhost:5173/#/task_statuses');
  }

  async createNewStatus(name, slug) {
    await this.navigateToStatusesPage()
    await this.clickCreateButton();
    await this.fillNameInput(name);
    await this.fillSlugInput(slug);
    await this.clickSaveButton();
  }

  async editStatus(currentName, newName, newSlug) {
    await this.clickStatus(currentName);
    await this.fillNameInput(newName);
    await this.fillSlugInput(newSlug)
    await this.clickSaveButton();
  }

  async editStatusAfterCreation(newName, newSlug) {
    await this.clickShowButton()
    await this.clickEditButton()
    await this.fillNameInput(newName)
    await this.fillSlugInput(newSlug)
    await this.clickSaveButton()
  }

  async deleteStatus(name) {
    await this.clickStatus(name);
    await this.clickDeleteButton();
  }

  async deleteAllStatuses() {
    await this.selectAllStatuses();
    await this.clickDeleteButton();
  }

  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
  }

  async clickCreateButton() {
    await this.page.getByRole("link", { name: "Create" }).click();
  }

  async fillNameInput(name) {
    await this.page.getByLabel('Name').fill(name)
  }

  async fillSlugInput(slug) {
    await this.page.getByLabel('Slug').fill(slug)
  }

  async clickSaveButton() {
    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async clickShowButton() {
    await this.page.getByRole("link", { name: "Show" }).click()
  }

  async clickEditButton() {
    await this.page.getByRole("link", { name: "Edit" }).click()
  }

  async clickStatus(name) {
    await this.page.getByText(name, { exact: true, }).click();
  }

  async clickDeleteButton() {
    await this.page.getByRole("button", { name: "Delete" }).click();
  }

  async selectAllStatuses() {
    await this.page.locator('input[aria-label="Select all"]').check()
  }
}