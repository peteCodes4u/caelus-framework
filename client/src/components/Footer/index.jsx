// Footer Component used in the App.js file to display the footer of the website. this is where changes can be made to the footer of the website.
import { useLocation, useNavigate } from 'react-router-dom';

import {
    Container,
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
} from 'react-bootstrap'

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer({ activeStyle }) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Navbar className={`${activeStyle}-footer`}>
            <Container fluid>
                <div className="footer-content">
                    <div className="footer-left">
                        <Form className="footer-search d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success" type="submit">
                                Search
                            </Button>
                        </Form>
                    </div>
                    <div className="footer-center">
                        <div className="footer-copyright">
                            &copy; {new Date().getFullYear()} - Caleus GraphQL Framework by Quartzion Technology Solutions Corp. All rights reserved.
                        </div>
                    </div>
                    <div className="footer-right">
                        <Nav className="footer-social">
                            <Nav.Link href="https://www.facebook.com" target="_blank">
                                <FaFacebook />
                            </Nav.Link>
                            <Nav.Link href="https://www.twitter.com" target="_blank">
                                <FaTwitter />
                            </Nav.Link>
                            <Nav.Link href="https://www.instagram.com" target="_blank">
                                <FaInstagram />
                            </Nav.Link>
                        </Nav>
                    </div>
                </div>
            </Container>
        </Navbar>
    );
};
