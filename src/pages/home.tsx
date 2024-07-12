import { useEffect, useState } from "react";
import { GetItemLocalStorage } from "../helper/localStorage";
import "../styles/sideBar.css"
import { Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material"

const data = [
    {
        image: "https://ww3.ms.senac.br/Portals/0/Cursos/32624.jpeg?w=360",
        title: "Tecnicas Praticas em Podologia",
        description: "Cursos Livres . Saúde",
        url: "https://ww3.ms.senac.br/Curso/Detalhe/32624"
    },
    {
        image: "https://ww3.ms.senac.br/Portals/0/Cursos/34419/Anexo_34419_133023879459010346.jpeg?w=360",
        title: "Técnico em Podologia - Senac MS",
        description: "Cursos Técnicos . Saúde",
        url: "https://ww3.ms.senac.br/Curso/Detalhe/34419"
    },
    {
        image: "https://ww3.ms.senac.br/Portals/0/Cursos/00.jpg?w=360",
        title: "Podologia esportiva - Senac MS",
        description: "Cursos Livres . Saúde",
        url: "https://ww3.ms.senac.br/Curso/Detalhe/103359"
    }
];

interface User {
    nome: string;
    email: string;
}

const Home: React.FC = () => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        return (() => {
           const user = GetItemLocalStorage('user')
           if(user) {

               setUser(JSON.parse(user))
           }
        })
    }, [GetItemLocalStorage]);

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

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card sx={{ width: '100%' }}>
                        <CardMedia
                            sx={{ height: 200 }}
                            image="https://amigoedu-blog-uploads.s3.amazonaws.com/uploads/2023/02/Podologia-saiba-tudo-sobre-esse-curso.png"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {user ? <div>Bem-vindo, {user.nome}!</div> : <div>Carregando...</div>}
                            </Typography>
                        </CardContent>
                        <Divider />
                    </Card>
                </Grid>
            </Grid>
            <Divider style={{ margin: '1em 0' }} />
            <Grid container spacing={10}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={12} md={4} lg={4} >
                        <Card key={index} sx={{ maxWidth: '100%' }}>
                            <CardMedia
                                sx={{ height: 200 }}
                                image={item.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <a href={item.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#1976d2' }}><Button size="small">Aprenda Mais</Button></a>
                                {/* <Button size="small">Learn More</Button> */}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </>
    )
}
export default Home

