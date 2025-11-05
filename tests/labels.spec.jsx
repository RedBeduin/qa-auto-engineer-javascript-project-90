import { test } from '@playwright/test'
import { LabelsPage } from './pages/labels-page.jsx'
import textVault from '../__fixtures__/text-vault.jsx'
import labels from '../__fixtures__/labels.jsx'

test('create labels', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login('username', 'password')
  await labelsPage.clickLabelsOptionInMainMenu()
  await labelsPage.createNewLabel('TestLabel')
  expect(`text="TestLabel"`).toBeVisible()
});

test('labels list', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login('username', 'password')
  await labelsPage.clickLabelsOptionInMainMenu()
  labels.map(async(label) => {
    await expect(`text=${label.Name}, exact=true`).toBeVisible()
  })
})

test('menu of edition of label', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login('username', 'password')
  await labelsPage.clickLabelsOptionInMainMenu()
  await labelsPage.openCard('1')
  expect(`[aria-label="Name"]`).toBeVisible()
  expect(`[aria-label="Save"]`).toBeVisible()
  expect(`[aria-label="Delete"]`).toBeVisible()
})

test('edit labels', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login('username', 'password')
  await labelsPage.clickLabelsOptionInMainMenu()
  await labelsPage.editLabelName('1', 'ChangedName')
  expect(`text="ChangedName"`).toBeVisible()
})

test('edit labels from summary screen', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login('username', 'password')
  await labelsPage.clickLabelsOptionInMainMenu()
  await labelsPage.createNewLabel('TestLabel')
  await labelsPage.showLabelSummaryAndEditLabelName('6', 'ChangedName')
  expect(`text="ChangedName"`).toBeVisible()
})

test('delete labels', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login('username', 'password')
  await labelsPage.clickLabelsOptionInMainMenu()
  await labelsPage.deleteLabelsAndCancelDeletion([textVault.labelsForDeletion1[0]])
  expect(`text="${textVault.labelsForDeletion1[0]}"`).toBeVisible()
  await labelsPage.deleteLabels([textVault.labelsForDeletion2[0], labelsForDeletion3[0]])
  expect(`text="${textVault.labelsForDeletion2[0]}"`).not.toBeVisible() 
  expect(`text="${textVault.labelsForDeletion3[0]}"`).not.toBeVisible()
})

test('delete all labels', async ({ page }) => {
  const labelsPage = new LabelsPage(page)
  await labelsPage.navigateToLoginPage()
  await labelsPage.login('username', 'password')
  await labelsPage.clickLabelsOptionInMainMenu()
  await labelsPage.deleteAllLabels()
  await this.page.check(`text="No Label yet."`)
})  
