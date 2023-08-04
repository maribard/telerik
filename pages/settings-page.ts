// @ts-nocheck
import { expect, type Locator, type Page } from '@playwright/test'

export class SettingsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.inputUserName = page.locator("input[name='username']")
    this.inputNickName = page.locator("input[name='nickname']")
    this.saveChangesButton = page.locator("div[class='k-form-buttons f-buttons'] div button:nth-child(2)")
    this.inputPassword = page.locator(".k-form-fieldset div:nth-child(1) input[type='password']")    
}

  async updateUserName(value) {
    await this.inputUserName.fill(value)
  }

  async updateNickName(value) {
    await this.inputNickName.fill(value)
  }

  async verifyThatBtnSaveChangesNotClickable() {
    const button = this.saveChangesButton
    await expect(button).toBeDisabled()
  }

  async providePassword(value) {
    await this.inputPassword.fill(value)
  }

  async verifyThatBtnSaveChangesIsClickable() {
    const button = this.saveChangesButton
    await expect(button).toBeEnabled()
  }

}