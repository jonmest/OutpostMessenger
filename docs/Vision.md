# Project Vision
## The Problem
Do you know what *privacy* truly means? 

Privacy is a state in which one is not observed or disturbed by other people. For example, you may want to hold a private conversation without untrusted parties accessing your messages. In the digital age, however, that may pose a challenge since there is a wide array of vectors through which that privacy can be compromised. If you send messages on a service that stores them in plaintext in a database, you're exposed to the threat of the messages leaking out if that service gets struck by a rogue employee, a hacker or government agency that practices mass surveillance.

To provide users with the privacy they desire, some technology companies have resorted to encryption. Encryption is the process of encoding information in such a way that only parties intended to access the information can do so, whereas unauthorized parties can not. Authorized parties hold a so-called *key*, which is used to decode the encrypted data into a readable format, called plaintext.

Surprisingly, the implementation of encryption is often done poorly. The world's largest technology company, Apple, has admitted to storing users' iMessages encrypted on their cloud [along with the key that encrypted them](https://support.apple.com/en-us/HT202303), which largely defeats the purpose of encrypting them in the first place. The only reason for doing such a thing is for keeping data secure in transit. But today that is less of a concern since most online services communicate over TLS, which provides very secure encryption of all traffic.

There are other technology companies that aim to serve individuals and businesses interested in better privacy by providing end-to-end encryption (E2EE). E2EE can be described as a more rigorous form of encryption where a message stays encrypted until its passed on to the indented recipient, who then decrypts it.

## The Solution
Our vision is to create an end-to-end encrypted text messaging desktop application for all people who wish to send messages only the intended recipients can read. We will refrain from calling it *secure*, however, the goal is to keep the sent data safe from most unauthorized parties, even the peeking eyes of ours, the owners of the centralized server through which all communication occurs.

Cryptography engineering is hard, because of which we refrain from calling the envisioned application "secure". However, we want to follow some cryptography engineering best practices, in the hopes of creating an MVP we can further build upon in the future.

### Features
- Users shall be able to send text messages to contacts in real-time. The messages will be end-to-end encrypted and only readable by the intended recipient.
- Users will hold an anonymous address that others can add to their contact list. This can be shared by entering the address manually or scanning a QR-code.
- Unlike most other text messaging applications, a minimal amount of information about the client will be stored on a centralized server. Instead, each client will store their own collection of credentials, contacts and messages (their "Outpost") locally to ensure their messages are kept secure from everyone else but themselves.
- At rest, all their sensitive information will be encrypted and only able to be unlocked by the user's passphrase.


## Existing E2EE Messaging Services
The American non-profit organization Signal gives users of their app the ability to privately communicate using their own Double Ratchet-based protocol. WhatsApp, another messaging app, provides the option to communicate securely using the Signal protocol as well.

Other E2EE-messaging apps include:
- Telegram
- Wickr
- Wire

Due to the time constraints of this project, the goal is to build an application similar to these and not to create something groundbreaking. However, we still feel there is a need for more privacy- and security-focused software, so that should not be an issue.

### Technology
The application will be built in Electron, something you could think of as an extension of NodeJS, the difference being that Electron allows you to build complete graphical desktop apps in the Chromium browser engine.

This project will be based on web technologies. Many claim that web applications are potentially less secure due to their inherent susceptibility to injection attacks. But the web as a platform is not going anywhere, people will still use it and applications built on web technologies will still be developed. Is it not better to suck it up, and try to make it as secure as possible? Besides, the previously mentioned Signal desktop app was built on web technologies, and it's largely considered the golden standard of E2EE apps.

The Electron app will consist of three main components:

#### Client
A ReactJS frontend, a NodeJS-based local server which deals with the heavy computations, and a SQLCipher database. SQLCipher is an extension of SQLite, which is a good alternative for databases local to the client, with added support for encrypting the data at rest.

#### Central backend
There will also be a central server programmed in NodeJS and a server framework such as Express, through which all sent messages will get privately forwarded.

#### Cryptography

Messages will be encrypted between a sender and recipient using the Curve25519-based Diffie-Hellman key exchange. Curve25519 is an elliptic curve. The algebraic structures of elliptic curves allow for cryptography that is faster than other approaches such as RSA, while still maintaining security. 

Diffie-Hellman key exchange is a method for two parties to securely exchange cryptographic keys over a public channel. We will also utilize the Salsa20 stream cipher and Poly1305 authenticator to verify that each sender and recipient is who they claim to be.

However, we will not implement these cryptographic primitives ourselves. To lower the frequency of faults in the application, we will make use of existing open-source library NaCl which already provides functions for these very things. It will help us abstract the code we write ourselves and be less prone to making serious mistakes. TweetNaCl.js is a port of NaCl for Javascript, and we will use it.

## Pour Conclure
Let's hope this vision document is sufficient. It may be updated with time, as our goalposts may be moved.

Sincerely,

Jon Cavallie Mester,
1DV430, UDM19