import React, { useReducer } from 'react'
import GlobalContext from './GlobalContext'
import GlobalReducer from './GlobalReducer'
import {
    AUTH_FAIL,
    AUTH_SUCCESS,
    GET_CONTACT,
    CLEAR_CONTACT,
    SET_TITLE,
    ADD_CONTACT,
    SET_SOCKET
} from '../types'
import axios from 'axios'
import io from 'socket.io-client'
import { post } from '../../util/request'

const GlobalState = props => {

    const initialState = {
        isAuthenticated: false,
        socket: null,
        contacts: null,
        contact: {},
        client: null,
        bearToken: null,
        title: null,
        previousMessages: []
    }

    const [state, dispatch] = useReducer(GlobalReducer, initialState)

    const openSocket = async () => {
        const url = 'https://outpostmessenger.com/'

        return new Promise((resolve, reject) => {
            const socket = io(url)

            socket.on('Authentication request', async data => {
              console.log('Received request.')

              let encryptedToken = await post(
                'http://localhost:5000/outpost/encrypt',
                state.bearToken,
                {
                  serverKey: data.publicKey,
                  message: data.token
                }).then(data => JSON.parse(data.message))

              socket.emit('Authentication response', { 
                signedToken: encryptedToken.secret,
                nonce: encryptedToken.nonce,
                id: encryptedToken.sender
              })
              console.log('Sent response.')

              socket.on('Authentication success', data => {
                dispatch({
                    type: SET_SOCKET,
                    payload: socket
                })
                resolve(true)
              })
            })
          })
    }

    const setTitle = title => {
        dispatch({
            type: SET_TITLE,
            payload: title
        })
    }

    const authenticate = async (password) => {
        try {
            const res = await axios.post(
              "http://localhost:5000/open/login",
              { passphrase: password },
            )
    
            if (res.data.result === 'failure') {
                throw new Error()
            }

            const contacts = await fetch('http://localhost:5000/outpost/contacts', {
                mode: 'cors',
                headers: new Headers({
                'Authorization': await res.data.Authorization
                })
            })
            const json = await contacts.json()

              dispatch({
                type: AUTH_SUCCESS,
                payload: { 
                    bearToken: await res.data.Authorization,
                    client: await res.data.client,
                    contacts: await json.contacts     
                }
            })
            
            return 'SUCCESS'

        } catch (e) {
            dispatch({
                type: AUTH_FAIL,
                payload: null
            })
            return 'FAIL'
        }
    }

    const clearContact = () => {
        dispatch({
            type: CLEAR_CONTACT,
            payload: null
        })
    }

    const addContact = async contact =>  {
        dispatch({
            type: ADD_CONTACT,
            payload: state.contacts.concat(contact)
        })
    }

    const getContact = async (id) => {
        const contact = await fetch(
            `http://localhost:5000/outpost/contacts?id=${id}`, 
                {
                  method: 'GET',
                  mode: 'cors',
                  headers: new Headers({
                  'Authorization': state.bearToken,
                  'Content-Type': 'application/json'
                  })
            })
        const contactObj = await contact.json()

        const messages = await fetch(
            `http://localhost:5000/outpost/messages?id=${id}`, 
                {
                  method: 'GET',
                  mode: 'cors',
                  headers: new Headers({
                  'Authorization': state.bearToken,
                  'Content-Type': 'application/json'
                  })
            })
        const messagesObj = await messages.json()

        dispatch({
            type: GET_CONTACT,
            payload:  {
                contact: contactObj.contacts,
                previousMessages: messagesObj.messages
            }
        })
    }

    return <GlobalContext.Provider
    value={{
        client: state.client,
        contacts: state.contacts,
        messages: state.messages,
        bearToken: state.bearToken,
        contact: state.contact,
        previousMessages: state.previousMessages,
        authenticate,
        getContact,
        clearContact,
        setTitle,
        addContact,
        openSocket,
        socket: state.socket,
        title: state.title,
        isAuthenticated: state.isAuthenticated,

    }}>

        { props.children }
    </GlobalContext.Provider>
}

export default GlobalState