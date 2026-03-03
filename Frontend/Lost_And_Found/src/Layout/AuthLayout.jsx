import { Outlet } from "react-router-dom";
import React from "react";
export default function AuthLayout(){
    return(
        <div className="min-h-screen">
            <Outlet />
        </div>
    )
}