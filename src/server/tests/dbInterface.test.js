const { getOutpost, setOutpost, saveMessage, getContactRequests, sendContactRequests, getMessages, getConnected, setConnected, removeConnected } = require('../db_interface')
let db = null
var sqlite3 = require('sqlite3').verbose()

beforeEach(() => {
    db = new sqlite3.Database('test.db')
    db.serialize(() => {
        db.run(
            `CREATE TABLE IF NOT EXISTS outposts (
                id TEXT,
                publicKey TEXT
                );`
        )
        db.run(
            `CREATE TABLE IF NOT EXISTS messages (
                recipient TEXT,
                message TEXT
            )`
        )
        db.run(
            `CREATE TABLE IF NOT EXISTS connected (
                id TEXT,
                outpostId TEXT
            )`
        )
    
        db.run(
            `CREATE TABLE IF NOT EXISTS contact_requests (
                senderId TEXT,
                recipientId TEXT
            )`
        )
    })
})

test('if able to set outpost', async () => {    
    setOutpost('blablabla', 'publicKeyTestblabla', db)
})

test('if able to get outpost', async () => {
    const id = 'blablabla'
    setOutpost(id, 'publicKeyTestblabla', db)
    .then(() => {
        getOutpost(id, db)
    })
})

test('if able to set message', async () => {
    const id = 'blablabla'
    saveMessage(id, 'this is a message', db)
})

test('if able to get message', async () => {
    const id = 'blablabla'
    saveMessage(id, 'this is a message', db)
    .then(() => {
        return getMessages(id, db)
    })
    .then(data => {
       expect(data.length === 1)
       expect(data[0] === 'this is a message')
    })
})


test('if able to set connected', async () => {
    const id = 'blablabla'
    setConnected(id, id, db)
})

test('if able to get connected', async () => {
    const id = 'blablabla'
    setConnected(id, id, db)
    .then(() => {
        return getConnected(id, db)
    })
    .then(data => {
        expect(data.length === 1)
        expect(data[0].outpostId === id)
    })
})

test('if able to set contactRequest', async () => {
    const id = 'blablabla'
    sendContactRequests(id, id, db)
})

test('if able to set contactRequest', async () => {
    const id = 'blablabla'
    sendContactRequests(id, id, db)
    .then(() => {
        getContactRequests(id, db)
    })
})