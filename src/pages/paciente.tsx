import { Divider } from "@mui/material";
import useWindowSize from "../useWindowSize";
import ModalPaciente from "../components/modal/modalPaciente";
import TabelaPaciente from "../components/tables/tabelaPaciente";

const Paciente = () => {

    const { width } = useWindowSize();

    return (
        <>
            <ModalPaciente />
            <Divider sx={{margin: "1em 0"}}/>
            <TabelaPaciente />
        </>
    )
}
export default Paciente