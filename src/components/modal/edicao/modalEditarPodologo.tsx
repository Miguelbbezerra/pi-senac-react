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

const ModalEditarPodologo: React.FC<ModalEditarProps> = ({ openFicha, fichaClose, id }) => {
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

    // INICIO SET DE podologos

    function updatePodologo() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const dataNascimento = dayjs(formData.dataNascimento).format('YYYY-MM-DD')
        console.log("data nascimento", dataNascimento)
        const newFormData = Object.assign({}, formData, { dataNascimento: dataNascimento })

        const raw = JSON.stringify(newFormData);

        fetch(`http://localhost:5000/podologo/${id}`, {
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
    // FIM SET DE PODOLOGOS

    // inicio GET DE PODOLOGOS

    const [podologos, setPodologos] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const podologos = await fetchPodologoUnico(id);
                console.log("Paciente retornado:", podologos); // Verifica o que está sendo retornado
                if (podologos && podologos.length > 0) {
                    const podologo = podologos[0]; // Acessa o primeiro Podologo no array
                    console.log("Podologo selecionado:", podologo); // Verifica o selecionado

                    // Define os dados do formulário com base nos dados do podologo
                    setFormData({
                        ...formData,
                        nomeCompleto: podologo.nomeCompleto,
                        cpf: podologo.cpf,
                        email: podologo.email,
                        telefone: podologo.telefone,
                        dataNascimento: podologo.dataNascimento,
                        genero: podologo.genero,
                        endereco: podologo.endereco
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


    function fetchPodologoUnico(id: number) {
        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        // Retorna a Promise resultante da chamada fetch
        return fetch(`http://localhost:5000/podologo?id=${id}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em buscar o podologo');
                }
                return response.json();
            })
            .catch((error) => {
                console.error(error);
                // Retorna um objeto vazio caso ocorra um erro para evitar que a Promise seja rejeitada sem motivo
                return {};
            });
    }

    // FIM GET DE podologoS

    const setInput = (event: any, key: string) => {

        const value = event.target.value
        const newFormData = Object.assign({}, formData, { [key]: value })

        setFormData(newFormData)
    }


    const [formData, setFormData] = useState({
        nomeCompleto: "",
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
                                <TextField sx={{ margin: '0 0.2em', width: '100%' }} label="Nome Completo" variant="outlined" type="text" id="nomeCompleto" name="nomeCompleto" value={formData.nomeCompleto} onChange={(event) => setInput(event, 'nomeCompleto')} />
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
                        <Button sx={{ border: '1px solid #1976d2' }} type="button" onClick={updatePodologo} id="submit-form">Enviar</Button>
                    </form>
                </Typography>
            </Box>
        </Modal>
    )
}
export default ModalEditarPodologo