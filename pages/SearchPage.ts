import { Page } from '@playwright/test';

export class SearchPage {
  private page: Page;
  private searchInput = 'input[name="q"]'; 
  private searchButton = 'button[type="submit"][title="Search"][aria-label="Search"]';  
  private itemsAmount = '#toolbar-amount .toolbar-number'; 
  private noResultsMessage = 'text="Your search returned no results."';

  constructor(page: Page) {
    this.page = page;
  }

  // Method to navigate to the home page and wait for the page to load completely
  async navigate() {
    await this.page.goto('https://magento.softwaretestingboard.com/', { waitUntil: 'load' });

    // If a pravicy policy popup appears, handle it
    const agreeButton = this.page.locator('button[mode="primary"]:has-text("AGREE")');
    if (await agreeButton.isVisible()) {
      await agreeButton.click();
    }
  }

  // Method to search for a product
  async searchForProduct(query: string) {
    // Fill in the search input with the query
    await this.page.fill(this.searchInput, query);

    // Wait for the search button to become visible
    const searchButtonLocator = this.page.locator(this.searchButton);
    await searchButtonLocator.waitFor({ state: 'visible' });

    // Wait until the search button is not disabled (enabled)
    await this.page.waitForFunction(
      (buttonSelector) => {
        const button = document.querySelector(buttonSelector);
        return button && !button.hasAttribute('disabled');
      },
      this.searchButton
    );

    // Click the search button
    await searchButtonLocator.click();

    // Wait for the page to load results and make sure the "search results for" title is displayed
    await this.page.waitForSelector('span.base[data-ui-id="page-title-wrapper"]', { timeout: 10000 });
  }

  // Method to get the product results count or check if "no results" message is displayed
  async getProductResultsCount() {
    // Wait for the "no results" message or the items amount to be visible
    const isNoResultsVisible = await this.isNoResultsMessageVisible();

    if (isNoResultsVisible) {
      const noResultsText = await this.page.locator(this.noResultsMessage).textContent();
      console.log(noResultsText);
      return 0; 
    } else {
      // If there are results, wait for the items amount to be visible
      await this.page.waitForSelector(this.itemsAmount, { timeout: 10000 });

      const countText = await this.page.locator(this.itemsAmount).allTextContents();
      const totalCountText = countText[countText.length - 1]; 
      const totalCount = parseInt(totalCountText.trim(), 10);
      return totalCount || 0;
    }
  }

  // Method to check if the "no results" message is visible
  async isNoResultsMessageVisible() {
    const noResultsMessageLocator = this.page.locator(this.noResultsMessage);
    try {
      await noResultsMessageLocator.waitFor({ state: 'visible', timeout: 5000 });
      return await noResultsMessageLocator.isVisible();
    } catch (error) {
      return false; 
    }
  }

  // Method to check if the search button is visible
  async isSearchButtonVisible() {
    const searchButtonLocator = this.page.locator(this.searchButton);
    await searchButtonLocator.waitFor({ state: 'visible' });
    return await searchButtonLocator.isVisible();
  }
}
