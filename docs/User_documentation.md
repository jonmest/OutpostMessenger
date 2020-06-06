# How to use Outpost Messenger
Outpost messenger is distributed for Linux platforms. An installer can be downloaded from https://outpostmessenger.com. **The installer is tailored to Ubuntu-derivatives** (Ubuntu, Linux Mint, ElementaryOS etc.), so in the case you use another flavour you may have to download the built application and manually place it in the directory suitable to your distro.

1. Click "Download Free For Linux Now" on [the website](https://outpostmessenger.com).
2. Download the file.
3. From the directory in which the downloaded file is located, enter in bash: ```chmod +x deb-installer```. This makes the installer executable. Before doing so, you might want to take a look at the source code if you're concerned about security. It'll download the application, place it in the right directory and ensure the NodeJS dependency is met.
4. Execute the installer. `sudo ./deb-installer`
5. The application will be installed in `~/usr/local/etc/outpost/`.
6. When the script is finished, you may have to enter the command `source ~/.bashrc`.
7. After doing so, you can start the application by just typing `outpost` in the terminal.