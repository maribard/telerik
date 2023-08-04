// @ts-nocheck
import { expect, type Locator, type Page } from '@playwright/test'

export class PerformanceSalesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.pieChartInfrastracture = page.locator(".k-chart-surface g:nth-child(6) path[fill='#4B5FFA']")
    this.categoryInfrastractureBtn = page.locator(".k-chart-surface g:nth-child(5) path[d='M0 0 L 105 0 105 17 0 17Z']")
    this.pieChartInfrastractureStr = ".k-chart-surface g:nth-child(5) path[d='M0 0 L 105 0 105 17 0 17Z']"
  }

  async deselectInfrastractureCategory() {
    expect(await this.pieChartInfrastracture.count()).toEqual(1)
    await this.categoryInfrastractureBtn.click()
  }

  async checkThatPieChartDoesntDisplayInfrastructure() {
    expect(await this.pieChartInfrastracture.count()).toEqual(0)
  }

  async selectInfrastractureCategory() {
    expect(await this.pieChartInfrastracture.count()).toEqual(0)
    await this.categoryInfrastractureBtn.click()
  }

  async checkThatPieChartDisplaysInfrastructure() {
    await this.page.waitForSelector(this.pieChartInfrastractureStr)
    expect(await this.pieChartInfrastracture.count()).toEqual(1)
  }


}


