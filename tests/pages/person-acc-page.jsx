export class PersonAccPage {
  constructor(page) {
    this.page = page
  }

  async navigateToMainPage() {
    await this.page.goto(`http://localhost:5173`)
  }

  async logOut() {
    await this.page.click(`[aria-label="Profile"]`)
    await this.page.getByText("Logout").click()
  }

  async clickProfile() {
    await this.page.click(`[aria-label="Profile"]`)
  }

  async clickUsersOption() {
    await this.page.click(`menuitem[name="Users"]`)
  }

  async clickStatusesOption() {
    await this.page.click(`menuitem[name="Task statuses"]`)
  }

  async clickLabelsOption() {
    await this.page.click(`menuitem[name="Labels"]`)
  }

  async clickTasksOption() {
    await this.page.click(`menuitem[name="Tasks"]`)
  }
}
