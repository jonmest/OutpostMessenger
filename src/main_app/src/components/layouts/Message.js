import React, { Fragment } from 'react'
import Moment from 'react-moment'
import ReactMarkdown from 'react-markdown'

const Message = ({ data, sender, contact, timestamp, me }) => {
    const time = new Date(timestamp)
  
    return (
        <Fragment>                   
            <div className="columns">
            <div className="column">
            {
                (sender === contact.id ) ?
                <Fragment>
                <span className="help has-text-grey-light">
                <Moment fromNow>{ time }</Moment>
                </span>
                <article className="message">
                <div className="message-body">
                    <ReactMarkdown source={ data }/>
                </div>
                </article>
                </Fragment> :
                null
            }
            </div>
            <div className="column">
            {
                (sender !== contact.id || me === contact.id ) ?
                <Fragment>
                    <span className="help has-text-grey-light">
                        <Moment fromNow>{ time }</Moment>
                    </span>
                    <article className="message  is-dark">
                        <div className="message-body">
                            <ReactMarkdown source={ data }/>
                        </div>

                    </article>

                </Fragment> :
                null
            }
            </div>
            </div>
        </Fragment> 
        )
}


export default Message