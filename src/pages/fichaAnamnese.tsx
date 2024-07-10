import { useCallback, useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Checkbox, Divider, FormControl, FormControlLabel, TextField } from '@mui/material';
import { PostAdd } from '@mui/icons-material';
import { GetItemLocalStorage } from "../helper/localStorage";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function FichaAnamnese() {



    // GET DE AGENADAMENTO
    const [agendamentos, setAgendamento] = useState<any[]>([]);

    const fetchAgendamento = useCallback(() => {
        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        // Obtém a query string da URL atual
        const queryString = window.location.search;

        // Cria um objeto para armazenar os parâmetros
        const params = new URLSearchParams(queryString);

        // Obtém o valor de um parâmetro específico
        const id_agendamento = params.get('ida');
        console.log(id_agendamento)


        fetch(`https://api-pi-senac.azurewebsites.net/agendamento/?id=${id_agendamento}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em listar os Agendamento');
                }
                return response.json();
            })
            .then((data) => {
                setAgendamento(data);
            })
            .catch((error) => console.error(error));
    }, [])
    // GET DE AGENADAMENTO

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
        perfusoesPE: "",
        perfusoesPD: "",
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

    // TRATANDO DADOS DO FORM DA FICHA


    const [fetchExecutado, setFetchExecutado] = useState(false);
    //GET NA API DE DAS TABELAS ABAIXO    
    useEffect(() => {
        const fetchData = async () => {
            // Se o fetchAgendamento já foi executado ou se fetchExecutado for verdadeiro, não execute novamente
            if (!fetchExecutado) {
                await fetchAgendamento();
                setFetchExecutado(true); // Marcar que o fetchAgendamento foi executado
            }

            // Se houver agendamentos e não houver um valor definido para paciente no formData,
            // então defina o valor do primeiro paciente encontrado nos agendamentos
            if (agendamentos.length > 0 && !formData.paciente) {
                const selectedPaciente = agendamentos[0].paciente;
                const selectedPodologo = agendamentos[0].podologo.id;
                const selectedAgendamento = agendamentos[0].id;
                const birthDate = new Date(selectedPaciente.dataNascimento);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const month = today.getMonth() - birthDate.getMonth();
                if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                const nFormData = {
                    ...formData,
                    agendamento: selectedAgendamento,
                    podologo: selectedPodologo,
                    paciente: selectedPaciente.id,
                    genero: selectedPaciente.genero,
                    idade: age.toString()
                };

                setFormData(nFormData);
            }
        };

        fetchData();
    }, [fetchAgendamento, fetchExecutado, agendamentos, formData]);
    //GET NA API DE DAS TABELAS FIM  


    //SET DE anamnese

    function salvarAnamnese() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const intPacienteId = parseInt(formData.paciente);
        const intPodologoId = parseInt(formData.podologo);
        const intAgendamentoId = parseInt(formData.agendamento);
        const intDor = parseInt(formData.escalaDeDor);
        const intDigitoPressaoPE = parseInt(formData.digitoPressaoPE);
        const intDigitoPressaoPD = parseInt(formData.digitoPressaoPD);
        const intPerfusoesPE = parseInt(formData.perfusoesPE);
        const intPerfusoesPD = parseInt(formData.perfusoesPD);

        const { paciente, podologo, escalaDeDor, ...newFormData } = formData;

        const requestBody = {
            ...newFormData,
            escalaDeDor: intDor,
            digitoPressaoPE: intDigitoPressaoPE,
            digitoPressaoPD: intDigitoPressaoPD,
            perfusoesPe: intPerfusoesPE,
            perfusoesPd: intPerfusoesPD,
            paciente: intPacienteId,
            agendamento: intAgendamentoId,
            podologo: intPodologoId
        };

        const raw = JSON.stringify(requestBody)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        fetch("https://api-pi-senac.azurewebsites.net/anamnese", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                window.location.href = "/admin/agendamento";
            })
            .catch((error) => console.error(error));
    }

    //SET DE anamnese

    return (
        <Paper elevation={2} sx={{ padding: '1em' }}>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Link to="/admin/agendamento/"
                    style={{ display: "flex", alignItems: "center", flexDirection: 'row',
                        textDecoration: 'none', color: '#1976d2', 
                    }}>
                        <ArrowBackIcon/> Voltar
                    </Link>
                    <Divider style={{ margin: '1em 0', color: 'gray' }} ></Divider>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
                    <Box component="div" style={{ width: "100%", display: "flex", justifyContent: "stard" }}>
                        <h2><PostAdd /> Ficha de Anamnese</h2>
                    </Box>
                    <Box component="div" style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                        <FormControl fullWidth>

                            <label style={{ fontSize: "14px" }}>Podologo(a)</label>
                            <select
                                id="demo-simple-select"
                                value={formData.podologo}
                                // defaultValue={formData.podologo}
                                // input={podologos[0].id}
                                onChange={(event) => setInput(event, 'podologo')}
                                style={{
                                    width: '100%', height: "100%", borderRadius: "5px",
                                    border: '1px solid #c9c9c9', color: "#545454",
                                    fontSize: "16px", padding: '0.5em'
                                }}
                                // margin="none"
                                disabled
                            >
                                {agendamentos.map((agendamento) => (
                                    <option selected value={agendamento.podologo}>{agendamento.podologo.nomeCompleto}</option>
                                ))}
                            </select>
                        </FormControl>
                    </Box>
                    <Box component="div" style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                        <FormControl fullWidth>

                            <label style={{ fontSize: "14px" }}>Agendamento</label>
                            <select
                                id="demo-simple-select"
                                value={formData.agendamento}
                                onChange={(event) => setInput(event, 'agendamento')}
                                style={{
                                    width: '100%', height: "100%", borderRadius: "5px",
                                    border: '1px solid #c9c9c9', color: "#545454",
                                    fontSize: "16px", padding: '0.5em'
                                }}
                                disabled
                            >
                                {agendamentos.map((agendamento) => (
                                    <option selected value={agendamento.id}>{new Date(agendamento.dataHora).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}, {new Date(agendamento.dataHora).toLocaleTimeString()}</option>
                                ))}
                            </select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>

                    <Divider style={{ margin: '0 0 2em 0', color: 'gray' }} ></Divider>
                    <h2 style={{ margin: '0 0 1em 0' }}>Dados Pessoais</h2>
                </Grid>
            </Grid>
            <Box sx={{ flexGrow: 1 }} >
                <FormControl fullWidth >
                    <form autoComplete="off" onSubmit={(event) => { event.preventDefault() }}>
                        <Grid container spacing={2}>
                            {/* ------------------------INICIO DADOS PESSOAIS------------------------------ */}

                            <Grid item lg={3} md={6} sm={12} xs={12} >
                                {/* <label style={{ fontSize: "14px" }}>Paciente</label> */}
                                <select
                                    id="demo-simple-select"
                                    value={formData.paciente}
                                    onChange={(event) => setInput(event, 'paciente')}
                                    style={{
                                        width: '100%', height: "100%", borderRadius: "5px",
                                        border: '1px solid #c9c9c9', color: "#545454",
                                        fontSize: "16px", padding: '0.5em'
                                    }}
                                // disabled
                                >
                                    {agendamentos.map((agendamento) => (
                                        <option selected value={agendamento.paciente.id}>{agendamento.paciente.nomeCompleto}</option>
                                    ))}
                                </select>
                            </Grid>
                            <Grid item lg={3} md={6} sm={12} xs={12} >
                                <TextField disabled margin="none" label="Gênero" sx={{ width: '100%' }} value={formData.genero}></TextField>
                            </Grid>
                            <Grid item lg={3} md={6} sm={12} xs={12} >
                                <TextField margin="none" label="Idade" sx={{ width: '100%' }} value={formData.idade}></TextField>
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
                            <Grid item lg={3} md={6} sm={12} xs={12} >
                                <TextField margin="none" label="Medicamento de uso contínuo" sx={{ width: '100%' }} value={formData.medicamentoContinuo} onChange={(event) => setInput(event, 'medicamentoContinuo')}></TextField>
                            </Grid>
                            <Grid item lg={3} md={6} sm={12} xs={12} >
                                <TextField margin="none" label="Tipo de calçado que mais usa" sx={{ width: '100%' }} value={formData.tipoCalcado} onChange={(event) => setInput(event, 'tipoCalcado')}></TextField>
                            </Grid>
                            <Grid item lg={3} md={6} sm={12} xs={12} >
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
                                        <TextField margin="none" label="Perfusões pé esquerdo" sx={{ width: '100%' }} value={formData.perfusoesPE} onChange={(event) => setInput(event, 'perfusoesPe')}></TextField>
                                    </Grid>
                                    {/* <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                        <TextField margin="none" label="Digito de pressão pé esquerdo" sx={{ width: '100%' }} value={formData.digitoPressaoPE} onChange={(event) => setInput(event, 'digitoPressaoPE')}></TextField>
                                    </Grid> */}
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
                                        <TextField margin="none" label="Perfusões pé direito" sx={{ width: '100%' }} value={formData.perfusoesPD} onChange={(event) => setInput(event, 'perfusoesPd')}></TextField>
                                    </Grid>

                                    {/* <Grid item lg={12} md={12} sm={12} xs={12} sx={{ margin: "1em 0" }} >
                                        <TextField margin="none" label="Digito de pressão pé direito" sx={{ width: '100%' }} value={formData.digitoPressaoPD} onChange={(event) => setInput(event, 'digitoPressaoPD')}></TextField>
                                    </Grid> */}

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
                        <Divider style={{ margin: '1em 0', color: 'gray' }} ></Divider>
                        <Grid container spacing={2}  >
                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                <Button style={{ border: '1px solid #1976d2' }} onClick={salvarAnamnese}>Cadastrar</Button>
                            </Grid>

                        </Grid>
                    </form>
                </FormControl>
            </Box>
        </Paper>
    );
}