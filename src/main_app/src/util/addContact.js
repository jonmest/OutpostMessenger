import { post } from '../util/request'

const getContact = async id => {
    return fetch(
        `https://outpostmessenger.com/outposts?id=${id}`, 
        {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
        })
    })
    .then(data => data.json())
    .then(contact => contact.data)
}

const setContact = async (contact, myToken) => {
    post('http://localhost:5000/outpost/contacts',
        myToken,
        contact
    ).then(data => {
        if (data.result === 'failure') {
            throw new Error()
        } else if (data.result === 'success') {
            return true
        }
})
}

export {getContact, setContact}