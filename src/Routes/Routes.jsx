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
import UpdateJob from '../Pages/UpdateJob/UpdateJob';
import DeleteJob from '../Pages/DeleteJob/DeleteJob';
import JobDetails from '../Pages/JobDetails/JobDetails';
import MyJobs from '../Pages/MyJobs/MyJobs';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: Home },
            { path: "/all-jobs", Component: AllJobs },
            { path: "/all-jobs/:id", element: <PrivateRoute><JobDetails /></PrivateRoute> },

            { path: "/add-job", element: <PrivateRoute><AddJobs></AddJobs></PrivateRoute> },

            { path: "/update-job/:id", element: <PrivateRoute><UpdateJob /></PrivateRoute> },

            { path: "/delete-job/:id", element: <PrivateRoute><DeleteJob /></PrivateRoute> },

            { path: "/my-added-jobs", element: <PrivateRoute><MyJobs /></PrivateRoute> },

            { path: "/my-accepted-tasks", element: <PrivateRoute><AcceptedJobs /></PrivateRoute> },
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