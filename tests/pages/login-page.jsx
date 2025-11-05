export class LoginPage {
  constructor(page) {
    this.page = page
  }


  async navigateToLoginPage() {
    await this.page.goto('http://localhost:5173/#/login')
  }
  
  async login(username, password) {
    await this.page.fill('input[name="username"]', username)
    await this.page.fill('input[name="password"]', password)
    await this.page.click('text="Sign in"')
  }
  
  async loginWithoutPassword(username) {
    await this.page.fill('input[name="username"]', username)
    await this.page.click('text="Sign in"')
  }

  async loginWithoutUsername(password) {
    await this.page.fill('input[name="password"', password)
    await this.page.click('text="Sign in"')
  }
}
