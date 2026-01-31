# SwiftTranslator Playwright Automation

Playwright end-to-end test suite for the [SwiftTranslator](https://www.swifttranslator.com/) Singlish-to-Sinhala translation web application.

## Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** or **yarn**

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Sample
```

### 2. Install dependencies

Using **npm**:

```bash
npm install
```

Using **yarn**:

```bash
yarn install
```

### 3. Install Playwright browsers

Playwright requires browser binaries to run tests. Install them with:

**npm:**

```bash
npx playwright install
```

**yarn:**

```bash
yarn playwright install
```

On Linux, if you encounter missing system dependencies, run:

```bash
npx playwright install --with-deps
```

## Running the tests

**npm:**

```bash
npx playwright test
```

**yarn:**

```bash
yarn playwright test
```

### Run tests in a specific browser

```bash
npx playwright test --project=chromium
```

### Run with a visible browser (headed mode)

```bash
npx playwright test --headed
```

### View the HTML test report

After a test run:

```bash
npx playwright show-report
```

## Project structure

```
Sample/
├── tests/
│   └── example.spec.js    # SwiftTranslator automation tests
├── playwright.config.js   # Playwright configuration
├── package.json
└── README.md
```

## Notes

- The tests require an internet connection (they run against https://www.swifttranslator.com/).
- **Repository access**: Ensure the Git repository is publicly accessible. Repositories that cannot be accessed during marking will not be evaluated.
