import React from 'react';
import { Link } from 'react-router';

const list = <>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/all-jobs'>All Jobs</Link></li>
    <li><Link to='/add-job'>Add a Job</Link></li>
    <li><Link to='/my-accepted-tasks'>My Accepted Tasks</Link></li>
</>

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm px-6 sm:px-16">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {list}
                    </ul>
                </div>
                <Link to='/' className="text-xl font-bold">Freelance
                    <span className="block sm:hidden"></span>
                    MarketPlace</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {list}
                </ul>
            </div>
            <div className="navbar-end">
                <div className='hidden sm:block space-x-2'>
                    <Link to='/auth/login' className="btn btn-outline">Login</Link>
                    <Link to='/auth/register' className="btn btn-primary btn-outline">Register</Link>
                </div>
                <div className="dropdown dropdown-hover dropdown-end sm:hidden">
                    <div tabIndex={0} role="button" className="btn btn-primary btn-outline m-1">Login/<br></br>Register</div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <Link to='/auth/login' className="btn">Login</Link>
                        <Link to='/auth/register' className="btn">Register</Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;