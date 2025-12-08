## Hexlet check status

[![hexlet-check](https://github.com/RedBeduin/qa-auto-engineer-javascript-project-90/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/RedBeduin/qa-auto-engineer-javascript-project-90/actions/workflows/hexlet-check.yml)

## Playwright tests status

[![Playwright Tests](https://github.com/RedBeduin/qa-auto-engineer-javascript-project-90/actions/workflows/playwright.yml/badge.svg)](https://github.com/RedBeduin/qa-auto-engineer-javascript-project-90/actions/workflows/playwright.yml)

## Testing of the Kanban-board

### Purpose of the project

The purpose of the project is to test the application "Task Manager", containing the authorization form and several pages:
* Dashboard(default page)
* Tasks
* Users
* Labels
* Task statuses

### How to copy the project to your PC and assemble it

To copy the project to your PC, open your work environment, type in the command line
```
git clone https://github.com/RedBeduin/qa-auto-engineer-javascript-project-90.git
```
and rename the repository of the project if you want.

To assemble the project, move to the project directory and write
```
npm i
```
in the command line.

### How to install the application that is tested in the project

1. Install the dependency
```
npm i @hexlet/testing-task-manager
```
2. Import and launch the application
2.1 Write this code into the main.jsx file of your project
```
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@hexlet/testing-task-manager'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {App()}
  </React.StrictMode>  
)
```
2.2 Move to the directory of your project and write
```
npm run dev
```
then write
```
o
```
and press ```Enter```

### How to run the tests that were written in the project

To run all tests at once, write
```
npx playwright test
```
in the command line.

To run certain test file, write
```
npm run e2e tests/the name of the file
```
For example,
```
npm run e2e tests/labels.spec.js
```

### The development of the project

The development of the project includes:
* Preparation of the environment
* Creation of the base tests
* Testing of the authentication and the authorization(the application **has no backend side**, so the testing is executed from the perspective of the functional)
* Testing of the users aspect of the application
* Testing of the statuses aspect of the application
* Testing of the labels aspect of the application
* Testing of the tasks controlling and organizing
* Refactoring and optimization of the tests(for example: placing the logic of the interaction with page into separate classes)

### Technologies that are used in the project

* Playwright:

**Playwright**(Playwright Test, to be precise) is an end-to-end framework for modern web apps. It bundles test runner, assertions, isolation, parallelization and rich tooling. Playwright supports Chromium, WebKit and Firefox on Windows, Linux and macOS, locally or in CI, headless or headed, with native mobile emulation for Chrome (Android) and Mobile Safari.

* Page Object Model(POM):

**Page Object Model**(POM) is a pattern of projecting for automatization of testing of web-applications. In POM each web-page or massive part of the page is represented as class. This class contains methods which give opportunity to interact with elements of the page such as buttons, input fields etc. Main purpose of the POM is to separate logic of the testing from logic of the interaction with elements of the page.

### The Tasks that are solved in this project

The main task of the project is to check if the application works correctly. The additional task is to check the availability of the special application behavior in the cases then the user performs incorrect actions(for example, attempts to log in without entering the password).
