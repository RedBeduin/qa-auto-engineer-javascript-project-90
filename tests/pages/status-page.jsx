export class StatusPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto('http://localhost:5173/#/login');
  }

  async login(username, password) {
    await this.page.fill('input[type="text"]', username);
    await this.page.fill('input[type="password"]', password);
    await this.page.getByRole('button', { type: "submit" });
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
    await this.page.getByLabel("Create").click({ timeout: 90000, });
  }

  async fillNameInput(name) {
    await this.page.fill('input[name="name"]', name);
  }

  async fillSlugInput(slug) {
    await this.page.fill('input[name="slug"]', slug);
  }

  async clickSaveButton() {
    await this.page.getByLabel("Save").click({ timeout: 90000, });
  }

  async clickShowButton() {
    await this.page.getByLabel("Show").click({ timeout: 90000, })
  }

  async clickEditButton() {
    await this.page.getByLabel("Edit").click({ timeout: 90000, })
  }

  async clickStatus(name) {
    await this.page.getByText(name).click({ timeout: 90000, });
  }

  async clickDeleteButton() {
    await this.page.getByLabel("Delete").click({ timeout: 90000, });
  }

  async selectAllStatuses() {
    await this.page.click('table thead tr th input[type="checkbox"]');
  }
}