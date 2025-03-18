// this is the navigation bar component changes to the navigation bar can be made here
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => { 

    const currentPage = useLocation().pathname;

    return (
        <>
        <ul>
            <li>
                <Link
                    to='/'
                    className={currentPage === '/' ? 'active' : 'nav-link'}
                >
                    Home
                </Link>
            </li>
        </ul>
        </>

    );
};

export default NavigationBar;
