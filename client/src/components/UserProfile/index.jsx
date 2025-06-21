import { Card } from 'react-bootstrap';
import UserBio from '../UserBio';

export default function UserProfile({ user }, { activeStyle = "app-style1" }) {
    return (
        <Card className={`${activeStyle}-user-profile`}>
            <Card.Body>
                <Card.Title>About Me</Card.Title>
                <UserBio activeStyle={activeStyle}

                />
                <Card.Text>
                    <strong>email:</strong> {user.email}
                </Card.Text>
                <Card.Text>
                    <strong>name:</strong> {user.name}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};