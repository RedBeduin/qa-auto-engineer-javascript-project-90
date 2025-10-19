import { expect } from '@playwright/test'
import textVault from '../../__fixtures__/text-vault.jsx'
import taskStatuses from '../../__fixtures__/task-statuses.jsx'

export class TaskStatusesPage {
  constructor(page) {
    this.page = page;
    this.createStatusButton = this.page.getByLabel('Create', { exact: true })
    this.createStatusName = this.page.getByLabel('Name')
    this.createStatusSlug = this.page.getByLabel('Slug')
    this.saveStatus = this.page.getByLabel('Save')
    this.saveSuccess = this.page.getByText('Element created')
    this.saveDeleteButton = this.page.getByText('SaveDelete')
    this.showButtonStatusCreate = this.page.getByLabel('Show')
    this.editButton = this.page.getByLabel('Edit')
    this.deleteButton = this.page.getByLabel('Delete')
    this.undoButton = this.page.getByRole('button', { name: 'Undo' })
    this.checkEach = page.getByLabel('Select all')
    this.itemSelected = this.page.getByRole('heading', {
      name: 'items selected',
    })
    this.checkStatus1 = this.page.getByRole('row', {
      name: `Select this row ${textVault.statusForDeletion1}`,
    })
    this.checkStatus2 = this.page.getByRole('row', {
      name: `Select this row ${textVault.statusForDeletion2}`,
    })
    this.checkStatus3 = this.page.getByRole('row', {
      name: `Select this row ${textVault.statusForDeletion3}`,
    })

    this.noTaskStatus = this.page.getByText('No Task status yet.')
  }

  async checkStatuses(page) {
    for (const taskStatuse of taskStatuses) {
      await expect(
        page.getByText(taskStatuse.Name, { exact: true })
      ).toBeVisible()
      await expect(
        page.getByText(taskStatuse.Slug, { exact: true })
      ).toBeVisible()
    }
  }
}
