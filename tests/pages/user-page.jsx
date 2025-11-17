class UsersPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto('http://localhost:5173/#/login')
  }

  async login(username, password) {
    await this.page.getByLabel('Username *').fill(username)
    await this.page.fill('Password *').fill(password)
    await this.page.getByRole('button', { name: 'Sign in' }).click()
  }

  async navigateToUsersPage() {
    await this.page.goto('http://localhost:5173/#/users')
  }

  async createUser(email, firstName, lastName) {
    await this.page.getByRole('button', { name: 'Create' }).click()
    await this.page.getByLabel('Email').fill(email)
    await this.page.getByLabel('First name').fill(firstName)
    await this.page.getByLabel('Last name').fill(lastName)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async editUser(email, newFirstName) {
    await this.page.click(`text="${email}"`)
    await this.page.getByLabel('First name').fill(newFirstName)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async clickShowButton() {
    await this.page.getByRole('button', { name: 'Show' }).click()
  }

  async clickEditButton() {
    await this.page.getByRole('button', { name: 'Edit' }).click()
  }

  async editUserClickingEditButton(newFirstName) {
    await this.page.getByRole('button', { name: 'Edit' }).click()
    await this.page.getByLabel('First name').fill(newFirstName)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async openUserData(email) {
    await this.page.click(`text="${email}"`)
  }

  async deleteUser(email) {
    const elementToDelete = await this.page.waitForSelector(`text="${email}"`);
    await elementToDelete.click();
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }

  async deleteAllUsers() {
    await this.page.click('table thead tr th input[type="checkbox"]');
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }

  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
  }
}

export { UsersPage };
