import { Box, Divider, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import { GetItemLocalStorage } from "../../helper/localStorage";
import ModalEditarPodologo from "../modal/edicao/modalEditarPodologo";
import ModalDelete from "../modal/delete/modalDelete";
import InputPesquisar from "../pesquisar";
import ModalPodologo from "../modal/modalPodologo";

const TabelaPodologo = () => {

    function procuraParametro() {
        const urlParams = new URLSearchParams(window.location.href)
        let filtros = '?' 
        urlParams.forEach((value, key) => {
            console.log(`Parâmetro '${key}':`);
            if (value) {
                console.log(`Valor: ${value}`);
                filtros = filtros + `&${key}=${value}`
                // Faça algo com o valor se ele existir
            } else {
                console.log(`Este parâmetro não possui um valor.`);
                // Faça algo se o valor não existir
            }
        });
        return filtros
    }

    const [podologos, setPodologos] = useState<any[]>([]);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // INICIO GET DE PODOLOGO
    useEffect(() => {
        const filtro = procuraParametro()
        fetchPodologo(filtro);
    }, []);

    function fetchPodologo(filtro: any) {
        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch("https://api-pi-senac.azurewebsites.net/podologo" + filtro, requestOptions)
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

    // Funções para abrir e fechar o modal de edição
    const EditOpen = (id: number) => {
        setSelectedId(id);
        setOpenEdit(true);
    };

    const EditClose = () => {
        setOpenEdit(false);
        setSelectedId(null);
    };

    // Funções para abrir e fechar o modal de exclusão
    const DeleteOpen = (id: number) => {
        setSelectedId(id);
        setOpenDelete(true);
    };

    const DeleteClose = () => {
        setOpenDelete(false);
        setSelectedId(null);
    };

    return (
        <>
            <Grid container spacing={2}>
                <ModalPodologo />
                <InputPesquisar />
            </Grid>
            <Divider style={{ margin: '1em 0' }} />
            <Box sx={{ overflow: "auto" }}>
                <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                    <Table>
                        <TableHead style={{ backgroundColor: '#f2f2f2' }}>
                            <TableRow>
                                <TableCell className="tableCell">Nome</TableCell>
                                <TableCell>CPF</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Data de Nascimento</TableCell>
                                <TableCell>Gênero</TableCell>
                                <TableCell>Endereço</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {podologos.map((podologo) => (
                                <TableRow key={podologo.id}>
                                    <TableCell className="tableCell" component="th" scope="row">{podologo.nomeCompleto}</TableCell>
                                    <TableCell>{podologo.cpf}</TableCell>
                                    <TableCell>{podologo.email}</TableCell>
                                    <TableCell>{podologo.telefone}</TableCell>
                                    <TableCell>{new Date(podologo.dataNascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
                                    <TableCell>{podologo.genero}</TableCell>
                                    <TableCell>{podologo.bairro}, {podologo.rua}, {podologo.numero}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => EditOpen(podologo.id)}><BorderColorIcon /></IconButton>
                                        <IconButton color="error" onClick={() => DeleteOpen(podologo.id)}><DeleteForeverIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                {selectedId !== null && (
                    <>
                        <ModalEditarPodologo openFicha={openEdit} fichaClose={EditClose} id={selectedId} />
                        <ModalDelete openFicha={openDelete} fichaClose={DeleteClose} id={selectedId} tabela="podologo" />
                    </>
                )}
            </Box>
        </>
    )
}

export default TabelaPodologo;
