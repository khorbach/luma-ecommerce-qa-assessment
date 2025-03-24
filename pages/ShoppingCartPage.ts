import { Page, expect } from '@playwright/test';

export class ShoppingCartPage {
  private page: Page;
  private totalPriceSelector = '#cart-totals tr.grand.totals td.amount strong span.price';
  private countryDropdownSelector = 'select[name="country_id"]';
  private regionDropdownSelector = 'select[name="region_id"]';
  private zipCodeInputSelector = 'input[name="postcode"]';
  private estimateButtonSelector = 'button[data-role="estimate-shipping-zip"]';
  private estimateShippingTaxTitleSelector = 'div[aria-controls="block-summary"]';
  private subtotalSelector = 'tr.totals.sub td.amount span.price';
  private orderTotalSelector = 'tr.grand.totals td.amount span.price';

  constructor(page: Page) {
    this.page = page;
  }

  // Expands the "Estimate Shipping and Tax" section if it's not already expanded
  async expandEstimateShippingTaxSection() {
    const title = this.page.locator(this.estimateShippingTaxTitleSelector);
    const isExpanded = await title.getAttribute('aria-expanded');
    if (isExpanded === 'false') {
      await title.click();
    }
  }

  // Estimates shipping and tax by selecting country, region, and filling zip code
  async estimateShippingAndTax(country: string, region: string, zipCode: string) {
    await this.expandEstimateShippingTaxSection();
    // Wait for the estimate shipping form to load
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector(this.countryDropdownSelector, { timeout: 30000 });
    await this.page.locator(this.countryDropdownSelector).selectOption({ label: country });
    await this.page.locator(this.regionDropdownSelector).selectOption({ label: region });
    await this.page.locator(this.zipCodeInputSelector).fill(zipCode);
    if (await this.page.locator(this.estimateButtonSelector).isVisible({ timeout: 5000 })) {
      await this.page.locator(this.estimateButtonSelector).click();
    }
    // Wait until the order total element shows order total price 
    await expect(this.page.locator(this.totalPriceSelector)).toHaveText(/^\$\d+(\.\d{2})?$/, { timeout: 15000 });
  }

  // Returns the current shipping
  async getTotalPriceAfterEstimate(): Promise<string> {
    const price = await this.page.locator(this.totalPriceSelector).textContent();
    return price || '';
  }

  // Returns the current subtotal
  async getSubtotal(): Promise<string> {
    await this.page.waitForSelector(this.subtotalSelector, { timeout: 10000 });
    const subtotal = await this.page.locator(this.subtotalSelector).textContent();
    return subtotal?.trim() || '';
  }

  // Returns the current order total
  async getOrderTotal(): Promise<string> {
    await this.page.waitForSelector(this.orderTotalSelector, { timeout: 10000 });
    const orderTotal = await this.page.locator(this.orderTotalSelector).textContent();
    return orderTotal?.trim() || '';
  }

  // Verifies that the flat rate shipping method displays the expected price
  async verifyFlatRateShippingMethod(expectedPrice: string): Promise<boolean> {
    const flatRatePrice = await this.page.locator('label[for="s_method_flatrate_flatrate"] .price').first().textContent();
    return flatRatePrice?.trim() === expectedPrice;
  }
}
