import React, { useState } from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import { CTX } from './Store';


const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),
    },

    flex: {
        display: 'flex',
        alignItems: 'center'
    },

    topicsWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey',
    },

    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '20px'
    },

    chatBox: {
        width: '85%',
        height: '',
    },

    button: {
        width: '15%',
        height: '',
    },
    
}));

export default function Dashboard() {
    
    const classes = useStyles();

    // CTX Store
    const [allChats, sendChatAction, user] = React.useContext(CTX);

    console.log({allChats})

    const topics = Object.keys(allChats);

    // local state
    const [activeTopic, changeActiveTopic] = useState(topics[0]);
    const [textValue, changeTextValue] = useState('');

    return  (
        
        <div>
            <Paper className={ classes.root }>
                <Typography variant="h4" component="h4">
                    Chat App
                </Typography>
                <Typography variant="h5" component="h5">
                    {activeTopic}
                </Typography>
                <div className={ classes.flex }>
                    <div className={ classes.topicsWindow }>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic}>
                                        <ListItemText primary={ topic } />
                                    </ListItem>
                                ))
                            }
                            
                        </List>
                    </div>
                    <div className={ classes.chatWindow }>
                            {
                                allChats[activeTopic].map((chat, i) => (
                                    <div className={classes.flex} key={i}>
                                        < Chip label={chat.from} className={classes.chip} />
                                        <Typography variant='body1' gutterBottom>{chat.msg}</Typography>
                                    </div>
                                ))
                            }
                    </div>
                </div>
                <div className={ classes.flex }>
                    <TextField 
                        className={classes.chatBox}
                        label='Send a chat'
                        multiline
                        value={textValue}
                        onChange={e => changeTextValue(e.target.value)}
                        variant="standard"
                    />
                    
                    <Button 
                    variant='contained' 
                    color='primary'
                    className={classes.button}
                    onClick={() => {
                        sendChatAction({from: user, msg: textValue, topic: activeTopic});
                        changeTextValue('');
                    }}
                    >
                        Send
                    </Button>
                </div>
            </Paper>
        </div>

    )
}
