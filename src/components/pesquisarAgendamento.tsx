import { Box, Button, Divider, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DatePicker, DateTimePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GetItemLocalStorage } from "../helper/localStorage";

interface FormFiltro {
    paciente: string;
    podologo: string;
    data: string;
    hora: string;
}

const InputPesquisarAgendamento = () => {

    // AREA DO MODAL

    const style = {
        modal: {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        },
        input: {
            width: '100%',
            margin: '0 0.2em'
        },
        botao: {
            border: '1px solid #1976d2',
            position: 'fixed',
            right: 10,
            bottom: 10
        }
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // AREA DO MODAL





    // CAMPO DE PESQUISA
    const [formData, setFormData] = useState({
        pesquisa: ""
    })

    function pesquisar() {
        const containsLetter = hasLetter(formData.pesquisa);

        if (containsLetter) {
            window.location.href = '?&nomeCompleto=' + formData.pesquisa;
        } else {
            window.alert('Pesquisa inválida!');
        }
    }

    const setInput = (event: any, key: string) => {

        const value = event.target.value
        const newFormData = Object.assign({}, formData, { [key]: value })

        setFormData(newFormData)
    }
    // CAMPO DE PESQUISA






    // VALIDANDO DADOS DO FORM
    function hasLetter(str: any) {
        return /[a-zA-Z]/.test(str);
    }

    const [formFiltro, setFormFiltro] = useState<FormFiltro>({
        paciente: "",
        podologo: "",
        data: "",
        hora: "",
    });

    const setFiltro = (event: any, key: string) => {

        const value = event.target.value
        const newFormFiltro = Object.assign({}, formFiltro, { [key]: value })

        setFormFiltro(newFormFiltro)
    }
    // VALIDANDO DADOS DO FORM




    // SUBMIT DO FORM FILTROS
    const handleFiltro = () => {
        let url = '';
        let dataValor = '';
        let horaValor = '';

        for (let chave in formFiltro) {
            const valor = formFiltro[chave as keyof FormFiltro];

            if (valor === '' || valor === null || valor === undefined || (Array.isArray(valor) && valor.length === 0)) {
                console.log(`${chave} está vazio`);
            } else {
                console.log(`${chave} não está vazio`);
                if (chave === 'data') {
                    dataValor = valor as string;
                } else if (chave === 'hora') {
                    horaValor = valor as string;
                } else {
                    url = `${url}&${chave}=${encodeURIComponent(valor)}`;
                }
            }
        }

        if (dataValor || horaValor) {
            const dataHora = `${dataValor} ${horaValor}`.trim();
            url = `${url}&dataHora=${encodeURIComponent(dataHora)}`;
        }

        if (url.startsWith('&')) {
            url = url.slice(1); // Remove o primeiro '&' extra
        }

        console.log(url);
        window.location.href = `?${url}`;
    };



    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const urlParams = query.toString();
    // SUBMIT DO FORM FILTROS





    //GET NA API DE DAS TABELAS ABAIXO
    useEffect(() => {
        fetchPacientes();
        fetchPodologo();
    }, []);
    //GET NA API DE DAS TABELAS FIM    


    // GET DE PACIENTES PARA SELECT NO AGENDAMENTO
    const [pacientesGet, setPacientes] = useState<any>([]);


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
    const [podologosGet, setPodologo] = useState<any>([]);

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

    return (
        <Grid item xs={12} sm={12} md={6} lg={6}>

            {urlParams !== '' ? (
                <>
                    <Button style={{ border: '1px solid #1976d2', width: '90%', height: '60px' }} onClick={handleOpen}>Filtros</Button>
                    <Button type="button" style={{ border: '1px solid #d32f2f', height: '60px', width: '10%' }} color="error" onClick={() => {
                        window.location.href = '/admin/agendamento'
                    }}>
                        <p>X</p>
                    </Button>
                </>

            ) : (
                <Button style={{ border: '1px solid #1976d2', width: '100%', height: '60px' }} onClick={handleOpen}>Filtros</Button>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.modal}>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Filtros
                            </Typography>
                            <Divider sx={{ margin: '1em 0' }} />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Pacientes</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formFiltro.paciente}
                                    label="Pacientes"
                                    onChange={(event) => setFiltro(event, 'paciente')}
                                >
                                    {pacientesGet.map((paciente: any) => (
                                        <MenuItem value={paciente.nomeCompleto}>{paciente.nomeCompleto}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-labelP">Podologo(a)</InputLabel>
                                <Select
                                    labelId="demo-simple-select-labelP"
                                    id="demo-simple-select"
                                    value={formFiltro.podologo}
                                    label="Podologo(a)"
                                    onChange={(event) => setFiltro(event, 'podologo')}
                                >
                                    {podologosGet.map((podologo: any) => (
                                        <MenuItem value={podologo.nomeCompleto}>{podologo.nomeCompleto}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField sx={style.input} type="date" value={formFiltro.data} onChange={(event) => setFiltro(event, 'data')} />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField type="time" sx={style.input} value={formFiltro.hora} onChange={(event) => setFiltro(event, 'hora')} />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Divider sx={{ margin: '1em 0' }} />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Button sx={style.botao} type="button" onClick={handleFiltro}>Aplicar Filtros</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>


        </Grid>
    )
}
export default InputPesquisarAgendamento