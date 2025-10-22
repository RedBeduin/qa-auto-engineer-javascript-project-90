import { expect } from '@playwright/test'
import tasks from '../../__fixtures__/tasks'
import textVault from '../../__fixtures__/text-vault'

export class TasksPage {
  constructor(page) {
    this.page = page
    this.createLabelsButton = this.page.getByLabel('Create', { exact: true })
    this.createAssignee = this.page.getByLabel('Assignee', { exact: true })
    this.createTitle = this.page.getByLabel('Title', { exact: true })
    this.createContent = this.page.getByLabel('Content', { exact: true })
    this.createStatus = this.page.getByLabel('Status')
    this.createLabel = this.page.getByLabel('Label')
    this.tasksSave = this.page.getByLabel('Save')
    this.saveSuccess = this.page.getByText('Element created')
    this.successUpdate = this.page.getByText('Element updated')
    this.successDelete = this.page.getByText('Element deleted')
    this.filterAssignee = this.page.getByRole('combobox', {
      name: 'Assignee',
    })
    this.filterStatus = this.page.getByRole('combobox', { name: 'Status' })
    this.filterLabel = this.page.getByRole('combobox', { name: 'Label' })
    
    this.editTask1 = this.page
      .getByRole('button', { name: textVault.task1 })
      .getByLabel('Edit')

    this.editTask2 = this.page
      .getByRole('button', { name: textVault.task2 })
      .getByLabel('Edit')

    this.editTask3 = this.page
      .getByRole('button', { name: textVault.task3 })
      .getByLabel('Edit')

    this.showTask = this.page
      .getByRole('button', { name: textVault.task1 })
      .getByLabel('Show')

    this.task1 = this.page.getByRole('button', {
      name: textVault.task1,
    })

    this.task4 = this.page.getByRole('button', {
      name: textVault.task4,
    })

    this.task6 = this.page.getByRole('button', {
      name: textVault.task6,
    })

    this.task7 = this.page.getByRole('button', {
      name: textVault.task7,
    })

    this.task10 = this.page.getByRole('button', {
      name: textVault.task10,
    })

    this.task15 = this.page.getByRole('button', {
      name: textVault.task15,
    })
    
    this.deleteButton = this.page.getByLabel('Delete')
    this.undoButton = this.page.getByRole('button', { name: 'Undo' })
    this.valueAssignee = this.page.getByRole('combobox', {
      name: textVault.valueAssignee,
    })
    this.сlearValue = this.page.getByRole('option', { name: textVault.clearValue })
  }

  async checkTasks(page) {
    for (const task of tasks) {
      await expect(page.getByRole('button', { name: task.name })).toBeVisible()
    }
  }
}
