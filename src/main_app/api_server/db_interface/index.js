const createClient = (client, db) => {
    const { masterKey, masterKeySalt, privateKey, publicKey, id } = client
    
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            /**
             * Create client table
             */
            db.run(
                `CREATE TABLE client (
                    id TEXT,
                    publicKey TEXT,
                    privateKey TEXT,
                    masterKey TEXT,
                    masterKeySalt TEXT
                    );`
                , (error, success) => {
                    if (error) reject('Already exists')
                })
          
            /**
             * Create contacts table
             */
            db.run(
                `CREATE TABLE contacts (
                    id TEXT,
                    alias TEXT,
                    publicKey TEXT,
                    lastSeen TEXT
                    );`
                , (error, success) => {
                    if (error) reject('Already exists')
                })

            /**
             * Create messages table
             */
            db.run(
                `CREATE TABLE messages (
                    sender TEXT,
                    recipient TEXT,
                    data TEXT,
                    timestamp TEXT
                    );`
                , (error, success) => {
                    if (error) reject('Already exists')
                })
            
            /**
             * Insert data into client table
             */
            db.run(
                `INSERT INTO client (
                    id,
                    publicKey,
                    privateKey,
                    masterKey,
                    masterKeySalt
                )
                VALUES ($id, $publicKey, $privateKey, $masterKey, $masterKeySalt);`, {
                    $id: id,
                    $publicKey: publicKey,
                    $privateKey: privateKey,
                    $masterKey: masterKey,
                    $masterKeySalt: masterKeySalt
                }, (error, success) => {
                    if (error) reject('Fail')
                    db.get("SELECT * FROM client", async (error, row) => {
                        if (error) reject('Already exists')
                        resolve(row)
                    })
                })
        })
    })
}

const loadClient = async (db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get("SELECT * FROM client", async (error, row) => {
                if (error) reject(error)
                resolve(row)
            })
        })
    })
}

const saveContact = async (contact, db) => {
    return new Promise((resolve, reject) => {

        db.serialize(() => {
            /**
             * Insert data into client table
             */
            db.run(
                `INSERT INTO contacts (
                    id,
                    publicKey                )
                VALUES ($id, $publicKey);`, {
                    $id: contact.id,
                    $publicKey: contact.publicKey
                }, () => {
                    resolve()
                })
        })
    })
}

const patchContactAlias = async (id, alias, db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(
                `UPDATE contacts
                SET
                    alias = $alias
                WHERE
                    id = $id;`, {
                $alias: alias,
                $id: id
                }, (error, success) => {
                    if (error) reject()
                    resolve()
                })
        })
    })
}

const deleteContact = async (id, db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(
                `DELETE FROM contacts
                WHERE
                    id = $id;`, {
                $id: id
                }, (error, success) => {
                    if (error) reject()
                    resolve()
                })
        })
    })
}

const loadContact = async (contactId, db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {

            db.get(`SELECT DISTINCT
                        id,
                        alias,
                        publicKey,
                        lastSeen
                    FROM 
                        contacts
                    WHERE
                        id = (?);
                    `,
                    contactId,
                    async (error, row) => {
                        if (error) reject(error)
                        if (row === undefined || row === null) {
                            reject()
                            return
                        }
                        resolve({
                            id: row.id,
                            publicKey: row.publicKey,
                            alias: row.alias,
                            lastSeen: row.lastSeen
                        })
            })
        })
    })
    .catch(() => console.log("Failed to load contact"))
}

const loadContacts = async (db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {

            db.all(`SELECT DISTINCT
                        id,
                        alias,
                        publicKey
                    FROM 
                        contacts;
                    `,
                    async (error, rows) => {
                        if (error) reject(error)
                        resolve(rows)
            })
        })
    })
    .catch(() => console.log("Failed to load contacts"))
}


const saveMessage = async (message, db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            /**
             * Insert data into client table
             */
            db.run(
                `INSERT INTO messages (
                    sender,
                    recipient,
                    data,
                    timestamp
                )
                VALUES (
                    $sender,
                    $recipient,
                    $data,
                    $timestamp
                );`, {
                    $sender: message.sender,
                    $recipient: message.recipient,
                    $data: message.data,
                    $timestamp: message.timestamp
                }, (error, success) => {
                    if (error) console.log(error)
                })

            db.run(
                `UPDATE contacts
                SET lastSeen = $lastSeen
                WHERE id = $sender OR id = $recipient;
                `, { 
                    $lastSeen: message.timestamp,
                    $sender: message.sender,
                    $recipient: message.recipient
                }, (error, success) => {
                    resolve()
                }
            )
        })
    })
    .catch(() => console.log("Failed to save message."))
}
const loadMessages = async (id, db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`SELECT *
                    FROM 
                        messages
                    WHERE
                        recipient = $id OR sender = $id;
                    `,
                    { $id: id },
                    (error, rows) => {
                        if (error) console.log(error)
                        resolve(rows)
            })
        })
    })
}

const loadAllMessages = async (db) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`SELECT
                        sender,
                        recipient,
                        data,
                        timestamp
                    FROM 
                        messages;
                    `,
                    async (error, rows) => {
                        if (error) reject(error)
                        resolve(rows)
            })
        })
    })
}


module.exports = {
    createClient,
    loadClient,

    saveContact,
    loadContact,
    loadContacts,
    deleteContact,
    patchContactAlias,

    saveMessage,
    loadMessages,
    loadAllMessages
}