import React from 'react'
import ReactDom from 'react-dom/client'
import App from '@hexlet/testing-task-manager'
import AppPage from './pages/app-page.jsx'

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {App()}
  </React.StrictMode>
)

describe('App positive', () => {

beforeEach(() => {
  AppPage.renderApp()
})

test('Check that the rendering of the application executes correct', async() => {
  AppPage.expectViteLogo()
  AppPage.expectReactLogo()
  AppPage.expectViteReactBoldText()
  AppPage.expectCountIsButton()
  AppPage.expectEditAndSaveText()
  AppPage.expectClickToLearnText()
})

  test('Authorization in the Vite Authorization Form', async() => {
    await AppPage.clickLogInButton()
    await AppPage.fillLoginField('person')
    await AppPage.fillPasswordField('combo')
    await AppPage.clickLogInButton()
    AppPage.expectLogOutButton()
    AppPage.expectViteTitleAndLogoComponent()
    AppPage.expectPageComponentContainingUsername('person')
    AppPage.expectViteGetStartedButtons()
    AppPage.expectViteGithubButton()
    AppPage.expectViteGuideButton()
    AppPage.expectViteMainPageMainTitle()                  /*The Build Tool for the Web*/
    AppPage.expectViteMainPageSmallTitle()                   /*Vite is a blazing fast frontend build tool powering the next generation of web applications.*/
  })

  test('Logging out on the Vite Website', async() => {
    await AppPage.clickLogInButton()
    await AppPage.fillLoginField('person')
    await AppPage.fillPasswordField('combo')
    await AppPage.clickLogInButton()
    await AppPage.clickLogOutButton()
    AppPage.expectLogInButton()
    AppPage.expectViteTitleAndLogoComponent()
    AppPage.expectViteGetStartedButtons()
    AppPage.expectViteGithubButton()
    AppPage.expectViteGuideButton()
    AppPage.expectViteMainPageMainTitle() 
    AppPage.expectViteMainPageSmallTitle() 
  })
})
