// @ts-nocheck
import { expect, type Locator, type Page } from '@playwright/test'
import { testData } from "../e2e/testData.ts"
import { getSortDirection, getSortDirectionForRangeColumn } from "../helpers/functions.ts"

export class HomePage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
    this.contactNameTh = page.locator(".k-grid-header-wrap table tr[aria-rowindex='2'] th[aria-colindex='2']")
    this.contactNameRow = page.locator("table.k-grid-table tr[role='row'] span.person-name")
    this.nextPageButton = page.locator("a[title='Go to the next page']")
    this.lastPageButton = page.locator("a[title='Go to the last page']")
    this.previousPageButton = page.locator("a[title='Go to the previous page']")
    this.firstPageButton = page.locator("a[title='Go to the first page']")

    this.jobTitleThButton = page.locator(".k-grid-header-wrap table tr[aria-rowindex='1'] th[aria-colindex='3'] span.k-link")
    this.jobTitleTh = page.locator(".k-grid-header-wrap table tr[aria-rowindex='1'] th[aria-colindex='3']")
    this.jobTitleRow = page.locator("table.k-grid-table tr[role='row'] td[aria-colindex='3']")

    this.ratingRow = page.locator("table.k-grid-table tr[role='row'] span[role='slider']")
    this.ratingTh = page.locator(".k-grid-header-wrap table tr[aria-rowindex='2'] th[aria-colindex='4']")

    this.budgetThButton = page.locator(".k-grid-header-wrap table tr[aria-rowindex='1'] th[aria-colindex='5'] span.k-link")
    this.budgetTh = page.locator(".k-grid-header-wrap table tr[aria-rowindex='1'] th[aria-colindex='5']")
    this.budgetRow = page.locator("table.k-grid-table tr[role='row'] td[aria-colindex='5']")

    this.dateRangePickerStart = page.locator(".k-daterangepicker>span:nth-child(1) input:nth-child(1)")
    this.dateRangePickerEnd = page.locator(".k-daterangepicker>span:nth-child(2) input:nth-child(1)")
    this.calendarHeader = page.locator("div[class='k-calendar-header k-hstack'] span.k-button-text")
    this.calendarHeader = page.locator("div[class='k-calendar-header k-hstack'] span.k-button-text")
    this.calendarBody2023 = page.locator(".k-calendar-tbody td[title='2023']")
    this.calendarBody2023Jan = page.locator(".k-calendar-tbody td[title='2023 Jan']")
    this.calendarBody2023Jan1 = page.locator(".k-calendar-tbody td[title='Sunday, January 1, 2023']")
    this.calendarBody2023Jan8 = page.locator(".k-calendar-tbody td[title='Sunday, January 8, 2023']")

    this.calendarBody2021Jan = page.locator(".k-calendar-tbody td[title='2021 Jan']")
    this.calendarBody2021Jan1 = page.locator(".k-calendar-tbody td[title='Friday, January 1, 2021']")
    this.calendarBody2021Jan8 = page.locator(".k-calendar-tbody td[title='Friday, January 8, 2021']")
    this.totalPointsLabel = page.locator(".card-buttons p")

    this.calendarBody2070 = page.locator(".k-calendar-tbody td[title='2070']")
    this.calendarBody2077 = page.locator(".k-calendar-tbody td[title='2077']")
    this.calendarBody2077Jan = page.locator(".k-calendar-tbody td[title='2077 Jan']")
    this.calendarBody2077Jan1 = page.locator(".k-calendar-tbody td[title='Friday, January 1, 2077']")
    this.calendarBody2077Jan8 = page.locator(".k-calendar-tbody td[title='Friday, January 8, 2077']")
    this.performaceAndSalesButton = page.locator("li[route='/home/performance-and-sales']")
    this.settingsButton = page.locator("li[route='/home/account']")
  }

  async goto() {
    await this.page.goto(testData.homePageUrl);
  }

  async goToPerformanceAndSales() {
    await this.performaceAndSalesButton.click();
  }

  async goToSettings() {
    await this.settingsButton.click();
  }

  async verifySortingContactNameColumn() {
    await this.contactNameTh.click()
    let sortedData = await this.contactNameRow.allTextContents()
    let sortType = await this.contactNameTh.getAttribute("aria-sort")
    await this.checkSortedData(sortedData, sortType, "ascending")

    await this.lastPageButton.click()
    sortedData = await this.contactNameRow.allTextContents()
    sortType = await this.contactNameTh.getAttribute("aria-sort")
    await this.checkSortedData(sortedData, sortType, "ascending")

    await this.contactNameTh.click()
    sortedData = await this.contactNameRow.allTextContents()
    sortType = await this.contactNameTh.getAttribute("aria-sort")
    await this.checkSortedData(sortedData, sortType, "descending")

    await this.firstPageButton.click()
    sortedData = await this.contactNameRow.allTextContents()
    sortType = await this.contactNameTh.getAttribute("aria-sort")
    await this.checkSortedData(sortedData, sortType, "descending")

    await this.contactNameTh.click()
  }

  async verifySortingJobTitleColumn() {
    await this.jobTitleThButton.click()
    let sortedData = await this.jobTitleRow.allTextContents()
    let sortType = await this.jobTitleTh.getAttribute("aria-sort")
    await this.checkSortedData(sortedData, sortType, "ascending")

    await this.lastPageButton.click()
    sortedData = await this.jobTitleRow.allTextContents()
    sortType = await this.jobTitleTh.getAttribute("aria-sort")
    await this.checkSortedData(sortedData, sortType, "ascending")

    await this.jobTitleThButton.click()
    sortedData = await this.jobTitleRow.allTextContents()
    sortType = await this.jobTitleTh.getAttribute("aria-sort")
    await this.checkSortedData(sortedData, sortType, "descending")

    await this.firstPageButton.click()
    sortedData = await this.jobTitleRow.allTextContents()
    sortType = await this.jobTitleTh.getAttribute("aria-sort")
    await this.checkSortedData(sortedData, sortType, "descending")

    await this.jobTitleThButton.click()
  }

  async verifySortingRatingColumn() {
    await this.ratingTh.click()

    let listOfSortedData = []
    let sortedData = await this.ratingRow
    let count = await sortedData.count()
    for (let i = 0; i < count; i++) {
      listOfSortedData.push(await sortedData.nth(i).getAttribute('aria-valuenow'))
    }
    let sortType = await this.ratingTh.getAttribute("aria-sort")
    await this.checkSortedData(listOfSortedData, sortType, "ascending")

    await this.lastPageButton.click()
    listOfSortedData = []
    sortedData = await this.ratingRow
    count = await sortedData.count()
    for (let i = 0; i < count; i++) {
      listOfSortedData.push(await sortedData.nth(i).getAttribute('aria-valuenow'))
    }
    sortType = await this.ratingTh.getAttribute("aria-sort")
    await this.checkSortedData(listOfSortedData, sortType, "ascending")

    await this.ratingTh.click()
    listOfSortedData = []
    sortedData = await this.ratingRow
    count = await sortedData.count()
    for (let i = 0; i < count; i++) {
      listOfSortedData.push(await sortedData.nth(i).getAttribute('aria-valuenow'))
    }
    sortType = await this.ratingTh.getAttribute("aria-sort")
    await this.checkSortedData(listOfSortedData, sortType, "descending")
    
    await this.firstPageButton.click()
    listOfSortedData = []
    sortedData = await this.ratingRow
    count = await sortedData.count()
    for (let i = 0; i < count; i++) {
      listOfSortedData.push(await sortedData.nth(i).getAttribute('aria-valuenow'))
    }

    sortType = await this.ratingTh.getAttribute("aria-sort")
    await this.checkSortedData(listOfSortedData, sortType, "descending")
    await this.ratingTh.click()
  }

  async verifySortingBudgetColumn() {
    await this.budgetThButton.click()
    let sortedData = await this.budgetRow.allTextContents()
    let sortType = await this.budgetTh.getAttribute("aria-sort")
    await this.checkSortedDataForRange(sortedData, sortType, "ascending")

    await this.lastPageButton.click()
    sortedData = await this.budgetRow.allTextContents()
    sortType = await this.budgetTh.getAttribute("aria-sort")
    await this.checkSortedDataForRange(sortedData, sortType, "ascending")

    await this.budgetThButton.click()
    sortedData = await this.budgetRow.allTextContents()
    sortType = await this.budgetTh.getAttribute("aria-sort")
    await this.checkSortedDataForRange(sortedData, sortType, "descending")

    await this.firstPageButton.click()
    sortedData = await this.budgetRow.allTextContents()
    sortType = await this.budgetTh.getAttribute("aria-sort")
    await this.checkSortedDataForRange(sortedData, sortType, "descending")
    await this.budgetThButton.click()
  }

  async checkSortedData(sortedData, sortType, expectedType) {
    expect(getSortDirection(sortedData) === expectedType || getSortDirection(sortedData) === "allEquall").toBeTruthy();
    expect(sortType).toEqual(expectedType)
  }

  async checkSortedDataForRange(sortedData, sortType, expectedType) {
    expect(getSortDirectionForRangeColumn(sortedData) === expectedType || getSortDirection(sortedData) === "allEquall").toBeTruthy();
    expect(sortType).toEqual(expectedType)
  }

  async sortContactNameColumn() {
    await this.contactNameTh.click()
  }

  async getSortedDataContactName() {
    return await this.contactNameRow.allTextContents()
  }

  async getSortedTypeContactName() {
    return await this.contactNameTh.getAttribute("aria-sort")
  }

  async goToNextPageOfMkTable() {
    await this.nextPageButton.click()
  }

  async goToPreviousPageOfMkTable() {
    await this.previousPageButton.click()
  }

  async inputFirstDateRange() {
    await this.dateRangePickerStart.click()
    await this.calendarHeader.click()
    await this.calendarBody2021Jan.click()
    await this.calendarBody2021Jan1.click()
    await this.calendarBody2021Jan8.click()
    await this.totalPointsLabel.click()
  }

  async inputSecondDateRange() {
    await this.dateRangePickerStart.click()
    await this.calendarHeader.click()
    await this.calendarHeader.click()
    await this.calendarBody2023.click()
    await this.calendarBody2023Jan.click()
    await this.calendarBody2023Jan1.click()
    await this.calendarBody2023Jan8.click()
    await this.totalPointsLabel.click()
  }

  async inputThirdDateRange() {
    await this.dateRangePickerStart.click()
    await this.calendarHeader.click()
    await this.calendarHeader.click()
    await this.calendarHeader.click()
    await this.calendarBody2070.click()
    await this.calendarBody2077.click()
    await this.calendarBody2077Jan.click()
    await this.calendarBody2077Jan1.click()
    await this.calendarBody2077Jan8.click()
    await this.totalPointsLabel.click()
  }
  
  async getDateRangePickerStartValue() {
    return await this.dateRangePickerStart.getAttribute("value")
  }

  async getDateRangePickerEndValue() {
    return await this.dateRangePickerEnd.getAttribute("value")
  }

    
  
}