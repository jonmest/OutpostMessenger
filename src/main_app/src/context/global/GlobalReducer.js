import {
    AUTH_SUCCESS,
    AUTH_FAIL,
    GET_CONTACT,
    LOAD_CONTACTS,
    ADD_CONTACT,
    SET_TITLE,
    SET_SOCKET
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case SET_SOCKET:
            return {
                ...state,
                socket: action.payload
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: state.contacts.concat(action.payload)
            }
        case SET_TITLE:
            return {
                ...state,
                title: action.payload
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                bearToken: action.payload.bearToken,
                client: action.payload.client,
                isAuthenticated: true
            };
        case AUTH_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case GET_CONTACT:
            return {
                ...state,
                contact: action.payload.contact,
                previousMessages: action.payload.previousMessages
            }
        case LOAD_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            }
        default:
            return state;
    }
}