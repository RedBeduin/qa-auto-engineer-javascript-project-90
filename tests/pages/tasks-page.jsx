import { expect } from '@playwright/test'
import tasks from '../../__fixtures__/tasks'
import textVault from '../../__fixtures__/text-vault'

export class TasksPage {
  constructor(page) {
    this.page = page
  }
  
  createLabelsButton = `[aria-label="Create", exact=true]`
  createAssignee = `[aria-label="Assignee", exact=true]`
  createTitle = `[aria-label='Title', exact=true]`
  createContent = `[aria-label="Content", exact=true]`
  createStatus = `[aria-label="Status"]`
  createLabel = `[aria-label="Label"]`
  tasksSave = `[aria-label="Save"]`
  saveSuccess = `text="Element created"`
  successUpdate = `text="Element updated"`
  successDelete = `text="Element deleted"`
  filterAssignee = `combobox[name="Assignee"]`
  filterStatus = `combobox[name="Status"]`
  filterLabel = `combobox[name="Label"]`    
  editTask1 = `button[name="${textVault.task1}"], [aria-label="Edit"]`
  editTask2 = `button[name="${textVault.task2}"], [aria-label="Edit"]`
  editTask3 = `button[name="${textVault.task3}"], [aria-label="Edit"]`
  showTask1 = `button[name="${textVault.task1}"], [aria-label="Show"]`
  task1 = `button[name="${textVault.task1}"]`
  task4 = `button[name="${textVault.task4}"]`
  task6 = `button[name="${textVault.task6}"]`
  task7 = `button[name="${textVault.task7}"]`
  task10 = `button[name="${textVault.task10}"]`
  task15 = `button[name="${textVault.task15}"]`
  deleteButton = `[aria-label="Delete"]`
  undoButton = `button[name="Undo"]`
  valueAssignee = `combobox[name="${textVault.valueAssignee}"]`
  сlearValue = `option[name="${textVault.clearValue}"]`
  
  async checkTasks() {
    for (const task of tasks) {
      await expect(`button[name=${task.name}]`).toBeVisible()
    }
  }
}
