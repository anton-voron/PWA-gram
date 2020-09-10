import * as React from 'react';
import UserEntity from '../../../redux/UserEntity/UserEntity';
import withAuthRestAPI, { AuthRestAPI } from '../../HOC/withAuthRestAPI';
import withData from '../../HOC/withData';
import { UserState } from '../../../redux/UserEntity/types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import useStyles from './useStyles';
import { Copyright } from '../SignIn/SignIn';

interface RegistrationI extends AuthRestAPI {
    history: any
}

interface RegistrationState {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

const Registration = (props: RegistrationI) => {

    const [username, setUsername] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const name = evt.target.name;
    }

    const onRegister = () => {
        const request: RegistrationState = {
            username,
            firstName,
            lastName,
            email,
            password
        }
        props.registration(request);
        props.history.push("/")
    }

    const classes = useStyles();
    return <>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                    </Typography>
                <div className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Username"
                                name="username"
                                value={username}
                                onChange={(evt) => setUsername(evt.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                label="First Name"
                                value={firstName}
                                onChange={(evt) => setFirstName(evt.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={lastName}
                                onChange={(evt) => setLastName(evt.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                value={email}
                                onChange={(evt) => setEmail(evt.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(evt) => setPassword(evt.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onRegister}
                    >
                        Sign Up
                        </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                                </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    </>
}


export default withRouter(withAuthRestAPI(withData(Registration)));