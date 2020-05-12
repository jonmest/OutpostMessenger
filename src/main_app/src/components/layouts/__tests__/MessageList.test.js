import React from 'react';
import Message from '../Message'
import MessageList from '../MessageList'
import renderer from 'react-test-renderer';

const date = new Date()
const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.000`
test('Matches snapshot', () => {
    const contact = "Thomas"
    const me = "Timothy"
    const messages = [
        {
            data: "This is a message.",
            sender: contact,
            contact: contact,
            timestamp: now,
            me
        },

        {
            data: "This is another message.",
            sender: me,
            contact: contact,
            timestamp: now,
            me
        }
    ]
    let component = renderer.create(
        <MessageList messages={messages} contact={contact} me={me}/>,)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
