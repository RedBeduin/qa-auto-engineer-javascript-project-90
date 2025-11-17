export class LoginPage {
  constructor(page) {
    this.page = page
  }

  async navigateToLoginPage() {
    await this.page.goto('http://localhost:5173/#/login')
  }
  
  async login(username, password) {
    await this.page.getByLabel('Username *').fill(username)
    await this.page.getByLabel('Password *').fill(password)
    await this.page.getByRole('button', { name: 'Sign in' }).click()
  }
  
  async loginWithoutPassword(username) {
    await this.page.getByLabel('Username *').fill(username)
    await this.page.getByRole('button', { name: 'Sign in' }).click()
  }

  async loginWithoutUsername(password) {
    await this.page.getByLabel('Password *').fill(password)
    await this.page.getByRole('button', { name: 'Sign in' }).click()
  }

  async waitForSelector(selector) {
    await this.page.waitForSelector(selector)
  }
}
