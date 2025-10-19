import { test } from '@playwright/test'
import { LoginPage } from './pages/login-page.jsx'
import { LabelsPage } from './pages/labels-page.jsx'
import textVault from '../__fixtures__/text-vault.jsx'
import { PersonAccPage } from './pages/person-acc-page.jsx'
import {
  inputField,
  checkField,
  click,
  checkFieldByText,
  checkCheckbox,
  checkFieldByTextNotVisible,
  openCard,
} from './func.jsx'

test('create labels', async ({ page }) => {
  await page.goto('http://localhost:5173/#/login')
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuLabels)
  const labelsPage = new LabelsPage(page)
  await click(labelsPage.createLabelsButton)
  await checkField(labelsPage.createLabelsName)
  await inputField(labelsPage.createLabelsName, textVault.createLabelsName)
  await click(labelsPage.saveStatus)
  await checkField(labelsPage.saveSuccess)
});

test('labels list', async ({ page }) => {
  await page.goto('http://localhost:5173/#/login')
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuLabels)
  const labelsPage = new LabelsPage(page)
  await labelsPage.checkLabels(page)
})

test('editing from labels', async ({ page }) => {
  await page.goto('http://localhost:5173/#/login')
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuLabels)
  const labelsPage = new LabelsPage(page)
  await openCard(page, '1')
  await checkField(labelsPage.createLabelsName)
  await checkField(labelsPage.saveDeleteButton)
})

test('edit labels', async ({ page }) => {
  await page.goto('http://localhost:5173/#/login')
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuLabels)
  const labelsPage = new LabelsPage(page)
  await openCard(page, '1')
  await inputField(labelsPage.createLabelsName, textVault.editLabelsName)
  await click(labelsPage.saveStatus)
  await checkFieldByText(textVault.editLabelsName, page)
})

test('edit labels from create', async ({ page }) => {
  await page.goto('http://localhost:5173/#/login')
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuLabels)
  const labelsPage = new LabelsPage(page)
  await click(labelsPage.createLabelsButton)
  await checkField(labelsPage.createLabelsName)
  await inputField(labelsPage.createLabelsName, textVault.createLabelsName)
  await click(labelsPage.saveStatus)
  await click(labelsPage.showButtonCreateStatus)
  await click(labelsPage.editButton)
  await inputField(labelsPage.createLabelsName, textVault.editLabelsName)
  await click(labelsPage.saveStatus)
  await checkFieldByText(textVault.editLabelsName, page)
})

test('delete labels', async ({ page }) => {
  await page.goto('http://localhost:5173/#/login')
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuLabels)
  const labelsPage = new LabelsPage(page)
  await checkCheckbox(labelsPage.checkLabels1)
  await click(labelsPage.deleteButton)
  await click(labelsPage.undoButton)
  await checkFieldByText(textVault.labelsForDeletion1[0], page)
  await checkCheckbox(labelsPage.checkLabels2)
  await checkCheckbox(labelsPage.checkLabels3)
  await click(labelsPage.deleteButton)
  await checkFieldByTextNotVisible(textVault.labelsForDeletion2[0], page)
  await checkFieldByTextNotVisible(textVault.labelsForDeletion3[0], page)
})

test('delete all labels', async ({ page }) => {
  await page.goto('http://localhost:5173/#/login')
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuLabels)
  const labelsPage = new LabelsPage(page)
  await checkCheckbox(labelsPage.checkEach)
  await checkField(labelsPage.labelSelected)
  await click(labelsPage.deleteButton)
  await checkField(labelsPage.noLabelsStatus)
})  
