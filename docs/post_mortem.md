# Outpost Messenger
Jon William Cavallie Mester, 1 juni 2020

## Abstract
This is the post mortem report for a development project during the spring of 2020. The process has taken over 200 hours, within a span of ten weeks.

## Project Overview
### The Finished Product
Outpost Messenger is an end-to-end-encrypted (E2EE) chat messaging application for Linux desktops. When a user sends a message to another user, it's encrypted locally on their machine and can *only* be decrypted and read by the intended recipient. This means, a malicious or compromised middle-man who intercepts the communication is unable to read it in plaintext. Thus, your messages will be kept secret from everyone but their intended recipients. They will also be verified to ensure they were sent from the claimed sender, and checked for integrity.

When the user receives messages from others, they store it locally. And unlike some other E2EE chat applications, the messages are also encrypted at rest. This means, whereas you with other applications could access the plaintext messages on your harddrive, Outpost stores them encrypted at all times. They can only be read by supplying the correct passphrase to decrypt the data.

#### Features:
- E2EE chat secured with Salsa20 and Poly1305 (private and with integrity)
- **Real-time** communication with `Socket.IO`
- At-rest-encryption
- Support for emoji and markdown use in messaging
- 100% anonymous user registration

## Technologies Used
I was quite ambitious when starting this project, as there were several technologies new to me which I wanted to incorporate and learn in the process.

- ReactJS
    - Front-end JS-framework for building graphical interfaces and web frontends.
- SocketIO
    - Library to allow for real-time TLS communication with Websockets and HTTP longpolling.
- SQLite + SQLCipher
    - SQLite is a lightweight SQL engine that allows for file-based databases, which has led to its popularity among client-based applications for local storage on smartphones and desktops. SQLite is an extension of SQLite, but with a completely encrypted database storage.
- TweetNaCl
    - TweetNaCl is a small JS-library with secure and well-tested implementations of several cryptographic standards, like Salsa20 and Poly1305.
- NodeJS
    - NodeJS is a runtime which allows JS code to be executed directly on a desktop, instead of in a conventional web browser.
- ElectronJS
    - ElectronJS is sort of like an extension of NodeJS, but with the capability to graphically render the DOM like you would see in a normal internet browser. This is done by shipping each ElectronJS-application with its own instance of a stripped down, "white label" Chrome browser to run in.
- ExpressJS
    - ExpressJS is a (HTTP mainly) server framework running on NodeJS.
- Jest
    - Jest is a testing framework, which I used to automate unit- and integration tests.

Seeing as these technologies were all new to me, it's been quite a ride with a lot of learning required. It may appear reckless to start a new project based on so many new, unknown techniques. However, I now have a stable, functioning application for the systems it was built for. And note, that I spent a lot of effort into planning my development and the application's architecture before starting *any* practical work. This prevented me from being overloaded and stunned by new impressions and what not - it was only a matter of focusing on the next step on the list. I knew exactly *what* needed to be done from the start, learning the abovementioned technologies were just the means to do it.

## Positive Experiences
In my experience spending time in the developer community, there is a strong focus on *tech*. "What framework should you learn in 2020?", "React VS Angular" and so forth in eternity. In this project, however, I laid that way of thinking aside, focused on the big picture and only used the libraries, languages and frameworks which seemed reasonably useful and dependable for their purposes. On the whole, I'm really happy I did that because it allowed me to be more productive than I believe I otherwise would have been if I overanalyzed what I was about to go with.

And paradoxically, I am happy to have utilized so many different new techniques as I did, since it gave me enough experience to know what, and what not, to use for future projects. It may seem contradictory to the previous paragraph, but I believe this skin in the game has taught me much more than reading anyone else's opinion on a technology would do. Some things I am definitely going to bring with me to the futures, and some things I've learned *not* to do a second time, and even though the latter may be classified as a negative experience, it is still... good!

## Negative Experiences
First off, this project is founded on Javascript. It's a great technology - for the web. However, which technology that survives and enjoys mass adoption is not only based on its quality or cleverness, but also its:

- Convenience
- Ease of use
- Availability of libraries
- Documentation
- Hype and popularity

In the case of Javascript, I believe it's become quite a duct tape language where something is easy to execute in the short run, but eventually that very same property can tangle us into a web of tape that makes everything a mess.

For example, Javascript is a browser language. It could only be run on the web. Eventually, someone took the part of web browsers which run the JS code and made it standalone: NodeJS. And eventually, someone wanted the graphical aspect of a browser's DOM as well, and created ElectronJS which ships applications with their own browser. This means an ElectronJS-application is not only ONE applications, it's two; the application you want to use, and an instance of the Chromium browser.

This means an ElectronJS-based app takes up considerably more disk space to store, and memory to run. And I mean, a lot more. Your ridicilously simple todo-application could require the same amount of memory as the Firefox-window you browse the internet in. With no apparent benefit from developing a native application in, say, Java, C++ or even Python3, besides Javascript having a lower barrier to entry of learning for the developer (but that may not be the case when compared to Python). Javascript as a language may even make things harder due to things like its lack of typechecking, which some claim to solve with the duct tape, band-aid way of Typescript. 

But if you want something to look, feel and behave like a dog, don't just buy a porcupine and call it Pluto.

Bringing a web technology to desktops may also bring some other unforeseen issues, since you basically pick up a web developer, drop them into a desktop development project and expect their existing knowledge to suffice. ElectronJS is basically web development, after all.

Doing that, however, leaves them ignorant to areas in which ElectronJS may be... lacking compared to more mature desktop platforms and techs. Look at Java, for example. Java platforms have security features that verify a program has a a reliable digital signature, to prevent forgery and tampering with its source code. Electron applications however, have none of that and as of now it doesn't appear to be coming any time soon. In [this repository](https://github.com/jonmest/How-To-Tamper-With-Any-Electron-Application), I outline my exploratory analysis where I show just how easy it is for someone to tamper with a built and distributed Electron application to sneak in potentially dangerous backdoors. A normal user would start a tampered-with Electron application, it would run like normal, and the average web developer may not even know that to be the case, even though they're deemed sufficiently knowledgeable to develop the whole thing!

Anyways, to sum this small rant up, I would probably use a completely different tech stack for developing *desktop applications* next time around. Java is mature and well-tested, has stable libraries such as JavaFX and Swing. It'd be really interesting to build something with C++ and GTK. These are built for being run locally on desktops, as opposed to JS, and they seem more direct in the way you build a complete desktop application with a GUI. Not as many hoops to jump through as with an Electron, React and JS stack.

### Premature optimization
Something else I felt was negative was my own case of pre-mature optimization. One of my goals was to have stored messages encrypted at rest. I looked at the "golden standard" in this area of E2EE chat applications, Signal, and observed that they used SQLCipher for this purpose. I wanted to imitate their solution as well, so I began using the JS version of SQLCipher, even though I'd already implemented my own, simpler version of at-rest-encryption for SQLite.

To make a long story short, the JS library was incompatible with Electron due to subtle differences between its and NodeJS' binaries, so I had to spend a week tinkering with it, until finally giving up and making greater changes in my architecture. This issue was caused by outdated code in the SQLCipher library, which taught me to always make sure a technology/library is well-maintained and viable to work with **beforehand**.

## Conclusion
This has been a fun project. I really liked the cryptographic and security aspects of developing this application, and it's something I'd be interested in working with in the future. It was a bit sad to see what I did in those respects get overlooked in the tuition sessions -- UI seemed to be all that mattered -- but I still got the opportunity to do what I liked.

As for further development of the project, I will probably not keep building upon this application. However, I would be interested in building a crypto-messaging application that ensures maximal integrity and verification of users' identities, something which could possibly be of value to certain workplaces and organizations.