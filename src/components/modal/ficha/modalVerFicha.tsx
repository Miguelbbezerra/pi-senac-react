import { Box, Divider, Modal, Typography, Grid, TextField, FormControlLabel, Checkbox, FormControl, Button } from "@mui/material"
import { useEffect, useState } from "react";
import { GetItemLocalStorage } from "../../../helper/localStorage";

interface ModalEditarProps {
    openFicha: boolean;
    fichaClose: () => void;
    id: number;
}

const ModalVerFicha: React.FC<ModalEditarProps> = ({ openFicha, fichaClose, id }) => {


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
        perfusoesPe: "",
        perfusoesPd: "",
        digitoPressaoPE: "",
        digitoPressaoPD: "",
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

    // inicio GET

    const [fichas, setFichaState] = useState<any[]>([]);

    useEffect(() => {
        fetchFichaUnico(id).then((data: any) => {
            const ficha = data[0];
    
            const newFichaData = {
                ...formData,
                agendamento: ficha.agendamento,
                paciente: ficha.paciente,
                podologo: ficha.podologo,
                genero: ficha.genero,
                idade: ficha.idade,
                estadoCivil: ficha.estadoCivil,
                profissao: ficha.profissao,
                posicaoTrabalho: ficha.posicaoTrabalho,
                estatura: ficha.estatura,
                peso: ficha.peso,
                tipoCalcado: ficha.tipoCalcado,
                tipoMeia: ficha.tipoMeia,
                habitoAlimentar: ficha.habitoAlimentar,
                medicamentoContinuo: ficha.medicamentoContinuo,
                tipagemSanguinea: ficha.tipagemSanguinea,
                doencasPreExistentes: ficha.doencasPreExistentes,
                tratamentoPodologico: ficha.tratamentoPodologico,
                cirurgiaInferiores: ficha.cirurgiaInferiores,
                possuiAlergia: ficha.possuiAlergia,
                amputacoes: ficha.amputacoes,
                escalaDeDor: ficha.escalaDeDor,
                pinosMarcapasso: ficha.pinosMarcapasso,
                pressaoArterial: ficha.pressaoArterial,
                perfusoesPe: ficha.perfusoesPe,
                perfusoesPd: ficha.perfusoesPd,
                digitoPressaoPE: ficha.digitoPressaoPE,
                digitoPressaoPD: ficha.digitoPressaoPD,
                formatoUnhasPE: ficha.formatoUnhasPE,
                formatoUnhasPD: ficha.formatoUnhasPD,
                formatoPePE: ficha.formatoPePE,
                formatoPePD: ficha.formatoPePD,
                testeMonofilamentoPE: ficha.testeMonofilamentoPE,
                testeMonofilamentoPD: ficha.testeMonofilamentoPD,
                etilista: ficha.etilista,
                tabagista: ficha.tabagista,
                praticaEsporte: ficha.praticaEsporte,
                glicemia: ficha.glicemia,
                gestante: ficha.gestante,
                lactante: ficha.lactante
            };
    
            setFormData(newFichaData);
        }).catch((error) => {
            console.error(error);
        });
    }, [id]);
    


    function fetchFichaUnico(id: number) {
        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        // Retorna a Promise resultante da chamada fetch
        return fetch(`http://localhost:5000/anamnese/?id=${id}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em buscar o a ficha');
                }
                return response.json();
            })
            .then((data) => {
                setFichaState(data);
            })
            .catch((error) => {
                console.error(error);
                // Retorna um objeto vazio caso ocorra um erro para evitar que a Promise seja rejeitada sem motivo
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
        console.log('1')
        setFormData(newFormData)
    }


    // TRATANDO DADOS DO FORM DA FICHA

    return (
        <Modal
            // sx={{ overflowX: 'auto'}}
            open={openFicha}
            onClose={fichaClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <div>
                        <h4>Ficha Do(a) ''NOME PACIENTE''</h4>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Divider style={{ margin: '1em 0' }} />
                    <Box sx={{ flexGrow: 1 }} >
                        <FormControl fullWidth >
                            <form autoComplete="off" onSubmit={(event) => { event.preventDefault() }}>
                                <Grid container spacing={2}>
                                    {/* ------------------------INICIO DADOS PESSOAIS------------------------------ */}


                                    <Grid item lg={3} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Gênero" sx={{ width: '100%' }} value={formData.genero} onChange={(event) => setInput(event, 'genero')}></TextField>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Idade" sx={{ width: '100%' }} value={formData.idade} onChange={(event) => setInput(event, 'idade')}></TextField>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Estado civíl" sx={{ width: '100%' }} value={formData.estadoCivil} onChange={(event) => setInput(event, 'estadoCivil')}></TextField>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Profissão" sx={{ width: '100%' }} value={formData.profissao} onChange={(event) => setInput(event, 'profissao')}></TextField>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Posição que trabalha" sx={{ width: '100%' }} value={formData.posicaoTrabalho} onChange={(event) => setInput(event, 'posicaoTrabalho')}></TextField>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Estatura" sx={{ width: '100%' }} value={formData.estatura} onChange={(event) => setInput(event, 'estatura')}></TextField>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Peso" sx={{ width: '100%' }} value={formData.peso} onChange={(event) => setInput(event, 'peso')}></TextField>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Hábito alimentar" sx={{ width: '100%' }} value={formData.habitoAlimentar} onChange={(event) => setInput(event, 'habitoAlimentar')}></TextField>
                                    </Grid>
                                    <Grid item lg={4} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Medicamento de uso contínuo" sx={{ width: '100%' }} value={formData.medicamentoContinuo} onChange={(event) => setInput(event, 'medicamentoContinuo')}></TextField>
                                    </Grid>
                                    <Grid item lg={4} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Tipo de calçado que mais usa" sx={{ width: '100%' }} value={formData.tipoCalcado} onChange={(event) => setInput(event, 'tipoCalcado')}></TextField>
                                    </Grid>
                                    <Grid item lg={4} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Tipo de meia que mais usa" sx={{ width: '100%' }} value={formData.tipoMeia} onChange={(event) => setInput(event, 'tipoMeia')}></TextField>
                                    </Grid>
                                    <Grid item lg={2} md={4} sm={6} xs={12} >
                                        <FormControlLabel required control={<Checkbox value={formData.praticaEsporte} onChange={(event) => setInput(event, 'praticaEsporte')} />} label="Pratica esporte" />
                                    </Grid>
                                    <Grid item lg={2} md={4} sm={6} xs={12} >
                                        <FormControlLabel required control={<Checkbox value={formData.gestante} onChange={(event) => setInput(event, 'gestante')} />} label="Gestante" />
                                    </Grid>
                                    <Grid item lg={2} md={4} sm={6} xs={12} >
                                        <FormControlLabel required control={<Checkbox value={formData.lactante} onChange={(event) => setInput(event, 'lactante')} />} label="Lactante" />
                                    </Grid>
                                    {/* ------------------------FIM DADOS PESSOAIS------------------------------ */}

                                    {/* ------------------------INICIO HISTORICO MEDICO------------------------------ */}
                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                        <Divider style={{ margin: '1em 0', color: 'gray' }} ></Divider>
                                        <h3>Prontuário Médico</h3>

                                    </Grid>

                                    <Grid item lg={4} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Tipo sanguíneo" sx={{ width: '100%' }} value={formData.tipagemSanguinea} onChange={(event) => setInput(event, 'tipagemSanguinea')}></TextField>
                                    </Grid>
                                    <Grid item lg={4} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Doenças preexistente" sx={{ width: '100%' }} value={formData.doencasPreExistentes} onChange={(event) => setInput(event, 'doencasPreExistentes')}></TextField>
                                    </Grid>
                                    <Grid item lg={4} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Tratamentos podológicos" sx={{ width: '100%' }} value={formData.tratamentoPodologico} onChange={(event) => setInput(event, 'tratamentoPodologico')}></TextField>
                                    </Grid>
                                    <Grid item lg={4} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Cirurgia em membros inferiores" sx={{ width: '100%' }} value={formData.cirurgiaInferiores} onChange={(event) => setInput(event, 'cirurgiaInferiores')}></TextField>
                                    </Grid>
                                    <Grid item lg={4} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Possui alergias" sx={{ width: '100%' }} value={formData.possuiAlergia} onChange={(event) => setInput(event, 'possuiAlergia')}></TextField>
                                    </Grid>
                                    <Grid item lg={4} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Amputações" sx={{ width: '100%' }} value={formData.amputacoes} onChange={(event) => setInput(event, 'amputacoes')}></TextField>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Escala de dor" sx={{ width: '100%' }} value={formData.escalaDeDor} onChange={(event) => setInput(event, 'escalaDeDor')}></TextField>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Pinos e/ou marcapasso" sx={{ width: '100%' }} value={formData.pinosMarcapasso} onChange={(event) => setInput(event, 'pinosMarcapasso')}></TextField>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Pressão arterial" sx={{ width: '100%' }} value={formData.pressaoArterial} onChange={(event) => setInput(event, 'pressaoArterial')}></TextField>
                                    </Grid>
                                    <Grid item lg={3} md={6} sm={12} xs={12} >
                                        <TextField margin="none" label="Glicemia" sx={{ width: '100%' }} value={formData.glicemia} onChange={(event) => setInput(event, 'glicemia')}></TextField>
                                    </Grid>
                                    <Grid item lg={2} md={4} sm={6} xs={12} >
                                        <FormControlLabel required control={<Checkbox value={formData.etilista} onChange={(event) => setInput(event, 'etilista')} />} label="Etilista" />
                                    </Grid>
                                    <Grid item lg={2} md={4} sm={6} xs={12} >
                                        <FormControlLabel required control={<Checkbox value={formData.tabagista} onChange={(event) => setInput(event, 'tabagista')} />} label="Tabagista" />
                                    </Grid>

                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                        <Divider style={{ margin: '1em 0', color: 'gray' }} ></Divider>
                                    </Grid>

                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <h3>Pé Esquerdo</h3>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                <TextField margin="none" label="Perfusões pé esquerdo" sx={{ width: '100%' }} value={formData.perfusoesPe} onChange={(event) => setInput(event, 'perfusoesPe')}></TextField>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                <TextField margin="none" label="Digito de pressão pé esquerdo" sx={{ width: '100%' }} value={formData.digitoPressaoPE} onChange={(event) => setInput(event, 'digitoPressaoPE')}></TextField>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                <TextField margin="none" label="Formato unhas pé esquerdo" sx={{ width: '100%' }} value={formData.formatoUnhasPE} onChange={(event) => setInput(event, 'formatoUnhasPE')}></TextField>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                <TextField margin="none" label="Formato pé esquerdo" sx={{ width: '100%' }} value={formData.formatoPePE} onChange={(event) => setInput(event, 'formatoPePE')}></TextField>
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                <TextField margin="none" label="Teste monofilamento pé esquerdo" sx={{ width: '100%' }} value={formData.testeMonofilamentoPE} onChange={(event) => setInput(event, 'testeMonofilamentoPE')}></TextField>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <h3>Pé Direito</h3>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                <TextField margin="none" label="Perfusões pé direito" sx={{ width: '100%' }} value={formData.perfusoesPd} onChange={(event) => setInput(event, 'perfusoesPd')}></TextField>
                                            </Grid>

                                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                <TextField margin="none" label="Digito de pressão pé direito" sx={{ width: '100%' }} value={formData.digitoPressaoPD} onChange={(event) => setInput(event, 'digitoPressaoPD')}></TextField>
                                            </Grid>

                                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                <TextField margin="none" label="Formato unhas pé direito" sx={{ width: '100%' }} value={formData.formatoUnhasPD} onChange={(event) => setInput(event, 'formatoUnhasPD')}></TextField>
                                            </Grid>

                                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                <TextField margin="none" label="Formato pé direito" sx={{ width: '100%' }} value={formData.formatoPePD} onChange={(event) => setInput(event, 'formatoPePD')}></TextField>
                                            </Grid>

                                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                                <TextField margin="none" label="Teste monofilamento pé direito" sx={{ width: '100%' }} value={formData.testeMonofilamentoPD} onChange={(event) => setInput(event, 'testeMonofilamentoPD')}></TextField>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {/* ------------------------FIM HISTORICO MEDICO------------------------------ */}


                                </Grid>
                                <Grid container spacing={2}  >
                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                        {/* <Button style={{ border: '1px solid #1976d2' }} onClick={salvarAnamnese}>Cadastrar</Button> */}
                                    </Grid>

                                </Grid>
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