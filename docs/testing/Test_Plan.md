# Test Plan
We have performed quite test-driven development so far. However, a test specification is still required.

The application is made out of three main, high-level components:

1. The CICDB server on the client
2. The React frontend on the client
3. The centralized Socket/Express server

## The CICDB server
We do/will unit test all functions. This is done with Jest, and can automatically be run with the command `npm test` from its root folderin the terminal.

We will also have to perform automated integration tests to ensure the HTTP server responds in the way predicted. These can simply have their own test suite in the already existing test directory `tests`.

## The React frontend
React has good support for automated testing in Jest. However, we will as of now focus on manual user tests which will be defined below. There are, however, some automated tests to ensure some components render correctly in the DOM, and can be found in the `__test__` folder.

## The Socket/Express server
Similarly to the CICDB server, we will perform unit and integration tests in Jest in the exact same way. Find the unit tests in the `tests` folder.

# Manual Test Cases
Will be performed for each Use Case. See `Test_Results.md` in this folder for test cases and results.
