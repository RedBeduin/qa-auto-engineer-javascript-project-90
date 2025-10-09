import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import { test, describe, beforeEach, vi, expect } from 'vitest'

export default class AppPage {
  static renderApp() {
    render(<App />)
  }  

  static get loginField() {
    page.getByPlaceholderText(loginFieldPlaceholderText)
  }

  static fillLoginField(text) {
    fireEvent.input(this.loginField, text)
  }

  static get passwordField() {
    page.getByPlaceholderText(passwordFieldPlaceholderText)
  }

  static fillPasswordField(text) {
    page.input(this.passwordField, text)
  }

  static get logInButton() {
    page.getByLabelText(logInButtonLabelText)
  }

  static clickLogInButton() {
    fireEvent.click(this.logInButton)
  }

  static get logOutButton() {
    page.getByLabelText(logOutButtonLabelText)
  }

  static clickLogOutButton() {
    fireEvent.click(this.logOutButton)
  }

  static get viteLogo() {
    page.getByLabelText(viteLogoLabelText)
  }

  static clickViteLogo() {
    fireEvent.click(this.viteLogo)
  }

  static get reactLogo() {
    page.getByLabelText(reactLogoLabelText)
  }

  static clickReactLogo() {
    fireEvent.click(this.reactLogo)
  }

  static get viteReactBoldText() {
    page.getByText(viteReactText)
  }

  static get countIsButton() {
    page.getByLabelText(countIsButtonLabelText)
  }

  static clickCountIsButton() {
    fireEvent.click(this.countIsButton)
  }

  static get viteSearchField() {
    page.getByPlaceholderText(viteSearchFieldPlaceholderText)
  }

  static fillViteSearchField(text) {
    fireEvent.type(this.viteSearchField, text)
  }

  static get viteGithubButton() {
    page.getByLabelText(viteGithubButtonLabelText)
  }

  static clickViteGithubButton() {
    fireEvent.click(this.viteGithubButton)
  }
  static get viteTitleAndLogoComponent() {
    page.getByLabelText(viteTitleAndLogoComponentLabelText)
  }

  static get viteGuideButton() {
    page.getByLabelText(viteGuideButtonLabelText)
  }

  static get viteGetStartedButtons() {
    page.getByLabelText(viteGetStartedButtonLabelText)
  }

  static expectLoginField() {
    expect(this.loginField).toBeVisible()
  }

  static expectPasswordField() {
    expect(this.passwordField).toBeVisible()
  }

  static expectViteLogo() {
    expect(this.viteLogo).toBeVisible()
  }

  static expectReactLogo() {
    expect(this.reactLogo).toBeVisible()
  }

  static expectViteReactBoldText() {
    expect(this.viteReactBoldText).toBeVisible()
  }

  static expectLogOutButton() {
    expect(this.logOutButton).toBeVisible()
  }
  
  static expectViteTitleAndLogoComponent() {
    expect(this.viteTitleAndLogoComponent).toBeVisible()
  }
  
  static expectViteSearchField() {
    expect(this.viteSearchField).toBeVisible()
  }
  
  static expectViteGetStartedButtons() {
    this.viteGetStartedButtons.map((viteGetButton) => {
      expect(viteGetButton).toBeVisible()
    })
  }
  static expectPageComponentContainingUsername(username) {
    expect(page.getByText(username)).toBeVisible()
  } 

  static expectViteMainPageMainTitle() {
    expect(this.viteMainPageMainTitle).toBeVisible()
  }
    
  static expectViteGuideButton() {
    expect(this.viteGuideButton).toBeVisible()
  }

  static expectViteGithubButton() {
    expect(this.viteGithubButton).toBeVisible()
  }

  static expectViteMainPageSmallTitle() {
    expect(this.viteMainPageSmallTitle).toBeVisible()
  }
}
 