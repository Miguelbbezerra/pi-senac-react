import { Pagination } from "@mui/material";

export default function Paginacao() {
    return (
        <div style={{ display: 'flex', justifyContent: 'start'}}>
            <Pagination sx={{ margin: '0.5em' }} count={10} />
        </div>
    )
}