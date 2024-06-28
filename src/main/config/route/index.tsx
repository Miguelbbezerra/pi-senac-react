import { RouteObject, createBrowserRouter } from "react-router-dom";
import ResponsiveDrawer from "@/components/layout/core/ResponsiveDrawer";
import PersistentDrawerLayout from "@/components/layout/core/PersistentDrawerLayout";
import { Paciente } from "@/components/paciente";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PersistentDrawerLayout />,
        children: [
            {
                path: '/usuario',
                element: <Paciente />
            }
        ]
    }
])

export default router