# Test Plan
We have performed quite test-driven development so far. However, a test specification is still required.

The application is made out of three main, high-level components:

1. The CICDB server on the client
2. The React frontend on the client
3. The centralized Socket/Express server

## The CICDB server
We do/will unit test all functions. This is done with Jest, and can automatically be run with the command `npm test` in the terminal.

We will also have to perform automated integration tests to ensure the HTTP server responds in the way predicted. These can simply have their own test suite in the already existing test directory.

## The React frontend
React has good support for automated testing in Jest. However, we will as of now restrict ourselves to user tests which will be defined below.

## The Socket/Express server
Similarly to the CICDB server, we will perform unit and integration tests in Jest in the exact same way.

# Penetration testing
This will need further elaboration, however these are the initial test cases:

- Alice, Bob and Eve connect to the socket server. Alice messages Bob. Eve should not receive any information of their communication.

- Eve has free access to the central server through which all messages pass. Even when she logs all messages, she can only get to know the sender and recipient, not the actual messages.

- Eve tries connecting to the Socket.io server, claiming to have Alice's ID in the hopes of posing as her. She should have the wrong private key and get rejected.