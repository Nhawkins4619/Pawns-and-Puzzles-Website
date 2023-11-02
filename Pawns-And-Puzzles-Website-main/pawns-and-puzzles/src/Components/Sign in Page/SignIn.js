import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import checkerboard from "../../Assets/background/2.jpg"
import '../Sign in Page/SignIn.css'
import Axios from "axios";
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { Divider, Icon, Modal } from '@mui/material';
import { resolvePath, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PasswordStrengthBar from 'react-password-strength-bar';


//import themes for styling and fonts
const customTheme = createTheme({
    typography: {
        fontFamily: 'Merriweather, serif',
    },
    palette: {
        primary: {
            main: '#0f4a3b',
        },
        text: {
            primary: '#000',
            secondary: '#fff',
        },
    }
});



export default function SignInSide() {
    //variables for functionailty of website
    const [EmailEntry, setEmail] = useState("");
    const [PasswordEntry, setPassword] = useState("");
    const [passwordScore, setPasswordScore] = useState(0);
    const [RegisterEmailEntry, setRegisterEmail] = useState("");
    const [RegisterPasswordEntry, setRegisterPassword] = useState("");
    const [ResetPasswordEmail, setResetPasswordEmail] = useState("");
    const [ResetPasswordPassword, setResetPasswordPassword] = useState("");
    const [isError, setisError] = useState(false);
    const [isRegisterError, setisRegisterError] = useState(false);
    const [isRegisterError2, setisRegisterError2] = useState(false);
    const [isOpen, setisOpen] = useState(false);
    const [passwordIsOpen, setpasswordIsOpen] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [isRegisterLoading, setisRegisterLoading] = useState(false);
    const [errMessage, seterrMessage] = useState("");
    const [RegistererrMessage, setRegistererrMessage] = useState("your password is too short!");
    const [severity, setseverity] = useState('error');
    const [PasswordMessage, setPasswordMessage] = useState("this Email has not been registered!");
    const [severity2, setseverity2] = useState('error');
    const Navigate = useNavigate();

    //causes a delay when called upon
    const delay = (delayInms) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
    }

    //funcion to verify is user is real, called upon initial sign in
    const VerifyLogin = async () => {
        setisLoading(true)
        await Axios.post("https://api-puzzles-pawns.onrender.com/SignIn", {
            Email: EmailEntry,
            Password: PasswordEntry,
        }).then(async (response) => {
            if (response.data.message === 'None') {
                setisError(true)
                setisLoading(false)
                seterrMessage("This email and/or password is not linked to an account!")
            }
            else if (response.data.message === 'API') {
                setisError(true)
                setisLoading(false)
                seterrMessage("Api has failed, sorry for the inconvenience")
            }
            else {
                let temp = response.data[0].userId
                document.cookie = `userID=${temp}`
                Navigate('/Home');
            }
        }).catch(() => {
            setisError(true)
            setisLoading(false)
            seterrMessage('Api has failed, sorry for the inconvenience')
        }
        );
    }
    //function pertaining to forgotpassword call, lets the user insert a new password into the table based off email, would like to include email veriication and 2 factor authentication
    //so users cant just pick a random email and change the password.
    const ForgotPassword = async () => {
        await Axios.post("https://api-puzzles-pawns.onrender.com/ForgotPassword", {
            Email: ResetPasswordEmail,
        }).then(async (response) => {
            if (response.data.length >= 1) {
                await Axios.post("https://api-puzzles-pawns.onrender.com/ResetPassword", {
                    Email: ResetPasswordEmail,
                    Password: ResetPasswordPassword,
                }).then(async (response) => {
                    console.log(response)
                    setseverity2('success')
                    setPasswordMessage('You have changed your password!')
                    setisRegisterError2(true)
                })
            }
            else {
                setseverity2('error')
                setPasswordMessage('this email is not associated with an account!')
                setisRegisterError2(true)
            }
        })
    }
    //verifies if the email is new so the user can register a new account, called upon register user
    const VerifyRegister = async () => {
        setisRegisterLoading(true)
        setisRegisterError(false)
        if (passwordScore >= 2) {
            await Axios.post("https://api-puzzles-pawns.onrender.com/Register", {
                EmailReg: RegisterEmailEntry,
                PasswordReg: RegisterPasswordEntry,
            }).then(async (response) => {
                if (response.data.message === "duplicate entry") {
                    setisRegisterError(true)
                    setseverity('error')
                    setRegistererrMessage('This email is already in use!')
                }
                else {
                    setseverity('success')
                    setRegistererrMessage('Please log into your new account after window closes!')
                    setisRegisterError(true)
                    await delay(3000)
                    setisOpen(false)
                    setisRegisterError(false)
                }
            })
        }
        else {
            setseverity('error')
            setRegistererrMessage('Your password is too short!')
            setisRegisterError(true)
        }
        setisRegisterLoading(false)
    }
    //Main UI elements, main page
    return (
        <ThemeProvider theme={customTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: { checkerboard }
                    }}
                ><img className='backdrop' src={checkerboard}></img></Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                    <Box
                        sx={{
                            my: 42,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Welcome to Pawns and Puzzles
                        </Typography>
                        <Typography component="h1" variant="h5">
                            Please Sign in
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', minWidth: '500px' }}>
                            <TextField
                                InputLabelProps={{
                                    style: { color: '#0f4a3b' },
                                }}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) =>
                                    setEmail(e.target.value)}
                            />
                            <TextField
                                InputLabelProps={{
                                    style: { color: '#0f4a3b' },
                                }}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setPassword(e.target.value)}
                                onKeyDown={(e)=>{if(e.key === "Enter"){
                                    VerifyLogin()
                                }}}
                            />
                            <LoadingButton
                                loading={isLoading}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={VerifyLogin}
                            >
                                Sign In
                            </LoadingButton>
                            <Collapse in={isError}>
                                <Alert severity="error">{errMessage}</Alert>
                            </Collapse>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                                <Button variant='text' onClick={() => setisOpen(true)} sx={{ alignSelf: 'center' }}>
                                    Register
                                </Button>
                                <Button variant='text' onClick={() => setpasswordIsOpen(true)} sx={{ alignSelf: 'center' }}>
                                    forgot password
                                </Button>
                            </Box>
                            {/*pop up for sign in */}
                            <Modal sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} open={isOpen} onClose={() => setisOpen(false)}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'white', minWidth: '30%', minHeight: '30%', borderRadius: 4 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <ThemeProvider theme={customTheme}><Typography sx={{ m: '0.5em' }} fontWeight={'bold'}>Register</Typography></ThemeProvider>
                                            <IconButton onClick={() => setisOpen(false)}><CloseIcon></CloseIcon></IconButton>
                                        </Box>
                                        <Divider></Divider>
                                    </Box>
                                    <Collapse in={isRegisterError}>
                                        <Alert severity={severity}>{RegistererrMessage}</Alert>
                                    </Collapse>
                                    <TextField
                                        InputLabelProps={{
                                            style: { color: '#0f4a3b' },
                                        }}
                                        sx={{ mx: '1em' }}
                                        margin="normal"
                                        required
                                        id="email2"
                                        label="Email Address"
                                        name="email2"
                                        autoComplete="email2"
                                        autoFocus
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                    />
                                    <TextField
                                        InputLabelProps={{
                                            style: { color: '#0f4a3b' },
                                        }}
                                        sx={{ mx: '1em' }}
                                        margin="normal"
                                        required
                                        name="password2"
                                        label="Password"
                                        type="password2"
                                        id="password2"
                                        autoComplete="current-password"
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                    />
                                    <PasswordStrengthBar onChangeScore={(score, feedback) => { setPasswordScore(score) }}
                                        password={RegisterPasswordEntry} style={{ marginRight: '1em', marginLeft: '1em' }}></PasswordStrengthBar>
                                    <LoadingButton
                                        loading={isRegisterLoading}
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, mx: '1em' }}
                                        onClick={VerifyRegister}
                                    >
                                        Register
                                    </LoadingButton>
                                </Box>
                            </Modal>
                            {/*pop up for forgot password */}
                            <Modal sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} open={passwordIsOpen} onClose={() => {
                                setpasswordIsOpen(false)
                                setisRegisterError2(false)
                            }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'white', minWidth: '30%', minHeight: '30%', borderRadius: 4 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <ThemeProvider theme={customTheme}><Typography sx={{ m: '0.5em' }} fontWeight={'bold'}>Forgot Password</Typography></ThemeProvider>
                                            <IconButton onClick={() => {
                                                setpasswordIsOpen(false)
                                                setisRegisterError2(false)
                                            }}><CloseIcon></CloseIcon></IconButton>
                                        </Box>
                                        <Divider></Divider>
                                    </Box>
                                    <Collapse in={isRegisterError2}>
                                        <Alert severity={severity2}>{PasswordMessage}</Alert>
                                    </Collapse>
                                    <TextField
                                        InputLabelProps={{
                                            style: { color: '#0f4a3b' },
                                        }}
                                        sx={{ mx: '1em' }}
                                        margin="normal"
                                        required
                                        id="email2"
                                        label="Email Address"
                                        name="email2"
                                        autoComplete="email2"
                                        autoFocus
                                        onChange={(e) => setResetPasswordEmail(e.target.value)}
                                    />
                                    <TextField
                                        InputLabelProps={{
                                            style: { color: '#0f4a3b' },
                                        }}
                                        sx={{ mx: '1em' }}
                                        margin="normal"
                                        required
                                        name="password2"
                                        label="New password"
                                        type="password2"
                                        id="password2"
                                        autoComplete="current-password"
                                        onChange={(e) => setResetPasswordPassword(e.target.value)}
                                    />
                                    <LoadingButton
                                        loading={isRegisterLoading}
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, mx: '1em' }}
                                        onClick={() => { ForgotPassword() }}
                                    >
                                        reset password
                                    </LoadingButton>
                                </Box>
                            </Modal>
                            <Grid container>
                                <Grid item xs></Grid>
                                <Grid item></Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
