import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { makeStyles, TextField } from '@material-ui/core'
import { NearMeSharp } from '@material-ui/icons'
// import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    
    button: {
        margin: theme.spacing(1),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '35ch',
        },
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

const Login = ({ setLoginUser }) => {
const classes = useStyles()

    const history = useHistory()

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const handleChange = e => {
        const { name, value } = e.target

        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        const { email, password } = user;

        if (email && password) {
            axios.post("http://localhost:8080/login", user)
                .then(res => {
                    console.log(res.data.user)
                    window.localStorage.setItem('email', res.data.user.email)
                    history.push('/')
                }
                )
        }
    }

    return (
        <div style={{marginTop:"6rem"}}>
            <center>
                <h2>Login</h2>
                <form className={classes.root}>
                <TextField color="primary" required id="filled-basic" type="text" name="email" value={user.email} label='Enter Email id' onChange={handleChange} variant="filled"/>
                <br />
                <TextField color="primary" required id="filled-basic" type="password" name="password" value={user.password} label="Enter password" onChange={handleChange} variant="filled"/>
                </form>
                <br />
                <br />
                <div style={{display: "flex", justifyContent:"center"}}>
                <Button variant="contained" color="primary" className="button" onClick={login} startIcon={<NearMeSharp />} style={{margin: "1rem", flex:"wrap"}}>Login</Button>
                
                <Button variant="contained" color="secondary" className="button" onClick={() => history.push('/register')} startIcon={<SaveIcon />} style={{margin: "1rem", flex:"wrap"}}>Register</Button>
                </div>
            </center>
        </div>
    )
}

export default Login