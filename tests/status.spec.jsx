import { test } from "@playwright/test"
import { LoginPage } from "./pages/login-page.jsx"
import { StatusPage } from "./pages/status-page.jsx"
import textVault from "../__fixtures__/text-vault.jsx"
import { PersonAccPage } from "./pages/person-acc-page.jsx"
import {
  inputField,
  checkField,
  click,
  checkFieldByText,
  checkCheckbox,
  checkFieldByTextNotVisible,
  openCard,
} from "./func.jsx"

test("create status item", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login")
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuStatuses)
  const statusPage = new StatusPage(page)
  await click(statusPage.createStatusButton)
  await checkField(statusPage.createStatusName)
  await checkField(statusPage.createStatusSlug)
  await inputField(statusPage.createStatusName, textVault.createStatusName)
  await statusPage.inputCreateStatusSlugField(page, textVault.createStatusSlug)
  await click(statusPage.saveStatus)
  await statusPage.checkSaveSuccess(page)
})

test("status list", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login")
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuStatuses)
  const statusPage = new StatusPage(page)
  await statusPage.checkStatuses(page)
})

test("editing form status", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login")
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuStatuses)
  const statusPage = new StatusPage(page)
  await openCard(page, '1')
  await checkField(statusPage.createStatusName)
  await checkField(statusPage.createStatusSlug)
  await checkField(statusPage.saveDeleteButton)
})

test("edit status", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login")
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuStatuses)
  const statusPage = new StatusPage(page)
  await openCard(page, '1')
  await inputField(statusPage.createStatusName, textVault.editStatusName)
  await inputField(statusPage.createStatusSlug, textVault.editStatusSlug)
  await click(statusPage.saveStatus)
  await checkFieldByText(textVault.editStatusName, page)
  await checkFieldByText(textVault.editStatusSlug, page)
})

test("edit status from create", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login")
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuStatuses)
  const statusPage = new StatusPage(page)
  await click(statusPage.createStatusButton)
  await inputField(statusPage.createStatusName, textVault.createStatusName)
  await inputField(statusPage.createStatusSlug, textVault.createStatusSlug)
  await click(statusPage.saveStatus)
  await click(statusPage.showButtonStatusCreate)
  await click(statusPage.editButton)
  await inputField(statusPage.createStatusName, textVault.editStatusName)
  await inputField(statusPage.createStatusSlug, textVault.editStatusSlug)
  await click(statusPage.saveStatus)
  await checkFieldByText(textVault.editStatusName, page)
  await checkFieldByText(textVault.editStatusSlug, page)
})

test("delete status", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login")
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuStatuses)
  const statusPage = new StatusPage(page)
  await checkCheckbox(statusPage.checkStatus1)
  await click(statusPage.deleteButton)
  await click(statusPage.undoButton)
  await checkFieldByText(textVault.statusForDeletion1[0], page)
  await checkCheckbox(statusPage.checkStatus2)
  await checkCheckbox(statusPage.checkStatus3)
  await click(statusPage.deleteButton)
  await checkFieldByTextNotVisible(textVault.statusForDeletion2[0], page)
  await checkFieldByTextNotVisible(textVault.statusForDeletion3[0], page)
})

test("delete all status", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login")
  const loginPage = new LoginPage(page)
  const personAccPage = new PersonAccPage(page)
  await inputField(loginPage.userlogin, textVault.userlogin)
  await inputField(loginPage.password, textVault.password)
  await click(loginPage.signIn)
  await click(personAccPage.menuStatuses)
  const statusPage = new StatusPage(page)
  await checkCheckbox(statusPage.checkEach)
  await checkField(statusPage.itemSelected)
  await click(statusPage.deleteButton)
  await checkField(statusPage.noTaskStatus)
})
