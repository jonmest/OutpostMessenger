# Test Results


# Manual Test Cases
## TC111
**Description:** When app is started for the first time, a registration view is displayed.

**Precondition:** The app userdata is nonexistent.

### Test steps:
1. Start application

### Expected outcome:
The headline "Create your Outpost now" should be displayed, along with a random 8-word passphrase, a button to accept it, and another button to reject it.

### Outcome:
*Success*

## TC112
**Description:** When registrating an outpost, user can accept a passphrase.

**Precondition:** The app userdata is nonexistent.

### Test steps:
1. Start application
2. Click button "Yes, I'll memorize and use this passphrase."

### Expected outcome:
An outpost should be generated, and user gets automatically signed into dashboard.

### Outcome:
*Success*

## TC113
**Description:** When registrating an outpost, user can reject a passphrase.

**Precondition:** The app userdata is nonexistent.

### Test steps:
1. Start application
2. Click button "No, generate another one."

### Expected outcome:
Another passphrase should have replaced the existing one.

### Outcome:

*Success*

## TC114
**Description:** When restarting the app after registration, login view should be displayed.

**Precondition:** An outpost has been registered in a previous session.

### Test steps:
1. Start application

### Expected outcome:
Login view should be displayed, with a headline of "Log in with your passphrase"

### Outcome:

*Success*

## TC115
**Description:** Entering correct passphrase logs you in.

**Precondition:** An outpost has been registered in a previous session, and the passphrase has been saved for now.

### Test steps:
1. Start application
2. Enter the stored passphrase in textarea.
3. Click submit.

### Expected outcome:
User gets logged in and redirected to dashboard.

### Outcome:
*Success*

## TC121
**Description:** User can add contact

**Precondition:** Two contacts have been created, and are logged in.

### Test steps:
1. In user 1 account, click "Add contact" in dashboard
2. Enter user 2's id in textfield and press enter.

### Expected outcome:
1. A green success notification should be displayed below textfield.
2. User 2 should receive contact request.

### Outcome:
1. *Success*
2. *Success*

## TC121
**Description:** User can fail to add contact

**Precondition:** Two contacts have been created, and are logged in.

### Test steps:
1. In user 1 account, click "Add contact" in dashboard
2. Enter user 2's id in textfield, and presses the key "K" one extra time and then enter.

### Expected outcome:
A red failure notification should be displayed below textfield.

### Outcome:
*Success*

## TC123
**Description:** User can accept contact request

**Precondition:** Two contacts have been created, and are logged in. User 1 has sent request to user 2.

### Test steps:
1. A notification is displayed in dashboard for user 2, saying that user 1 wants to add them, user 2 clicks it.

### Expected outcome:
User 1 is now shown as a contact in user 2's dashboard.

### Outcome:
*Success*

## TC131
**Description:** User 1 can send message to user 2

**Precondition:** Two contacts have been created, are logged in, and have each other added as contacts.

### Test steps:
1. User 1 opens Contact page for user 2.
2. User 1 enters "Hello" in textarea and presses Enter.

### Expected outcome:
User 1 and user 2 see the message "Hello" appear in chat history.

### Outcome:
*Success*

## TC141
**Description:** User 1 can change alias for user 2

**Precondition:** Two contacts have been created, are logged in, and have each other added as contacts.

### Test steps:
1. User 1 opens Dashboard page.
2. User 1 locates listing for user 2.
3. User 1 clicks on cog icon in listing.
4. User 1 enters "Nick" in alias text field and clicks submit button

### Expected outcome:
Listing for contact should now be referring to "Nick".

### Outcome:
*Success*