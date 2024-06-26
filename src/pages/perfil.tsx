import { Divider, FormControl, Grid, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material"
import { GetItemLocalStorage } from "../helper/localStorage"
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Perfil = () => {

    interface User {
        nome: string;
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

        fetch("http://localhost:5000/api/validate-token", requestOptions)
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

        fetch("http://localhost:5000/podologo?email=" + email, requestOptions)
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


    return (
        <>
            <Paper elevation={3} sx={{ padding: '2em' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={3} lg={3} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

                        <AccountCircleIcon style={{ fontSize: 200 }} />
                        {podologos[0].nomeCompleto}
                        {/* <img src="https://placehold.co/250x250" alt="Foto de Perfil" style={{ borderRadius: '50%' }} /> */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} style={{ display: 'flex', width: '100%', padding: '1em', flexDirection: 'row', alignItems: 'center' }}>
                        {/* <div style={{ height: '100%', width: "2px", margin: '0 2em 0 0', backgroundColor: "#f2f2f2"}}></div> */}
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <p style={list}><b>CPF: </b>{podologos[0].cpf}</p>
                            <p style={list}><b>Data De Nascimento: </b>{podologos[0].dataNascimento}</p>
                            <p style={list}><b>E-mail: </b>{podologos[0].email}</p>
                            <p style={list}><b>Telefone: </b>{podologos[0].telefone}</p>
                            <p style={list}><b>Genero: </b>{podologos[0].genero}</p>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <p style={list}><b>CEP: </b>{podologos[0].cep}</p>
                            <p style={list}><b>Cidade: </b>{podologos[0].cidade}</p>
                            <p style={list}><b>Bairro: </b>{podologos[0].bairro}</p>
                            <p style={list}><b>Rua: </b>{podologos[0].rua}</p>
                            <p style={list}><b>Número: </b>{podologos[0].numero}</p>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <Divider style={{ margin: '1em 0' }} />
                        
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}
export default Perfil