import React, { Fragment, useContext, useEffect, useState, useRef }   from 'react';
import GlobalContext from '../../context/global/GlobalContext'
import Message from '../layouts/Message'
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
  const { previousMessages, contact, getContact } = globalContext

  const messagesEndRef = useRef(null)

  const setupSocket = async url => {
    return new Promise((resolve, reject) => {
      const socket = io(url)
      socketAuth(socket, globalContext, () => {
          socket.on('oldMessages', data => {
            data.forEach(item => handleMessage(item.message))
          })

          socket.on('message', data => handleMessage(data))
      })
      resolve(socket)
    })
    .then(data => setSocket(data))
  }

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    document.body.style.overflowY = 'hidden'
    if (socket) window.socketConn = socket
  })

  useEffect(() => {
    return () => window.socketConn.close()
  }, [])

  useEffect(() => {
    globalContext.setTitle(contact.id)
  }, [contact])

  useEffect(() => {
    getContact(props.match.params.contact)

    // Establish IO connection
    setupSocket('https://outpostmessenger.com/')

    get(
      `http://localhost:5000/outpost/messages?id=${props.match.params.contact}`,
      globalContext.bearToken,
    )
    .then(res => res.messages)
    .then(messages => {
      setMessages(msgs => msgs.concat(messages))
    })

    // eslint-disable-next-line
  }, [])

  const handleMessage = async message => {    
    const decrypted = await post(
      'http://localhost:5000/outpost/decrypt',
      globalContext.bearToken,
      { message }
    ).then(item => item.message)
    
    post(
      'http://localhost:5000/outpost/messages',
      globalContext.bearToken,
      {
        sender: decrypted.sender,
        recipient: decrypted.recipient,
        data: decrypted.message
      }
    )

    setMessages(msgs => msgs.concat({
        sender: decrypted.sender,
        recipient: decrypted.recipient,
        plaintext: decrypted.message.plain
    }))
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

    post(
      'http://localhost:5000/outpost/messages',
      globalContext.bearToken,
      {
        sender: contact.id,
        recipient: globalContext.client.id,
        data: message
      }
    )

    const schema = {
      message : {
            recipient : contact.id,
            message   : {
                count : 1,
                plain : message
            }
      }
    }

    // Reset input field
    setMessage('')
    
    /*
    * Encrypt message
    */
    const response = await post(
      'http://localhost:5000/outpost/encrypt',
      globalContext.bearToken,
      schema
    )


    setMessages(msgs => msgs.concat({
      sender: globalContext.client.id,
      recipient: contact.id,
      plaintext: message
    }))

    /*
    * Send message to socket server
    */
   socket.emit('message', JSON.stringify(response))
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
          
          <MessageList messages={messages} contact={contact}/>

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