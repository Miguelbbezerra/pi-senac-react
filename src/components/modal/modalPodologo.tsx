import { Box, Button, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, Snackbar, TextField, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { GetItemLocalStorage } from "../../helper/localStorage";
import dayjs from "dayjs";
import React, { useState } from "react";
import InputPesquisar from "../../components/pesquisar";
import { CEPMaskInput, CPFMaskInput, GeneroMaskInput, LettersMaskInput, NumbersMaskInput, PhoneMaskInput } from "../../components/mask/MaskInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ModalPodologo = () => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    // INICIO SET DE PODOLOGO
    function salvarPodologo() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const dataNascimento = dayjs(formData.dataNascimento).format('YYYY-MM-DD')
        // console.log("data nascimento", dataNascimento)
        const newFormData = Object.assign({}, formData, { dataNascimento: dataNascimento })

        const raw = JSON.stringify(newFormData);

        fetch("https://api-pi-senac.azurewebsites.net/podologo", {

            method: "POST",
            headers: myHeaders,
            body: raw,
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao salvar podólogo');
                }
                return response.text();
            })
            .then((result) => {
                console.log(result);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                setSnackbarMessage(error.message);
                setSnackbarOpen(true);
            });


    }

    // FIM SET DE PODOLOGO

    // INICIO TRATANDO DADOS DE PODOLOGO
    const setData = (event: any, key: string) => {

        const value = dayjs(event).format('YYYY-MM-DD')

        const newFormData = Object.assign({}, formData, { [key]: value })

        setFormData(newFormData)
    }

    const setInput = (event: any, key: string) => {

        const value = event.target.value
        const newFormData = Object.assign({}, formData, { [key]: value })

        setFormData(newFormData)
    }


    const [formData, setFormData] = useState({
        senha: "",
        nomeCompleto: "",
        cpf: "",
        email: "",
        telefone: "",
        dataNascimento: "",
        genero: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: ""
    })

    // FIM TRATANDO DADOS DE PODOLOGO

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '100%',
        bgcolor: 'background.paper',
        border: '2px solid #1976d2',
        borderRadius: '0.5em',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleSnackbarClose = () => setSnackbarOpen(false);

    return (<>
        <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button sx={{ border: '1px solid #1976d2', width: '100%', height: '100%' }} onClick={handleOpen}>Cadastrar Podólogo</Button>
        </Grid>
        <Modal

            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <div>
                        <h4>Cadastro de Podólogo</h4>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Divider style={{ margin: '1em 0' }} />

                    <form autoComplete="off" onSubmit={(event) => { event.preventDefault() }}>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Nome Completo" variant="outlined" type="text" id="nome" name="nome" value={formData.nomeCompleto} onChange={(event) => setInput(event, 'nomeCompleto')} InputProps={{ inputComponent: LettersMaskInput as any }} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="CPF" variant="outlined" type="text" id="cpf" name="cpf" value={formData.cpf} onChange={(event) => setInput(event, 'cpf')} InputProps={{ inputComponent: CPFMaskInput as any }} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="E-mail" variant="outlined" type="text" id="email" name="email" value={formData.email} onChange={(event) => setInput(event, 'email')} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Telefone" variant="outlined" type="text" id="telefone" name="telefone" value={formData.telefone} onChange={(event) => setInput(event, 'telefone')} InputProps={{ inputComponent: PhoneMaskInput as any }} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker sx={{ width: '100%' }} format="DD/MM/YYYY" name="dataNascimento" value={formData.dataNascimento} onChange={(event) => setData(event, 'dataNascimento')} />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Gênero" variant="outlined" type="text" id="genero" name="genero" value={formData.genero} onChange={(event) => setInput(event, 'genero')} InputProps={{ inputComponent: GeneroMaskInput as any }} />
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={6}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Cep" variant="outlined" type="text" id="cep" name="cep" value={formData.cep} onChange={(event) => setInput(event, 'cep')} InputProps={{ inputComponent: CEPMaskInput as any }} />
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={6}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Cidade" variant="outlined" type="text" id="cidade" name="cidade" value={formData.cidade} onChange={(event) => setInput(event, 'cidade')} InputProps={{ inputComponent: LettersMaskInput as any }} />
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={6}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Bairro" variant="outlined" type="text" id="bairro" name="bairro" value={formData.bairro} onChange={(event) => setInput(event, 'bairro')} InputProps={{ inputComponent: LettersMaskInput as any }} />
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={6}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Rua" variant="outlined" type="text" id="rua" name="rua" value={formData.rua} onChange={(event) => setInput(event, 'rua')} />
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={6}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Número" variant="outlined" type="text" id="numero" name="numero" value={formData.numero} onChange={(event) => setInput(event, 'numero')} InputProps={{ inputComponent: NumbersMaskInput as any }} />
                            </Grid>

                            <Grid item lg={4} md={4} sm={6} xs={6}>
                                {/* <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Senha" variant="outlined" type="password" id="senha" name="senha" value={formData.senha} onChange={(event) => setInput(event, 'senha')} /> */}
                                <FormControl sx={{ margin: '0 0.2em', width: '100%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.senha} onChange={(event) => setInput(event, 'senha')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Senha"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Button style={{ border: '1px solid #1976d2' }} type="button" onClick={salvarPodologo} id="submit-form">Enviar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Typography>
            </Box>
        </Modal>
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
        />
    </>)
}
export default ModalPodologo