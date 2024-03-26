import { Box, Button, Divider, InputAdornment, Modal, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper'
import { useEffect, useState } from "react"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import useWindowSize from "../useWindowSize";
import Paginacao from "../components/paginacao/paginacao";


const Paciente = () => {


    // INICIO GET DE PACIENTES

    const [pacientes, setPacientes] = useState<any[]>([]);

    useEffect(() => {
        fetchPacientes();
    }, []);


    function fetchPacientes() {
        fetch("http://localhost:5000/api/paciente", {
            method: "GET",
            redirect: "follow"
        })
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

    // FIM GET DE PACIENTES

    // INICIO SET DE PACIENTES

    function salvarPaciente() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        const dataNascimento = dayjs(formData.dataNascimento).format('YYYY-MM-DD')
        console.log("data nascimento", dataNascimento)
        const newFormData = Object.assign({}, formData, { dataNascimento: dataNascimento })

        const raw = JSON.stringify(newFormData);

        const requestOptions = {
            mode: 'cors',
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        fetch("http://localhost:5000/api/paciente", {


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

    // FIM SET DE PACIENTES

    // INICIO TRATANDO DADOS DE PACIENTES

    const setData = (event: any, key: string) => {

        const value = dayjs(event).format('YYYY-MM-DD')
        const date = new Date(event.timeStamp)


        console.log(dayjs(event).format('YYYY-MM-DD'))
        console.log(key)

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

    // INICIO COD MODAL

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // FIM COD MODAL


    // INICIO RESPONSIVIDADE

    const { width } = useWindowSize();

    // FIM RESPONSIVIDADE


    //INICIO PAGINAÇÃO

    //FIM PAGINAÇÃO


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button style={{ border: '1px solid #1976d2' }} onClick={handleOpen}>Cadastrar Paciente</Button>
                <div>
                    <TextField
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                    <p>Pesquisar</p>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {/* <SearchIcon style={{ height: '100%', backgroundColor: '#f2f2f2', borderRadius: '0 0.2em 0.2em 0' }} /> */}
                </div>
            </div>
            <Modal

                open={open}
                onClose={handleClose}
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
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', margin: '1em 0' }}>
                                    <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Nome Completo" variant="outlined" type="text" id="nome" name="nome" value={formData.nome} onChange={(event) => setInput(event, 'nome')} />
                                    <TextField style={{ margin: '0 0.2em', width: '100%' }} label="CPF" variant="outlined" type="text" id="cpf" name="cpf" value={formData.cpf} onChange={(event) => setInput(event, 'cpf')} />
                                    <TextField style={{ margin: '0 0.2em', width: '100%' }} label="E-mail" variant="outlined" type="text" id="email" name="email" value={formData.email} onChange={(event) => setInput(event, 'email')} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', margin: '1em 0' }}>
                                    <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Telefone" variant="outlined" type="text" id="telefone" name="telefone" value={formData.telefone} onChange={(event) => setInput(event, 'telefone')} />
                                    {/* <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Data Nascimento" variant="outlined" type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={(event) => setData(event, 'data_nascimento')} /> */}
                                    <div style={{ margin: '0 0.2em', width: '100%' }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DatePicker name="dataNascimento" value={formData.dataNascimento} onChange={(event) => setData(event, 'dataNascimento')} />
                                        </LocalizationProvider>
                                    </div>
                                    <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Gênero" variant="outlined" type="text" id="genero" name="genero" value={formData.genero} onChange={(event) => setInput(event, 'genero')} />
                                    <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Endereço" variant="outlined" type="text" id="endereco" name="endereco" value={formData.endereco} onChange={(event) => setInput(event, 'endereco')} />
                                </div>
                            </div>

                            <Divider style={{ margin: '1em 0' }} />

                            <Button style={{ border: '1px solid #1976d2' }} type="button" onClick={salvarPaciente} id="submit-form">Enviar</Button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
            <Divider style={{ margin: '1em 0' }} />
            <h2>Listagem de Pacientes</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead style={{ backgroundColor: '#f2f2f2' }}>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="right">CPF</TableCell>
                            <TableCell align="right">E-mail</TableCell>
                            <TableCell align="right">Data de Nascimento</TableCell>
                            <TableCell align="right">Gênero</TableCell>
                            <TableCell align="right">Endereço</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pacientes.map((paciente, index) => (
                            <TableRow key={paciente.id}>
                                <TableCell component="th" scope="row">{paciente.nome}</TableCell>
                                <TableCell align="right">{paciente.cpf}</TableCell>
                                <TableCell align="right">{paciente.email}</TableCell>
                                <TableCell align="right">{paciente.dataNascimento}</TableCell>
                                <TableCell align="right">{paciente.genero}</TableCell>
                                <TableCell align="right">{paciente.endereco}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Paginacao />
            </TableContainer>
        </>
    )
}
export default Paciente