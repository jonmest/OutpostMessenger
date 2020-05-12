import React from 'react';
import Message from '../Message'
import renderer from 'react-test-renderer';
const date = new Date()
const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.000`

test('Matches snapshot', () => {
    let component = renderer.create(
        <Message
        data="This is a message."
        sender="Thomas"
        contact="Thomas"
        timestamp={now}
        me="Timothy"
        />,)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
