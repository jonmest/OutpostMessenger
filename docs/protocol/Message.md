# Message protocol
For sake of simplicity, we will define a protocol for the structure of plaintext and ciphertext messages exchanged between clients.

## Plaintext message
```
{
    'recipient' : String,
    'sender'    : String,

    'message'   : {
        'count' : integer, // Start count at 1, always increase
        'plain' : String,
        'date'  : String
    }
}
```

## Ciphertext message
```
{
    'recipientId' : String,
    'nonce': String,
    'secret' : {
        'sender'    : String,
        'date'  : String,
        'plain'   : Asymmetric nonce + encrypt(JSON.Stringify(message))
    } => String

}
```