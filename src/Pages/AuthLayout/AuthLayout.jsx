import React from "react";
import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <div className="min-h-screen w-full bg-gray-50 mx-auto">
            <Outlet></Outlet>
        </div>
    );
}
