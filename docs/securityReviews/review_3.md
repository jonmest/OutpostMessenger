# Security Review 3
The main focus this week has been on establishing a socket.io connection between a client and the centralized server. Due to that, the centralized server and its socket.io implementation is likely the area with most vulnerabilities and risks as of now.

During the upcoming week, we will setup a, sort of , penetration test lab with three different devices having Outpost installed on them. There will be some requirements we will ensure are fulfilled, and before, let's establish the actors *Alice*, *Bob* and *Eve*.

Alice and Bob want to communicate with each other. Eve wants to spy on them. No other party should be able to read the plaintext messages, so even if Eve works at the server center or hacks the centralized server, she'll be unable to read their correspondence.

And ideally, no other party than the server should be able to read Alice's and Bob's ciphertext messages.

- Alice, Bob and Eve connect to the socket server. Alice messages Bob. Eve should not receive any information of their communication.

- Eve has free access to the central server through which all messages pass. Even when she logs all messages, she can only get to know the sender and recipient, not the actual messages.

- Eve tries connecting to the Socket.io server, claiming to have Alice's ID in the hopes of posing as her. She should have the wrong private key and get rejected.