import React from 'react';
import { createBrowserRouter } from 'react-router';
import App from '../App';
import Home from '../Pages/Home/Home';
import AllJobs from '../Pages/AllJobs/AllJobs';
import AddJobs from '../Pages/AddJobs/AddJobs';
import AcceptedJobs from '../Pages/AcceptedJobs/AcceptedJobs';
import Login from '../Pages/AuthLayout/Login/Login';
import Register from '../Pages/AuthLayout/Register/Register';
import AuthLayout from '../Pages/AuthLayout/AuthLayout';

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: Home },
            { path: "/all-jobs", Component: AllJobs },
            { path: "/add-job", Component: AddJobs },
            { path: "/my-accepted-tasks", Component: AcceptedJobs },
            {
                path: "/auth",
                Component: AuthLayout,
                children: [
                    { path: "/auth/login", Component: Login },
                    { path: "/auth/register", Component: Register },
                ],
            },
        ],
    },
]);


export default router;