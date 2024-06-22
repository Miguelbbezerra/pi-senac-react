import { Button, Divider, Grid, Paper, Snackbar, TextField } from "@mui/material"
import { GetItemLocalStorage } from "../helper/localStorage"
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { PasswordMaskInput } from "../components/mask/MaskInput";

const Perfil = () => {

    interface User {
        nomeCompleto: string;
        email: string;
    }

    const [user, setUser] = useState<User | null>(null);
    const [podologos, setPodologos] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await usuario();
            if (user?.email) {
                fetchPodologo(user.email);
            }
        };

        fetchData();
    }, [user]);

    function usuario() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const token = GetItemLocalStorage('token');

        const raw = JSON.stringify({
            "token": token
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        fetch("https://api-pi-senac.azurewebsites.net/api/validate-token", requestOptions)
            .then((response) => response.json())  // Use response.json() para tratar a resposta como JSON
            .then((data) => {
                setUser(data.decoded.data)
            })
            .catch((error) => console.error('Error:', error));
    }


    // INICIO GET DE PODOLOGO

    function fetchPodologo(email: any) {
        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch("https://api-pi-senac.azurewebsites.net/podologo?email=" + email, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em listar os Podologos');
                }
                return response.json();
            })
            .then((data) => {
                setPodologos(data);
            })
            .catch((error) => console.error(error));
    }
    // FIM GET DE PODOLOGO

    const list = {
        margin: '1em 0'
    }


    const [senhaData, setSenhaData] = useState({
        senha: "",
        senhaConfirma: ""
    })

    const setInput = (event: any, key: string) => {
        const value = event.target.value
        const newSenhaData = Object.assign({}, senhaData, { [key]: value })
        setSenhaData(newSenhaData)
    }

    function updatePassword(id: any) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        if (senhaData.senha !== senhaData.senhaConfirma) {
            return (setSnackbarMessage("As senha não conferem!"), setSnackbarOpen(true));
        }

        const {senhaConfirma, ...newSenhaData} = senhaData
        
        const raw = JSON.stringify(newSenhaData);

        fetch("https://api-pi-senac.azurewebsites.net/podologo/" + id, {
            method: "PUT",
            headers: myHeaders,
            body: raw,
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao salvar podólogo');
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

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleSnackbarClose = () => setSnackbarOpen(false);


    return (
        <>
            <Paper elevation={3} sx={{ padding: '2em' }}>
                <form style={{ width: '100%' }} autoComplete="off" onSubmit={(event) => { event.preventDefault() }}>

                    <Grid container spacing={1}>
                        {podologos.map((podologo) => (
                            <>
                                <Grid item xs={12} sm={12} md={3} lg={3} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

                                    <AccountCircleIcon style={{ fontSize: 200 }} />
                                    {podologo.nomeCompleto}
                                    {/* <img src="https://placehold.co/250x250" alt="Foto de Perfil" style={{ borderRadius: '50%' }} /> */}
                                </Grid>
                                <Grid item xs={12} sm={12} md={9} lg={9} style={{ display: 'flex', width: '100%', padding: '1em', flexDirection: 'row', alignItems: 'center' }}>
                                    {/* <div style={{ height: '100%', width: "2px", margin: '0 2em 0 0', backgroundColor: "#f2f2f2"}}></div> */}
                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                        <p style={list}><b>CPF: </b>{podologo.cpf}</p>
                                        <p style={list}><b>Data De Nascimento: </b>{podologo.dataNascimento}</p>
                                        <p style={list}><b>E-mail: </b>{podologo.email}</p>
                                        <p style={list}><b>Telefone: </b>{podologo.telefone}</p>
                                        <p style={list}><b>Genero: </b>{podologo.genero}</p>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                        <p style={list}><b>CEP: </b>{podologo.cep}</p>
                                        <p style={list}><b>Cidade: </b>{podologo.cidade}</p>
                                        <p style={list}><b>Bairro: </b>{podologo.bairro}</p>
                                        <p style={list}><b>Rua: </b>{podologo.rua}</p>
                                        <p style={list}><b>Número: </b>{podologo.numero}</p>
                                    </Grid>
                                </Grid>
                            </>
                        ))}
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Divider style={{ margin: '1em 0' }} />
                            <h2 style={{ fontWeight: 'bold' }}>Alterar Senha: </h2>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField label="Nova senha"
                                variant="outlined" type="password" id="senha" name="senha"
                                value={senhaData.senha} onChange={(event) => setInput(event, 'senha')}
                                sx={{ margin: '0 0.2em', width: '100%' }}
                                InputProps={{ inputComponent: PasswordMaskInput as any }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField label="Confirme a nova senha"
                                variant="outlined" type="password" id="senhaConfirma" name="senhaConfirma"
                                value={senhaData.senhaConfirma} onChange={(event) => setInput(event, 'senhaConfirma')}
                                sx={{ margin: '0 0.2em', width: '100%' }}
                                InputProps={{ inputComponent: PasswordMaskInput as any }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Button style={{ border: '1px solid #1976d2', margin: '0 0.2em', width: '100%', height: '100%' }} 
                            type="button" onClick={() => updatePassword(podologos[0].id)}>
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </>
    )
}
export default Perfil