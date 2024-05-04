import { Divider } from "@mui/material"
import TabelaAgendamento from "../components/tables/tabelaAgendamento";
import ModalAgendamento from "../components/modal/modalAgendamento";

const Agendamento = () => {
    return (
        <>
            <ModalAgendamento />
            <Divider style={{ margin: '1em 0' }} />
            <TabelaAgendamento />
        </>
    )
}
export default Agendamento