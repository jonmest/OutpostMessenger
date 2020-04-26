# Security Review 2
Note: We'll be referring to risks from the OWASP Top 10 https://owasp.org/www-project-top-ten/

## Risk #1 and #7:
Since last week, the CICDB server validates every user input and utilizes parameterized queries for SQL. As for the client frontend, we're using React which means it's quite secure by default since it escapes by default, which means any messages rendered from others should be safe. However, it's a good idea to sanitize an user's input before we encrypt it. Since clients would have access to the sanitization code, it's possible for an attacker to remove it, but at least it adds another layer of security.

## Risk #2
Besides this, we've implemented user authentication on the client. The frontend can only access sensitive data if it provides the CICDBV server with a correct passphrase, and for the remainder of the session provides a JWT token with each request (for sensitive data). The secret used for JWT-token creation is randomly generated at the start of each program session.

Users login with a *randomly generated passphrase* of 8 words, which provides 128 bits of entropy. IE, very safe. Especially considering we make it impossible for them to use easy-to-guess passwords, preventing credential stuffing attacks.

 Relevant xkcd:

![Passphrases are better than passwords](https://imgs.xkcd.com/comics/password_strength.png)

One thing we should consider is to limit or increasingly delay failed login attempts. It's probably not needed -- it would require 3,9×10^30 years to randomly try all combinations -- at 1000 guesses a second. No matter what, there are easier ways for an attacker to breach our applications security.

## Risk #2
Broken Access Control

Unauthenticated users are only allowed to request random passphrases and create a new Outpost, only if no one currently exists. Otherwise, they're forced to be authenticated before accessing any other API endpoint. There is also no other users' data stored in the client, which means there exists no apparent way for users to access another user's information.

# Risk 9:
Using Components with Known Vulnerabilities.

`npm audit` is an npm command to scan your project for vulnerabilities and automatically install any compatible updates to vulnerable dependencies. After doing a `npm audit` in our client application, we found 0 vulnerable packages.