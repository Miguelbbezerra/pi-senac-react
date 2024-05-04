import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import { GetItemLocalStorage } from "../../helper/localStorage";
import ModalEditarPodologo from "../modal/edicao/modalEditarPodologo";



const TabelaPodologo = () => {

    // INICIO GET DE PODOLOGO

    const [podologo, setPodologo] = useState<any[]>([]);

    useEffect(() => {
        fetchPodologo();
    }, []);


    function fetchPodologo() {

        const myHeaders = new Headers();
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch("http://localhost:5000/podologo", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Falha em listar os Podologo');
                }
                return response.json();
            })
            .then((data) => {
                setPodologo(data);
            })
            .catch((error) => console.error(error));
    }
    // FIM GET DE PODOLOGO

    const [openEdit, setOpenEdit] = useState<boolean>(false);

    const EditOpen = () => {
        setOpenEdit(true);
    };

    const EditClose = () => {
        setOpenEdit(false);
    };

    return (
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
                        {podologo.map((podologo, index) => (
                            <TableRow key={podologo.id}>
                                <TableCell className="tableCell" component="th" scope="row">{podologo.nomeCompleto}</TableCell>
                                <TableCell>{podologo.cpf}</TableCell>
                                <TableCell>{podologo.email}</TableCell>
                                <TableCell>{podologo.telefone}</TableCell>
                                <TableCell>{new Date(podologo.dataNascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
                                <TableCell>{podologo.genero}</TableCell>
                                <TableCell>{podologo.endereco}</TableCell>
                                <TableCell >
                                    <IconButton color="primary" onClick={EditOpen}><BorderColorIcon /></IconButton>
                                    <IconButton color="error"><DeleteForeverIcon /></IconButton>
                                </TableCell>
                                <ModalEditarPodologo openFicha={openEdit} fichaClose={EditClose} id={podologo.id} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}
export default TabelaPodologo