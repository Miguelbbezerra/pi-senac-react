import { RouteObject, createBrowserRouter } from "react-router-dom";
import PersistentDrawer from "../../../components/layout/core/PersistentDrawer";
import { Paciente } from "../../../components/paciente";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PersistentDrawer />,
        children: [
            {
                path: '/usuario',
                element: <Paciente />
            }
        ]
    }
])

export default router