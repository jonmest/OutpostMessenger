# Security Review 1
We will go through the directory overview found at `project_structure_list` found in root and critique it against OWASP Top Ten. Our focus will be at files ending with `.js` or `.json`, and we'll only document what we find noteworthy.

## api_server
The API server is most important this week. We have basic React frontend setup but it will need to communicate with the API, until then there's not much to review.

### controllers/
openRoutes.js takes in user input (passphrase) from POST body, forwarding as an argument to Client.create() and CICDB.createClient() (SQL-related). Injection attacks are a threat (A1, A7, A8)

#### TODO:
Validate, filter, and sanitize user input data. In SQL-abstraction functions, use parameterized calls (already place, besides the passphrase call which posed some issues earlier). Main focus on SQL, in Client.Create() the supplied input its use is limited and already somewhat validated.

outpostRoutes.js takes in user input from POST body and GET query. 

#### TODO:
We can use some sort of whitelist implementation. Encoding and length of most input is known (id, publicKey, and more). However, in the encrypt/decrypt routes the messages will be of unknown length and contents. Use some sanitization library BEFORE encrypting.

### Client/
Some threat of injection, but is already validated and can be more secured by the above writeup.

--- Other directories are exposed to the same conditions ---
### Conclure

After some research and reflection, the conclusion is that we currently need to focus more on:

- Input validation in API requests. Not a great challenge, since most input can be handled with a whitelisting approach, only accepting input conformant to some standard.

- The #1 threat is the user input the Electron main process forwards to the child process API server start. This could allow for code execution on the OS level. Is there a better architectural option, or will be fine if passing the input arguments along in a hex/base64 encoding and heavy sanitization? Writing the passphrase argument to a file from the Electron process, and reading from the server process?

Addition #1:
After some changes to API, authorization is implemented using localstorage, which removes the threat of CSRF and makes implementing things in the React SPA frontend slightly simpler.