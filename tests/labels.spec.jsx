import { test, expect } from '@playwright/test'
import { LabelsPage } from './pages/labels-page.jsx'
import textVault from '../__fixtures__/text-vault.jsx'
import labels from '../__fixtures__/labels.jsx'

test('create labels', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.clickLabelsOptionInMainMenu()
  await labelsPage.createNewLabel(textVault.labelName)
  await expect(page.locator(`text="${labelName}"`)).toBeVisible()
});

test('labels list', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.clickLabelsOptionInMainMenu()
  labels.map(async(label) => {
    await expect(page.locator(`text="${label.Name}", exact=true`)).toBeVisible()
  })
})

test('menu of edition of label', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.clickLabelsOptionInMainMenu()
  await labelsPage.openCard('1')
  await expect(page.locator('[aria-label="Name"]')).toBeVisible()
  await expect(page.locator('[aria-label="Save"]')).toBeVisible()
  await expect(page.locator('[aria-label="Delete"]')).toBeVisible()
})

test('edit labels', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.clickLabelsOptionInMainMenu()
  await labelsPage.editLabelName('1', textVault.changedLabelName)
  await expect(page.locator(`text="${textVault.changedLabelName}"`)).toBeVisible()
})

test('edit labels from summary screen', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.clickLabelsOptionInMainMenu()
  await labelsPage.createNewLabel(textVault.labelName)
  await labelsPage.showLabelSummaryAndEditLabelName('6', textVault.changedLabelName)
  await expect(page.locator(`text="${textVault.changedLabelName}"`)).toBeVisible()
})

test('delete labels', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.clickLabelsOptionInMainMenu()
  await labelsPage.deleteLabelsAndCancelDeletion([textVault.labelsForDeletion1[0]])
  await expect(page.locator(`text="${textVault.labelsForDeletion1[0]}"`)).toBeVisible()
  await labelsPage.deleteLabels([textVault.labelsForDeletion2[0], labelsForDeletion3[0]])
  await expect(page.locator(`text="${textVault.labelsForDeletion2[0]}"`)).not.toBeVisible() 
  await expect(page.locator(`text="${textVault.labelsForDeletion3[0]}"`)).not.toBeVisible()
})

test('delete all labels', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login(textVault.username, textVault.password)
  await labelsPage.clickLabelsOptionInMainMenu()
  await labelsPage.deleteAllLabels()
  await page.expect(this.page.locator('text="No Label yet."')).toBeVisible()
})  
