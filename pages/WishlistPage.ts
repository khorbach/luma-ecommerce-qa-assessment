import { Page } from '@playwright/test';

export class WishlistPage {
  private page: Page;
  private emailInput = 'input#email';
  private passwordInput = 'input#pass';
  private signInButton = 'button#send2';
  private addToWishlistButton = 'a[data-action="add-to-wishlist"]';
  private wishlistLink = 'a[href*="wishlist"]';
  private wishlistItems = '.product-item-info';
  private agreeButton = 'button[mode="primary"]:has-text("AGREE")';
  private successMessage = 'div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]';

  constructor(page: Page) {
    this.page = page;
  }
  // If a pravicy policy popup appears, handle it
  async handlePrivacyPolicy() {
    const agreeButtonLocator = this.page.locator(this.agreeButton);
    if (await agreeButtonLocator.isVisible()) {
      await agreeButtonLocator.click();
    }
  }

  // Login (required for wishlist)
  async login(email: string, password: string) {
    await this.page.goto('https://magento.softwaretestingboard.com/customer/account/login');
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.signInButton);
  }

  // Go to home page
  async navigateToHomePage() {
    await this.page.goto('https://magento.softwaretestingboard.com/');
  }

  // Add product to wishlist
  async addItemToWishlist(productName: string) {
    // Locate the product for the given product name
    const product = this.page.locator('.product-item').filter({ hasText: productName });

    // Hover over the product to see the wishlist button
    await product.hover();

    // Locate the "Add to Wish List" button inside this specific product
    const addToWishlistButton = product.locator(this.addToWishlistButton);

    // Ensure the button is visible before clicking
    await addToWishlistButton.waitFor();
    await addToWishlistButton.click();

    // Wait for the page to redirect to the wishlist page, with a dynamic URL pattern
    await this.page.waitForURL(/\/wishlist\//);

    // Wait for the success message to appear in the wishlist page
    await this.page.waitForSelector(this.successMessage, { timeout: 5000 });
  }

  async goToWishlist() {
    await this.page.locator(this.wishlistLink).click();
    await this.page.waitForSelector(this.wishlistItems, { timeout: 5000 });
  }

  async isProductInWishlist(productName: string) {
    // Check if the wishlist contains an item with the given product name
    const productLocator = this.page.locator(this.wishlistItems).filter({ hasText: productName });
    return await productLocator.count() > 0;
  }

  async removeItemFromWishlist(productName: string) {
    // Locate the product item based on the name
    const productLocator = this.page.locator('.product-item-info').filter({ hasText: productName });
    
    // Hover over the product item to see remove button
    await productLocator.hover();

    // Locate the remove button for a specific product item
    const removeButton = productLocator.locator('a[data-role="remove"]');

    // Ensure the remove button is visible before clicking
    await removeButton.waitFor({ state: 'visible', timeout: 5000 });

    // Click the remove button to remove the item from the wishlist
    await removeButton.click();

    // Wait for the item to be removed and verify the success message
    await this.page.waitForTimeout(5000); 
}

  async verifyAdditionMessage(productName: string) {
    // Verify if the product name is mentioned in the success message
    const messageLocator = this.page.locator(this.successMessage);
    const message = await messageLocator.textContent();

    // Check if the message contains the expected product name
    return message?.includes(`${productName} has been added to your Wish List`) || false;
  }
  // Verify that a success removal message is displayed
  async verifyRemovalMessage() {
    const messageLocator = this.page.locator(this.successMessage);
    const message = await messageLocator.textContent();
    
    return message?.includes('has been removed from your Wish List') || false;
  }
}
