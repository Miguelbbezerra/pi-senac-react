import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import { GetItemLocalStorage } from "../../helper/localStorage";
import ModalEditarPaciente from "../../components/modal/edicao/modalEditarPaciente";
import ModalDelete from "../../components/modal/delete/modalDelete";


const TabelaPaciente = () => {

    // INICIO GET DE PACIENTES

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

    const [pacientes, setPacientes] = useState<any[]>([]);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        const filtro = procuraParametro()
        fetchPacientes(filtro);
    }, []);


    function fetchPacientes(filtro: any) {

        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch(`https://api-pi-senac.azurewebsites.net/paciente` + filtro, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em listar os Pacientes');
                }
                return response.json();
            })
            .then((data) => {
                setPacientes(data);
            })
            .catch((error) => console.error(error));
    }

    // FIM GET DE PACIENTES

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