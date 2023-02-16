# LLEAD - Frontend

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/EastAgile/IPNO-frontend.svg?style=shield&circle-token=6b3b7bb4643a4bf0aa342fba1307c8f7181bcc1c)](https://dl.circleci.com/status-badge/redirect/gh/EastAgile/IPNO-frontend/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/EastAgile/IPNO-frontend/badge.svg?branch=develop&t=vf2kPk)](https://coveralls.io/github/EastAgile/IPNO-frontend?branch=develop)

## Prerequisites

- NVM installed, it will help you install the target node verson which this project uses. See more at https://github.com/nvm-sh/nvm.
- [Optional] [VS Code](https://code.visualstudio.com/) should be use as your IDE in order to make coding environment easier and faster.
- [Optional] [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) are the `linter` and the `formatter` used in the projects. You can install those plugin for VS Code so that they are automatically used.

## Local development

### Quick starts

- Go to project
- Run `nvm use` if your nvm does not automatically switch node version.
- In case it raise error, please run `nvm install` to install the target Node and run `nvm use` again.
- Create `.env` file and copy content from [.env.EXAMPLE](./.env.EXAMPLE) to that.
- Run `yarn` to install package dependencies. All packages will be installed into `node_modules` folder.
- Run `yarn start` to start the local development app.
- Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### Unit testing

- Run command `yarn test` to run all the unit tests.

### Lint & formatting

- Run command `yarn lint` to check code linter & formatter. In order to automatically format code, run `yarn lint:fix`.

## Scripts

You can take a look at the [package.json](./package.json) file, in the `scripts` block to see all predefined scripts. You can run any of them by calling `yarn [script_key]` such as `yarn start` Some of them are:

- `build-production` & `build-staging` : Script to build webpack for serving as production and staging.
- `start` : Start local environment server.
- `test` : Test all unit test suites.
- `lint` & `lint:fix`: check code linting and fix them.
- `itest` & `itest:open`: Run integration tests with non-interactive or interactive mode. See more info in the below secion.

## Development Guides

- For naming css color please take a look at the file [CSS development guide](docs/css-development-guide.md)
- For using circeCI please take a look at the file [Circleci](docs/circleci.md)

## Integration tests

Please see [docs/e2e.md](docs/e2e.md) for more information about integration/e2e testing.
