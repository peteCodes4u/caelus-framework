// This is the header component that will be displayed on every page of the application. changes to the header can be made here.
import { Link } from 'react-router-dom';
import  NavigationBar from '../NavigationBar';
import  Auth  from '../../utils/auth';

const Header = ()  => { 

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    
    return (
        <header className="framework-header">
        <section className="container header-container">
        <Link className='' to='/'>
        <h1>
            <span className='text-primary header-title'>Caleus Framework</span>
        </h1>
        </Link>
        <section>
            {Auth.loggedIn() ? (
                <>
                <Link className='button-link secondary' to ='/me'>
                My Profile
                </Link>
                <button className='button-link alert' onClick={logout}>
                Logout
                </button>
                </>
            ) : (
                <>
                <Link className='button-link primary' to='/login'>
                Login
                </Link>
                <br></br>
                <Link className='button-link secondary' to='/signup'>
                Signup
                </Link>
                </>
            )}
        </section>
        <section className=''>
            <NavigationBar></NavigationBar>
        </section>
        </section>
        </header>
    );
};

export default Header;