import { Outlet } from "react-router-dom";
import PersistentDrawerLeft from "@/components/layout/core/PersistentDrawer";

export default function Root(){
    return (
        <PersistentDrawerLeft>
            <Outlet/>
        </PersistentDrawerLeft>
    )
}