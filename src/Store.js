import React from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();

export const initState = {
    general: [
        {from: 'tim', msg: 'hey'},
        {from: 'katie', msg: 'welcome back'},
        {from: 'daravy', msg: 'hey guys'},
        {from: 'cody', msg: 'no more covid'},

    ],
    topic2: [
        {from: 'marcus', msg: 'turds'},
        {from: 'emily', msg: 'that girl is annoying'},
        {from: 'brody', msg: 'see my hair?'},
        {from: 'aaron', msg: `I'm hungry`},

    ]
}

function reducer(state, action) {
    const {from, msg, topic} = action.payload;
    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {from, msg}
                ]
            }

        default:
            return state
    }
}



let socket;

function sendChatAction(value)  {
    socket.emit('chat message', value);
}

export default function Store(props) {
    
    const [allChats, dispatch] = React.useReducer(reducer, initState);

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', function(msg){
            dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
        })
    }

    const user = 'tim' + Math.random(100).toFixed(2)


    return (

        <CTX.Provider value={{allChats, sendChatAction}}>
            {props.children}
        </CTX.Provider>
    )
}