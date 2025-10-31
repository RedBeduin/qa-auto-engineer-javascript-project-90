import { expect } from '@playwright/test'
import textVault from '../../__fixtures__/text-vault.jsx'

export class LoginPage {
  constructor(page) {
    this.page = page
  }

  userlogin = `aria-label="Username *"`
  password = `aria-label="Password *"`
  signIn = `button[name="Sign in"]`
  errorText = `selector[text="${textVault.errorTextLoginPage}"]`
  
  async checkUserNameField() {
    await expect(userlogin).toBeVisible()
  }

  async checkPasswordField() {
    await expect(password).toBeVisible()
  }

  async checkSignIn() {
    await expect(signIn).toBeVisible()
  }

  async inputUserloginField(query) {
    await this.page.fill(userlogin, query)
  }

  async inputPasswordField(query) {
    await this.page.fill(password, query)
  }

  async clickSignInButton() {
    await this.page.click(signIn)
  }

  async checkErrorText() {
    await expect(errorText).toBeVisible()    
  }
}
