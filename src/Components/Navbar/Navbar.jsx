import React, { useContext } from 'react';
import { Link } from 'react-router';
import { ThemeContext } from '../../Contexts/Theme';
import { AuthContext } from '../../Contexts/AuthProvider';

const list = <>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/all-jobs'>All Jobs</Link></li>
    <li><Link to='/add-job'>Add a Job</Link></li>
    <li><Link to='/my-accepted-tasks'>My Accepted Tasks</Link></li>
</>


const Navbar = () => {
    const { themeToggle } = useContext(ThemeContext);
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="navbar bg-base-100 shadow-sm px-6 sm:px-20 sticky top-0 z-10">
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
                    <span className="block sm:hidden"></span> MarketPlace</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {list}
                </ul>
            </div>
            <div className="navbar-end">
                <label className="toggle text-base-content mr-2">
                    <input onClick={themeToggle} type="checkbox" value="synthwave" className="theme-controller" />

                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

                </label>
                {
                    user ?
                        <button onClick={logout} className='btn'>SignOut</button>
                        :
                        <>
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
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;