# Security Analysis
This document's purpose is to serve as aid in the process of identifying security and privacy risks when developing OutPost. To our help, we will take OWASP's recommendation for threat modeling.

## Basic terminologies
Source: https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html
> Information Asset, a body of knowledge that is organized and managed as a single entity. Like any other corporate asset, an organization's information assets have financial value.

> Threat Agent, an individual or group that can manifest a threat. It is fundamental to identify who would want to exploit the assets of a company, and how they might use them against the company.

> Attack Surface, the sum of the different points (the "attack vectors") where an unauthorized user (the "attacker") can try to enter data to or extract data from an environment.

> Likelihood, the possibility of a a threat event occurring where a threat actor will exploit a weakness. The likelihood of threat events resulting in adverse impacts estimates the possibility that a threat event would result in an actual outcome. The combined analysis of both threat assessment vectors impacts established an overall threat likelihood.

> Impact, the potential damage (physical, logical, monetary loss, etc) of a threat event.

> Control a safeguard or countermeasure to avoid, detect, counteract, or minimize security risks to information, computer systems, or other assets.

> Mitigation A systematic reduction of risk or likelihood's impact to an asset.

> Tractability Matrix, a grid that allows documentation and easy viewing of what is required for a system's security.
---
## Objectives
The main objective is to ensure that an user's messages are confidential when transferred through the central server.

The secondary objective is to prevent illegal access to an user's private keys, since failure to do so will open up vulnerability to threat agents accessing others' messages, and forging fake messages.

The tertiary objective is to prevent cross-site scripting and request forgery.

The quaternary objective is to ensure integrity of the centralized backend. Although assymmetric encryption will be used to prevent unauthorized access to plaintext messages, a compromised server could potentially still send forged or modified messages.

## Possible Threat Agents
1. Lone hackers or hacker groups who would like to steal someone's keys, forge messages, or read secret messages, for criminal purposes.
2. Domestic state actors who would like to perform mass surveillance.
3. Foreign state actors who would also like to perform mass surveillance, and possibly cause mayhem.
4. Ourselves, the owners of the application and the centralized server. If we were to suddenly become evil and desire to read all messages ever sent, would we be able to?

## Attack Surfaces
### Client
Overall, we consider the #1 risk at the client to be XSS attacks. However, the key difference between Electron apps and normal web apps, is that the Electron apps run locally, and not on the same instance as the normal web browser. Realistically, only someone with access to the client's OS in the first place should be able to perform XSS attacks.

That is something we don't think there's much to do about considering our current architecture, albeit that is an interesting challenge. But it means we also can absolutely not trust the client.

#### Electron
Electron is flawed due to the fact it does not provide any integrity protection, IE it does not have a way to ensure the source code is not tampered with by providing a checksum. It's inherent to Electron.

##### Likelihood
Low

---

Electron removes the sandboxing otherwise found in Chromium, which makes it very susceptible to XSS attacks.

##### Likelihood
High

An Electron-specific security checklist can be found here https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf

#### CICDB API Server


#### Front-end (XSS & CSRF)
On the client front-end, the attack surfaces to prioritize the most are those which take in user input as these are vulnerable to XSS and CSRF.
- Input fields
- Functions that read from local storage (which can be read and changed from anywhere in the application)

Since the front-end shall also be written in React, it's worth pointing out all string variables in views are automatically escaped.

##### Likelihood
High

### Socket IO
The exchange of messages between clients and the server will be through Socket.io which is its own JS-based protocol, incorporating both HTTP longpolling and WebSockets.

The number one priority is to verify the identity of a client when they connect to the Socket connection. Each client will have a ECDSA-keypair for the purpose of signing and verifying messages. The server will store the client's public key.

Upon connection, the client will sign and send a message already known by the client and server, using their private key. When the server receives this connection, they verify this message using the client's public key and see if the output is as expected. If it is, the connection is kept alive. If not, the client is not the one they claim to be and are rejected.

If the above logic is  implemented properly, we expect the security to be sufficient, especially when paired with a SSL/TLS connection. A threat agent could forge their identify if they somehow access an user's signing key, but that is beyond the scope of this component.

## Server-side
The main responsibility of the server is to uphold the Socket IO connections. It shall deal with the verification of connecting clients, and join them to the right room channel they can only send and read messages from the contact they communicate to.
