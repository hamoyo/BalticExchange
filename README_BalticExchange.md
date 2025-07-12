# 🧪 BalticExchange QA Engineer Take-Home Task

This repository contains both **UI** and **API** automation projects as part of the Baltic Exchange QA assessment. It demonstrates test planning, execution, and automation for the following:

- 🧑‍💻 Sauce Demo (UI Testing with Cypress)
- 🔗 Restful Booker API (API Testing with Axios & Mocha)

---

## 📁 Project Structure

```
BalticExchange/
├── restful-booker-api-tests/     # API tests using Mocha + Axios
│   └── test/
│       └── booking.test.js
│   └── package.json
│
├── sauce-demo-cypress/           # UI tests using Cypress
│   └── cypress/
│       └── e2e/
│           ├── login.cy.js
│           └── cart_checkout.cy.js
│   └── cypress.config.js
│   └── package.json
```

---

## 🚀 Getting Started

> ⚠️ Requires **Node.js** v14+ installed on your machine.

### 1. Clone the repo

```bash
git clone https://github.com/hamoyo/BalticExchange.git
cd BalticExchange
```

---

## 🧑‍💻 Sauce Demo UI Tests (`sauce-demo-cypress`)

### 📦 Install Dependencies

```bash
cd sauce-demo-cypress
npm install
```

### ▶️ Run Tests

- **Headless (CLI):**

```bash
npx cypress run
```

- **Interactive (Cypress GUI):**

```bash
npx cypress open
```

Tests are located under:

```
cypress/e2e/
├── login.cy.js
└── cart_checkout.cy.js
```

---

## 🔗 Restful Booker API Tests (`restful-booker-api-tests`)

### 📦 Install Dependencies

```bash
cd ../restful-booker-api-tests
npm install
```

### ▶️ Run API Tests

```bash
npm test
```

Tests are located in:

```
test/booking.test.js
```

---

## 🧠 Approach & Strategy

- Designed clear and prioritized test plans for both systems.
- Wrote functional UI test cases based on user flows (login, cart, checkout).
- Automated high-value UI scenarios using Cypress.
- Automated end-to-end API scenarios using JavaScript (Axios + Mocha).
- Documented test results and defects manually where needed.
- Focused on readability, maintainability, and real-world structure.

---

## 📌 Assumptions

- Sauce Demo credentials are publicly known (`standard_user / secret_sauce`).
- Restful Booker API requires a token for `PUT/DELETE`, sent via `Cookie` header.
- User-Agent header is added to avoid 418 rate-limiting.

---

## 🛠 Tools Used

- **Cypress** for UI test automation
- **Mocha** + **Chai** + **Axios** for API test automation
- **Excel/CSV** for test case documentation and execution results
- Manual exploratory testing for edge cases

---

## 📞 Contact

Feel free to reach out for any clarification during the interview.

---

Thanks for reviewing my submission! 🙌
