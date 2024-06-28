import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Snackbar, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import InputPesquisar from "@/components/pesquisar";
import { GetItemLocalStorage } from "@/helper/localStorage";
import InputPesquisarAgendamento from "@/components/pesquisarAgendamento";

const ModalAgendamento = () => {

    //GET NA API DE DAS TABELAS ABAIXO
    useEffect(() => {
        fetchPacientes();
        fetchPodologo();
    }, []);
    //GET NA API DE DAS TABELAS FIM    


    // GET DE PACIENTES PARA SELECT NO AGENDAMENTO
    const [pacientes, setPacientes] = useState<any[]>([]);


    function fetchPacientes() {
        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch("http://localhost:5000/paciente", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em listar os Pacientes');
                }
                return response.json();
            })
            .then((data) => {
                setPacientes(data);
            })
            .catch((error) => console.error(error));
    }
    // GET DE PACIENTES PARA SELECT NO AGENDAMENTO

    // GET DE PODOLOGOS PARA SELECT DE AGENDAMENTO  
    const [podologos, setPodologo] = useState<any[]>([]);

    function fetchPodologo() {

        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch("http://localhost:5000/podologo", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em listar os Podologo');
                }
                return response.json();
            })
            .then((data) => {
                setPodologo(data);
            })
            .catch((error) => console.error(error));
    }
    // GET DE PODOLOGOS PARA SELECT DE AGENDAMENTO

    //SET DE AGENDAMENTO

    function salvarAgendamento() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const dataHora = formData.data + " " + formData.hora;

        const intPacienteId = parseInt(formData.paciente);
        const intPodologoId = parseInt(formData.podologo);

        const { data, hora, paciente, podologo, ...newFormData } = formData;

        const requestBody = {
            ...newFormData,
            dataHora: dataHora,
            paciente: intPacienteId,
            podologo: intPodologoId
        };

        const raw = JSON.stringify(requestBody)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        fetch("http://localhost:5000/agendamento", requestOptions)
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao salvar o Agendamento');
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

    //SET DE AGENDAMENTO



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


    //TRATAMENTO DE DADOS DE AGENDAMENTOS PARA POST
    const [error, setError] = useState('');

    const setInput = (event: any, key: string) => {

        const value = event.target.value
        if (key === 'hora') {
            if (isValidTime(value)) {
                setError('');
                const newFormData = Object.assign({}, formData, { [key]: value })
                setFormData(newFormData)
            } else {
                setError('Horário inválido! Escolha entre 7am-11am ou 1pm-5pm.');
            }
        } else {
            const newFormData = Object.assign({}, formData, { [key]: value })

            setFormData(newFormData)
        }
    }

    const [formData, setFormData] = useState({
        data: "",
        hora: "",
        descricao: "",
        situacao: "Agendada",
        paciente: "",
        podologo: ""
    })

    //TRATAMENTO DE DADOS DE AGENDAMENTOS PARA POST


    // DEFINIÇÃO DAS FAIXAS DISPONIVEIS DE HORAS 

    function isValidTime(time: any) {
        const [hours, minutes] = time.split(":").map(Number)
        if (
            (hours >= 7 && hours < 11) ||
            (hours >= 13 && hours < 17) ||
            (hours === 11 && minutes === 0) ||
            (hours === 17 && minutes === 0)
        ) {
            return true
        } else {
            return false
        }
    }

    // DEFINIÇÃO DAS FAIXAS DISPONIVEIS DE HORAS 

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleSnackbarClose = () => setSnackbarOpen(false);


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Button style={{ border: '1px solid #1976d2', width: '100%', height: '100%' }} onClick={handleOpen}>Agendar</Button>
                </Grid>
                <InputPesquisarAgendamento />
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
                            <h4>Agendamento</h4>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <Divider style={{ margin: '1em 0' }} />
                            <form autoComplete="off" onSubmit={(event) => { event.preventDefault() }}>

                                <Grid container spacing={3}>
                                    <Grid item lg={6} md={12} sm={12} xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Pacientes</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formData.paciente}
                                                label="Pacientes"
                                                onChange={(event) => setInput(event, 'paciente')}
                                            >
                                                {pacientes.map((paciente) => (
                                                    <MenuItem value={paciente.id}>{paciente.nomeCompleto}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6} md={12} sm={12} xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-labelP">Podologo(a)</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-labelP"
                                                id="demo-simple-select"
                                                value={formData.podologo}
                                                label="Podologo(a)"
                                                onChange={(event) => setInput(event, 'podologo')}
                                            >
                                                {podologos.map((podologo) => (
                                                    <MenuItem value={podologo.id}>{podologo.nomeCompleto}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item lg={6} md={12} sm={12} xs={12}>
                                        <TextField style={{ width: '100%' }} type="date" id="data" name="data" value={formData.data} onChange={(event) => setInput(event, 'data')} />
                                    </Grid>
                                    <Grid item lg={6} md={12} sm={12} xs={12}>
                                        <TextField style={{ width: '100%' }}
                                            type="time" id="hora" name="hora"
                                            value={formData.hora} onChange={(event) => setInput(event, 'hora')}
                                            error={!!error} helperText={error}
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField style={{ width: '100%' }}
                                            id="descricao outlined-multiline-static"
                                            label="Descrição"
                                            multiline
                                            rows={2}
                                            value={formData.descricao}
                                            onChange={(event) => setInput(event, 'descricao')}
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Button style={{ border: '1px solid #1976d2' }} type="submit" onClick={salvarAgendamento} id="submit-form">Enviar</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Typography>
                </Box>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </>
    )
}
export default ModalAgendamento