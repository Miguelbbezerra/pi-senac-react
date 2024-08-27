import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "../../pages/home";
import Root from "../../components/root";
import Paciente from "../../pages/paciente";
import Agendamento from "../../pages/agendamento";
import Login from "../../pages/login";
import Perfil from "../../pages/perfil";
import Podologo from "../../pages/podologo";
import FichaAnamnese from "../../pages/fichaAnamnese";
import PrivateRoute from "./privateRoute";
<<<<<<< HEAD
=======
import Publicidade from "../../pages/publicidade/publicidade";
>>>>>>> refactor-login


export const router = createBrowserRouter(createRoutesFromElements(
    <Route>
<<<<<<< HEAD
=======
        <Route path="/uo-dds" element={<Publicidade />} />
>>>>>>> refactor-login
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute redirectTo="/" />}>
            <Route path="/admin" element={<Root />}>
                <Route path="home" element={<Home />} />
                <Route path="paciente" element={<Paciente />} />
                <Route path="podologo" element={<Podologo />} />
                <Route path="agendamento" element={<Agendamento />} />
                <Route path="ficha" element={<FichaAnamnese />} />
                <Route path="perfil" element={<Perfil />} />
            </Route>
        </Route>
    </Route >
))
