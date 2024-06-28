import { Box, Button, Divider, Grid, InputAdornment, Modal, TextField, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CPFMaskInput, GeneroMaskInput, LettersMaskInput } from "@/components/mask/MaskInput";

interface FormFiltro {
    nomeCompleto: string;
    cpf: string;
    cidade: string;
    genero: string;
    idade: string;
}

const InputPesquisarPaciente = () => {

    const style = {
        modal: {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        },
        input: {
            width: '100%',
            margin: '0 0.2em'
        },
        botao: {
            border: '1px solid #1976d2',
            position: 'fixed',
            right: 10,
            bottom: 10
        }
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        pesquisa: ""
    })


    const setInput = (event: any, key: string) => {

        const value = event.target.value
        const newFormData = Object.assign({}, formData, { [key]: value })

        setFormData(newFormData)
    }

    function hasLetter(str: any) {
        return /[a-zA-Z]/.test(str);
    }

    function hasNumber(str: any) {
        return /\d/.test(str);
    }

    function formatCPF(cpf: any) {
        // Remove qualquer caractere que não seja número
        cpf = cpf.replace(/\D/g, '');

        // Formata a sequência de números no padrão CPF
        if (cpf.length === 11) {
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }

        // Retorna a sequência original se não tiver 11 dígitos
        return cpf;
    }

    function pesquisar() {
        const containsLetter = hasLetter(formData.pesquisa);
        const containsNumber = hasNumber(formData.pesquisa);

        if (containsLetter && containsNumber) {
            window.alert('Pesquisa inválida!');
        } else if (containsLetter) {
            window.location.href = '?&nomeCompleto=' + formData.pesquisa;
        } else if (containsNumber) {
            if (formData.pesquisa.length === 11) {
                const cpfFormatado = formatCPF(formData.pesquisa)
                window.location.href = '?&cpf=' + cpfFormatado;
            } else {
                window.alert('CPF Inválido!');
            }
        } else {
            window.alert('Pesquisa inválida!');
        }
    }

    const [formFiltro, setFormFiltro] = useState<FormFiltro>({
        nomeCompleto: "",
        cpf: "",
        cidade: "",
        genero: "",
        idade: ""
    });


    const setFiltro = (event: any, key: string) => {

        const value = event.target.value
        const newFormFiltro = Object.assign({}, formFiltro, { [key]: value })

        setFormFiltro(newFormFiltro)
    }


    const handleFiltro = () => {
        let url = ''
        for (let chave in formFiltro) {
            const valor = formFiltro[chave as keyof FormFiltro];
            if (formFiltro[chave as keyof FormFiltro] === '' || formFiltro[chave as keyof FormFiltro] === null || formFiltro[chave as keyof FormFiltro] === undefined || (Array.isArray(formFiltro[chave as keyof FormFiltro]) && formFiltro[chave as keyof FormFiltro].length === 0)) {
                console.log(`${chave} está vazio`);
                // Faz algo se estiver vazio
            } else {
                console.log(`${chave} não está vazio`);
                url = url + `&${chave}=${valor}`
            }
        }
        console.log(url);
        window.location.href = `?${url}`
    };

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const urlParams = query.toString();

    return (
        <Grid item xs={12} sm={12} md={6} lg={6}>
            <form autoComplete="off" onSubmit={(event) => { event.preventDefault() }}>
                <TextField
                    sx={{ width: '100%', height: '100%' }}
                    variant="outlined"
                    value={formData.pesquisa}
                    onChange={(event) => setInput(event, 'pesquisa')}
                    placeholder="Pesquisar Nome ou CPF"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Button type="button" onClick={pesquisar}>
                                    <SearchIcon />
                                </Button>
                                {/* <p>Pesquisar Nome ou CPF</p> */}
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {urlParams !== '' && (
                                    <Button type="button" color="error" onClick={() => {
                                        window.location.href = '/admin/paciente'
                                    }}>
                                        <p>Cancelar Filtros</p>
                                    </Button>
                                )}
                                <Button type="button" onClick={handleOpen}>
                                    <p>Mais Filtros</p>
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.modal}>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Filtros
                            </Typography>
                            <Divider sx={{ margin: '1em 0' }} />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField label="Nome Completo" variant="outlined" type="text" sx={style.input} value={formFiltro.nomeCompleto} onChange={(event) => setFiltro(event, 'nomeCompleto')} InputProps={{ inputComponent: LettersMaskInput as any }}></TextField>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField label="CPF" variant="outlined" type="text" sx={style.input} value={formFiltro.cpf} onChange={(event) => setFiltro(event, 'cpf')} InputProps={{ inputComponent: CPFMaskInput as any }}></TextField>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField label="Cidade" variant="outlined" type="text" sx={style.input} value={formFiltro.cidade} onChange={(event) => setFiltro(event, 'cidade')} InputProps={{ inputComponent: LettersMaskInput as any }}></TextField>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField label="Gênero" variant="outlined" type="text" sx={style.input} value={formFiltro.genero} onChange={(event) => setFiltro(event, 'genero')} InputProps={{ inputComponent: GeneroMaskInput as any }}></TextField>
                        </Grid>
                        {/* <Grid item lg={4} md={6} sm={12} xs={12}>
                            <TextField label="Idade" variant="outlined" type="text" sx={style.input} value={formFiltro.idade} onChange={(event) => setFiltro(event, 'idade')}></TextField>
                        </Grid> */}
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Divider sx={{ margin: '1em 0' }} />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Button sx={style.botao} type="button" onClick={handleFiltro}>Aplicar Filtros</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>


        </Grid>
    )
}
export default InputPesquisarPaciente