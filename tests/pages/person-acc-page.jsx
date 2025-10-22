import textVault from '../../__fixtures__/text-vault.jsx'

export class PersonAccPage {
  constructor(page) {
    this.page = page
    this.welcomText = this.page.getByText(
      textVault.welcomeTextPersonalAccountPage
    )
    this.logout = this.page.getByText('Logout')
    this.profile = this.page.getByLabel('Profile')
    this.menuUsers = this.page.getByRole('menuitem', { name: 'Users' })
    this.menuStatuses = this.page.getByRole('menuitem', {
      name: 'Task statuses',
    })
    this.menuLabels = this.page.getByRole('menuitem', { name: 'Labels' })
    this.menuTasks = this.page.getByRole('menuitem', { name: 'Tasks' })
  }
}
