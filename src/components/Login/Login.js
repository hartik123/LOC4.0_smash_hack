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
            axios.post("http://localhost:9002/login", user)
                .then(res => {
                    alert(res.data.message)
                    setLoginUser(res.data.user)
                    history.push('/')
                }
                )
        }
    }

    return (
        <div>
            <center>
                <h1>SCM 4.0</h1>
                <h2>Login</h2>
                <form className={classes.root}>
                <TextField color="primary" required id="filled-basic" type="text" name="email" value={user.email} label='Enter Email id' onChange={handleChange} variant="filled"/>
                <br />
                <TextField color="primary" required id="filled-basic" type="password" name="password" value={user.password} label="Enter password" onChange={handleChange} variant="filled"/>
                </form>
                <br />
                <br />
                <Button variant="contained" color="primary" className="button" onClick={login} startIcon={<NearMeSharp />}>Login</Button>
                <div>or</div>
                <Button variant="contained" color="secondary" className="button" onClick={() => history.push('/register')} startIcon={<SaveIcon />}>Register</Button>
            </center>
        </div>
    )
}

export default Login