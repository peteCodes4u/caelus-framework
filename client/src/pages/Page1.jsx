// this is Page1 of the application
import {
    Container,
    Card,
    Col,
    Row,
} from "react-bootstrap";

export default function Page1() { 

    return (
        <>
        <main className="py-2">
            <Container className="home">
                <h1>🌠 Welcome to Caleus Framework! 🌠</h1>
                <br />
                <Row className="py-4">
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
                                <img src="https://media.giphy.com/media/DyQrKMpqkAhNHZ1iWe/giphy.gif?cid=82a1493boi0qtei6fk4053oolyjicm28pwm83lghonanq8dv&ep=v1_gifs_trending&rid=giphy.gif&ct=i"  />
                                <Card.Text>
                                THIS IS DATA SET 3 (TO BE MADE DYNMAIC)
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>                                                                                                                       
                </Row>
                <br />
                <p> 🛸 This is the home page of the  MERN stack application leveraging GraphQL. 👽 </p>
            </Container>  
        </main>
        </>
    );
};

