# Luma E-commerce Platform QA Technical Assessment

## Final Report

Test cases, findings and suggestions can be find in `FinalReport.md` file.

## Setup and Prerequisites

1. **Node.js:**  
   Ensure you have Node.js installed (version 14 or later is recommended).  
   You can download it from: [https://nodejs.org/](https://nodejs.org/)

2. **Clone the Repository:**  
   ```bash
   git clone https://github.com/khorbach/luma-ecommerce-qa-assessment.git
   cd luma-ecommerce-qa-assessment
3. **Install Dependencies:**
   ```bash
   npm install
4. **Playwright Setup:**
   ```bash
   npx playwright install
## Running the Tests

1. **To execute all tests, run:**  
   ```bash
   npx playwright test
2. **To execute a particular test, run:**  
   ```bash
   npx playwright test <example.spec.ts>
3. **Running tests in UI mode:**
   ```bash
   npx playwright test --ui
4. **To view a detailed report, run::**
   ```bash
   npx playwright show-report
> **Note**
> **VPN Requirement:** For optimal performance and to avoid failures, please run the tests while connected to a VPN with a USA server. Without the VPN, the site’s pages may load very slowly or not load at all.

## Browser Configuration

By default, the automated tests are configured to run in Chromium. If you want to run the tests in other browsers (such as Firefox or Safari), you will need to adjust the Playwright configuration accordingly. For that modify the `projects` section in `playwright.config.ts` file or uncomment the relevant sections if they are already provided.

## Test Results Cleanup

To ensure that each test run starts with a clean slate, I have configured a pre-test script that deletes the previous test results before the tests are executed.

The test artifacts (screenshots, videos, etc.) are stored in the `test-results` directory, which is defined in the Playwright configuration. A script using [rimraf](https://www.npmjs.com/package/rimraf) is run before the tests begin. 

**How It Works:**
1. To install rimraf as a dev dependency:
   ```bash
   npm install rimraf --save-dev
2. The Playwright configuration (in `playwright.config.ts`) sets:
   ```typescript
   outputDir: 'test-results',
3. In the `package.json`, a pre-test script is defined:
```json
"scripts": {
  "clean": "rimraf test-results",
  "test": "npm run clean && npx playwright test"
}
```
This ensures that any previous test results are removed before each test run. If you want to keep tests results, delete this code from `package.json`.
