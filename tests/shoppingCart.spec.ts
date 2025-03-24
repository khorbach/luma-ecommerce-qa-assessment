import { test, expect } from '@playwright/test';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import testData from '../data/testData.json';

test('TC-07 | Shopping Cart Functionality', async ({ page }) => {

  // Step 1 & 2 Open the home page and search for the product 
  await test.step('Search for product, select options, and add to cart', async () => {
    await page.goto('https://magento.softwaretestingboard.com/');

    const searchInput = page.locator('input[name="q"]');
    await searchInput.fill(testData.search.validCases[0].query);
    await searchInput.press('Enter');

    const productLink = page.locator('strong.product-item-name a', { hasText: testData.shoppingCart.product.name });
    await productLink.waitFor({ state: 'visible', timeout: 30000 });
    await expect(productLink).toBeVisible({ timeout: 10000 });
    await productLink.click();

    const productName = page.locator('h1.page-title span');
    await expect(productName).toHaveText(testData.shoppingCart.product.name);

    // Step 3 Select the correct size and color
    const sizeOption = page.locator(`div.swatch-option.text[aria-label="${testData.shoppingCart.product.size}"]`);
    await expect(sizeOption).toBeVisible({ timeout: 5000 });
    await sizeOption.click();

    const colorOption = page.locator(`div.swatch-option.color[aria-label="${testData.shoppingCart.product.color}"]`);
    await expect(colorOption).toBeVisible({ timeout: 5000 });
    await colorOption.click();

    // Step 4 Add the product to the cart
    const addToCartButton = page.locator('button.action.tocart.primary');
    await addToCartButton.click();

    const successMessage = page.locator('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]');
    await expect(successMessage).toContainText('You added Sahara Leggings to your');

    const cartLink = successMessage.locator('a[href="https://magento.softwaretestingboard.com/checkout/cart/"]');
    await cartLink.click();
  });

  // Step 5 Estimate shipping using a valid address
  await test.step('Estimate shipping with valid address and verify totals', async () => {
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.estimateShippingAndTax(
      testData.shoppingCart.shipping.country,
      testData.shoppingCart.shipping.region,
      testData.shoppingCart.shipping.zipCode
    );
    await page.waitForTimeout(10000);
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
   
    // Step 6 Verify subtotal, shipping and order total in the cart
    await page.waitForFunction(
      (expectedTotal) => {
        const grandTotalElem = document.querySelector('#cart-totals tr.grand.totals td.amount strong span.price');
        return grandTotalElem?.textContent?.trim() === expectedTotal;
      },
      testData.shoppingCart.shipping.orderTotalPrice,
      { timeout: 10000 }
    );

    const currentSubtotal = await shoppingCartPage.getSubtotal();
    const currentOrderTotal = await shoppingCartPage.getOrderTotal();
  });
});
