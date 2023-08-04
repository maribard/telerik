// @ts-nocheck
import { test, expect } from '@playwright/test';
import { BaseUrlPage } from "../pages/base-url-page.ts"
import { HomePage } from "../pages/home-page.ts"


test('Verifying that MK Teams Columns are sorted and displayed', async ({ page }) => {
  const baseUrl = new BaseUrlPage(page)
  await baseUrl.goto()
  await baseUrl.clickSignIn()

  const homePage = new HomePage(page)

  await homePage.verifySortingContactNameColumn()
  await homePage.verifySortingJobTitleColumn()
  await homePage.verifySortingRatingColumn()
  await homePage.verifySortingBudgetColumn()
})

test('Verify that the MK Team table sorted content persists(Contact Name) when switching table pages', async ({ page }) => {
  const baseUrl = new BaseUrlPage(page)
  await baseUrl.goto()
  await baseUrl.clickSignIn()

  const homePage = new HomePage(page)

  await homePage.sortContactNameColumn()
  const sortedDataBefore = await homePage.getSortedDataContactName()
  const sortedTypeBefore = await homePage.getSortedTypeContactName()
  expect(sortedTypeBefore).toEqual("ascending")

  await homePage.goToNextPageOfMkTable()
  await homePage.goToPreviousPageOfMkTable()

  const sortedDataAfter = await homePage.getSortedDataContactName()
  const sortedTypeAfter = await homePage.getSortedTypeContactName()
  expect(sortedTypeAfter).toEqual("ascending")

  expect(sortedDataBefore).toEqual(sortedDataAfter)
})


test('Verify that the date picker can be used and displays a selected date range.', async ({ page }) => {
  const baseUrl = new BaseUrlPage(page)
  await baseUrl.goto()
  await baseUrl.clickSignIn()

  const homePage = new HomePage(page)

  await homePage.inputFirstDateRange()
  let datePickerStartValue = await homePage.getDateRangePickerStartValue()
  let datePickerEndValue = await homePage.getDateRangePickerEndValue()
  expect(datePickerStartValue).toEqual('1/1/2021')
  expect(datePickerEndValue).toEqual('1/8/2021')

  await homePage.inputSecondDateRange()
  datePickerStartValue = await homePage.getDateRangePickerStartValue()
  datePickerEndValue = await homePage.getDateRangePickerEndValue()
  expect(datePickerStartValue).toEqual('1/1/2023')
  expect(datePickerEndValue).toEqual('1/8/2023')

  await homePage.inputThirdDateRange()
  datePickerStartValue = await homePage.getDateRangePickerStartValue()
  datePickerEndValue = await homePage.getDateRangePickerEndValue()
  expect(datePickerStartValue).toEqual('1/1/2077')
  expect(datePickerEndValue).toEqual('1/8/2077')
})
