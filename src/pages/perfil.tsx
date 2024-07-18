import { Divider, Grid, Paper } from "@mui/material";
import { GetItemLocalStorage } from "../helper/localStorage";
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import api from "../helper/http";

const list = {
    margin: '1em 0'
};

interface Podologo {
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    telefone: string;
    genero: string;
    cep: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
}

const Perfil = () => {
    const [podologos, setPodologos] = useState<Podologo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const userString = GetItemLocalStorage('user');
            if (userString) {
                const user = JSON.parse(userString);
                if (user.email) {
                    try {
                        const response = await fetchPodologo(user.email);
                        setPodologos(response.data);
                    } catch (error) {
                        console.error('Error fetching podologos:', error);
                    }
                }
            }
        };
        fetchData();
    }, []);

    async function fetchPodologo(email: string) {
        const response = await api.get('podologo', { params: { email } });
        return response;
    }

    return (
        <>
            <Paper elevation={3} sx={{ padding: '2em' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={3} lg={3} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <AccountCircleIcon style={{ fontSize: 200 }} />
                        {podologos.length > 0 && podologos[0]?.nomeCompleto}
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} style={{ display: 'flex', width: '100%', padding: '1em', flexDirection: 'row', alignItems: 'center' }}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <p style={list}><b>CPF: </b>{podologos[0]?.cpf || 'N/A'}</p>
                            <p style={list}><b>Data De Nascimento: </b>{podologos[0]?.dataNascimento || 'N/A'}</p>
                            <p style={list}><b>E-mail: </b>{podologos[0]?.email || 'N/A'}</p>
                            <p style={list}><b>Telefone: </b>{podologos[0]?.telefone || 'N/A'}</p>
                            <p style={list}><b>Genero: </b>{podologos[0]?.genero || 'N/A'}</p>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <p style={list}><b>CEP: </b>{podologos[0]?.cep || 'N/A'}</p>
                            <p style={list}><b>Cidade: </b>{podologos[0]?.cidade || 'N/A'}</p>
                            <p style={list}><b>Bairro: </b>{podologos[0]?.bairro || 'N/A'}</p>
                            <p style={list}><b>Rua: </b>{podologos[0]?.rua || 'N/A'}</p>
                            <p style={list}><b>Número: </b>{podologos[0]?.numero || 'N/A'}</p>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <Divider style={{ margin: '1em 0' }} />
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default Perfil;
