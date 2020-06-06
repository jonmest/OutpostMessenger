const niceware = require('niceware')
const fs = require('fs')
const request = require('supertest');
const path = require('path')
const dbPath = path.resolve(__dirname, 'outpost.db')
const fPath = path.resolve(__dirname, '.outpost')
const app = require('../../server')

/**
 * Mock client
 * {
        id: 'ed95e3aa229cf738',
        publicKey: 'WGtAoJV0afnZIV/DZyKrHYTKZVW8rzCYOUT/1lAyvEA=',
        privateKey: 'KulDaXpNy350XKAIWeet08J7H0K/eting3Ih+FDnfxU=',
        masterKey: '6OIL8arnyRHIiJMH2UWK3UUqWryioAxdXgaVMtl6jY4=',
        masterKeySalt: 'WYx3G1dlE6DoXJZGM0w6AA=='
      }
 */

let server
let pp
let token
beforeEach(() => {
    process.env.USER_DATA_PATH = './tests/http'
    server = app(5000, () => null)
    pp = niceware.generatePassphrase(16)
    
    return request(server).post('/open/create-client')
    .send({ "passphrase": pp })
    .then(() => {
        return request(server).post('/open/login')
        .send({ "passphrase": pp })
        .then(r => {
            token = r.body["Authorization"]
        })
    })
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

test('can not access route when not authenticated', () => {
    return request(server).get('/outpost/contacts')
    .then(r => expect(r.body).toBe('You need to login'))
})

test('contact list is empty when it should', () => {
    return request(server).get('/outpost/contacts')
        .set('Authorization', token)
        .then(r => expect(r.body.contacts.length).toBe(0))
})

test('contact list contains right contact ', () => {
    return request(server).post('/outpost/contacts')
        .send({ id: "ed95e3aa229cf738", publicKey: "WGtAoJV0afnZIV/DZyKrHYTKZVW8rzCYOUT/1lAyvEA="})
        .set('Authorization', token)
        .then(() => {
            return request(server).get('/outpost/contacts')
                .set('Authorization', token)
                .then(r => {
                   expect(r.body.contacts.length).toBe(1)
                   expect(r.body.contacts[0]).toEqual(
                    { alias: null, id: "ed95e3aa229cf738", publicKey: "WGtAoJV0afnZIV/DZyKrHYTKZVW8rzCYOUT/1lAyvEA="}
                   )
                })
        })
})