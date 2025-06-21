import { Card } from "react-bootstrap";

export default function UserBio({ activeStyle = "app-style1" }) {
    return (
        <Card className={`${activeStyle}-user-bio`}>
            <Card.Body>
                <Card.Text>
                        <strong>My Name is:</strong>
                    <Card.Text>
                        <strong>You have not yet configured your profile, if you would like your name to be visible to other users, please configure your bio using the bio form</strong>
                    </Card.Text>
                </Card.Text>
                <Card.Text>
                    <strong>I am From:</strong>
                    <Card.Text>
                        <strong>You have not yet configured your profile, if you would like your location to be visible to other users, please configure your bio using the bio form</strong>   
                    </Card.Text>
                </Card.Text>
                <Card.Text>
                    <strong>My Bio:</strong>
                    <Card.Text>
                        <strong>You have not yet configured your profile, if you would like your bio to be visible to other users, please configure your bio using the bio form</strong>
                    </Card.Text>
                </Card.Text>
                <Card.Text>
                    <strong>My soicials links</strong>
                    <Card.Text>
                        <strong>You have not yet configured your profile, if you would like your socials to be visible to other users, please configure your bio using the bio form</strong>
                    </Card.Text>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};