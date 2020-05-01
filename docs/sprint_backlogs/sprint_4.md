
# M-4: Specify manual test cases
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Functional |

Specify manual test cases for test plan.

Est. time: 8 h
Actual: 4 h

### SPB-0: Register an outpost
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Functional |

When a client has generated their OutPost, they shall immediately send their credentials (ID and public keys) to the server. If the ID already exists, it's rejected. Otherwise, it's stored in the database.

Addition: Currently stored in memory, needs to be persistently stored.

Est. time: 3 hours
Actual: 2.5 h

## CF-5: Design a better socket connection architecture
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Reliability |

Now, a user enters a chat room with another contact, which establishes a socketio connection and renders incoming messages. However, ALL messages received are rendered.

Also, they need to ENTER a chat room to receive the messages. They should receive the messages at all time even in the dashboard.

Est. time: 8 hours
Actual: 10 hours

# M-2: Unit test review and coding
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Reliability |

Est. time: 3 hours
Actual: 2 hours

# M-5: Deploy live version of central server on outpostmessenger.com
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Reliability |

Deploy server to production. Need to configure DNS and NGINX.

Est. time: 8 h
Actual: 10 h

---

## Total time:
26.5h