# Client Server API
The client server API is supposed to be a local Node/Fastify server ran at the client, parallell to the Electron main and renderer processes. The goal is to separate the front-end userface from the cryptographic logic and more.

I think the API will be stateful. That is, in the beginning of the server's life session (when a user starts the app), the user will authenticate to the server to decrypt their Outpost, and it will remain in server memory until the desktop app and server is stopped.

Proposed endpoints:
___

## 1. Get random passphrase
GET `/passphrase/generate`

Host: localhost:3000

Content-Type: application/json

Generate random 8-word passphrase, see CIC-1.

## 2. Create OutPost from passphrase
POST `/outpost/create`

Host: localhost:3000

Content-Type: application/json
```
{
  "passphrase" : String
}
```
## 3. Authenticate OutPost
POST `/outpost/authenticate`

Host: localhost:3000

Content-Type: application/json
```
{
  "passphrase" : String
}
```
## 4. Get OutPost data / see if logged in
GET `/outpost/me`

Host: localhost:3000

Content-Type: application/json

## 5. Encrypt OutPost message
POST `/outpost/encrypt`

Host: localhost:3000

Content-Type: application/json

## 6. Decrypt OutPost message
POST `/outpost/decrypt`