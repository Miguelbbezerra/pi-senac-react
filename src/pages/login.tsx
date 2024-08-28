import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ImagemLogo from "../images/senac-logo.jpg";
import { useState } from "react";
import api from "../helper/http";
import SnackBar, { SnackbarProps } from "../components/layout/core/snackBar";

export default function Login() {
  const [redirect, setRedirect] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [snackBar, setSnackBar] = useState<SnackbarProps>({
    open: false,
    message: "",
    type: "info",
    handleClose: () => {}
  });

  async function Login1() {
    try {
      const response = await api.post("login", formData);
      console.log("resposta login", response);
      setSnackBar({
        ...snackBar,
        message: 'Bem vindo',
        open: true,
        type: 'success'
      })
      setRedirect(true);
    } catch (error: { status: number; message: string } | any) {
      setSnackBar({
        ...snackBar,
        message: error.message,
        open: true,
        type: 'error'
      })
      console.log("response", error);
    }
  }

  if (redirect) {
    window.location.href = "/admin/home";
  }

  const setInput = (event: any, key: string) => {
    const value = event.target.value;
    const newFormData = Object.assign({}, formData, { [key]: value });

    setFormData(newFormData);
  };

  function handleKeyUp(event: any) {
    if (event.keyCode === 13) {
      Login1();
    }
  }

  function handleSnackBar() {
    const newStatus = !!!snackBar.open;
    setSnackBar({
      ...snackBar,
      open: newStatus,
    });
  }

  return (
    <Box
      sx={{
        marginLeft: 4,
        marginRight: 4,
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SnackBar
        handleClose={handleSnackBar}
        open={snackBar.open}
        message={snackBar.message}
        type={snackBar.type}
      />
      <img src={ImagemLogo} alt="logo do senac" style={{ width: "15em" }} />
      <Box component="form" noValidate>
        <TextField
          onKeyUp={handleKeyUp}
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={(event) => setInput(event, "email")}
        />
        <TextField
          onKeyUp={handleKeyUp}
          margin="normal"
          required
          fullWidth
          name="senha"
          label="Senha"
          type="password"
          id="senha"
          autoComplete="current-password"
          value={formData.senha}
          onChange={(event) => setInput(event, "senha")}
        />
        <Button
          onClick={Login1}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Entrar
        </Button>
      </Box>
    </Box>
  );
}