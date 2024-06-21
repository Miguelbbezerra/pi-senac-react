import { Box, Input, TextField, Typography } from "@mui/material"

const styles = {
    card: {
        display: 'flex', flexDirection: 'column'
    },
    container: {
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2
    }
}

export const Paciente = () => {
    return (
        <>
            <Box sx={styles.card}>
                <Typography variant="h1" noWrap>Cadastro de Paciente</Typography>

                <Box sx={styles.container} component={'form'}>
                    <TextField sx={{gap: 4}} label={'nome paciente'} variant="outlined" />
                    <TextField label={'cpf paciente'} variant="outlined" />
                    <TextField label={'email paciente'} variant="outlined" />
                    <TextField label={'telefone paciente'} variant="outlined" />
                    <TextField label={'data de nascimento paciente'} variant="outlined" />
                    <TextField label={'gênero paciente'} variant="outlined" />
                    <TextField label={'endereço paciente'} variant="outlined" />
                </Box>
            </Box>
        </>
    )
}
