export default class StatusesPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto('http://localhost:5173/#/login');
  }

  async login(username, password) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('text="Sign in"');
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

  async editStatus(currentName, newName) {
    await this.clickStatus(currentName);
    await this.fillNameInput(newName);
    this.clickSaveButton();
    return await this.page.waitForSelector(`text="${newName}"`);
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
    await this.page.click('[aria-label="Create"]');
  }

  async fillNameInput(name) {
    await this.page.fill('input[name="name"]', name);
  }

  async fillSlugInput(slug) {
    await this.page.fill('input[name="slug"]', slug);
  }

  async clickSaveButton() {
    await this.page.click('[aria-label="Save"]');
  }

  async clickStatus(name) {
    await this.page.click(`text="${name}"`);
  }

  async clickDeleteButton() {
    await this.page.click('[aria-label="Delete"]');
  }

  async selectAllStatuses() {
    await this.page.click('table thead tr th input[type="checkbox"]');
  }
}