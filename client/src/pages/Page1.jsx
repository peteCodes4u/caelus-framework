// this is Page1 of the application
import { Outlet } from "react-router-dom";
import { useStyle } from "../StyleContext";

// Bootstrap Components
import {
  Container,
  Card,
  Col,
  Row,
} from "react-bootstrap";

export default function Page1() { 
    const { activeStyle } = useStyle();
    return(
        <div className={`${activeStyle}-page1`}>
            <main className='py-2'>
                <Container className="text-center">
                    <h1>🌠 Welcome to Caleus Framework! 🌠</h1>
                    <Row>
                        <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>UPDATE DATA SET 1 (TO BE MADE DYNAMIC)</Card.Title>
                                <img src="https://media.giphy.com/media/DyQrKMpqkAhNHZ1iWe/giphy.gif?cid=82a1493boi0qtei6fk4053oolyjicm28pwm83lghonanq8dv&ep=v1_gifs_trending&rid=giphy.gif&ct=g" alt="home" />
                                <Card.Text>
                                    THIS IS DATA SET 1 (TO BE MADE DYNMAIC)
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>UPDATE DATA SET 2 (TO BE MADE DYNAMIC)</Card.Title>
                                <img src="https://media.giphy.com/media/DyQrKMpqkAhNHZ1iWe/giphy.gif?cid=82a1493boi0qtei6fk4053oolyjicm28pwm83lghonanq8dv&ep=v1_gifs_trending&rid=giphy.gif&ct=h" alt="home" />
                                <Card.Text>
                                    THIS IS DATA SET 2 (TO BE MADE DYNMAIC)
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                        <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>UPDATE DATA SET 3 (TO BE MADE DYNAMIC)</Card.Title>
                                <img src="https://media.giphy.com/media/DyQrKMpqkAhNHZ1iWe/giphy.gif?cid=82a1493boi0qtei6fk4053oolyjicm28pwm83lghonanq8dv&ep=v1_gifs_trending&rid=giphy.gif&ct=i" alt="home" />
                                <Card.Text>
                                    THIS IS DATA SET 3 (TO BE MADE DYNMAIC)
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
            <Outlet />
        </div>
    );
};

