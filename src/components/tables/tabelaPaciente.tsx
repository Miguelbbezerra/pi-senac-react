import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import { GetItemLocalStorage } from "../../helper/localStorage";
import ModalEditarPaciente from "../modal/edicao/modalEditarPaciente";
import ModalDeletePaciente from "../modal/delete/modalDeletePaciente";


const TabelaPaciente = () => {

    // INICIO GET DE PACIENTES

    const [pacientes, setPacientes] = useState<any[]>([]);

    useEffect(() => {
        fetchPacientes();
    }, []);


    function fetchPacientes() {

        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch("http://localhost:5000/paciente", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em listar os Pacientes');
                }
                return response.json();
            })
            .then((data) => {
                // console.log(data)
                setPacientes(data);
            })
            .catch((error) => console.error(error));
    }

    // FIM GET DE PACIENTES

// OPEN MODAL EDIT
    const [openEdit, setOpenEdit] = useState<boolean>(false);

    const EditOpen = () => {
        setOpenEdit(true);
    };

    const EditClose = () => {
        setOpenEdit(false);
    };
// OPEN MODAL DELETE

    const [openDelete, setOpenDelete] = useState<boolean>(false);

    const DeleteOpen = () => {
        setOpenDelete(true);
    };

    const DeleteClose = () => {
        setOpenDelete(false);
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
                                <TableCell component="th" scope="row">{paciente.nome}</TableCell>
                                <TableCell>{paciente.cpf}</TableCell>
                                <TableCell>{paciente.email}</TableCell>
                                <TableCell>{paciente.telefone}</TableCell>
                                <TableCell>{new Date(paciente.dataNascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
                                <TableCell>{paciente.genero}</TableCell>
                                <TableCell>{paciente.endereco}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={EditOpen}><BorderColorIcon /></IconButton>
                                    <IconButton color="error" onClick={DeleteOpen}><DeleteForeverIcon /></IconButton>
                                </TableCell>
                                <ModalEditarPaciente openFicha={openEdit} fichaClose={EditClose} id={paciente.id} />
                                <ModalDeletePaciente openFicha={openDelete} fichaClose={DeleteClose} id={paciente.id} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}
export default TabelaPaciente