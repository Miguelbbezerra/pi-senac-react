import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import PostAddIcon from '@mui/icons-material/PostAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import { GetItemLocalStorage } from "../../helper/localStorage";
import ModalEditarAgendamento from "../modal/edicao/modalEditarAgendamento";
import ModalVerFicha from "../modal/ficha/modalVerFicha";

const TabelaAgendamento = () => {

    //GET NA API DE DAS TABELAS ABAIXO
    useEffect(() => {
        fetchAgendamento();
    }, []);
    //GET NA API DE DAS TABELAS FIM    

    // GET DE AGENADAMENTO
    const [agendamentos, setAgendamento] = useState<any[]>([]);

    function fetchAgendamento() {

        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch("http://localhost:5000/agendamento", requestOptions)
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

    // OPEN EDITAR
    const [openEdit, setOpenEdit] = useState<boolean>(false);

    const EditOpen = () => {
        setOpenEdit(true);
    };

    const EditClose = () => {
        setOpenEdit(false);
    };
    // OPEN EDITAR

    // OPEN FICHA
    const [openAnamnese, setOpenAnamnese] = useState<boolean>(false);

    const AnamneseOpen = () => {
        setOpenAnamnese(true);
    };

    const AnamneseClose = () => {
        setOpenAnamnese(false);
    };
    // OPEN FICHA



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
                                <TableCell component="th" scope="row">{agendamento.paciente.nome}</TableCell>
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
                                        <IconButton color="secondary" onClick={AnamneseOpen}>
                                            <PostAddIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton color="secondary" onClick={() => window.location.href = `/admin/ficha/?ida=${agendamento.id}&idpa=${agendamento.paciente}&idpo=${agendamento.podologo}`}>
                                            <PostAddIcon />
                                        </IconButton>
                                    )}

                                    <IconButton color="primary" onClick={EditOpen}><BorderColorIcon /></IconButton>
                                    <IconButton color="error"><DeleteForeverIcon /></IconButton>
                                </TableCell>
                                <ModalEditarAgendamento openFicha={openEdit} fichaClose={EditClose} id={agendamento.id} />
                                <ModalVerFicha openFicha={openAnamnese} fichaClose={AnamneseClose} id_ficha={agendamento.anamnese.id} />
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}
export default TabelaAgendamento