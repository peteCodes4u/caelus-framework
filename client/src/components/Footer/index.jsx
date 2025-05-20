// Footer Component used in the App.js file to display the footer of the website. this is where changes can be made to the footer of the website.
import { useLocation, useNavigate } from 'react-router-dom';

import {
    Container,
    Navbar,
    Nav,
    Form,
    FormControl,
    Row,
    Col,
    Button,
} from 'react-bootstrap'

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Navbar bg='dark' variant='dark' className='mt-4'>
            <Container fluid>
                <Row className='w-100 alighn-items-center'>
                    <Col xs={12} md={4} className='mb-3 mb-md-0'>
                        <Form className ='d-flex'>
                            <FormControl
                                type='search'
                                placeholder='Search'
                                className='mr-2'
                                aria-activedescendant='Search'
                            />
                            <Button variant='outline-success' type='submit'>
                                Search
                            </Button>
                        </Form>
                    </Col>
                    <Col xs={12} md={4} className="text-center text-md-right text-light">
                        <div className="mb-2">
                            <Nav className='d-flex justify-content-center justify-content-md-end'>
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
                        <div>
                            &copy; {new Date().getFullYear()} - Caleus GraphQL Framework by Quartzion Technology Solutions Corp. All rights reserved.
                        </div>
                        <div>
                            {location.pathname !== '/' && (
                                <button className="btn btn-primary"
                                    onClick={() => navigate(-1)}
                                >
                                    &larr; Go Back
                                </button>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
};
