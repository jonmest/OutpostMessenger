# Product Backlog
### Status
Waiting / implemented / tested / invalid
### Priority
1 to 10. 1 is very low. 10 is very high.
### Categories:

1. Client infrastructure & Cryptography (CIC)
2. Socket IO Protocol & Backend (SPB)
3. Client Front-end (CF)
4. Misc. (M)

---
# Client Infrastructure & Cryptography
## CIC-0: Create a client/Load a client
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 10 | Functional |

An user should be able to provide a passphrase. If a client object's stored in DB, they should receive it decrypted if the passphrase is correct, or they should be able to create a client object, store and get it returned.


## CIC-1: An 8-word passphrase generator
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 10 | Functional |

A passphrase is similar to a password, except that it consists of several different real words, which makes it easier to memorize while still maintaining sufficient entropy. We want to use passphrases for client authentication.

For better security, we want to be able to randomly generate a passphrase. Otherwise, the user may choose a passphrase too predictable. If the randomly generated passphrase is accepted by the user, it will be used to derive a key to encrypt and decrypt the user's OutPost. If it's not accepted, the user can request a new passphrase until they get one they deem acceptable.

## CIC-2: Derive a symmetric Master key from passphrase
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 10 | Functional |

PBKDF2 (Password-Based Key Derivation Function 2) is a function which can derive key material from low-entropy inputs such as passwords or passphrases. It applies a function such as HMAC to the input along with a salt, iteratively for many times. For this requirement we demand at least 100 000 iterations.

We shall be able to take the passphrase from CIC-1 as input, put it through PBKDF2 and use the output to generate a symmetric master key.

## CIC-3: Generate an asymmetric keypair for authenticated encryption/decryption
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 10 | Functional |

When creating an Outpost (UC-1), an asymmetric keypair shall be generated. We need a high-level function for this. Example from the NaCL lib: https://github.com/dchest/tweetnacl-js/wiki/Examples


## CIC-4: Encrypt the messages
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 10 | Functional |

Encrypt the messages

## CIC-5: Decrypt the messages
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 10 | Functional |

Decrypt the messages

## CIC-6: Add a new contact to list with ID
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Functional |

Users shall be able to add another user to their contact list, by sending the contact's ID to the server and getting their public key as a response. This should then be stored as an object in the local contact list.


## CIC-7: Store/retrieve client data in encrypted SQL DB
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Functional |

Signal uses [SQLCipher](https://www.zetetic.net/sqlcipher/) to store data on the client. It's an extension of SQLLite that also allows you to encrypt everything at rest. We want to use SQLCipher as well to store our client data.

We should be able to store a clients keys in an encrypted format in the DB, along with messages and contacts.

---
# Socket IO Protocol & Backend
### SPB-0: Register an outpost
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Functional |

When a client has generated their OutPost, they shall immediately send their credentials (ID and public keys) to the server. If the ID already exists, it's rejected. Otherwise, it's stored in the database.

Addition: Currently stored in memory, needs to be persistently stored.

### SPB-1: Fetch a contact
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Functional |

A client should be able to send a request with another user's ID and get all the contact's credentials back.

### SPB-2: Open a socket connection
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 8 | Functional |

A client should be able to open a socket connection in a MUTUAL CHAT ROOM with the OTHER CONTACT they intend to message. Upon connection, the server sends a random message the client has to sign. If the server can then verify that signature correctly, the connection is maintained and the client is sent all previous messages.

### SPB-3: Send a message over connection
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 8 | Functional |

A client should be able to send an encrypted message over a websocket connection, and have it delivered to the intended recipient in the same chat room.

---
# Client Frontend
## CF-0: Implement graphical interface for creating/loading an Outpost
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 8 | Interface |

Corresponding to CIC-0. Log in.

## CF-1: Implement graphical interface for adding contacts it ID
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 8 | Interface |
Dependent on SPB-0 and SPB-1.
Corresponding to CIC-07.

## CF-1: Implement front-end message encryption/decryption  
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 8 | Interface |

Corresponding to CIC-5/CIC-6

## CF-2: Registration at centralized server
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Intercommunication |

Register an users Outpost at the centralized server.

## CF-3: Establish socket connection
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Intercommunication |

Establish a socket connection between central server and client frontend.

## CF-4: Emit/receive message from socket connection
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Intercommunication |

Emit and receive messages from socket connection.

## CF-5: Design a better socket connection architecture
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Intercommunication |

Now, a user enters a chat room with another contact, which establishes a socketio connection and renders incoming messages. However, ALL messages received are rendered.

Also, they need to ENTER a chat room to receive the messages. They should receive the messages at all time even in the dashboard.

Est. time: 8 hours

## CF-6: Add alias to contact
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | UX |
Contacts are now referred to by ID. Allow the option to add an alias to contact's, making it more user friendly.

Est. time: 6 hours
Actual time: 5 h

## CF-7: Display message timestamps in friendly format
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | UX |
Display/render message timestamps in an okay manner.

Est. time: 5 hours
Actual time: 6 hours

Comment: Had to rearrange some part of the messaging protocol.


## CF-8: Remove "Decrypt  & Open Conversation"-button
Clean up the GUI by removing the button, which shows for each of the contacts now, and only make the contact ID clickable.
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 8 | Interface |

Est. time: 1 h
Actual time: 2h

Comment: Replaced button with last message in conversation, instead.

## CF-9: Add option to delete contact
Allow users to delete contacts.
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 8 | Interface |

Est. time: 1 h
Actual: 2

## CF-10: Add masking to login form
Allow users to delete contacts.
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 5 | Interface |

When users login, the passphrase input form should be masked by default, however the user should be able to read input in plaintext upon the click of a toggle button.

Expected: 5 h
Actual: 4 h

## CF-11: Add emoji capabilities
Allow users to delete contacts.
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 6 | Messaging |

Allow users to select emojis and append them to text messages.

## CF-12: Add Markdown capabilities
Allow users to use markdown when writing messages.
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 6 | Messaging |

Allow users to use markdown when writing messages like in Discord.
https://gist.github.com/Almeeida/41a664d8d5f3a8855591c2f1e0e07b19
https://github.com/rexxars/react-markdown

## CF-13: Make messages stack straight on top of eachother
Allow users to delete contacts.
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 5 | Interface |

And instead differentiate between client and contact by color-coding.

## CF-14: Sort contact list by recency of last message 
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 5 | UX |

## CF-15: Implement loading bar on startup
Sometimes the loading of a client's information can take a while on startup. Ensure the application will show a loading spinner when loading it, and if there's  an error, try again ad infinitum.

| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 5 | UX |
---

# Misc

## M-1: Read "A Roadmap for Node.js Security" and reflect
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Security |
Read "A Roadmap for Node.js Security" at https://nodesecroadmap.fyi/ and reflect how that information applies to your project.

## M-2: Weekly unit test review
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Ongoing | 7 | Reliability |
Each week, go through unit tests for CICDB and SPB servers and make sure the coverage is sufficient. Sufficient, in this case, is that each function is tested at least once in a way it is supposed to work.

## M-3: Build and package the Electron app for distribution
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done (needs repeating) | 7 | Delivery |
We can now build and package the main application for distribution with the command `npm build`.

# M-4: Specify manual test cases
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Reliability |
Specify manual test cases for test plan.

Est. time: 8 h

## M-5: Deploy live version of central server on outpostmessenger.com
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Reliability |
Deploy server to production. Need to configure DNS and NGINX.

Est. time: 8 h
Actual: 10 h

## M-6: Perform manual test cases
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Reliability |


## M-6: Implement additional unit testing for new features in React
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| In progress | 7 | Reliability |


## M-7: Build static security analysis tool for Electron applications
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Security |

Automatically find some antipatterns specific to Electron applications.

Est. time: 15 h
Actual time: 12 h


## M-8: Finish "Download" website
Finish basic website where people can download the application from.
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Misc. |

Est. time: 5 h
Actual time: 6 h

## M-9: Find out how to include api-server executables in distribution
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Distribution |

## M-10: Build application for Linux and open for distribution
Build and publish on outpostmessenger.com

| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Distribution |

## M-11: Create installation script
Users need to conveniently download and install the application. Create a bash script that handles it for them.

| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Distribution |

## M-12: Initiate QA
Pack the application for distribution, and perform QA on that product. IE, make sure all user stories are working like they should, and all manual tests pass.

| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Distribution |

## M-13: Make port choice flexible
As of now, the applications port is hardcoded which makes it fragile when distributing among different users and systems. Make the application automatically select a free port.

| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Distribution |

## M-14: Finish documentation
There's a need to finish and edit the documentation (test plan, project vision, product backlog). We also need to create documentation for potential users who would like to download and use the application.

| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Documentation |

## M-15: Write a Post Mortem
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Documentation |

## M-16: Create a demonstration video
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Documentation |