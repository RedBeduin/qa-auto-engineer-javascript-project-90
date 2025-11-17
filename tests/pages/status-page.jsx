export class StatusPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto('http://localhost:5173/#/login');
  }

  async login(username, password) {
    await this.page.getByLabel('Username *').fill(username)
    await this.page.getByLabel('Password *').fill(password)
    await this.page.getByRole('button', { name: 'Sign in' });
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
    await this.navigateToStatusesPage();
    return await this.page.waitForSelector(`text="${name}"`);
  }

  async editStatus(currentName, newName, newSlug) {
    await this.clickStatus(currentName);
    await this.fillNameInput(newName);
    await this.fillSlugInput(newSlug)
    this.clickSaveButton();
    return await this.page.waitForSelector(`text="${newName}"`);
  }

  async editStatusAfterCreation(newName, newSlug) {
    await this.clickShowButton()
    await this.clickEditButton()
    await this.fillNameInput(newName)
    await this.fillSlugInput(newSlug)
    this.clickSaveButton()
    return await this.page.waitForSelector(`text="${newName}"`)
  }

  async deleteStatus(name) {
    await this.navigateToStatusesPage();
    await this.clickStatus(name);
    await this.clickDeleteButton();
    await this.navigateToStatusesPage();
  }

  async deleteAllStatuses() {
    await this.navigateToStatusesPage();
    await this.selectAllStatuses();
    await this.clickDeleteButton();
    await this.navigateToStatusesPage();
  }

  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
  }

  async clickCreateButton() {
    await this.page.getByRole("button", { name: "Create" }).click();
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
    await this.page.getByRole("button", { name: "Show" }).click()
  }

  async clickEditButton() {
    await this.page.getByRole("button", { name: "Edit" }).click()
  }

  async clickStatus(name) {
    await this.page.getByText(name).click();
  }

  async clickDeleteButton() {
    await this.page.getByRole("button", { name: "Delete" }).click();
  }

  async selectAllStatuses() {
    await this.page.getByLabel('Select all').getByRole('checkbox').check()
  }
}