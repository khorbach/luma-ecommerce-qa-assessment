import { test, expect } from '@playwright/test';
import { WishlistPage } from '../pages/WishlistPage';
import testData from '../data/testData.json';

test('TC-08 & TC-09 | Wishlist Functionality', async ({ page }) => {
  const wishlistPage = new WishlistPage(page);
  
  // Step 1 Login and navigate to the home page
  const { email, password, productName } = testData.wishlist; // Fetch productName from JSON
  await wishlistPage.login(email, password);
  await wishlistPage.navigateToHomePage();

  // Step 2 Add the product "Push It Messenger Bag" to the wishlist
  await wishlistPage.addItemToWishlist(productName);

  // Step 3 Verify that the product appears in the wishlist
  const isInWishlist = await wishlistPage.isProductInWishlist(productName);
  expect(isInWishlist).toBeTruthy();

  // Step 4 Remove the product from the wishlist
  await wishlistPage.removeItemFromWishlist(productName); 

  // Step 5 Verify that a success removal message is displayed
  const isItemRemoved = await wishlistPage.verifyRemovalMessage();
  expect(isItemRemoved).toBeTruthy();

});
