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
        <header className="">
        <section className="container">
        <Link className='' to='/'>
        <h1>
            <span className='text-primary'>Caleus Framework</span> Framework
        </h1>
        </Link>
        <p>
            MERN Stack Application with GraphQL.
        </p>
        <section>
            {Auth.loggedIn() ? (
                <>
                <Link className='button-link' to ='/me'>
                My Profile
                </Link>
                <button className='button-link' onClick={logout}>
                Logout
                </button>
                </>
            ) : (
                <>
                <Link className='button-link' to='/login'>
                Login
                </Link>
                <Link className='button-link' to='/signup'>
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