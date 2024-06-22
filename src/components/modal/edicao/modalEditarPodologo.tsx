import { Box, Divider, Modal, TextField, Typography, Button, Grid } from "@mui/material"
import { useEffect, useState } from "react";
import { GetItemLocalStorage } from "../../../helper/localStorage";
import dayjs from "dayjs";
import { CEPMaskInput, CPFMaskInput, GeneroMaskInput, LettersMaskInput, NumbersMaskInput, PhoneMaskInput } from "../../mask/MaskInput";

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

        fetch(`https://api-pi-senac.azurewebsites.net/podologo/${id}`, {
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

    useEffect(() => {
        if (openFicha) {
            const fetchData = async () => {
                try {
                    const podologos = await fetchPodologoUnico(id);
                    console.log("Podologo retornado:", podologos);
                    if (podologos && podologos.length > 0) {
                        const podologo = podologos[0];
                        console.log("Podologo selecionado:", podologo);

                        setFormData({
                            nomeCompleto: podologo.nomeCompleto,
                            cpf: podologo.cpf,
                            email: podologo.email,
                            telefone: podologo.telefone,
                            dataNascimento: podologo.dataNascimento,
                            genero: podologo.genero,
                            cep: podologo.cep,
                            rua: podologo.rua,
                            numero: podologo.numero,
                            bairro: podologo.bairro,
                            cidade: podologo.cidade
                        });
                    } else {
                        console.error("Nenhum Podologo retornado.");
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }
    }, [openFicha, id]);


    function fetchPodologoUnico(id: number) {
        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        // Retorna a Promise resultante da chamada fetch
        return fetch(`https://api-pi-senac.azurewebsites.net/podologo?id=${id}`, requestOptions)
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
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: ""
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
                        <h4>Editar Podólogo(a)</h4>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Divider style={{ margin: '1em 0' }} />
                    <form autoComplete="off" onSubmit={(event) => { event.preventDefault() }}>
                        <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Nome Completo" variant="outlined" type="text" id="nome" name="nome" value={formData.nomeCompleto} onChange={(event) => setInput(event, 'nomeCompleto')} InputProps={{ inputComponent: LettersMaskInput as any }}/>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="CPF" variant="outlined" type="text" id="cpf" name="cpf" value={formData.cpf} onChange={(event) => setInput(event, 'cpf')} InputProps={{ inputComponent: CPFMaskInput as any }} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="E-mail" variant="outlined" type="text" id="email" name="email" value={formData.email} onChange={(event) => setInput(event, 'email')} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Telefone" variant="outlined" type="text" id="telefone" name="telefone" value={formData.telefone} onChange={(event) => setInput(event, 'telefone')} InputProps={{ inputComponent: PhoneMaskInput as any }}/>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField style={{ width: '100%' }} type="date" id="data" name="data" value={formData.dataNascimento} onChange={(event) => setInput(event, 'dataNascimento')} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Gênero" variant="outlined" type="text" id="genero" name="genero" value={formData.genero} onChange={(event) => setInput(event, 'genero')} InputProps={{ inputComponent: GeneroMaskInput as any }}/>
                            </Grid>
                            <Grid item lg={2} md={2} sm={6} xs={6}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Cep" variant="outlined" type="text" id="cep" name="cep" value={formData.cep} onChange={(event) => setInput(event, 'cep')} InputProps={{ inputComponent: CEPMaskInput as any }}/>
                            </Grid>
                            <Grid item lg={3} md={3} sm={6} xs={6}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Cidade" variant="outlined" type="text" id="cidade" name="cidade" value={formData.cidade} onChange={(event) => setInput(event, 'cidade')} InputProps={{ inputComponent: LettersMaskInput as any }}/>
                            </Grid>
                            <Grid item lg={2} md={2} sm={6} xs={6}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Bairro" variant="outlined" type="text" id="bairro" name="bairro" value={formData.bairro} onChange={(event) => setInput(event, 'bairro')} InputProps={{ inputComponent: LettersMaskInput as any }}/>
                            </Grid>
                            <Grid item lg={3} md={3} sm={6} xs={6}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Rua" variant="outlined" type="text" id="rua" name="rua" value={formData.rua} onChange={(event) => setInput(event, 'rua')} />
                            </Grid>
                            <Grid item lg={2} md={2} sm={6} xs={6}>
                                <TextField style={{ margin: '0 0.2em', width: '100%' }} label="Número" variant="outlined" type="text" id="numero" name="numero" value={formData.numero} onChange={(event) => setInput(event, 'numero')} InputProps={{ inputComponent: NumbersMaskInput as any }}/>
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