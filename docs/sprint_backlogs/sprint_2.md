# Sprint backlog 2
## Analysis of previous week:
Last week went quite well. We now have implementations in place to create Outposts at the client and encrypt/decrypt messages. We had some concerns over how best to design the client system for security, but they were resolved by simply removing some possible attack surfaces. We did not get a change for implementing frontend GUI for some functionalities such as adding contacts, but they should be simply finished, so that we can move on to allowing Outposts to communicate with one another.

---

## Backlog

## CF-0: Implement graphical interface for creating/loading an Outpost
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 8 | Interface |

Corresponding to CIC-0. We already have a preliminary solution in place, but for an user-selected password which should be changed to a randomly generated passphrase.

Est. time: 2 hours
Actual time: 3 hours. We had some issues with authentication middleware and headers, but it got resolved and all subsequent communication with CICDB server should be quite painless.

## CF-1: Implement graphical interface for adding contacts it ID or QR-code
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Halfway done (awaiting centralized server impl.) | 8 | Interface |

Corresponding to CIC-07. Also, QR code should be able to be read and decoded on the frontend and send to a uniform endpoint in the API, if time is available.

Est. time: 1 hours
Actual time: 1.5 h

## CF-1: Implement front-end message encryption/decryption 
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 8 | Interface |

Corresponding to CIC-5/CIC-6

Est. time: 3 hours
Actual time: 2 h

---

### M-0: Weekly review
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Waiting | 7 | Organizational |

Est. time: 3 hours
Actual time: 3 h