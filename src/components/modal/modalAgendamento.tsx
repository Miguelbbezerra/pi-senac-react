import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import InputPesquisar from "../pesquisar";
import { Link } from "react-router-dom";
import { GetItemLocalStorage } from "../../helper/localStorage";

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
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                window.location.reload();
            })
            .catch((error) => console.error(error));
    }

    //SET DE AGENDAMENTO



    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '60%',
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

    const setInput = (event: any, key: string) => {

        const value = event.target.value
        const newFormData = Object.assign({}, formData, { [key]: value })

        setFormData(newFormData)
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


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Button style={{ border: '1px solid #1976d2', width: '100%', height: '100%' }} onClick={handleOpen}>Agendar</Button>
                </Grid>
                {/* <Grid item xs={6} sm={6} md={3} lg={3}>
                    <Button style={{ border: '1px solid #1976d2', width: '100%', height: '100%' }}>
                        <Link to='../ficha' style={{ textDecoration: 'none', color: '#1976d2', width: '100%' }}>Ficha de Anamnese</Link>
                    </Button>
                </Grid> */}
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
                            <h4>Agendamento</h4>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <Divider style={{ margin: '1em 0' }} />
                            <form autoComplete="off" onSubmit={(event) => { event.preventDefault() }}>

                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', margin: '1em 0' }}>
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
                                                    <MenuItem value={paciente.id}>{paciente.nome}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
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

                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', margin: '1em 0' }}>
                                        <TextField style={{ width: '100%' }} type="date" id="data" name="data" value={formData.data} onChange={(event) => setInput(event, 'data')} />
                                        <TextField style={{ width: '100%' }} type="time" id="hora" name="hora" value={formData.hora} onChange={(event) => setInput(event, 'hora')} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', margin: '1em 0' }}>
                                        <TextField style={{ width: '100%' }}
                                            id="descricao outlined-multiline-static"
                                            label="Descrição"
                                            multiline
                                            rows={2}
                                            value={formData.descricao}
                                            onChange={(event) => setInput(event, 'descricao')}
                                        />
                                    </div>
                                </div>

                                <Divider style={{ margin: '1em 0' }} />

                                <Button style={{ border: '1px solid #1976d2' }} type="submit" onClick={salvarAgendamento} id="submit-form">Enviar</Button>

                            </form>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}
export default ModalAgendamento