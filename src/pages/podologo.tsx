import { Divider } from "@mui/material";
import TabelaPodologo from "../components/tables/tabelaPodologo";
import ModalPodologo from "../components/modal/modalPodologo";
const Podologo = () => {

  
    return (
        <>
            <ModalPodologo/>
            <Divider style={{ margin: '1em 0' }} />
            <TabelaPodologo />
        </>
    )
}
export default Podologo