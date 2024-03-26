import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material"
import { useState } from "react";

const Perfil = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <Paper elevation={3} style={{ padding: '1em' }}>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <div style={{ display: 'flex'}}>
                        <img src="https://placehold.co/250x250" alt="Foto de Perfil" style={{ borderRadius: '50%' }} />
                    </div>
                    <Divider orientation="vertical" variant="middle" flexItem  style={{ margin: '0 1em'}}/>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '1em', flexDirection: 'column', justifyContent: 'center'}}>
                        <div style={{ display: 'flex', flexDirection: 'row',  width: '100%', margin: '1em 0'}}>
                            <TextField style={{ width: '100%'}} label='Nome Completo' variant="outlined" defaultValue='Carlos Miguel Bezerra Venturin' />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row',  width: '100%', margin: '1em 0'}}>
                            <TextField style={{ width: '50%', margin: '0 1em 0 0'}} disabled label='Usuario' variant="outlined" defaultValue='carlosmiguel' />
                            <FormControl variant="outlined" style={{ width: '50%'}}>
                                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    disabled
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    defaultValue='1234'
                                />
                            </FormControl>
                        </div>
                    </div>
                </div>
            </Paper>
        </>
    )
}
export default Perfil