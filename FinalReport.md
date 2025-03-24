# Luma E-commerce Platform QA Technical Assessment

## Setup and Prerequisites

Can by find in `README.md` file.

## Overview

This repository contains an automated test suite designed to validate key functionalities on Luma's e-commerce platform. The tests cover:

1. **Search Functionality:**  
   - Verify that valid search queries return the expected number of results.  
   - Ensure invalid or empty queries are handled appropriately.

2. **Shopping Cart Integration:**  
   - Test adding a product from search results to the shopping cart.  
   - Validate that shipping estimation applies the "Flat Rate $5.00" charge and that the cart totals update correctly.

3. **Wishlist Feature:**  
   - Validate that an item can be added to the wishlist.  
   - Ensure the item appears correctly on the "My Wish List" page and can be removed.



## Test Cases

| Test Case ID | Type       | Feature                | Name                                 | Test Steps                                                                                                                                                                                                                                                                                                              | Expected Result                                                                                             |
|--------------|------------|------------------------|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| TC-01        | Automated  | Search Functionality   | Valid Search - Leggings              | 1. Open the home page. <br>2. Enter valid search query "leggings" into the Search field. <br>3. Click the Search button or press Enter. <br>4. Verify that 4 search results are displayed.                                                                                                                                             | 4 items are displayed.                                                                                      |
| TC-02        | Automated  | Search Functionality   | Valid Search - Green                 | 1. Open the home page. <br>2. Enter valid search query "green" into the Search field. <br>3. Click the Search button or press Enter. <br>4. Verify that 56 search results are displayed.                                                                                                                                                | 56 items are displayed.                                                                                     |
| TC-03        | Automated  | Search Functionality   | Invalid Search - Random Query        | 1. Open the home page. <br>2. Enter an invalid search query "asdkjfhaskjdf" into the Search field. <br>3. Click Search button or press Enter. <br>4. Verify that no search results are returned.                                                                                                                                            | No results are returned.                                                                                    |
| TC-04        | Automated  | Search Functionality   | Invalid Search - Long Query          | 1. Open the home page. <br>2. Enter an excessively long invalid search query into the Search field. <br>3. Click Search button or press Enter. <br>4. Verify that no results are displayed.                                                                                                                                                | No results are returned.                                                                                    |
| TC-05        | Automated  | Search Functionality   | Invalid Search - Special Characters  | 1. Open the home page. <br>2. Enter a search query with special characters ("@#$%^&*()_+") into the Search field. <br>3. Click Search button or press Enter. <br>4. Verify that no results are displayed.                                                                                                                               | No results are returned.                                                                                    |
| TC-06        | Automated  | Search Functionality   | Empty Search         | 1. Open the home page. <br>2. Enter an empty query ("", "   ") into the Search field. <br>3. Click Search button or press Enter. <br>4. Verify that the search action is prevented.                                                                                                                   | Search is not triggered.                                                      |
| TC-07        | Automated  | Shopping Cart          | Add Product & Estimate Shipping      | 1. Open the home page. <br>2. Search for the product "Sahara Leggings". <br>3. Select the correct size and color. <br>4. Add the product to the cart. <br>5. Estimate shipping using a valid address. <br>6. Verify subtotal, shipping and order total in the shopping cart.                                                                                                | Cart shows a subtotal of $60.00, shipping charge of $5.00, and an order total of $65.00.                     |
| TC-08        | Automated  | Wishlist               | Add Product to Wishlist              | 1. Login and navigate to the home page. <br>2. Add the product "Push It Messenger Bag" to the wishlist. <br>3. Verify that the product appears in the wishlist.                                                                                                                                                | The product appears on the My Wish List page.                                                             |
| TC-09        | Automated  | Wishlist               | Remove Product from Wishlist         | 1.( Step 4 in the test) Remove the product from the wishlist. <br>2. Verify that a success removal message is displayed.                                                                                                         | The product is removed and a confirmation message is shown.                                               |
| TC-10        | Automated  | Shopping Cart          | Quantity Update Validation and Totals    | 1. Open the shopping cart page. <br>2. Update the cart quantity to -1 and verify that a validation error is displayed.                                                           | A validation error appears for -1 quantity.      |
| TC-11        | Manual     | Search Functionality   | Security Check - XSS                 | 1. Open the home page. <br>2. Enter an XSS payload (e.g., `<script>alert('xss')</script>`) into the search field. <br>3. Click the Search button or press Enter.                                                                      | The application sanitizes input, no script is executed and the UI remains unaffected.                       |
| TC-12        | Manual     | Search Functionality   | Security Check - SQL Injection       | 1. Open the home page. <br>2. Enter a SQL injection payload (e.g., `' OR '1'='1`) into the search field. <br>3. Click Search or press Enter.                                                                                        | The application does not crash or expose sensitive data, results remain sanitized and safe.                 |
| TC-13        | Manual     | Shopping Cart          | Remove Item       | 1. Open the Shopping Cart page. <br>2. Click Remove Item button. <br>3. Verify that item removed from the Shopping Cart.                                                               | The item removed and the Shopping Cart page displays correct amount of items OR empty.     |
| TC-14        | Manual     | Shopping Cart          | Zip Code Validation       | 1. Open the Shopping Cart page. <br>2. Expand Estimate Shipping and Tax form. <br>3. Enter invalid Zip Code (hgtrfd). <br>4. Verify that validation error appears.                                                        | A validation error appears for wrong Zip Code.    |
| TC-15        | Manual     | Wishlist               | Verify Wishlist Page Layout and Details| 1. Add multiple items to the wishlist. <br>2. Verify that the Wishlist page displays product images, names and details correctly.                                                   | The Wishlist page layout is correct and all product details are clearly visible.  |




## Issues:

1. The testing application can only be used with a VPN (set to USA); otherwise, performance is low and tests fail.
2. Comment adding to an item in the Wishlist cannot be saved. After the page reloads, comments disappear from items in the Wishlist.

## Suggestions:

1. Search Functionality:
The search functionality can be improved by adding filters, for example for price range, category, brands. This would improve the user experience and make product search easier.

2. Shopping Cart:
Implement a clearer visual indication when items are added to the cart (e.g., showing a popup or animation). This would improve the user experience, especially for users who may not immediately notice the cart update and the small message on the top of the page.

3. Wishlist:
Allow users to add items with a selected size and color. This is crucial as different sizes and colors might have different pricing or availability, and it would help users purchase exactly what they want.



