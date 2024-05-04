import { Box, Divider, Modal, TextField, Typography, Button, Grid } from "@mui/material"
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

const ModalEditarPaciente: React.FC<ModalEditarProps> = ({ openFicha, fichaClose, id }) => {
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

    // INICIO SET DE PACIENTES

    function updatePaciente() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const dataNascimento = dayjs(formData.dataNascimento).format('YYYY-MM-DD')
        console.log("data nascimento", dataNascimento)
        const newFormData = Object.assign({}, formData, { dataNascimento: dataNascimento })

        const raw = JSON.stringify(newFormData);

        fetch(`http://localhost:5000/paciente/${id}`, {
            method: "PUT",
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

    // inicio GET DE PACIENTES

    const [pacientes, setPacientes] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pacientes = await fetchPacienteUnico(id);
                console.log("Paciente retornado:", pacientes); // Verifica o que está sendo retornado
                if (pacientes && pacientes.length > 0) {
                    const paciente = pacientes[0]; // Acessa o primeiro paciente no array
                    console.log("Paciente selecionado:", paciente); // Verifica o paciente selecionado

                    // Define os dados do formulário com base nos dados do paciente
                    setFormData({
                        ...formData,
                        nome: paciente.nome,
                        cpf: paciente.cpf,
                        email: paciente.email,
                        telefone: paciente.telefone,
                        dataNascimento: paciente.dataNascimento,
                        genero: paciente.genero,
                        endereco: paciente.endereco
                    });
                } else {
                    console.error("Nenhum paciente retornado.");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    function fetchPacienteUnico(id: number) {
        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        // Retorna a Promise resultante da chamada fetch
        return fetch(`http://localhost:5000/paciente?id=${id}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em buscar o Paciente');
                }
                return response.json();
            })
            .catch((error) => {
                console.error(error);
                // Retorna um objeto vazio caso ocorra um erro para evitar que a Promise seja rejeitada sem motivo
                return {};
            });
    }

    // FIM GET DE PACIENTES

    // const setData = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    //     // Verifica se o evento possui um valor e se é uma string
    //     if (event.target && typeof event.target.value === 'string') {
    //         // Assume que o valor do evento é uma data no formato esperado
    //         const value = event.target.value;
    //         const newFormData = { ...formData, [key]: value };
    //         setFormData(newFormData);
    //     } else {
    //         console.error('Evento inválido ou sem valor.');
    //     }
    // }

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
                                <TextField sx={{ margin: '0 0.2em', width: '100%' }} label="Nome Completo" variant="outlined" type="text" id="nome" name="nome" value={formData.nome} onChange={(event) => setInput(event, 'nome')} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField sx={{ margin: '0 0.2em', width: '100%' }} label="CPF" variant="outlined" type="text" id="cpf" name="cpf" value={formData.cpf} onChange={(event) => setInput(event, 'cpf')} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField sx={{ margin: '0 0.2em', width: '100%' }} label="E-mail" variant="outlined" type="text" id="email" name="email" value={formData.email} onChange={(event) => setInput(event, 'email')} />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField sx={{ margin: '0 0.2em', width: '100%' }} label="Telefone" variant="outlined" type="text" id="telefone" name="telefone" value={formData.telefone} onChange={(event) => setInput(event, 'telefone')} />
                            </Grid>
                            <Grid item lg={4} md={6} sm={12} xs={12}>
                                <TextField style={{ width: '100%' }} type="date" id="data" name="data" value={formData.dataNascimento} onChange={(event) => setInput(event, 'dataNascimento')} />
                            </Grid>
                            <Grid item lg={4} md={6} sm={12} xs={12}>
                                <TextField sx={{ margin: '0 0.2em', width: '100%' }} label="Gênero" variant="outlined" type="text" id="genero" name="genero" value={formData.genero} onChange={(event) => setInput(event, 'genero')} />
                            </Grid>
                            <Grid item lg={4} md={6} sm={12} xs={12}>
                                <TextField sx={{ margin: '0 0.2em', width: '100%' }} label="Endereço" variant="outlined" type="text" id="endereco" name="endereco" value={formData.endereco} onChange={(event) => setInput(event, 'endereco')} />
                            </Grid>
                        </Grid>
                        <Divider sx={{ margin: '1em 0' }} />
                        <Button sx={{ border: '1px solid #1976d2' }} type="button" onClick={updatePaciente} id="submit-form">Enviar</Button>
                    </form>
                </Typography>
            </Box>
        </Modal>
    )
}
export default ModalEditarPaciente