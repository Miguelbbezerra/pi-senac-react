import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ImagemLogo from "../images/senac-logo.jpg";
import { SetItemLocalStorage } from "../helper/localStorage";
import { useState } from "react";
import api from "../helper/http";

const defaultTheme = createTheme();

export default function Login() {
  const [redirect, setRedirect] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  async function Login1() {
    try {
      const response = await api.post("login", formData);
      setRedirect(true);
    } catch (error) {
      console.log(error);
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
      <img src={ImagemLogo} alt="..." style={{ width: "15em" }} />
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
          Sign In
        </Button>
      </Box>
    </Box>
  );
}
