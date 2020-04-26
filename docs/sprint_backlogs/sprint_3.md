# Sprint backlog 3
## Analysis of previous week:

Not a whole lot of new requirements were implemented last week, instead we spent a lot of time on code refactoring and analysis -- which has put us in a good place to keep moving forward and building upon the exisiting code base.
Now, pretty much everything is working except client intercommunication, which in itself will not be too advanced. The requirement category in which we currently have implemented nothing, is the SPB-category. When the basics requirements in there have been finished, we have a completely functioning application.

---

# Backlog

## Regular HTTP requests
### SPB-0: Register an outpost
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Functional |

When a client has generated their OutPost, they shall immediately send their credentials (ID and public keys) to the server. If the ID already exists, it's rejected. Otherwise, it's stored in the database.

Est. time: 1 h
Actual time: 1 h
### SPB-1: Fetch a contact
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Functional |

A client should be able to send a request with another user's ID and get all the contact's credentials (ID and pbk) back.

Est. time: 1 h
Actual time: 1 h

## Socket

### SPB-2: Open a socket connection and authenticate
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 8 | Functional |

A client should be able to open a socket connection in a MUTUAL CHAT ROOM with the OTHER CONTACT they intend to message. Upon connection, the server sends a random message the client has to sign. If the server can then verify that signature correctly, the connection is maintained and the client is sent all previous messages.

Preliminary logic for socket authentication:

![Authentication logic](https://gitlab.lnu.se/1dv430/student/jc222rz/project/-/raw/master/docs/charts/Socket_Auth.png)

Est. time: 3 h
Actual time: 4 h

### SPB-3: Send a message over connection
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Waiting | 7 | Functional |

A client should be able to send an encrypted message over a websocket connection, and have it delivered to the intended recipient in the same chat room.

Est. time: 1 h
Actual time: 3 h

## Other
## M-1: Read "A Roadmap for Node.js Security" and reflect
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Security |
Read "A Roadmap for Node.js Security" at https://nodesecroadmap.fyi/ and reflect how that information applies to your project.

Est. time: 2 h
Actual time: 1 h

Notes: Not much novel information.

## M-0: Weekly OWASP Top 10 Review & Code Review
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Ongoing | 9 | Security |

Est. time: 2 h

# M-2: Weekly unit test review
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Ongoing | 7 | Reliability |
Each week, go through unit tests for CICDB and SPB servers and make sure the coverage is sufficient. Sufficient, in this case, is that each function is tested at least once in a way it is supposed to work.

Est. time: 2 h
Actual time: 1h

# M-3: Build and package the Electron app for distribution
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Delivery |
We can now build and package the main application for distribution with the command `npm build`.

It took quite a long time, but we felt it was absolutely necessary to get straightened out ASAP.
Est. time: 2h
Actual time: 12h

---
Total time: 25h