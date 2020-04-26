# Use Cases
## UC1: Create an Outpost
- Pre-conditions: None
- Post-conditions: The user has an Outpost stored in their local database, allowing them to log in, send, receive, encrypt, decrypt, sign and verify messages.

### Steps
1. User opens app for the very first time.
2. Application displays a randomly generated passphrase of 8 words, and prompts user to accept or reject it.
3. User decides to accept the offered passphrase.
4. Application generates a master key from the passphrases, and randomly creates asymmetric keys and ID. IE their Outpost.

### Alternative routes
3. User decides not to accept the offered passphrase.
    - Application shows a new passphrase
    - User accepts it (or repeat)

## UC2: Log into Outpost
- Pre-conditions: User has created an Outpost (UC-1)
- Post-conditions: User has loaded the stored Outpost and holds it decrypted in memory.

### Steps
1. User opens app
1. Application shows an input field to enter passphrase.
3. User enters their passphrase.
4. Application loads OutPost and decrypts it with key derived passphrase.

### Alternative routes
3. User enters incorrect passphrase.
    - Form displays an error message. Nothing else happens.
    - User enters passphrase again

## UC3: Add a contact with ID
- Pre-conditions: User has signed in (UC-2)
- Post-conditions: Another contact is added to the User's contact list.

### Steps
1. The User decides to add contact with ID.
2. Application displays an input field for entering new contact's ID.
3. User enters a new contact's ID.
4. Application adds the new contact to list. They are now listed to the User, and they can start new conversations.

## UC4: Add a contact with QR
- Pre-conditions: User has signed in (UC-2)
- Post-conditions: Another contact is added to the User's contact list.

### Steps
1. The User decides to add a contact.
2. Application displays an input field for uploading an image of the QR-code.
3. User uploads the QR-code image.
4. Application adds the new contact from QR code to list. They are now listed to the User, and they can start new conversations.

## UC5: Send a message
- Pre-conditions: User has signed in (UC-2) and added a contact (UC-3/UC-4) to whom they wish to send a message.
- Post-conditions: A message has been encrypted and dispatched to the intended recipients.

### Steps
1. The User decides to start a conversation with contact.
2. Application displays a text field and submission button.
3. User types in a message in the text field and submits.
4. Application encrypts message and sends it to recipient.
