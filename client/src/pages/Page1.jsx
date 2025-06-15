// this is Page1 of the application
import { Outlet } from "react-router-dom";
import { useStyle } from "../styleContext";

// Bootstrap Components
import { Container, Row, Col, Card } from "react-bootstrap";

// sample data for the cards
import page1CardData from "../utils/page1CardData";

export default function Page1() {
  const { activeStyle } = useStyle();
  return (
    <div className={`${activeStyle}-page1`}>
      <main className="py-2">
        <Container className="text-center">
          <h1>🌠 Welcome to Caleus Framework! 🌠</h1>
          <Row>
            {page1CardData.map((card, idx) => (
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

