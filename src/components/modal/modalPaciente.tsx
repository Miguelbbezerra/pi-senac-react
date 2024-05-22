import { Box, Button, Divider, Grid, InputAdornment, Modal, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import InputPesquisar from "../pesquisar";
import { GetItemLocalStorage } from "../../helper/localStorage";
import {CPFMaskInput, PhoneMaskInput} from "../mask/MaskInput";

const ModalPaciente = () => {

    // INICIO SET DE PACIENTES

    function salvarPaciente() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const dataNascimento = dayjs(formData.dataNascimento).format('YYYY-MM-DD')
        console.log("data nascimento", dataNascimento)
        const newFormData = Object.assign({}, formData, { dataNascimento: dataNascimento })

        const raw = JSON.stringify(newFormData);

        fetch("http://localhost:5000/paciente", {
            method: "POST",
            headers: myHeaders,
            body: raw,
        })
            .then((response) => response.text())
            .then((result) => {
                // console.log(result);
                window.location.reload();
            })
            .catch((error) => console.error(error));


    }
    // FIM SET DE PACIENTES

    // INICIO TRATANDO DADOS DE PACIENTES
    const setData = (event: any, key: string) => {

        const value = dayjs(event).format('YYYY-MM-DD')
        const date = new Date(event.timeStamp)


        // console.log(dayjs(event).format('YYYY-MM-DD'))
        // console.log(key)

        const newFormData = Object.assign({}, formData, { [key]: value })

        setFormData(newFormData)
    }

    const setInput = (event: any, key: string) => {

        const value = event.target.value
        const newFormData = Object.assign({}, formData, { [key]: value })

        setFormData(newFormData)
    }


    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        dataNascimento: "",
        genero: "",
        endereco: ""
    })

    // FIM TRATANDO DADOS DE PACIENTES

    // INICIO COD MODAL

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // FIM COD MODAL
    
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

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Button sx={{ border: '1px solid #1976d2', width: '100%', height: '100%' }} onClick={handleOpen}>Cadastrar Paciente</Button>
                </Grid>
                <InputPesquisar />
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ maxWidth: '100%', maxHeight: '100%', display: 'flex', justifyContent: 'center', margin: '2em' }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div>
                            <h4>Cadastro de Paciente</h4>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Divider style={{ margin: '1em 0' }} />
                        <form autoComplete="off" onSubmit={(event) => { event.preventDefault() }}>
                            <Grid container spacing={3}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField sx={{ margin: '0 0.2em', width: '100%' }} label="Nome Completo" variant="outlined" type="text" id="nome" name="nome" value={formData.nome} onChange={(event) => setInput(event, 'nome')} />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField sx={{ margin: '0 0.2em', width: '100%' }} label="CPF"
                                     variant="outlined" type="text" id="cpf" name="cpf"
                                      value={formData.cpf} onChange={(event) => setInput(event, 'cpf')}
                                      InputProps={{inputComponent: CPFMaskInput as any}}
                                       />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField sx={{ margin: '0 0.2em', width: '100%' }} label="E-mail"
                                     variant="outlined" type="text" id="email" name="email"
                                      value={formData.email} onChange={(event) => setInput(event, 'email')} />
                                </Grid>

                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField sx={{ margin: '0 0.2em', width: '100%' }} label="Telefone"
                                    variant="outlined" type="text" id="telefone" name="telefone"
                                     value={formData.telefone} onChange={(event) => setInput(event, 'telefone')} 
                                     InputProps={{inputComponent: PhoneMaskInput as any}}
                                     />
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                                        <DatePicker sx={{ width: '100%'}} format="DD/MM/YYYY" name="dataNascimento"
                                         value={formData.dataNascimento} onChange={(event) => setData(event, 'dataNascimento')} />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12}>
                                    <TextField sx={{ margin: '0 0.2em', width: '100%' }} label="Gênero" variant="outlined" type="text" id="genero" name="genero" value={formData.genero} onChange={(event) => setInput(event, 'genero')} />
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12}>
                                    <TextField sx={{ margin: '0 0.2em', width: '100%' }} label="Endereço" variant="outlined" type="text" id="endereco" name="endereco" value={formData.endereco} onChange={(event) => setInput(event, 'endereco')} />
                                </Grid>
                            </Grid>
                            <Divider sx={{ margin: '1em 0' }} />
                            <Button sx={{ border: '1px solid #1976d2' }} type="button" onClick={salvarPaciente} id="submit-form">Enviar</Button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}
export default ModalPaciente
