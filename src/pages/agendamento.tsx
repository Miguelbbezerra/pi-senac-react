import { Box, Button, Divider, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useState } from "react";
import Paginacao from "../components/paginacao/paginacao";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const Agendamento = () => {


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '60%',
        bgcolor: 'background.paper',
        border: '2px solid #1976d2',
        borderRadius: '0.5em',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <>
            <Button style={{ border: '1px solid #1976d2' }} onClick={handleOpen}>Agendar</Button>
            <Button style={{ border: '1px solid #1976d2' }}><Link to='../ficha'>Ficha de Anamnese</Link></Button>
            <Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div>
                            <h4>Agendamento</h4>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <Divider style={{ margin: '1em 0' }} />
                            <form action="" method="POST">

                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', margin: '1em 0' }}>
                                        <TextField style={{ width: '100%' }} type="date" id="data" name="data" />
                                        <TextField style={{ width: '100%' }} type="time" id="hora" name="hora" />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', margin: '1em 0' }}>
                                        <TextField style={{ width: '100%' }}
                                            id="descricao outlined-multiline-static"
                                            label="Descrição"
                                            multiline
                                            rows={2}
                                        />
                                    </div>
                                </div>

                                <Divider style={{ margin: '1em 0' }} />

                                <Button style={{ border: '1px solid #1976d2' }} type="submit" id="submit-form">Enviar</Button>

                            </form>
                        </div>
                    </Typography>
                </Box>
            </Modal>
            <Divider style={{ margin: '1em 0' }} />
            <Box sx={{ overflow: "auto" }}>
                <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                    <Table>
                        <TableHead style={{ backgroundColor: '#f2f2f2' }}>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                </TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </>
    )
}
export default Agendamento