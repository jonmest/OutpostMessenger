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
| In progress | 9 | Functional |

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

## CF-1: Implement graphical interface for adding contacts it ID or QR-code
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| In process (awaiting dependency) | 8 | Interface |
Dependent on SPB-0 and SPB-1.
Corresponding to CIC-07. Also, QR code should be able to be read and decoded on the frontend and send to a uniform endpoint in the API,

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
Now, a user enters a chat room with another contact, which establishes a socketio connection and renders incoming messages. However, ALL messages received are rendered.

Also, they need to ENTER a chat room to receive the messages. They should receive the messages at all time even in the dashboard.

Est. time: 8 hours

---

# Misc
## M-0: Weekly OWASP Top 10 Review & Code Review
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Ongoing | 9 | Security |

Even though we're developing a desktop app, it's built with web technologies. Logically, it should also then be exposed to the same security risks, at least to some extent. Because of this, we have to perform (at least) a weekly review where we go over the source code and architecture and critique it on basis of the OWASP Top 10. The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.

Suggested process:
1. Go through every source directory, quickly get an understanding of that code's purpose.
2. Compare it against the OWASP Top 10
3. If you deem the directory susceptible to some risk, read OWASP's recommendations for mitigation.
4. Implement eventual recommendations.

As of now, we don't see the need to be terribly thorough. However, it's very important all components/directories get covered each week.

Use: https://www.owasp.org/images/5/53/OWASP_Code_Review_Guide_v2.pdf
as a guideline for documenting the review.

## M-1: Read "A Roadmap for Node.js Security" and reflect
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Ongoing | 7 | Security |
Read "A Roadmap for Node.js Security" at https://nodesecroadmap.fyi/ and reflect how that information applies to your project.

# M-2: Weekly unit test review
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Ongoing | 7 | Reliability |
Each week, go through unit tests for CICDB and SPB servers and make sure the coverage is sufficient. Sufficient, in this case, is that each function is tested at least once in a way it is supposed to work.

# M-3: Build and package the Electron app for distribution
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done (needs repeating) | 7 | Delivery |
We can now build and package the main application for distribution with the command `npm build`.

# M-3: Specify and perform penetration test cases
Specify and perform penetration test cases for the centralized server.

- Test lab setup
- Specification
- Execution

Est. time: 8 h
