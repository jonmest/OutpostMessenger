import React, { useReducer } from 'react'
import GlobalContext from './GlobalContext'
import GlobalReducer from './GlobalReducer'
import {
    AUTH_FAIL,
    AUTH_SUCCESS,
    CLEAR_CONTACT,
    SET_TITLE,
    ADD_CONTACT,
    SET_SOCKET,
    LOAD_CONTACTS
} from '../types'
import io from 'socket.io-client'
import { post } from '../../util/request'

const GlobalState = props => {

    const initialState = {
        isAuthenticated: false,
        socket: null,
        contacts: [],
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
                `http://localhost:${window.cicdbPort}/outpost/encrypt`,
                state.bearToken,
                {
                  serverKey: data.publicKey,
                  data: data.token
                }).then(data => JSON.parse(data.message))

              socket.emit('Authentication response', { 
                signedToken: encryptedToken.secret,
                nonce: encryptedToken.nonce,
                id: encryptedToken.sender
              })
              console.log('Sent response.')

              socket.on('message', message => {
                post(
                    `http://localhost:${window.cicdbPort}/outpost/decrypt`,
                    state.bearToken,
                    { message }
                  ).then(decrypted => {
                    post(
                    `http://localhost:${window.cicdbPort}/outpost/messages`,
                      state.bearToken,
                      decrypted.message
                    )
                  })
              })

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

    const loadContacts = token => {
        fetch(`http://localhost:${window.cicdbPort}/outpost/contacts`, {
                mode: 'cors',
                headers: new Headers({
                'Authorization': (token) ? token : state.bearToken
            })})
        .then(data => data.json())
        .then(data => data.contacts)
        .then(contacts => {
            dispatch({
                type: LOAD_CONTACTS,
                payload: contacts
            })
        })
    }

    const authenticate = (password) => {
        return new Promise((resolve, reject) => {
            try {
                fetch(
                    `http://localhost:${window.cicdbPort}/open/login`,
                  {
                    method: 'POST',
                    mode: 'cors',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({ passphrase: password })
                    })
                .then(res => res.json())
                .then(res => {
                    if (res.result !== 'success') throw new Error()

                    dispatch({
                        type: AUTH_SUCCESS,
                        payload: { 
                            bearToken: res.Authorization,
                            client: res.client,
                        }
                    })
                    return res.Authorization
                })
                .then(token => {
                    loadContacts(token)
                })
                .then(() => resolve('SUCCESS'))
                .catch(e => resolve('FAIL'))
            } catch (e) {
                dispatch({
                    type: AUTH_FAIL,
                    payload: null
                })
                resolve('FAIL')
            }
        })
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
            payload: contact
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
        // getContact,
        loadContacts,
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