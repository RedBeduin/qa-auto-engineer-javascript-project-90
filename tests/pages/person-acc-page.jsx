export class PersonAccPage {
  constructor(page) {
    this.page = page
  }

  async navigateToMainPage() {
    await this.page.goto(`http://localhost:5173`)
  }

  async logOut() {
    await this.clickProfile() // logout button displays not correctly
    await this.page.mouse.click(20, 20) // logout button disappears
    await this.clickProfile() // logout button displays correctly 
    await this.clickLogOutButton()
  }

  async clickProfile() {
    await this.page.locator('[aria-label="Profile"]').click()
  }

  async clickLogOutButton() {
    await this.page.getByText("Logout").click()
  }

  async clickDashboardOption() {
    await this.page.getByRole('menuitem', { href: '#/' }).click()
  }

  async clickUsersOption() {
    await this.page.getByRole('menuitem', { href: '#/users' }).click()
  }

  async clickStatusesOption() {
    await this.page.getByRole('menuitem', { href: '#/task_statuses' }).click()
  }

  async clickLabelsOption() {
    await this.page.getByRole('menuitem', { href: '#/labels'}).click()
  }

  async clickTasksOption() {
    await this.page.getByRole('menuitem', { href: '#/tasks' }).click()
  }
}
