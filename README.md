# OutpostMessenger
Outpost Messenger is an end-to-end encrypted real-time chat application built on Electron, NodeJS, React, Socket.IO and TweetNaCl. The source code for the central server through which clients communicate is included, however, the client application connects to `outpostmessenger.com` by default.

## Requirements
You will need NodeJS, NPM and Yarn installed. We should stop mixing package managers eventually, but for building purposes it was a temporary solution.

## Get started
1. Clone the repo
2. From root, `cd /src/main_app`
3. `npm install`
4. `cd /src/main_app/api_server`
5. `npm install`
6. `cd ..`
4. `npm start` for development
5. To build from source, `npm build`
