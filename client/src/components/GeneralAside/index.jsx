import { Container, Row, Col, Card } from 'react-bootstrap';
export default function GeneralAside({ children, className = "", toggleStylesheet, activeStyle = 'app-style1'    }) {
  return (
    <Container className={`${activeStyle}-aside`}>
      <Row>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}