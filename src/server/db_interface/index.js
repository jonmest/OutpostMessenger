module.exports = {

    getContactRequests: async (outpostId, db) => {
        return new Promise((resolve, reject) => {
            db.all(
                `
                SELECT 
                    senderId,
                    recipientId
                FROM contact_requests
                WHERE recipientId  = $outpostId;
                `, {
                $outpostId: outpostId
            }, (error, success) => {
                if (error) console.log(error)
                else {
                    db.run(
                        `
                        DELETE FROM contact_requests
                        WHERE recipientId = $outpostId;`,
                        {
                            $outpostId: outpostId
                        }
                    )
                    resolve(success)
                }
            }
            )
        })
    },

    sendContactRequests: async (senderId, outpostId, db) => {
        return new Promise((resolve, reject) => {
            db.all(
                `
                INSERT INTO
                    contact_requests (
                        senderId, recipientId
                    )
                VALUES ($senderId, $recipientId);
                `, {
                $senderId: senderId,
                $recipientId: outpostId
            }, (error, success) => {
                if (error) console.log(error)
                else resolve(success)
            }
            )
        })
    },

    getConnected: async (outpostId, db) => {
        return new Promise((resolve, reject) => {
            db.all(
                `
                SELECT 
                    id,
                    outpostId
                FROM connected
                WHERE outpostId  = $outpostId;
                `, {
                $outpostId: outpostId
            }, (error, success) => {
                if (error) console.log(error)
                else resolve(success)
            }
            )
        })
    },

    setConnected: async (id, outpostId, db) => {
        return new Promise((resolve, reject) => {
            db.run(
                `
                INSERT INTO connected (
                    id, outpostId
                )
                VALUES ($id, $outpostId);
                `, {
                $id: id,
                $outpostId: outpostId
            }, (error, success) => {
                if (error) console.log(error)
                else resolve(true)
            }
            )
        })
    },

    removeConnected: async (id, db) => {
        return new Promise((resolve, reject) => {
            db.run(
                `
                DELETE FROM connected
                WHERE id = $id;
                `, {
                $id: id
            }, (error, success) => {
                if (error) console.log(error)
                else resolve(true)
            }
            )
        })
    },

    getOutpost: async (id, db) => {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT 
                id,
                publicKey
            FROM outposts
            WHERE id  = ?`

            db.serialize(() => {
                db.get(sql, id, (err, row) => {
                    if (err) reject(err)
                    resolve(row)
                }
                )
            })
        })
    },
    setOutpost: async (id, publicKey, db) => {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(
                    `
                    INSERT INTO outposts (
                        id, publicKey
                    )
                    VALUES ($id, $publicKey);
                    `, {
                    $id: id,
                    $publicKey: publicKey
                }, (error, success) => {
                    if (error) console.log(error)
                    else resolve(true)
                }
                )
            })
        })
    },

    saveMessage: async (recipient, message, db) => {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(
                    `
                    INSERT INTO messages (
                        recipient, message
                    )
                    VALUES ($recipient, $message);
                    `, {
                    $recipient: recipient,
                    $message: message
                }, (error, success) => {
                    if (error) console.log(error)
                    else resolve(true)
                }
                )
            })
        })
    },
    getMessages: async (recipient, db) => {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(
                    `
                    SELECT 
                        message
                    FROM
                        messages
                    WHERE
                        recipient = $recipient;
                    `, {
                    $recipient: recipient,
                }, (error, messages) => {
                    if (error) console.log(error)

                    db.run(`
                        DELETE FROM 
                            messages
                        WHERE
                            recipient = $recipient;
                        `, {
                        $recipient: recipient,
                    }, (error, success) => {
                        if (error) console.log(error)
                    })

                    resolve(messages)
                }
                )
            })
        })
    }
}