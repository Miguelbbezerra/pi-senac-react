import { Outlet } from "react-router-dom";
import ResponsiveDrawer from "./layout/core/ResponsiveDrawer";
import PersistentDrawerLeft from "./layout/core/PersistentDrawer";

export default function Root(){
    return (
        <PersistentDrawerLeft>
            <Outlet/>
        </PersistentDrawerLeft>
    )
}