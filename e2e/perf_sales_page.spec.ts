// @ts-nocheck
import { test, expect } from '@playwright/test';
import { BaseUrlPage } from "../pages/base-url-page.ts"
import { HomePage } from "../pages/home-page.ts"
import { PerformanceSalesPage } from "../pages/performance-sales-page.ts"


test('Verify that the chart is updated(Cost Breakdown)', async ({ page }) => {
  const baseUrl = new BaseUrlPage(page)
  await baseUrl.goto()
  await baseUrl.clickSignIn()

  const homePage = new HomePage(page)
  await homePage.goToPerformanceAndSales()

  const performanceSalesPage = new PerformanceSalesPage(page)
  await performanceSalesPage.deselectInfrastractureCategory()
  await performanceSalesPage.checkThatPieChartDoesntDisplayInfrastructure()

  await performanceSalesPage.selectInfrastractureCategory()
  await performanceSalesPage.checkThatPieChartDisplaysInfrastructure()
})