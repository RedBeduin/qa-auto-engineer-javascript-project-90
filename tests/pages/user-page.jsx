class UsersPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto('http://localhost:5173/#/login')
  }

  async login(username, password) {
    await this.page.fill('input[name="username"]', username)
    await this.page.fill('input[name="password"]', password)
    await this.page.click('text="Sign in"')
  }

  async navigateToUsersPage() {
    await this.page.goto('http://localhost:5173/#/users')
  }

  async createUser(email, firstName, lastName) {
    await this.page.click('[aria-label="Create"]')
    await this.page.fill('input[name="email"]', email)
    await this.page.fill('input[name="firstName"]', firstName)
    await this.page.fill('input[name="lastName"]', lastName)
    await this.page.click('[aria-label="Save"]')
  }

  async editUser(email, newFirstName) {
    await this.page.click(`text="${email}"`)
    const saveButton = await this.page.waitForSelector('[aria-label="Save"]')
    await this.page.fill('input[name="firstName"]', newFirstName)
    await saveButton.click()
  }

  async clickShowButton() {
    await this.page.click(`[aria-label="Show"]`)
  }

  async clickEditButton() {
    await this.page.click(`[aria-label="Edit"]`)
  }

  async editUserClickingEditButton(newFirstName) {
    await this.page.click(`[aria-label="Edit"]`)
    const saveButton = await this.page.waitForSelector('[aria-label="Save"]')
    await this.page.fill('input[name="firstName"]', newFirstName)
    await saveButton.click()
  }

  async openUserData(email) {
    await this.page.click(`text="${email}"`)
  }

  async deleteUser(email) {
    const elementToDelete = await this.page.waitForSelector(`text="${email}"`);
    await elementToDelete.click();
    await this.page.click('[aria-label="Delete"]');
  }

  async deleteAllUsers() {
    await this.page.click('table thead tr th input[type="checkbox"]');
    await this.page.click('[aria-label="Delete"]');
  }

  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
  }
}

export { UsersPage };
