import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { PostAdd } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function FichaAnamnese() {

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <Paper elevation={2} sx={{ padding: '1em' }}>
            <h2><PostAdd /> Ficha de Anamnese</h2>
            <Divider style={{ margin: '1em 0', color: 'gray' }} ></Divider>
            <Box sx={{ flexGrow: 1 }} >
                <FormControl fullWidth>
                    <Grid container spacing={2}  >
                        <Grid item lg={3} md={6} sm={12} xs={12} >
                            <InputLabel id="demo-simple-select-label">Paciente</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Paciente"
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                                margin="none"
                            >
                                <MenuItem value="">
                                    <em>Selecione...</em>
                                </MenuItem>
                                <MenuItem value={1}>Carlos Miguel Bezerra Venturin</MenuItem>
                                <MenuItem value={2}>Jhonata Sobral</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item lg={3} md={6} sm={12} xs={12} >
                            <TextField margin="none" label="Teste" sx={{ width: '100%' }}></TextField>
                        </Grid>
                        <Grid item lg={3} md={6} sm={12} xs={12} >
                            <TextField margin="none" label="Teste" sx={{ width: '100%' }}></TextField>
                        </Grid>
                        <Grid item lg={3} md={6} sm={12} xs={12} >
                            <TextField margin="none" label="Teste" sx={{ width: '100%' }}></TextField>
                        </Grid>
                    </Grid>
                    <Divider style={{ margin: '1em 0', color: 'gray' }} ></Divider>
                    <Grid container spacing={2}  >
                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <Button style={{ border: '1px solid #1976d2' }}>Cadastrar</Button>
                        </Grid>

                    </Grid>
                </FormControl>
            </Box>
        </Paper>
    );
}