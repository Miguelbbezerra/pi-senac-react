import { RouteObject, createBrowserRouter } from "react-router-dom";
import ResponsiveDrawer from "../../../components/layout/core/ResponsiveDrawer";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ResponsiveDrawer />,
        children: [
            {
                path: '/home',
                element: (<>Essa é a home</>)
            }
        ]
    }
])

export default router