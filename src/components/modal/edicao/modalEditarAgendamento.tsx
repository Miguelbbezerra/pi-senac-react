import { Box, Divider, Modal, TextField, Typography, Button, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useEffect, useState } from "react";
import { GetItemLocalStorage } from "../../../helper/localStorage";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface ModalEditarProps {
    openFicha: boolean;
    fichaClose: () => void;
    id: number;
}

const ModalEditarAgendamento: React.FC<ModalEditarProps> = ({ openFicha, fichaClose, id }) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '100%',
        margin: '1em 0',
        bgcolor: 'background.paper',
        border: '2px solid #1976d2',
        borderRadius: '0.5em',
        boxShadow: 24,
        p: 4,
    };

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

    // INICIO SET

    function updateAgendamento() {
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

        fetch(`http://localhost:5000/agendamento/${id}`, {
            method: "PUT",
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
    // FIM SET

    // inicio GET
    const [pacAndPod, setPacAndPod] = useState({
        pacienteIdSelected: "",
        pacienteNomeSelected: "",
        podologoIdSelected: "",
        podologoNomeSelected: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const agendamentos = await fetchAgendamentoUnico(id);
                // console.log("Paciente retornado:", agendamentos);
                if (agendamentos && agendamentos.length > 0) {
                    const agendamento = agendamentos[0]; // Acessa o primeiro agendamento no array
                    // console.log("agendamento selecionado:", agendamento);

                    const newPacAndPod = {
                        ...pacAndPod,
                        pacienteIdSelected: agendamento.paciente,
                        pacienteNomeSelected: agendamento.paciente.nome,
                        podologoIdSelected: agendamento.podologo,
                        podologoNomeSelected: agendamento.podologo.nomeCompleto
                    }
                    setPacAndPod(newPacAndPod)

                    const dataHoraAgendamento = new Date(agendamento.dataHora);

                    // Formatar a data para 'YYYY-MM-DD'
                    const newData = dataHoraAgendamento.toISOString().split('T')[0];

                    // Formatar a hora para 'HH:MM'
                    const newHora = dataHoraAgendamento.toTimeString().split(' ')[0];
                    // Define os dados do formulário com base nos dados do agendamento
                    setFormData({
                        ...formData,
                        data: newData,
                        hora: newHora,
                        descricao: agendamento.descricao,
                        situacao: "Agendada",
                        paciente: agendamento.paciente.id,
                        podologo: agendamento.podologo.id

                    });
                } else {
                    console.error("Nenhum agendamento retornado.");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    function fetchAgendamentoUnico(id: number) {
        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        // Retorna a Promise resultante da chamada fetch
        return fetch(`http://localhost:5000/agendamento/?id=${id}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em buscar o agendamento');
                }
                return response.json();
            })
            .catch((error) => {
                console.error(error);
                // Retorna um objeto vazio caso ocorra um erro para evitar que a Promise seja rejeitada sem motivo
                return {};
            });
    }

    // FIM GET DE agendamento

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

    return (
        <Modal
            open={openFicha}
            onClose={fichaClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Pacientes</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.paciente}
                                        defaultValue={formData.paciente}
                                        label="Pacientes"
                                        onChange={(event) => setInput(event, 'paciente')}
                                    >
                                        <MenuItem disabled selected value={formData.paciente}>{pacAndPod.pacienteNomeSelected}</MenuItem>
                                    </Select>
                                </FormControl>


                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-labelP">Podologo(a)</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-labelP"
                                        id="demo-simple-select"
                                        value={formData.podologo}
                                        defaultValue={formData.podologo}
                                        label="Podologo(a)"
                                        onChange={(event) => setInput(event, 'podologo')}
                                    >
                                        
                                        <MenuItem disabled selected value={formData.podologo}>{pacAndPod.podologoNomeSelected}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField style={{ width: '100%' }} type="date" id="data" name="data" value={formData.data} onChange={(event) => setInput(event, 'data')} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField style={{ width: '100%' }} type="time" id="hora" name="hora" value={formData.hora} onChange={(event) => setInput(event, 'hora')} />
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

                        </Grid>
                        <Divider sx={{ margin: '1em 0' }} />
                        <Button sx={{ border: '1px solid #1976d2' }} type="button" onClick={updateAgendamento} id="submit-form">Enviar</Button>
                    </form>
                </Typography>
            </Box>
        </Modal>
    )
}
export default ModalEditarAgendamento