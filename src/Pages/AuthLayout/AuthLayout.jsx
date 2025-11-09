import React from "react";
import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <div className="min-h-screen w-full sm:grid grid-cols-3 bg-linear-to-br from-blue-400 to-blue-700 mx-auto">
            <div className="text-white space-y-4 flex-col justify-center items-center hidden sm:flex col-span-2">
                <h1 className="text-6xl">
                    Grow With Us
                </h1>
                <p className="text-3xl">
                    We are glad to see you here
                </p>
            </div>
            <Outlet></Outlet>
        </div>
    );
}
