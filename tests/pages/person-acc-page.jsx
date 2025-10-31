import textVault from '../../__fixtures__/text-vault.jsx'

export class PersonAccPage {
  constructor(page) {
    this.page = page
  }

  welcomeText = `text="${textVault.welcomeTextPersonAccPage}"`
  logout = `text="Logout"`
  profile = `[aria-label="Profile]`
  menuUsers = `menuitem[name="Users"]`
  menuStatuses = `menuitem[name="Task statuses"]`
  menuLabels = `menuitem[name="Labels"]`
  menuTasks = `menuitem[name="Tasks"]`
}
