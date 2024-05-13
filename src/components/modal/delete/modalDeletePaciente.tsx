import { Box, Divider, Modal, Typography} from "@mui/material"
import { GetItemLocalStorage } from "../../../helper/localStorage";

interface ModalDeleteProps {
    openFicha: boolean;
    fichaClose: () => void;
    id: number;
}

const ModalDeletePaciente: React.FC<ModalDeleteProps> = ({ openFicha, fichaClose, id }) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        height: '30%',
        margin: '1em 0',
        bgcolor: 'background.paper',
        border: '2px solid #1976d2',
        borderRadius: '0.5em',
        boxShadow: 24,
        p: 4,
    };

    const btn = {
        width: '25%',
        height: '50px',
        border: 'none',
        margin: '1em',
        borderRadius: '8px',
        cursor: 'pointer'
    }

    const fetchDeletePacienteUnico = (id: number) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = GetItemLocalStorage('token');
        myHeaders.append("Authorization", `Bearer ${token}`);

        const raw = JSON.stringify({
            "ativo": 0
          });
          
          const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw
          };
          
          fetch(`http://localhost:5000/paciente/delete/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                window.location.reload();
            })
            .catch((error) => console.error(error));
    }

    return (
        <Modal
            open={openFicha}
            onClose={fichaClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <div>
                        <h4>Tem certeza que deseja deletar esse paciente?</h4>
                        <Divider sx={{ margin: '1em 0' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'fixed', bottom: '0', left: '0', width: '100%' }}>
                        <button type="button" style={{ ...btn, backgroundColor: '#CA3433', color: 'white' }} onClick={() => fetchDeletePacienteUnico((id))}>Deletar</button>
                        <button type="button" style={{ ...btn, backgroundColor: '#0f52ba', color: 'white' }} onClick={fichaClose}>Fechar</button>
                    </div>
                </Typography>
            </Box>
        </Modal>
    )
}
export default ModalDeletePaciente