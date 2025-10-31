import { expect } from '@playwright/test'
import labels from '../../__fixtures__/labels.jsx'
import textVault from '../../__fixtures__/text-vault.jsx'

export class LabelsPage {
  constructor(page) {
    this.page = page
  }
  
  createLabelsButton = `[aria-label="Create", exact=true]`
  createLabelsName = `[aria-label="Name"]`
  saveStatus = `[aria-label="Save"]`
  saveSuccess = `text="Element created"`
  saveDeleteButton = `text="SaveDelete"`
  showButtonStatusCreate = `[aria-label="Show"]`
  editButton = `[aria-label="Edit"]`
  deleteButton = `[aria-label="Delete"]`
  undoButton = `button[name="Undo"]`
  checkEach = `[aria-label="Select all"]`
  labelSelected = `heading[name="items selected"]`
  checkLabels1 = `row[name="Select this row ${textVault.labelsForDeletion1}"]`
  checkLabels2 = `row[name="Select this row ${textVault.labelsForDeletion2}"]`
  checkLabels3 = `row[name="Select this row ${textVault.labelsForDeletion3}"]`
  noLabelsStatus = `text="No Label yet."`
  
  async checkLabels() {
    for (const label of labels) {
      await expect(`text=${label.Name}, exact=true`).toBeVisible()
    }
  } 
}
