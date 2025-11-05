import { test } from "@playwright/test"
import { StatusPage } from "./pages/status-page.jsx"
import taskStatuses from "../__fixtures__/task-statuses.jsx"

test("create status item", async ({ page }) => {
  const statusPage = new StatusPage(page)
  await statusPage.navigateToLoginPage()
  await statusPage.login('Username', 'Password')
  await statusPage.navigateToStatusesPage()
  await statusPage.createNewStatus('StatusName', 'StatusSlug')
  expect(`text="StatusName"`).toBeVisible()
  expect(`text="StatusSlug"`).toBeVisible()
})

test("status list", async ({ page }) => {
  const statusPage = new StatusPage(page)
  await statusPage.navigateToLoginPage()
  await statusPage.login('Username', 'Password')
  await statusPage.navigateToStatusesPage()
  for(const taskStatuse of taskStatuses) {
    expect(
      `[name=${taskStatuse.Name}, exact=true]`
    ).toBeVisible()
    expect(
      `[name=${taskStatuse.Slug}, exact=true]`
    ).toBeVisible()
  } 
})

test("edit status", async ({ page }) => {
  const statusPage = new StatusPage(page)
  await statusPage.navigateToLoginPage()
  await statusPage.login('Username', 'Password')
  await statusPage.navigateToStatusesPage()
  await statusPage.editStatus('Draft', 'ChangedName', 'ChangedSlug')
  expect(`text="ChangedName"`).toBeVisible()
  expect(`text="ChangedSlug"`).toBeVisible()
})

test("Edit status from status summary page", async ({ page }) => {
  const statusPage = new StatusPage(page)
  await statusPage.navigateToLoginPage()
  await statusPage.login('Username', 'Password')
  await statusPage.navigateToStatusesPage()
  await statusPage.createNewStatus('StatusName', 'StatusSlug')
  await statusPage.editStatusAfterCreation('ChangedName', 'ChangedSlug')
  expect(`text="ChangedName"`).toBeVisible()
  expect(`text="ChangedSlug"`).toBeVisible()
})

test("delete status", async ({ page }) => {
  const statusPage = new StatusPage(page)
  await statusPage.navigateToLoginPage()
  await statusPage.login('Username', 'Password')
  await statusPage.navigateToStatusesPage()
  await statusPage.deleteStatus('Draft')
  expect(`text="Draft"`).not.toBeVisible()
  expect(`text="draft"`).not.toBeVisible() 
})

test("delete all status", async ({ page }) => {
  const statusPage = new StatusPage(page)
  await statusPage.navigateToLoginPage()
  await statusPage.login('Username', 'Password')
  await statusPage.navigateToStatusesPage()
  await statusPage.deleteAllStatuses()
  expect(`text="No Task statuses yet."`).toBeVisible()
  expect(`text="Draft"`).not.toBeVisible()
  expect(`text="draft"`).not.toBeVisible()
})
