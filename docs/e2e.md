# Integration tests
## Prerequisites
- In order to test integration in the FE side, make sure you have complete all the require steps in the BE side, such as prepare data and start test server.
- [Chrome](https://www.google.com/chrome/) installed. 

## Framework
- We used Cypress as our integration testing framework. For more information about using it, you can take a look at [Cypress doc](https://docs.cypress.io/)

## Run tests in interactive mode
- Run command `yarn itest:open` to start the interactive testing dashboard.
- Wait until you see the dashboard appear. Select `e2e testing`. Then choose `Start testing e2e on Chrome`.

## Choosing place to write tests
- There are two separate folders of testing: `interactive-tests` and `tests`.
  - The `tests` folder includes the test suites that just the get - view action only. It means that those tests won't modify the database state, so that we can use the same database for all of them. The use cases for this kind of test can be: view frontpage, view department, officer page, see any components that has been render by them.
  - The `interactive-tests` folder includes the test suites that modify the database state, and so that we need to reset the database every time we run our tests. The use cases for this kind of test can be: admin modify data such as hide news article and we see update on the frontend, searching, ...
- After choosing the right one to write tests, you can create new file for testing or just add new test codes to the existed file if those tests belong to the old file's context.

## Test writing mindset
- The mindset for testing integration is : **what we get is what we will render**. It means that we will assert the UI based on the data we received from BE.
- So the normal steps for writing a test case are:
  - (Optional - Interactive tests only) Run clean up commands such as `resetDatabase` before your test run. Normally it will be run before each tests in a suite by using `cy.resetDatabase` inside `beforeEach` block.
  - Fetch data from BE. Then we will have the real response from BE.
  - Assert the UI components based on the response from BE.
  - Interact with the UI if you want.
  - Re assert other UI components.
- Unlike unit tests, integration tests can includes multiple-purpose actions. It would be best to test the long success case and then we test some edge cases together.


## Useful cypress utility command
Take a look at the [cypress/support/index.js](../cypress/support/index.js) to see the real implementation of those support command. Some of them are:
- `resetDatabase`: perform reset database: clean all data and seeding database again.
- `rebuildIndex`: rebuild elasticsearch index for all of our data.
- `clearCache`: invalidate all of our caching data.

## Run cypress in headless mode and CI environment
- To run all integrations in headless mode (without opening browser), run command `yarn itest`.
- We have setup the CI command to use for reporting, just use it as `yarn itest:ci`.
