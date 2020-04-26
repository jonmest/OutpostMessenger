# Sprint Backlog 1
## Analysis of previous week:
Last week the focus lied on planning the project, what to build and how to do it. We arrived at a preliminary architecture where the client app is made up of a React frontend ran within Electron, and a local API server running in parallell where the heavy computation/logic is executed. Clients will also communicate with each other through a centralized server and socket.io, which also needs to be implemented.

Since the plan is also somewhat completed, we will go right ahead and start implementing, and if any challenge comes up we'll leave room for pivoting.

The #1 priority will be a working instance of the CIC server.

---

## Backlog:
### CIC-1: An 8-word passphrase generator
Status: Finished (with regression tests)

Est. time: 2h

Actual time: 1

---

### CIC-2: Derive a symmetric Master key from passphrase
Status: Finished (with regression tests)

Est. time: 2h

Actual time: 

---

### CIC-34: Generate an asymmetric keypair for authenticated encryption/decryption
Status: Finished (with regression tests)

Est. time: 2h

Actual time:

---

### CIC-5: Encrypt the keypair pair using the master key
Status: Dropped (not necessary)

Est. time: 1h

Actual time: -

---
### CIC-6: Decrypt the encrypted keypair pair using the master key
Status: Dropped (not necessary)

Est. time: 1h

Actual time: -

---

### CIC-0: Create/load client
Status: Waiting

Est. time: 5

Actual time:    

---

### CIC-7: Create contacts / add contacts to contact list
Status: Finished

Est. time: 5

Actual time:8

---

### Learn SQL /SQLite-node/SQLCipher
Learn enough SQL to store a client object, contacts and messages, and how to retrieve them in a proper manner.

Status: Waiting

Est. time: 10

Actual time: 15

Comments: Javascript wrapper of SQLCipher posed some issues which took up quite a lot of time.

---
