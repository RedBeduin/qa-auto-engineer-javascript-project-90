class UsersPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToUsersPage() {
    await this.page.goto('http://localhost:5173/#/users')
  }

  async createUser(email, firstName, lastName) {
    await this.page.getByRole('link', { name: 'Create' }).click()
    await this.page.getByLabel('Email').fill(email)
    await this.page.getByLabel('First name').fill(firstName)
    await this.page.getByLabel('Last name').fill(lastName)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async editUser(email, newFirstName) {
    await this.page.getByText(email).click()
    await this.page.getByLabel('First name').fill(newFirstName)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async clickShowButton() {
    await this.page.getByRole('link', { name: 'Show' }).click()
  }

  async clickEditButton() {
    await this.page.getByRole('link', { name: 'Edit' }).click()
  }

  async editUserClickingEditButton(newFirstName) {
    await this.page.getByRole('link', { name: 'Edit' }).click()
    await this.page.getByLabel('First name').fill(newFirstName)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async openUserData(email) {
    await this.page.getByText(email).click()
  }

  async deleteUser(email) {
    const elementToDelete = await this.page.waitForSelector(`text="${email}"`);
    await elementToDelete.click();
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }

  async deleteAllUsers() {
    await this.page.locator('table thead tr th input[type="checkbox"]').click();
    await this.page.getByRole('button', { name: 'Delete' }).click()
  }

  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
  }
}

export { UsersPage };
