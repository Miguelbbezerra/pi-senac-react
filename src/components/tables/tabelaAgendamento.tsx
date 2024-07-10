import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import PostAddIcon from '@mui/icons-material/PostAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import { GetItemLocalStorage } from "../../helper/localStorage";
import ModalEditarAgendamento from "../../components/modal/edicao/modalEditarAgendamento";
import ModalVerFicha from "../../components/modal/ficha/modalVerFicha";
import ModalDelete from "../../components/modal/delete/modalDelete";

const TabelaAgendamento = () => {

    function procuraParametro() {
        const urlParams = new URLSearchParams(window.location.search)
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
        console.log('filtros agora: ' + filtros)
        return filtros
    }

    //GET NA API DE DAS TABELAS ABAIXO
    useEffect(() => {
        const filtro = procuraParametro()
        fetchAgendamento(filtro);
    }, []);
    //GET NA API DE DAS TABELAS FIM    

    // GET DE AGENADAMENTO
    const [agendamentos, setAgendamento] = useState<any[]>([]);

    function fetchAgendamento(filtro: any) {

        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch("https://api-pi-senac.azurewebsites.net/agendamento" + filtro, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em listar os Agendamento');
                }
                return response.json();
            })
            .then((data) => {
                // console.log(data)
                setAgendamento(data);
            })
            .catch((error) => console.error(error));
    }
    // GET DE AGENADAMENTO

    // OPEN FICHA
    const [openAnamnese, setOpenAnamnese] = useState<boolean>(false);

    const [selectedIdAnamnese, setSelectedIdAnamnese] = useState<number | null>(null);

    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const AnamneseOpen = (id: number) => {
        setSelectedIdAnamnese(id)
        setOpenAnamnese(true)
    }

    const AnamneseClose = () => {
        setSelectedIdAnamnese(null)
        setOpenAnamnese(false)
    }

    // OPEN FICHA

    // OPEN MODAL DELETE
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
        <Box sx={{ overflow: "auto" }}>
            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                <Table>
                    <TableHead style={{ backgroundColor: '#f2f2f2' }}>
                        <TableRow>
                            <TableCell>Paciente</TableCell>
                            <TableCell>Podólogo (a)</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Hora</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Situação</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {agendamentos.map((agendamento, index) => (
                            <TableRow id={agendamento.id} key={index} sx={{ '&:last-child td, &:last-child th': { border: '0' } }}>
                                <TableCell component="th" scope="row">{agendamento.paciente.nomeCompleto}</TableCell>
                                <TableCell>{agendamento.podologo.nomeCompleto}</TableCell>
                                <TableCell>
                                    {new Date(agendamento.dataHora).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                </TableCell>
                                <TableCell>
                                    {new Date(agendamento.dataHora).toLocaleTimeString()}
                                </TableCell>
                                <TableCell>{agendamento.descricao}</TableCell>
                                <TableCell>{agendamento.situacao}</TableCell>
                                <TableCell>
                                    {agendamento.anamnese !== null && agendamento.anamnese !== undefined ? (
                                        <IconButton color="secondary" onClick={() => AnamneseOpen(agendamento.anamnese.id)}>
                                            <PostAddIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton color="secondary" onClick={() => window.location.href = `/admin/ficha/?ida=${agendamento}&idpa=${agendamento.paciente}&idpo=${agendamento.podologo}`}>
                                            <PostAddIcon />
                                        </IconButton>
                                    )}

                                    <IconButton color="primary" onClick={() => EditOpen(agendamento.id)}><BorderColorIcon /></IconButton>
                                    <IconButton color="error" onClick={() => DeleteOpen(agendamento.id)}><DeleteForeverIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {selectedIdAnamnese !== null && (
                            <ModalVerFicha openFicha={openAnamnese} fichaClose={AnamneseClose} id_ficha={selectedIdAnamnese} />
                        )}

                        {selectedId !== null && (
                            <>
                                <ModalEditarAgendamento openFicha={openEdit} fichaClose={EditClose} id={selectedId} />
                                <ModalDelete openFicha={openDelete} fichaClose={DeleteClose} id={selectedId} tabela="agendamento" />
                            </>
                        )}



                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}
export default TabelaAgendamento