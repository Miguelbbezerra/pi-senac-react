import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import ModalEditarPaciente from "../modal/edicao/modalEditarPaciente";
import ModalDelete from "../modal/delete/modalDelete";
import api from "../../helper/http";


const TabelaPaciente = () => {
    const [pacientes, setPacientes] = useState<any[]>([]);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    function procuraParametro() {
        const urlParams = new URLSearchParams(window.location.href)
        let filtros = '?'
        urlParams.forEach((value, key) => {
            console.log(`Parâmetro '${key}':`);
            if (value) {
                console.log(`Valor: ${value}`);
                filtros = filtros + `&${key}=${value}`
                return filtros
            } else {
                console.log(`Este parâmetro não possui um valor.`);
                return false
            }
        });

    }

    useEffect(() => {
        async function fetchData() {
            try {
                const filtro = await procuraParametro()
                const data = await fetchPacientes(filtro);
                setPacientes(data)
            } catch (error) {
                console.error("Erro no fetch de dados", error)
            }
        }
        fetchData()
    }, []);

    async function fetchPacientes(filtro: any) {
        const response = await api.get('paciente', filtro && {params: {filtro}});
        return response.data;
    }

    const EditOpen = (id: number) => {
        setSelectedId(id);
        setOpenEdit(true);
    };
    const EditClose = () => {
        setOpenEdit(false);
        setSelectedId(null);
    };
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
                    <TableHead sx={{ backgroundColor: '#f2f2f2' }}>
                        <TableRow>
                            <TableCell>Nome</TableCell>
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
                        {pacientes.map((paciente, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{paciente.nomeCompleto}</TableCell>
                                <TableCell>{paciente.cpf}</TableCell>
                                <TableCell>{paciente.email}</TableCell>
                                <TableCell>{paciente.telefone}</TableCell>
                                <TableCell>{new Date(paciente.dataNascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
                                <TableCell>{paciente.genero}</TableCell>
                                <TableCell>{paciente.bairro}, {paciente.rua}, {paciente.numero}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => EditOpen(paciente.id)}><BorderColorIcon /></IconButton>
                                    <IconButton color="error" onClick={() => DeleteOpen(paciente.id)}><DeleteForeverIcon /></IconButton>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            {selectedId !== null && (
                <>
                    <ModalEditarPaciente openFicha={openEdit} fichaClose={EditClose} id={selectedId} />
                    <ModalDelete openFicha={openDelete} fichaClose={DeleteClose} id={selectedId} tabela="paciente" />
                </>
            )}
        </Box>
    )
}
export default TabelaPaciente