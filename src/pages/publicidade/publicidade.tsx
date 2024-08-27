import { Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper, Typography } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import Footer from "./footer";
import "./publicidade.css";
import cursosSenac from '../../images/cursos-senac.jpg';
import tecnicoDesenvolvimentoSistema from '../../images/tecnico-desenv-sistema.webp';
import introducaoInformatica from '../../images/introducao-informatica.webp';
import lineImage from '../../images/line-image.jpg';
import apiWebPython from '../../images/api-web-python.webp';
import excelAvancado from '../../images/excel-avan.jpg';
import gestaoProjetos from '../../images/gestao-projetos.jpeg';
import logicaProgramacao from '../../images/logica-programacao.webp';
import powerBi from '../../images/power-bi.webp';
import powerBiAvancado from '../../images/power_bi_avancado.webp';
import { useEffect, useState } from "react";
import logo from '../../images/logosenac.svg'
import { Link } from "react-router-dom";

const itemData = [
    {
        img: `${apiWebPython}`,
        title: 'Cursos Livres . TI',
        author: 'Aplicações Web com Python',
        url: 'https://ww3.ms.senac.br/Curso/Detalhe/35077'
    },
    {
        img: `${gestaoProjetos}`,
        title: 'Cursos Livres . TI',
        author: 'Gestão de Projetos de ti',
        url: 'https://ww3.ms.senac.br/Curso/Detalhe/34160'
    },
    {
        img: `${powerBiAvancado}`,
        title: 'Cursos Livres . TI',
        author: 'Microsoft Power BI - Avançado',
        url: 'https://ww3.ms.senac.br/Curso/Detalhe/86206'
    },
    {
        img: `${excelAvancado}`,
        title: 'Cursos Livres . TI',
        author: 'Excel Avançado',
        url: 'https://ww3.ms.senac.br/Curso/Detalhe/31133'
    },
    {
        img: `${logicaProgramacao}`,
        title: 'Cursos Livres . TI',
        author: 'Lógica de Programação',
        url: 'https://ww3.ms.senac.br/Curso/Detalhe/61788'
    },
    {
        img: `${powerBi}`,
        title: 'Cursos Livres . TI',
        author: 'Business Intelligence com Power bi',
        url: 'https://ww3.ms.senac.br/Curso/Detalhe/33352'
    },
];


function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${height * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const Publicidade = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div>
            <Paper elevation={3} sx={{ marginBottom: '2em' }}>
                <Card>
                    <Typography gutterBottom variant="h6" component="div" sx={{ margin: 0, padding: 0, position: 'absolute', left: '5px', top: '5px' }}>
                        <Link to='/'>
                            <Button size="small" variant="contained">Voltar ao Login</Button>
                        </Link>
                    </Typography>
                    <CardMedia
                        sx={{ height: 400 }}
                        image={cursosSenac}
                    />
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" align="center">
                            <a target="_blank" rel="noreferrer" href='https://ww3.ms.senac.br/'>
                                <img className='imgHeader' src={`${logo}`} alt="Logo" />
                            </a>
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
            <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Grid item lg={4} md={4} sm={10} xs={10} sx={{ marginBottom: '1em', display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ width: '100%' }}>
                        <CardMedia
                            sx={{ height: 250 }}
                            image={tecnicoDesenvolvimentoSistema}
                            title=""
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Cursos Técnicos . TI
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Técnico em Desenvolvimento de Sistemas
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <a href='https://ww3.ms.senac.br/Curso/Detalhe/47985' target="_blank" rel="noreferrer">
                                <Button size="small">Saiba Mais</Button>
                            </a>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item lg={4} md={4} sm={10} xs={10} sx={{ marginBottom: '1em', display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ width: '100%' }}>
                        <CardMedia
                            sx={{ height: 250 }}
                            image={introducaoInformatica}
                            title=""
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Cursos Livres . TI
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Introdução à Informática - Windows e Office
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <a href='https://ww3.ms.senac.br/Curso/Detalhe/31648' target="_blank" rel="noreferrer">
                                <Button size="small">Saiba Mais</Button>
                            </a>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Divider sx={{ marginY: '10px' }} />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginBottom: '1em', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="h6" m={1} sx={{ borderBottom: '1px solid lightgray' }}>Outros Cursos</Typography>
                    <ImageList
                        className="imageList"
                        sx={{
                            height: 550,
                        }}
                    >
                        {itemData.map((item, index) => {

                            const cols = windowSize.width <= 899 ? 2 : 1;
                            const rows = windowSize.width <= 899 ? 2 : 1;

                            return (
                                <ImageListItem key={index}
                                    cols={cols} rows={rows}
                                >
                                    <img
                                        {...srcset(item.img, 250, 250, rows, cols)}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    <a href={`${item.url}`} target="_blank" rel="noreferrer">
                                        <ImageListItemBar
                                            sx={{
                                                transition: 'transform 0.3s ease, background-color 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'rgb(36, 36, 36)'
                                                }
                                            }}
                                            title={item.title}
                                            subtitle={item.author}
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                    aria-label={`info about ${item.title}`}
                                                >
                                                    <InfoIcon />
                                                </IconButton>
                                            }
                                        />
                                    </a>
                                </ImageListItem>
                            )
                        })}
                    </ImageList>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Divider sx={{ marginY: '10px' }} />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Paper elevation={3} >
                        <Card>
                            <CardMedia
                                sx={{ height: 200 }}
                                image={lineImage}
                            />

                        </Card>
                    </Paper>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Divider sx={{ marginY: '10px' }} />
                </Grid>
                <Grid item lg={12} md={12} sm={10} xs={10} sx={{ marginBottom: '1em' }}>
                    <Footer />
                </Grid>
            </Grid>
        </div>
    )
}
export default Publicidade