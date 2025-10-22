import { expect } from '@playwright/test'
import textVault from '../../__fixtures__/text-vault.jsx'

export class LoginPage {
  constructor(page) {
    this.page = page
    this.userlogin = this.page.getByLabel('Username *')
    this.password = this.page.getByLabel('Password *')
    this.signIn = this.page.getByRole('button', { name: 'Sign in' })
    this.errorText = this.page.getByText(textVault.errorTextLoginPage)
  }

  async checkUserNameField() {
    await expect(this.userlogin).toBeVisible();
  }

  async checkPasswordField() {
    await expect(this.password).toBeVisible();
  }

  async checkSignIn() {
    await expect(this.signIn).toBeVisible();
  }

  async inputUserNameField(query) {
    await this.userlogin.fill(query);
  }

  async inputPasswordField(query) {
    await this.password.fill(query);
  }
  async clickSignInButton() {
    await this.signIn.click();
  }

  async checkErrorText() {
    await expect(this.errorText).toBeVisible();
  }
}
