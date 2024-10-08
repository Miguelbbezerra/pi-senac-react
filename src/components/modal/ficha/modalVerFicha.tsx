<<<<<<< HEAD
import { Box, Divider, Modal, Typography, Grid, TextField, FormControlLabel, Checkbox, FormControl, Button } from "@mui/material"
=======
import { Box, Divider, Modal, Typography, Grid, TextField, FormControlLabel, Checkbox, FormControl } from "@mui/material"
>>>>>>> refactor-login
import { useEffect, useState } from "react";
import { GetItemLocalStorage } from "../../../helper/localStorage";

interface ModalEditarProps {
    openFicha: boolean;
    fichaClose: () => void;
    id_ficha: number;
}
<<<<<<< HEAD
=======
const style = {
    overflowX: 'auto',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '100vh',
    margin: '1em 0',
    bgcolor: 'background.paper',
    border: '2px solid #1976d2',
    borderRadius: '0.5em',
    boxShadow: 24,
    p: 4,
};

>>>>>>> refactor-login

const ModalVerFicha: React.FC<ModalEditarProps> = ({ openFicha, fichaClose, id_ficha }) => {
    const [formData, setFormData] = useState({
        agendamento: "",
        paciente: "",
        podologo: "",
        genero: "",
        idade: "",
        estadoCivil: "",
        profissao: "",
        posicaoTrabalho: "",
        estatura: "",
        peso: "",
        tipoCalcado: "",
        tipoMeia: "",
        habitoAlimentar: "",
        medicamentoContinuo: "",
        tipagemSanguinea: "",
        doencasPreExistentes: "",
        tratamentoPodologico: "",
        cirurgiaInferiores: "",
        possuiAlergia: "",
        amputacoes: "",
        escalaDeDor: "",
        pinosMarcapasso: "",
        pressaoArterial: "",
<<<<<<< HEAD
        perfusoesPe: "",
        perfusoesPd: "",
=======
        perfusoesPE: "",
        perfusoesPD: "",
>>>>>>> refactor-login
        digitoPressaoPE: 0,
        digitoPressaoPD: 0,
        formatoUnhasPE: "",
        formatoUnhasPD: "",
        formatoPePE: "",
        formatoPePD: "",
        testeMonofilamentoPE: "",
        testeMonofilamentoPD: "",
        etilista: 0,
        tabagista: 0,
        praticaEsporte: 0,
        glicemia: "",
        gestante: 0,
        lactante: 0
    });

<<<<<<< HEAD
    const style = {
        overflowX: 'auto',
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '100vh',
        margin: '1em 0',
        bgcolor: 'background.paper',
        border: '2px solid #1976d2',
        borderRadius: '0.5em',
        boxShadow: 24,
        p: 4,
    };

=======
>>>>>>> refactor-login
    // inicio GET

    const [fichas, setFichaState] = useState<any[]>([]);

    useEffect(() => {
        if (openFicha) {
            fetchFichaUnico(id_ficha);
        }
    }, [openFicha, id_ficha]);


    function fetchFichaUnico(id_ficha: number) {
        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        // Retorna a Promise resultante da chamada fetch
        return fetch(`https://api-pi-senac.azurewebsites.net/anamnese/?id=${id_ficha}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em buscar o a ficha');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setFichaState(data);
            })
            .catch((error) => {
                console.error(error);
<<<<<<< HEAD
                // Retorna um objeto vazio caso ocorra um erro para evitar que a Promise seja rejeitada sem motivo
=======
>>>>>>> refactor-login
                return {};
            });
    }

    // TRATANDO DADOS DO FORM DA FICHA
    const setInput = (event: any, key: string) => {
        let value = event.target.value

        if (event.target.type === 'checkbox') {
            value = event.target.checked ? 1 : 0;
        } else {
            value = event.target.value;
        }

        const newFormData = Object.assign({}, formData, { [key]: value })
        setFormData(newFormData)
    }

<<<<<<< HEAD

=======
>>>>>>> refactor-login
    // TRATANDO DADOS DO FORM DA FICHA

    return (
        <Modal
<<<<<<< HEAD
            // sx={{ overflowX: 'auto'}}
=======
>>>>>>> refactor-login
            open={openFicha}
            onClose={fichaClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <div>
                        {fichas.map((ficha, index) => (
<<<<<<< HEAD
                            <h4>Ficha Do(a) {ficha.paciente.nomeCompleto}</h4>
=======
                            <h4 key={index}>Ficha Do(a) {ficha.paciente.nomeCompleto}</h4>
>>>>>>> refactor-login
                        ))}
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Divider style={{ margin: '1em 0' }} />
                    <Box sx={{ flexGrow: 1 }} >
                        <FormControl fullWidth >
                            <form autoComplete="off" onSubmit={(event) => { event.preventDefault() }}>
                                {fichas.map((ficha, index) => (
<<<<<<< HEAD
                                    <Grid container spacing={2}>
                                        {/* ------------------------INICIO DADOS PESSOAIS------------------------------ */}

=======
                                    <Grid container spacing={2} key={index}>
                                        {/* ------------------------INICIO DADOS PESSOAIS------------------------------ */}
>>>>>>> refactor-login
                                        <Grid item lg={3} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Gênero" sx={{ width: '100%' }} value={ficha.paciente.genero} onChange={(event) => setInput(event, 'genero')}></TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Idade" sx={{ width: '100%' }} value={ficha.idade} onChange={(event) => setInput(event, 'idade')}></TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Estado civíl" sx={{ width: '100%' }} value={ficha.estadoCivil} onChange={(event) => setInput(event, 'estadoCivil')}></TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Profissão" sx={{ width: '100%' }} value={ficha.profissao} onChange={(event) => setInput(event, 'profissao')}></TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Posição que trabalha" sx={{ width: '100%' }} value={ficha.posicaoTrabalho} onChange={(event) => setInput(event, 'posicaoTrabalho')}></TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Estatura" sx={{ width: '100%' }} value={ficha.estatura} onChange={(event) => setInput(event, 'estatura')}></TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Peso" sx={{ width: '100%' }} value={ficha.peso} onChange={(event) => setInput(event, 'peso')}></TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Hábito alimentar" sx={{ width: '100%' }} value={ficha.habitoAlimentar} onChange={(event) => setInput(event, 'habitoAlimentar')}></TextField>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Medicamento de uso contínuo" sx={{ width: '100%' }} value={ficha.medicamentoContinuo} onChange={(event) => setInput(event, 'medicamentoContinuo')}></TextField>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Tipo de calçado que mais usa" sx={{ width: '100%' }} value={ficha.tipoCalcado} onChange={(event) => setInput(event, 'tipoCalcado')}></TextField>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Tipo de meia que mais usa" sx={{ width: '100%' }} value={ficha.tipoMeia} onChange={(event) => setInput(event, 'tipoMeia')}></TextField>
                                        </Grid>
                                        <Grid item lg={2} md={4} sm={6} xs={12} >
<<<<<<< HEAD
                                            <FormControlLabel required control={<Checkbox checked={ficha.praticaEsporte == 1} value={ficha.praticaEsporte} />} label="Pratica esporte" />
                                        </Grid>
                                        <Grid item lg={2} md={4} sm={6} xs={12} >
                                                <FormControlLabel required control={<Checkbox checked={ficha.gestante == 1} value={ficha.gestante} />} label="Gestante" />
                                        </Grid>
                                        <Grid item lg={2} md={4} sm={6} xs={12} >
                                            <FormControlLabel required control={<Checkbox checked={ficha.lactante == 1} value={ficha.lactante} />} label="Lactante" />
=======
                                            <FormControlLabel required control={<Checkbox checked={ficha.praticaEsporte} value={ficha.praticaEsporte} />} label="Pratica esporte" />
                                        </Grid>
                                        <Grid item lg={2} md={4} sm={6} xs={12} >
                                            <FormControlLabel required control={<Checkbox checked={ficha.gestante} value={ficha.gestante} />} label="Gestante" />
                                        </Grid>
                                        <Grid item lg={2} md={4} sm={6} xs={12} >
                                            <FormControlLabel required control={<Checkbox checked={ficha.lactante} value={ficha.lactante} />} label="Lactante" />
>>>>>>> refactor-login
                                        </Grid>
                                        {/* ------------------------FIM DADOS PESSOAIS------------------------------ */}

                                        {/* ------------------------INICIO HISTORICO MEDICO------------------------------ */}
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <Divider style={{ margin: '1em 0', color: 'gray' }} ></Divider>
                                            <h3>Prontuário Médico</h3>
<<<<<<< HEAD

                                        </Grid>

=======
                                        </Grid>
>>>>>>> refactor-login
                                        <Grid item lg={4} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Tipo sanguíneo" sx={{ width: '100%' }} value={ficha.tipagemSanguinea} onChange={(event) => setInput(event, 'tipagemSanguinea')}></TextField>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Doenças preexistente" sx={{ width: '100%' }} value={ficha.doencasPreExistentes} onChange={(event) => setInput(event, 'doencasPreExistentes')}></TextField>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Tratamentos podológicos" sx={{ width: '100%' }} value={ficha.tratamentoPodologico} onChange={(event) => setInput(event, 'tratamentoPodologico')}></TextField>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Cirurgia em membros inferiores" sx={{ width: '100%' }} value={ficha.cirurgiaInferiores} onChange={(event) => setInput(event, 'cirurgiaInferiores')}></TextField>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Possui alergias" sx={{ width: '100%' }} value={ficha.possuiAlergia} onChange={(event) => setInput(event, 'possuiAlergia')}></TextField>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Amputações" sx={{ width: '100%' }} value={ficha.amputacoes} onChange={(event) => setInput(event, 'amputacoes')}></TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Escala de dor" sx={{ width: '100%' }} value={ficha.escalaDeDor} onChange={(event) => setInput(event, 'escalaDeDor')}></TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Pinos e/ou marcapasso" sx={{ width: '100%' }} value={ficha.pinosMarcapasso} onChange={(event) => setInput(event, 'pinosMarcapasso')}></TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Pressão arterial" sx={{ width: '100%' }} value={ficha.pressaoArterial} onChange={(event) => setInput(event, 'pressaoArterial')}></TextField>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={12} xs={12} >
                                            <TextField margin="none" label="Glicemia" sx={{ width: '100%' }} value={ficha.glicemia} onChange={(event) => setInput(event, 'glicemia')}></TextField>
                                        </Grid>
                                        <Grid item lg={2} md={4} sm={6} xs={12} >
<<<<<<< HEAD
                                            <FormControlLabel required control={<Checkbox checked={ficha.etilista == 1} value={ficha.etilista} />} label="Etilista" />
                                        </Grid>
                                        <Grid item lg={2} md={4} sm={6} xs={12} >
                                            <FormControlLabel required control={<Checkbox checked={ficha.tabagista == 1} value={ficha.tabagista} />} label="Tabagista" />
                                        </Grid>

                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <Divider style={{ margin: '1em 0', color: 'gray' }} ></Divider>
                                        </Grid>

=======
                                            <FormControlLabel required control={<Checkbox checked={ficha.etilista} value={ficha.etilista} />} label="Etilista" />
                                        </Grid>
                                        <Grid item lg={2} md={4} sm={6} xs={12} >
                                            <FormControlLabel required control={<Checkbox checked={ficha.tabagista} value={ficha.tabagista} />} label="Tabagista" />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <Divider style={{ margin: '1em 0', color: 'gray' }} ></Divider>
                                        </Grid>
>>>>>>> refactor-login
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                                <h3>Pé Esquerdo</h3>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
<<<<<<< HEAD
                                                    <TextField margin="none" label="Perfusões pé esquerdo" sx={{ width: '100%' }} value={ficha.perfusoesPe} onChange={(event) => setInput(event, 'perfusoesPe')}></TextField>
                                                </Grid>
                                                {/* <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                    <TextField margin="none" label="Digito de pressão pé esquerdo" sx={{ width: '100%' }} value={ficha.digitoPressaoPE} onChange={(event) => setInput(event, 'digitoPressaoPE')}></TextField>
                                                </Grid> */}
=======
                                                    <TextField margin="none" label="Perfusões pé esquerdo" sx={{ width: '100%' }} value={ficha.perfusoesPE} onChange={(event) => setInput(event, 'perfusoesPE')}></TextField>
                                                </Grid>
>>>>>>> refactor-login
                                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                    <TextField margin="none" label="Formato unhas pé esquerdo" sx={{ width: '100%' }} value={ficha.formatoUnhasPE} onChange={(event) => setInput(event, 'formatoUnhasPE')}></TextField>
                                                </Grid>
                                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                    <TextField margin="none" label="Formato pé esquerdo" sx={{ width: '100%' }} value={ficha.formatoPePE} onChange={(event) => setInput(event, 'formatoPePE')}></TextField>
                                                </Grid>
                                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                    <TextField margin="none" label="Teste monofilamento pé esquerdo" sx={{ width: '100%' }} value={ficha.testeMonofilamentoPE} onChange={(event) => setInput(event, 'testeMonofilamentoPE')}></TextField>
                                                </Grid>
                                            </Grid>
                                        </Grid>
<<<<<<< HEAD

=======
>>>>>>> refactor-login
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                                <h3>Pé Direito</h3>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
<<<<<<< HEAD
                                                    <TextField margin="none" label="Perfusões pé direito" sx={{ width: '100%' }} value={ficha.perfusoesPd} onChange={(event) => setInput(event, 'perfusoesPd')}></TextField>
                                                </Grid>
{/* 
                                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                    <TextField margin="none" label="Digito de pressão pé direito" sx={{ width: '100%' }} value={ficha.digitoPressaoPD} onChange={(event) => setInput(event, 'digitoPressaoPD')}></TextField>
                                                </Grid> */}

=======
                                                    <TextField margin="none" label="Perfusões pé direito" sx={{ width: '100%' }} value={ficha.perfusoesPD} onChange={(event) => setInput(event, 'perfusoesPD')}></TextField>
                                                </Grid>
>>>>>>> refactor-login
                                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                    <TextField margin="none" label="Formato unhas pé direito" sx={{ width: '100%' }} value={ficha.formatoUnhasPD} onChange={(event) => setInput(event, 'formatoUnhasPD')}></TextField>
                                                </Grid>

                                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                    <TextField margin="none" label="Formato pé direito" sx={{ width: '100%' }} value={ficha.formatoPePD} onChange={(event) => setInput(event, 'formatoPePD')}></TextField>
                                                </Grid>

                                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                    <TextField margin="none" label="Teste monofilamento pé direito" sx={{ width: '100%' }} value={ficha.testeMonofilamentoPD} onChange={(event) => setInput(event, 'testeMonofilamentoPD')}></TextField>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        {/* ------------------------FIM HISTORICO MEDICO------------------------------ */}
<<<<<<< HEAD


                                    </Grid>
                                ))}
                                <Grid container spacing={2}  >
                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                        {/* <Button style={{ border: '1px solid #1976d2' }} onClick={salvarAnamnese}>Cadastrar</Button> */}
                                    </Grid>

                                </Grid>
=======
                                    </Grid>
                                ))}
>>>>>>> refactor-login
                            </form>
                        </FormControl>
                    </Box>
                    <Divider sx={{ margin: '1em 0' }} />
                </Typography>
            </Box>
        </Modal>
    )
}
export default ModalVerFicha