import { test, expect } from "@playwright/test"
import textVault from '../__fixtures__/text-vault.jsx'
import { LoginPage } from './pages/login-page.jsx'
import { StatusPage } from "./pages/status-page.jsx"
import taskStatuses from "../__fixtures__/task-statuses.jsx"

test.describe('testing of the task statuses section', () => {
  test.beforeEach(async({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.login(textVault.username, textVault.password)
  })

  test("create status item", async ({ page }) => {
    const statusPage = new StatusPage(page)
    await statusPage.navigateToStatusesPage()
    await statusPage.createNewStatus(textVault.statusName, textVault.statusSlug)
    await statusPage.navigateToStatusesPage()
    await expect(page.getByText(textVault.statusName)).toBeVisible()
    await expect(page.getByText(textVault.statusSlug)).toBeVisible()
  })

  test("status list", async ({ page }) => {
    const statusPage = new StatusPage(page)
    await statusPage.navigateToStatusesPage()
    for(const taskStatus of taskStatuses) {
      await expect(page.getByText(taskStatus.Name, { exact: true })).toBeVisible()
      await expect(page.getByText(taskStatus.Slug, { exact: true })).toBeVisible()
    } 
  })

  test("edit status", async ({ page }) => {
    const statusPage = new StatusPage(page)
    await statusPage.navigateToStatusesPage()
    await statusPage.editStatus(taskStatuses[0].Name, textVault.changedStatusName, textVault.changedStatusSlug)
    await statusPage.navigateToStatusesPage()
    await expect(page.getByText(textVault.changedStatusName)).toBeVisible()
    await expect(page.getByText(textVault.changedStatusSlug)).toBeVisible()
  })

  test("edit status from status summary page", async ({ page }) => {
    const statusPage = new StatusPage(page)
    await statusPage.navigateToStatusesPage()
    await statusPage.createNewStatus(textVault.statusName, textVault.statusSlug)
    await statusPage.editStatusAfterCreation('ChangedName', 'ChangedSlug')
    await expect(page.getByText("ChangedName")).toBeVisible()
    await expect(page.getByText("ChangedSlug")).toBeVisible()
  })

  test("delete status", async ({ page }) => {
    const statusPage = new StatusPage(page)
    await statusPage.navigateToStatusesPage()
    await statusPage.deleteStatus('Draft')
    await statusPage.navigateToStatusesPage()
    await expect(page.getByText("Draft", { exact: true })).not.toBeVisible()
    await expect(page.getByText("draft", { exact: true })).not.toBeVisible() 
  })

  test("delete all status", async ({ page }) => {
    const statusPage = new StatusPage(page)
    await statusPage.navigateToStatusesPage()
    await statusPage.deleteAllStatuses()
    await statusPage.navigateToStatusesPage()
    await expect(page.getByText("No Task statuses yet.", { exact: true })).toBeVisible()
    await expect(page.getByText("Draft", { exact: true })).not.toBeVisible()
    await expect(page.getByText("draft", { exact: true })).not.toBeVisible()
  })
})
