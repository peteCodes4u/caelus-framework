// this is the navigation bar component changes to the navigation bar can be made here
import { Link, useLocation } from 'react-router-dom';
import {
    Navbar,
    Nav,
    Container,
    NavDropdown,
} from 'react-bootstrap';

import Auth from '../../utils/auth';
import StyleToggler from '../StyleToggler';

export default function NavigationBar({ activeStyle, setActiveStyle }) {
    const location = useLocation();
    const currentPage = location.pathname;
    const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
    const isProfilePage = currentPage === `/profile/${userId}`;

    // Build availableLinks based on auth state
    const availableLinks = [
        { label: 'Home', path: '/' },
        ...(!Auth.loggedIn()
            ? [
                { label: 'Login 👍', path: '/login' },
                { label: 'Signup 😎', path: '/signup' },
            ]
            : [
                { label: 'Profile', path: `/profile/${userId}` },
                { label: 'Logout', action: Auth.logout },
            ]
        ),
    ];

    return (
        <Navbar id="navbar" className={`${activeStyle}-navbar`} expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className={`${activeStyle}-navbar-brand`}>
                    Caleus Framework by Quartzion
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar" className={`${activeStyle}-toggle-btn`} />
                <Navbar.Collapse id="navbar" className={`${activeStyle}-navbar-collapse`}>
                    <Nav className={`${activeStyle}-nav ml-auto d-flex`}>
                        <NavDropdown title="Explore" id="explore-dropdown" className={`${activeStyle}-dropdown`}>
                            {availableLinks.map((link, idx) =>
                                link.action ? (
                                    <NavDropdown.Item
                                        key={idx}
                                        as={Link}
                                        to="/"
                                        onClick={link.action}
                                    >
                                        {link.label}
                                    </NavDropdown.Item>
                                ) : (
                                    <NavDropdown.Item
                                        key={idx}
                                        as={Link}
                                        to={link.path}
                                    >
                                        {link.label}
                                    </NavDropdown.Item>
                                )
                            )}
                        </NavDropdown>
                        {isProfilePage && (
                            <StyleToggler
                                activeStyle={activeStyle}
                                setActiveStyle={setActiveStyle}
                            />
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};



