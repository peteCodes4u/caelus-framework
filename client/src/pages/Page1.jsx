// this is Page1 of the application
import { Outlet } from "react-router-dom";
import { useStyle } from "../StyleContext";

// Bootstrap Components
import { Container, Row, Col, Card } from "react-bootstrap";

const cardData = [
  {
    title: "UPDATE DATA SET 1 (TO BE MADE DYNAMIC)",
    img: "https://media.giphy.com/media/DyQrKMpqkAhNHZ1iWe/giphy.gif?cid=82a1493boi0qtei6fk4053oolyjicm28pwm83lghonanq8dv&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
    text: "THIS IS DATA SET 1 (TO BE MADE DYNAMIC)",
  },
  {
    title: "UPDATE DATA SET 2 (TO BE MADE DYNAMIC)",
    img: "https://media.giphy.com/media/DyQrKMpqkAhNHZ1iWe/giphy.gif?cid=82a1493boi0qtei6fk4053oolyjicm28pwm83lghonanq8dv&ep=v1_gifs_trending&rid=giphy.gif&ct=h",
    text: "THIS IS DATA SET 2 (TO BE MADE DYNAMIC)",
  },
  {
    title: "UPDATE DATA SET 3 (TO BE MADE DYNAMIC)",
    img: "https://media.giphy.com/media/DyQrKMpqkAhNHZ1iWe/giphy.gif?cid=82a1493boi0qtei6fk4053oolyjicm28pwm83lghonanq8dv&ep=v1_gifs_trending&rid=giphy.gif&ct=i",
    text: "THIS IS DATA SET 3 (TO BE MADE DYNAMIC)",
  },
];

export default function Page1() {
  const { activeStyle } = useStyle();
  return (
    <div className={`${activeStyle}-page1`}>
      <main className="py-2">
        <Container className="text-center">
          <h1>🌠 Welcome to Caleus Framework! 🌠</h1>
          <Row>
            {cardData.map((card, idx) => (
              <Col md={4} key={idx}>
                <Card>
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <img src={card.img} alt="home" />
                    <Card.Text>{card.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
      <Outlet />
    </div>
  );
}

