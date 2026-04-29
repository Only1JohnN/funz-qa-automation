# FunZ QA Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.59.1-blue.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive test automation framework built with Playwright for the FunZ Event Ticketing Platform. This framework provides end-to-end testing capabilities for both UI and API interactions, ensuring the quality and reliability of the platform's core features.

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Test Execution](#-test-execution)
- [Reporting](#-reporting)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)
- [Maintainer](#-maintainer)

## ✨ Features

### 🧪 Test Coverage
- **Authentication Flows**: User registration, login, password reset, role selection (User/Organizer)
- **Cart Management**: Add to cart, view cart, clear cart, checkout process
- **Event Management**: Event browsing, ticket selection, quantity management
- **Payment Processing**: Payment flow validation, success confirmation
- **UI Navigation**: Footer links, page transitions, error handling

### 🛠️ Technical Features
- **Page Object Model**: Well-structured, maintainable test code
- **TypeScript Support**: Type-safe test development
- **Multiple Browsers**: Chromium support (Firefox/WebKit can be easily enabled)
- **Custom Reporting**: HTML reports, JSON results, Teams notifications
- **Environment Management**: Staging/production environment support
- **Run Modes**: Local development, smoke tests, regression suites
- **Error Handling**: Friendly error messages and detailed failure analysis
- **CI/CD Integration**: GitHub Actions support with automated reporting

### 📊 Reporting & Notifications
- **HTML Reports**: Visual test results with screenshots and videos
- **Teams Integration**: Automated notifications for test runs
- **JSON Export**: Machine-readable test results
- **Failure Analysis**: Detailed error parsing and impact assessment

## 📁 Project Structure

```
funz-qa-automation/
├── tests/
│   ├── config/
│   │   └── testConfig.ts          # Test configuration settings
│   ├── context/
│   │   └── testContext.json       # Test case descriptions and impact
│   ├── fixtures/
│   │   └── testData.ts            # Test data and user credentials
│   ├── pages/
│   │   ├── API/                   # API page objects (future use)
│   │   └── UI/                    # UI page objects
│   │       ├── CartPage.ts
│   │       ├── CheckoutPage.ts
│   │       ├── EventPage.ts
│   │       ├── FooterLinks.ts
│   │       ├── HomePage.ts
│   │       ├── LoginPage.ts
│   │       ├── PasswordResetPage.ts
│   │       ├── PaymentPage.ts
│   │       ├── RegisterPage.ts
│   │       └── SuccessPage.ts
│   ├── reporters/
│   │   └── teamsReporter.ts       # Custom Teams notification reporter
│   ├── specs/
│   │   ├── api/                   # API test specifications
│   │   └── ui/                    # UI test specifications
│   │       ├── authFlows.spec.ts
│   │       ├── cartManagement.spec.ts
│   │       ├── eventCheckout.spec.ts
│   │       └── footerLinks.spec.ts
│   └── utils/
│       ├── errorParser.ts         # Error message parsing utilities
│       ├── runMode.ts             # Test run mode configuration
│       ├── teamsNotifier.ts       # Teams notification utilities
│       └── testContext.ts         # Test context management
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── test-results.json              # JSON test results output
├── LICENSE                        # MIT License
└── README.md                      # This file
```

## 📋 Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Latest version recommended
- **Git**: For version control

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd funz-qa-automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Base URL for testing
BASE_URL=https://staging.funzweb.com

# Test user credentials (for authenticated tests)
TEST_USER_EMAIL={{your_email}}
TEST_USER_PASSWORD={{your_password}}

# Teams webhook for notifications (optional)
TEAMS_WEBHOOK_URL=https://outlook.office.com/webhook/...

# GitHub Actions variables (automatically set in CI)
GITHUB_SERVER_URL=https://github.com
GITHUB_REPOSITORY=your-org/funz-qa-automation
GITHUB_RUN_ID=123456789
```

### Test Configuration

The framework supports different run modes defined in `tests/utils/runMode.ts`:

- `local`: Development mode (no notifications)
- `smoke`: Quick smoke tests with notifications
- `regression`: Full regression suite
- `daily-smoke`: Daily automated smoke tests
- `pr-regression`: Pull request regression tests

## 📖 Usage

### Running Tests

#### Basic Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Debug tests interactively
npm run test:debug

# View HTML report
npm run report
```

#### Run Mode Specific Commands

```bash
# Smoke tests (tagged with @smoke)
npm run test:smoke

# Full regression suite
npm run test:regression

# Daily smoke tests
npm run test:daily-smoke
```

#### Advanced Playwright Commands

```bash
# Run specific test file
npx playwright test tests/specs/ui/authFlows.spec.ts

# Run tests with specific tag
npx playwright test --grep "@smoke"

# Run tests in specific project
npx playwright test --project=chromium

# Generate code for new tests
npx playwright codegen https://staging.funzweb.com
```

### Test Structure

Tests follow a consistent structure:

```typescript
test.describe('Feature Name @regression', () => {
  let pageObjects: PageObjects;

  test.beforeEach(async ({ page }) => {
    // Setup code
    await page.goto('/');
    // Initialize page objects
  });

  test('TC-XX: Test description @smoke', async () => {
    // Test steps
    await pageObjects.someAction();
    await pageObjects.verifyResult();
  });
});
```

## 📊 Reporting

### HTML Reports
Generated automatically after test runs. View with:
```bash
npm run report
```

### Teams Notifications
Automatic notifications sent for smoke, regression, and daily runs when `TEAMS_WEBHOOK_URL` is configured.

### JSON Results
Available in `test-results.json` for integration with other tools.

## 🛠️ Development

### Adding New Tests

1. **Create Page Object** (if needed):
   ```typescript
   // tests/pages/UI/NewPage.ts
   export class NewPage {
     constructor(private page: Page) {}

     async performAction() {
       // Implementation
     }
   }
   ```

2. **Add Test Specification**:
   ```typescript
   // tests/specs/ui/newFeature.spec.ts
   test.describe('New Feature @regression', () => {
     test('TC-XX: New test case', async ({ page }) => {
       // Test implementation
     });
   });
   ```

3. **Update Test Context** (optional):
   Add entries to `tests/context/testContext.json` for better reporting.

### Code Quality

- Use TypeScript for type safety
- Follow Page Object Model pattern
- Add appropriate test tags (`@smoke`, `@regression`)
- Include descriptive test case IDs (`TC-XX`)
- Handle test data through fixtures

## 🤝 Contributing (Guided by License)

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-test`)
3. Commit your changes (`git commit -am 'Add new test case'`)
4. Push to the branch (`git push origin feature/new-test`)
5. Create a Pull Request

### Guidelines
- Follow existing code structure and naming conventions
- Add test context information for new test cases
- Ensure tests pass in CI/CD pipeline
- Update documentation for significant changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 FunZ Event Ticketing Platform

## 👤 Maintainer

**Adeniyi John Busayo** – QA Engineer  
- Email: adeniyijohn2002@gmail.com  
- LinkedIn: [https://www.linkedin.com/in/john-adeniyi/](https://www.linkedin.com/in/john-adeniyi/)  
- Phone: +2347080702920

This test automation framework is maintained as part of the FunZ Event Ticketing Platform's quality assurance infrastructure.