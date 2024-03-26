import { Outlet } from "react-router-dom"
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

function Home() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card sx={{ width: '100%' }}>
                        <CardMedia
                            sx={{ height: 200 }}
                            image="https://amigoedu-blog-uploads.s3.amazonaws.com/uploads/2023/02/Podologia-saiba-tudo-sobre-esse-curso.png"
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Podologia
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
                                sx={{ height: 200}}
                                image={item.image}
                                title="Green Iguana"
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
                                <Button size="small"><a href={item.url} target="_blank" style={{ textDecoration: 'none', color: '#1976d2' }}>Learn More</a></Button>
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

