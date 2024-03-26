import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "../../pages/home";
import Root from "../../components/root";
import Paciente from "../../pages/paciente";
import Agendamento from "../../pages/agendamento";
import Login from "../../pages/login";
import ResponsiveDrawer from "../../components/layout/core/ResponsiveDrawer";
import Perfil from "../../pages/perfil";
import Podologo from "../../pages/podologo";
import FichaAnamnese from "../../pages/fichaAnamnese";


export const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/">
        <Route path={"admin"} element={<Root />} >
            <Route path={"home"} element={<Home />} />
            <Route path={"paciente"} element={<Paciente />} />
            <Route path={"podologo"} element={<Podologo />} />
            <Route path={"agendamento"} element={<Agendamento />} />
            <Route path={"ficha"} element={<FichaAnamnese />} />
            <Route path={"perfil"} element={<Perfil />} />
        </Route>
        <Route path={"login"} element={<Login />} ></Route>
    </Route>
))