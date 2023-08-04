// @ts-nocheck
import { test, expect } from '@playwright/test';
import { BaseUrlPage } from "../pages/base-url-page.ts"
import { HomePage } from "../pages/home-page.ts"
import { SettingsPage } from "../pages/settings-page.ts"
import { testData } from "../e2e/testData.ts"


test('Verify that a user cannot update their account information without providing a password', async ({ page }) => {
  const baseUrl = new BaseUrlPage(page)
  await baseUrl.goto()
  await baseUrl.clickSignIn()

  const homePage = new HomePage(page)
  await homePage.goToSettings()

  const settingsPage = new SettingsPage(page)
  await settingsPage.updateUserName(testData.username)
  await settingsPage.updateNickName(testData.nickname)
  await settingsPage.verifyThatBtnSaveChangesNotClickable()
})

test('Verify that a user can update their account information only after providing a password', async ({ page }) => {
    const baseUrl = new BaseUrlPage(page)
    await baseUrl.goto()
    await baseUrl.clickSignIn()
  
    const homePage = new HomePage(page)
    await homePage.goToSettings()
  
    const settingsPage = new SettingsPage(page)
    await settingsPage.updateUserName(testData.username)
    await settingsPage.updateNickName(testData.nickname)
    await settingsPage.providePassword(testData.password)
    await settingsPage.verifyThatBtnSaveChangesIsClickable()
  })