Gaining Confidence with Cypress Tests
=====================================

This is the companion code to the talk "Gaining Confidence with Cypress Tests" at https://robrich.org/slides/gaining-confidence-cypress-tests/#/.  It demonstrates using Cypress tests with TypeScript to check [TodoMVC](http://todomvc.com/) projects and [HNPWA](https://hnpwa.com/).


To use it
---------

Launch the Cypress IDE to run tests and visually inspect results.

1. `npm install` to get all the Node modules.

2. `npm run cy:open` to open the Cypress IDE.

3. Choose a browser to use for the test run in the drop-down on the top-right.

4. Double-click a test file to run it, or choose "run all" in the top-right.


To run in CI
------------

In a CI run, we'll run headless.

1. `npm install` to ensure all Node modules are installed.

2. `npm run cy:run-chrome` to run all the tests in Chrome or `npm test` to run the tests in Chrome, Firefox, and Edge.

3. Look in the `results` folder for screen shots, videos, and xml test result files.


License
-------

MIT
