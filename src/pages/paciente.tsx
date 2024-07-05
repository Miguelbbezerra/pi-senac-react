import { Divider } from "@mui/material";
import ModalPaciente from "../components/modal/modalPaciente";
import TabelaPaciente from "../components/tables/tabelaPaciente";

const Paciente = () => {
    return (
        <>
            <ModalPaciente />
            <Divider sx={{margin: "1em 0"}}/>
            <TabelaPaciente />
        </>
    )
}
export default Paciente