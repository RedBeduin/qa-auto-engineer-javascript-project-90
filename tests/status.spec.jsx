import { test, expect } from "@playwright/test"
import textVault from '../__fixtures__/text-vault.jsx'
import { StatusPage } from "./pages/status-page.jsx"
import taskStatuses from "../__fixtures__/task-statuses.jsx"

test("create status item", async ({ page }) => {
  const statusPage = new StatusPage(page)
  await statusPage.navigateToLoginPage()
  await statusPage.login(textVault.username, textVault.password)
  await statusPage.navigateToStatusesPage()
  await statusPage.createNewStatus(textVault.statusName, textVault.statusSlug)
  await expect(this.page.locator(`text="${textVault.statusName}"`)).toBeVisible()
  await expect(this.page.locator(`text="${textVault.statusSlug}"`)).toBeVisible()
})

test("status list", async ({ page }) => {
  const statusPage = new StatusPage(page)
  await statusPage.navigateToLoginPage()
  await statusPage.login(textVault.username, textVault.password)
  await statusPage.navigateToStatusesPage()
  for(const taskStatuse of taskStatuses) {
    await expect(
      this.page.locator(`[name="${taskStatuse.Name}", exact=true]`)
    ).toBeVisible()
    await expect(
      this.page.locator(`[name="${taskStatuse.Slug}", exact=true]`)
    ).toBeVisible()
  } 
})

test("edit status", async ({ page }) => {
  const statusPage = new StatusPage(page)
  await statusPage.navigateToLoginPage()
  await statusPage.login(textVault.username, textVault.password)
  await statusPage.navigateToStatusesPage()
  await statusPage.editStatus('Draft', 'ChangedName', 'ChangedSlug')
  await expect(this.page.locator('text="ChangedName"')).toBeVisible()
  await expect(this.page.locator('text="ChangedSlug"')).toBeVisible()
})

test("Edit status from status summary page", async ({ page }) => {
  const statusPage = new StatusPage(page)
  await statusPage.navigateToLoginPage()
  await statusPage.login(textVault.username, textVault.password)
  await statusPage.navigateToStatusesPage()
  await statusPage.createNewStatus(textVault.statusName, textVault.statusSlug)
  await statusPage.editStatusAfterCreation('ChangedName', 'ChangedSlug')
  await expect(this.page.locator('text="ChangedName"')).toBeVisible()
  await expect(this.page.locator('text="ChangedSlug"')).toBeVisible()
})

test("delete status", async ({ page }) => {
  const statusPage = new StatusPage(page)
  await statusPage.navigateToLoginPage()
  await statusPage.login(textVault.username, textVault.password)
  await statusPage.navigateToStatusesPage()
  await statusPage.deleteStatus('Draft')
  await expect(this.page.locator('text="Draft"')).not.toBeVisible()
  await expect(this.page.locator('text="draft"')).not.toBeVisible() 
})

test("delete all status", async ({ page }) => {
  const statusPage = new StatusPage(page)
  await statusPage.navigateToLoginPage()
  await statusPage.login(textVault.username, textVault.password)
  await statusPage.navigateToStatusesPage()
  await statusPage.deleteAllStatuses()
  await expect(this.page.locator('text="No Task statuses yet."')).toBeVisible()
  await expect(this.page.locator('text="Draft"')).not.toBeVisible()
  await expect(this.page.locator('text="draft"')).not.toBeVisible()
})
