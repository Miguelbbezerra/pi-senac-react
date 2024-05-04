import { Grid, InputAdornment, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

const InputPesquisar = () => {
    return (
        <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
                sx={{ width: '100%', height: '100%' }}
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                            <p>Pesquisar Nome</p>
                        </InputAdornment>
                    ),
                }}
            />

        </Grid>
    )
}
export default InputPesquisar