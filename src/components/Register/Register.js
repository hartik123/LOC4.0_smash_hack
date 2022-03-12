import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
import { NearMeSharp } from '@material-ui/icons';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

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

const Register = () => {
    const classes = useStyles();

    const history = useHistory();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target

        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if (name && email && password && password === reEnterPassword) {
            axios.post('http://localhost:9002/register', user)
                .then(res => {
                    alert(res.data.message)
                    history.push('/login')
                })
        }
        else {
            alert("invalid input")
        }


    }

    return (
        <div>

            <center>
                <h1>SCM 4.0</h1>
                <h2>Register</h2>

                <form className={classes.root}>
                    <TextField color="primary" required id="filled-basic" type="text" name="name" value={user.name} label='Enter you Name' variant="filled" onChange={handleChange} />
                    <br />
                    <TextField color="primary" required id="filled-basic" type="text" name="email" value={user.email} label='Enter Email id' variant="filled" onChange={handleChange} />
                    <br />
                    <TextField color="primary" required id="filled-basic" type="password" name="password" value={user.password} label="Enter password" variant="filled" onChange={handleChange} />
                    <br />
                    <TextField color="primary" required id="filled-basic" type="password" name="reEnterPassword" value={user.reEnterPassword} label="Re-Enter password" variant="filled" onChange={handleChange} />
                </form>
                <br />
                <Button variant="contained" color='primary' className={classes.button} onClick={register} startIcon={<SaveIcon />}>Register</Button>
                <div>or</div>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => history.push('/login')} startIcon={<NearMeSharp />}>Login</Button>
            </center>
        </div>
    )
}

export default Register