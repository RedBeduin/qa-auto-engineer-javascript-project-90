import { test, expect } from '@playwright/test'
import { LabelsPage } from './pages/labels-page.jsx'
import { LoginPage } from './pages/login-page.jsx'
import textVault from '../__fixtures__/text-vault.jsx'
import labels from '../__fixtures__/labels.jsx'

test('create labels', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  const loginPage = new LoginPage(page)
  await loginPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.navigateToLabelsPage()
  await labelsPage.createNewLabel(textVault.labelName)
  await labelsPage.navigateToLabelsPage()
  await expect(page.locator(`text="${textVault.labelName}"`)).toBeVisible()
});

test('labels list', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.navigateToLabelsPage()
  for(const label of labels) {
    await expect(page.locator(`text="${label.Name}"`)).toBeVisible()
  }
})

test('menu of edition of label', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.navigateToLabelsPage()
  await labelsPage.openCard('1')
  await expect(page.locator('input[type="text"]')).toBeVisible({ timeout: 40000, })
  await expect(page.locator('[aria-label="Save"]')).toBeVisible({ timeout: 40000, })
  await expect(page.locator('[aria-label="Delete"]')).toBeVisible({ timeout: 40000, })
})

test('edit labels', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.navigateToLabelsPage()
  await labelsPage.editLabelName('1', textVault.changedLabelName)
  await expect(page.locator(`text="${textVault.changedLabelName}"`)).toBeVisible()
})

test('edit labels from summary screen', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.navigateToLabelsPage()
  await labelsPage.createNewLabel(textVault.labelName)
  await labelsPage.navigateToLabelsPage()
  await labelsPage.showLabelSummaryAndEditLabelName('6', textVault.changedLabelName)
  await expect(page.locator(`text="${textVault.changedLabelName}"`)).toBeVisible()
})

test('delete labels', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.navigateToLabelsPage()
  await labelsPage.deleteLabelAndCancelDeletion(textVault.labelsForDeletionNum1)
  await expect(page.locator(`text="${textVault.labelsForDeletionName1}"`)).toBeVisible()
  await labelsPage.deleteLabel(textVault.labelsForDeletionNum2)
  await expect(page.locator(`text="${textVault.labelsForDeletionName2}"`)).not.toBeVisible()
  await labelsPage.deleteLabel(textVault.labelsForDeletionNum3)
  await expect(page.locator(`text="${textVault.labelsForDeletionName3}"`)).not.toBeVisible()
})

test('delete all labels', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.navigateToLabelsPage()
  await labelsPage.deleteAllLabels()
  await expect(page.locator('text="No Labels yet."')).toBeVisible()
})  
