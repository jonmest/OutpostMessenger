import React, { Fragment, useContext, useEffect, useState, useRef }   from 'react';
import GlobalContext from '../../context/global/GlobalContext'
import { post, get } from '../../util/request'
import io from 'socket.io-client'
import socketAuth from '../../util/socketAuth'
import MessageList from '../layouts/MessageList'

const Contact = props => {

  /*
  * Define local state
  * message = message user currently writing on
  * messages = array of existing messages in convo
  */
 const [message, setMessage] = useState('')
 const [messages, setMessages] = useState([])
 const [socket, setSocket] = useState(null)

  /*
  * Define global context and on mount
  * fetch current contact information
  */
  const globalContext = useContext(GlobalContext)
  const { contact, getContact } = globalContext
  const messagesEndRef = useRef(null)

  const setupSocket = async url => {
    return new Promise((resolve, reject) => {
      const socket = io(url)
      socketAuth(socket, globalContext, () => {
          socket.on('oldMessages', data => {
            data.forEach(item => handleMessage(item.message))
          })

          socket.on('message', data => {
            handleMessage(data)
          })
      })
      resolve(socket)
    })
    .then(data => setSocket(data))
  }

  useEffect(() => {
    messagesEndRef.current.scrollIntoView()
    document.body.style.overflowY = 'hidden'
    if (socket) window.socketConn = socket
  })

  useEffect(() => {
    return () => window.socketConn.close()
  }, [])

  useEffect(() => {
    globalContext.setTitle(contact.id)
  }, [contact, messages])

  useEffect(() => {
    
    getContact(props.match.params.contact)

    get(
      `http://localhost:5000/outpost/messages?id=${props.match.params.contact}`,
      globalContext.bearToken,
    )
    .then(data => {
      setMessages(msgs => msgs.concat(data.messages))
    })

    // Establish IO connection
    setupSocket('https://outpostmessenger.com/')

    // eslint-disable-next-line
  }, [])

  
  /**
   * Handle INCOMING message
   * - Decrypt it
   * - Store to local message DB
   * @param {string} message 
   */
  const handleMessage = async message => {
    console.log(message)

    post(
      'http://localhost:5000/outpost/decrypt',
      globalContext.bearToken,
      { message }
    ).then(decrypted => {
      post(
        'http://localhost:5000/outpost/messages',
        globalContext.bearToken,
        decrypted.message
      )
      return decrypted.message
    })
    .then(message => {
      console.log(message)
      setMessages(msgs => msgs.concat(message))
    })


  }

  /*
  * Event handlers for user input
  */
  const handleMessageChange = event => setMessage(event.target.value)

  /**
   * Eventhandler for submission of message form
   * @param {Event} event 
   */
  const handleSubmit = async event => {
    event.preventDefault()
    if (message.length < 1) return

    // For timestamping the message
    const date = new Date()
    const now = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.000`

    const body = {
      recipient: contact.id,
      sender: globalContext.client.id,
      data: message,
      timestamp: now
    }

    // Clear message form
    setMessage('')

    // Store to local message DB before encryption
    post('http://localhost:5000/outpost/messages',
      globalContext.bearToken,
      body)
    .catch(() => console.log('Failed to store message.'))
    
    /*
    * Encrypt message
    */
    post('http://localhost:5000/outpost/encrypt',
      globalContext.bearToken,
      body)
    .then(data => data.message)
    .then(data => {
        /*
        * Send message to socket server
        */
        socket.emit('message', data)
    })
    .catch(() => console.log('Failed to encrypt message.'))

    setMessages(msgs => msgs.concat(body))
  }
  
  const handleKeydown = event =>  {
    if (event.keyCode === 13) {
      event.preventDefault()
      handleSubmit(event)
  }
}

  return (
    <Fragment>
      <div style={{ height: '90vh', overflowY: 'hidden'}}>

                    <div>
                    <div className="container" style={{
                      height: '70vh',
                      overflowX: 'hidden', overflowY: 'scroll'
                    }}>
          
          <MessageList messages={messages} contact={contact} me={globalContext.client.id}/>

          <div ref={messagesEndRef} />
          </div>
                    </div>

                    <div style={{ 
                      height: '25%', width: '100%',
                      bottom: '0%',
                      padding: '0 10px'
                      }}>
              <form onSubmit={handleSubmit} onKeyDown={handleKeydown}>
                
                
          <textarea autofocus="true" onChange={handleMessageChange} value={message} className="textarea" rows="3" placeholder="Write here..."/>


          </form>
                    </div>
                  </div>
                </Fragment> )
}



export default Contact