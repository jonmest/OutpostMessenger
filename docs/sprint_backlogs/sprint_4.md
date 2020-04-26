
# M-3: Specify and perform penetration test cases
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Functional |
Specify and perform penetration test cases for the centralized server.

- Test lab setup
- Specification
- Execution

Est. time: 8 h

### SPB-0: Register an outpost
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 9 | Functional |

When a client has generated their OutPost, they shall immediately send their credentials (ID and public keys) to the server. If the ID already exists, it's rejected. Otherwise, it's stored in the database.

Addition: Currently stored in memory, needs to be persistently stored.

## CF-5: Design a better socket connection architecture
Now, a user enters a chat room with another contact, which establishes a socketio connection and renders incoming messages. However, ALL messages received are rendered.

Also, they need to ENTER a chat room to receive the messages. They should receive the messages at all time even in the dashboard.

Est. time: 8 hours

# M-2: Weekly unit test review
| Status      | Priority           | Type  |
| ------------- |-------------| -----:|
| Done | 7 | Reliability |
Each week, go through unit tests for CICDB and SPB servers and make sure the coverage is sufficient. Sufficient, in this case, is that each function is tested at least once in a way it is supposed to work.
