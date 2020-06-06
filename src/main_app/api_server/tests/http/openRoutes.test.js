const axios = require('axios')
const niceware = require('niceware')
const fs = require('fs')
const request = require('supertest');
const path = require('path')
const dbPath = path.resolve(__dirname, 'outpost.db')
const fPath = path.resolve(__dirname, '.outpost')
const app = require('../../server')
const PORT = 5000

let server
beforeEach(() => {
    process.env.USER_DATA_PATH = './tests/http'
    server = app(5000, () => null)
  })

afterEach(() => {
    try {
        fs.unlinkSync(dbPath)
        fs.unlinkSync(fPath)
    } catch (e) {
        
    }
    
    try {
        fs.unlinkSync(fPath)
    } catch (e) {
    }
    
  
})

test('if we can correctly see whether an Outpost not exists when it doesnt', () => {
    return request(server).get('/open/exists-client')
    .then(r => expect(r.body.result).toBe("false"))
})

test('if we can correctly see whether an Outpost exists when it does', () => {
    return request(server).post('/open/create-client')
    .send({ "passphrase": niceware.generatePassphrase(16) })
    .then(() => {
        return request(server).get('/open/exists-client')
       .then(r => expect(r.body.result).toBe("true"))
    })
})

test('can create client when none exists', () => {
    return request(server).post('/open/create-client').send({ "passphrase": niceware.generatePassphrase(16) })
    .then(r => expect(r.body.result).toBe("success"))
 })

test('can NOT create client when one exists', () => {
    return request(server).post('/open/create-client')
    .send({ "passphrase": niceware.generatePassphrase(16) })
    .then(() => {
        return request(server).post('/open/create-client')
        .send({ "passphrase": niceware.generatePassphrase(16) })
        .then(r => expect(r.body.result).toBe("failure"))
    })
})

test('can NOT login when no outpost exists', () => {
    return request(server).post('/open/login')
    .send({ "passphrase": niceware.generatePassphrase(16) })
    .then(r => expect(r.body.result).toBe("failure"))
})

test('can login w/ correct passphrase when outpost one exists', () => {
    const pp = niceware.generatePassphrase(16)

    return request(server).post('/open/create-client')
    .send({ "passphrase": pp })
    .then(() => {
        return request(server).post('/open/login')
        .send({ "passphrase": pp })
        .then(r => expect(r.body.result).toBe("success"))
    })
})

test('can NOT login w/ incorrect passphrase when outpost one exists', () => {
    const pp = niceware.generatePassphrase(16)
    
    return request(server).post('/open/create-client')
    .send({ "passphrase": pp })
    .then(() => {
        return request(server).post('/open/login')
        .send({ "passphrase": niceware.generatePassphrase(16) })
        .then(r => expect(r.body.result).toBe("failure"))
    })
})

test('can receive passphrase', () => {
    return request(server).get('/open/passphrase-generate')
    .then(r => expect(r.body.passphrase.length).toBe(8))
})