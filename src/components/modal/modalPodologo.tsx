import { Box, Button, Divider, Grid, Modal, TextField, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { GetItemLocalStorage } from "../../helper/localStorage";
import dayjs from "dayjs";
import { useState } from "react";
import InputPesquisar from "../pesquisar";

const ModalPodologo = () => {

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

        fetch("http://localhost:5000/podologo", {

            method: "POST",
            headers: myHeaders,
            body: raw,
        })
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                window.location.reload();
            })
            .catch((error) => console.error(error));


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
        endereco: ""
    })

    // FIM TRATANDO DADOS DE PODOLOGO

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '70%',
        bgcolor: 'background.paper',
        border: '2px solid #1976d2',
        borderRadius: '0.5em',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (<>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Button sx={{ border: '1px solid #1976d2', width: '100%', height: '100%' }} onClick={handleOpen}>Cadastrar Podólogo</Button>
            </Grid>
            <InputPesquisar />
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
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', margin: '1em 0' }}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Nome Completo" variant="outlined" type="text" id="nome" name="nome" value={formData.nomeCompleto} onChange={(event) => setInput(event, 'nomeCompleto')} />
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="CPF" variant="outlined" type="text" id="cpf" name="cpf" value={formData.cpf} onChange={(event) => setInput(event, 'cpf')} />
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="E-mail" variant="outlined" type="text" id="email" name="email" value={formData.email} onChange={(event) => setInput(event, 'email')} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', margin: '1em 0' }}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Telefone" variant="outlined" type="text" id="telefone" name="telefone" value={formData.telefone} onChange={(event) => setInput(event, 'telefone')} />
                                {/* <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Data Nascimento" variant="outlined" type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={(event) => setData(event, 'data_nascimento')} /> */}
                                <div style={{ margin: '0 0.2em', width: '100%' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker format="DD/MM/YYYY" name="dataNascimento" value={formData.dataNascimento} onChange={(event) => setData(event, 'dataNascimento')} />
                                    </LocalizationProvider>
                                </div>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Gênero" variant="outlined" type="text" id="genero" name="genero" value={formData.genero} onChange={(event) => setInput(event, 'genero')} />
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Endereço" variant="outlined" type="text" id="endereco" name="endereco" value={formData.endereco} onChange={(event) => setInput(event, 'endereco')} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', margin: '1em 0' }}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Senha" variant="outlined" type="password" id="senha" name="senha" value={formData.senha} onChange={(event) => setInput(event, 'senha')} />
                            </div>
                        </div>

                        <Divider style={{ margin: '1em 0' }} />

                        <Button style={{ border: '1px solid #1976d2' }} type="button" onClick={salvarPodologo} id="submit-form">Enviar</Button>
                    </form>
                </Typography>
            </Box>
        </Modal>
    </>)
}
export default ModalPodologo