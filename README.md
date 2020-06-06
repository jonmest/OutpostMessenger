# OutpostMessenger
Outpost Messenger is an end-to-end encrypted real-time chat application built on Electron, NodeJS, React, Socket.IO and TweetNaCl. The source code for the central server through which clients communicate is included, however, the client application connects to `outpostmessenger.com` by default.

# How to install distributed application
Outpost messenger is distributed for Linux platforms. An installer can be downloaded from https://outpostmessenger.com. **The installer is tailored to Ubuntu-derivatives** (Ubuntu, Linux Mint, ElementaryOS etc.), so in the case you use another flavour you may have to download the built application and manually place it in the directory suitable to your distro.

1. Click "Download Free For Linux Now" on [the website](https://outpostmessenger.com).
2. Download the file.
3. From the directory in which the downloaded file is located, enter in bash: ```chmod +x deb-installer```. This makes the installer executable. Before doing so, you might want to take a look at the source code if you're concerned about security. It'll download the application, place it in the right directory and ensure the NodeJS dependency is met.
4. Execute the installer. `sudo ./deb-installer`
5. The application will be installed in `~/usr/local/etc/outpost/`.
6. When the script is finished, you may have to enter the command `source ~/.bashrc`.
7. After doing so, you can start the application by just typing `outpost` in the terminal.

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
