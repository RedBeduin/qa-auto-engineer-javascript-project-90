export class StatusPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto('http://localhost:5173/#/login', { timeout: 90000, });
  }

  async login(username, password) {
    await this.page.getByLabel('Username *', { timeout: 90000, }).fill(username, { timeout: 90000, })
    await this.page.getByLabel('Password *', { timeout: 90000, }).fill(password, { timeout: 90000, })
    await this.page.getByRole('button', { name: 'Sign in' }, { timeout: 90000, });
  }

  async navigateToStatusesPage() {
    await this.page.goto('http://localhost:5173/#/task_statuses', { timeout: 90000, });
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
    await this.page.waitForSelector(selector, { timeout: 90000, });
  }

  async clickCreateButton() {
    await this.page.getByRole("button", { name: "Create" }, { timeout: 90000, }).click({ timeout: 90000, });
  }

  async fillNameInput(name) {
    await this.page.getByLabel('Name', { timeout: 90000, }).fill(name, { timeout: 90000, })
  }

  async fillSlugInput(slug) {
    await this.page.getByLabel('Slug', { timeout: 90000, }).fill(slug, { timeout: 90000, })
  }

  async clickSaveButton() {
    await this.page.getByRole("button", { name: "Save" }, { timeout: 90000, }).click({ timeout: 90000, });
  }

  async clickShowButton() {
    await this.page.getByRole("button", { name: "Show" }, { timeout: 90000, }).click({ timeout: 90000, })
  }

  async clickEditButton() {
    await this.page.getByRole("button", { name: "Edit" }, { timeout: 90000, }).click({ timeout: 90000, })
  }

  async clickStatus(name) {
    await this.page.getByText(name, { timeout: 90000, }).click({ timeout: 90000, });
  }

  async clickDeleteButton() {
    await this.page.getByRole("button", { name: "Delete" }, { timeout: 90000, }).click({ timeout: 90000, });
  }

  async selectAllStatuses() {
    await this.page.getByLabel('Select all', { timeout: 90000, }).getByRole('checkbox', { timeout: 90000, }).check({ timeout: 90000, })
  }
}