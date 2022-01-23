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

    const [textValue, changeTextValue] = useState('');

    return  (
        
        <div>
            <Paper className={ classes.root }>
                <Typography variant="h4" component="h4">
                    Chat App
                </Typography>
                <Typography variant="h5" component="h5">
                    Topic Placeholder
                </Typography>
                <div className={ classes.flex }>
                    <div className={ classes.topicsWindow }>
                        <List>
                            {
                                ['topic'].map(topic => (
                                    <ListItem key={topic}>
                                        <ListItemText primary={ topic } />
                                    </ListItem>
                                ))
                            }
                            
                        </List>
                    </div>
                    <div className={ classes.chatWindow }>
                            {
                                [{from: 'user', msg: 'hello'}].map((chat, i) => (
                                    <div className={classes.flex} key={i}>
                                        < Chip label={chat.from} className={classes.chip} />
                                        <Typography variant='p'>{chat.msg}</Typography>
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
                    
                    <Button variant='contained' color='primary'>
                        Send
                    </Button>
                </div>
            </Paper>
        </div>

    )
}
