class UsersPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToUsersPage() {
    await this.page.goto('http://localhost:5173/#/users');
  }

  async createUser(email, firstName, lastName) {
    await this.navigateToUsersPage();
    await this.page.click('[aria-label="Create"]');
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="firstName"]', firstName);
    await this.page.fill('input[name="lastName"]', lastName);
    await this.page.click('[aria-label="Save"]');
    await this.navigateToUsersPage();
  }

  async editUser(email, newFirstName) {
    await this.navigateToUsersPage();
    await this.page.click(`text="${email}"`);
    const saveButton = await this.page.waitForSelector('[aria-label="Save"]');
    await this.page.fill('input[name="firstName"]', newFirstName);
    await saveButton.click();
    await this.navigateToUsersPage();
  }

  async deleteUser(email) {
    await this.navigateToUsersPage();
    const elementToDelete = await this.page.waitForSelector(`text="${email}"`);
    await elementToDelete.click();
    await this.page.click('[aria-label="Delete"]');
    await this.navigateToUsersPage();
  }

  async deleteAllUsers() {
    await this.navigateToUsersPage();
    await this.page.click('table thead tr th input[type="checkbox"]');
    await this.page.click('[aria-label="Delete"]');
    await this.navigateToUsersPage();
  }
}

export default UsersPage;
