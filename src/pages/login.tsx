import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImagemLogo from './../images/senac-logo.png';
import axios from 'axios';
import { GetItemLocalStorage, SetItemLocalStorage } from '../helper/localStorage';
import { HttpService } from '../helper/http';

const defaultTheme = createTheme();

export default function Login() {

    async function Login1() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const data = JSON.stringify(formData);

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response: any) => {
                SetItemLocalStorage('token', response.data.token)
                window.location.href = '/admin/home';
            })
            .catch((error: any) => {
                console.log(error);
            });

    }

    // async function Login() {
    //     try {
    //         const token = GetItemLocalStorage('token')
    //         const serviceHttp = new HttpService('http://localhost:5000/', token as string)

    //         const response = await serviceHttp.post('login', formData)
    //         window.location.href = '/admin/home';
    //     } catch(error) {
    //         console.error(error);
    //     }

    // }

    const setInput = (event: any, key: string) => {

        const value = event.target.value
        const newFormData = Object.assign({}, formData, { [key]: value })

        setFormData(newFormData)

    }

    const [formData, setFormData] = React.useState({
        email: "",
        senha: ""
    })

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={ImagemLogo} alt='...' style={{ width: "15em" }} />
                    <Box component="form" noValidate >
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={(event) => setInput(event, 'email')}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="senha"
                            label="Senha"
                            type="senha"
                            id="senha"
                            autoComplete="current-password"
                            value={formData.senha}
                            onChange={(event) => setInput(event, 'senha')}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            onClick={Login1}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            {/* <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid> */}
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}