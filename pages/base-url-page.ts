// @ts-nocheck
import { expect, type Locator, type Page } from '@playwright/test';
import { testData } from "../e2e/testData.ts";


export class BaseUrlPage {
  readonly page: Page;
  readonly button: Locator

  constructor(page: Page) {
    this.page = page;
    this.button = page.locator('.dashboard-button button')
  }

  async goto() {
    await this.page.goto(testData.baseUrl);
  }

  async clickSignIn() {
    await expect(this.button).toBeVisible();
    await this.button.click();
  }
}