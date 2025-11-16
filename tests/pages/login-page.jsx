export class LoginPage {
  constructor(page) {
    this.page = page
  }

  async navigateToLoginPage() {
    await this.page.goto('http://localhost:5173/#/login')
  }
  
  async login(username, password) {
    await this.page.fill('input[autocomplete="username"]', username)
    await this.page.fill('input[autocomplete="current-password"]', password)
    await this.page.click('button[type="submit"]')
  }
  
  async loginWithoutPassword(username) {
    await this.page.fill('input[type="text"]', username)
    await this.page.click('button[type="submit"]')
  }

  async loginWithoutUsername(password) {
    await this.page.fill('input[type="password"]', password)
    await this.page.click('button[type="submit"]')
  }

  async waitForSelector(selector) {
    await this.page.waitForSelector(selector)
  }
}
