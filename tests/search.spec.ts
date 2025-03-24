import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import testData from '../data/testData.json';

test.describe.parallel('Search Functionality', () => {

  // Loop through valid cases
  testData.search.validCases.forEach(({ query, expectedCount }) => {
    test(`TC-01 & TC-02 | Valid Search - ${query}`, async ({ page }) => {

      // Step 1 Open the home page
      const searchPage = new SearchPage(page);
      await searchPage.navigate();

      // Step 2 & 3 Enter a valid search query into the Search field and click the Search button
      await searchPage.searchForProduct(query);

      // Step 4 Verify that search results are displayed
      const count = await searchPage.getProductResultsCount();
      expect(count).toBe(expectedCount);
    });
  });

  // Loop through invalid cases
  testData.search.invalidCases.forEach(({ query }) => {
    test(`TC-03 & TC-04 & TC-05 | Invalid Search - ${query}`, async ({ page }) => {

      // Step 1 Open the home page
      const searchPage = new SearchPage(page);

      // Step 2 & 3 Enter an invalid search query into the Searh field and click Search button
      await searchPage.navigate();
      await searchPage.searchForProduct(query);

      // Step 4 Verify that no search results are returned
      const isNoResultsVisible = await searchPage.isNoResultsMessageVisible();
      expect(isNoResultsVisible).toBeTruthy();
    });
  });

  // Loop through empty cases
  testData.search.emptyCases.forEach(({ query, checkSearchButton }) => {
    test(`TC-06 | Empty Search ${query}`, async ({ page }) => {

      // Step 1 Open the home page
      const searchPage = new SearchPage(page);

      // Step 2 & 3 Enter an empty query into the Search field and click Search button
      await searchPage.navigate();
      await searchPage.searchForProduct(query);

      // Step 4 Verify that the search action is prevented
      if (checkSearchButton) {
        const isSearchButtonVisible = await searchPage.isSearchButtonVisible();
        expect(isSearchButtonVisible).toBeTruthy();
      }
    });
  });
});
