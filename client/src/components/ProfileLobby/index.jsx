import { useQuery } from '@apollo/client';
import { Card, Alert, Button, Row, Col, Spinner } from 'react-bootstrap';
import { QUERY_ALL_PROFILES } from '../../utils/queries';
import { useStyle } from '../../styleContext';

export default function ProfileLobby() {
    const { activeStyle } = useStyle();
    const { data, loading, error } = useQuery(QUERY_ALL_PROFILES);

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-4">
                <Spinner animation="border" role="status" />
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">Error loading profiles</Alert>;
    }

    const profiles = data?.getAllProfiles || [];

    if (profiles.length === 0) {
        return <Alert variant="info">No profiles found.</Alert>;
    }

    return (
        <Row className={`mt-3 g-3 ${activeStyle}-proflie-lobby`}>
            {profiles.map((profile) => (
                <Col key={profile._id} xs={12} sm={6} md={4} lg={3}>
                    <Card className="h-100 shadow-sm">

                        {profile.avatarUrl && (
                            <Card.Img
                                variant="top"
                                src={profile.avatarUrl}
                                alt={`${profile.user?.name}'s avatar`}
                            />
                        )}

                        <Card.Body>
                            <Card.Title>{profile.user?.name}</Card.Title>

                            {profile.bio && (
                                <Card.Text className="text-muted">
                                    {profile.bio.length > 80
                                        ? profile.bio.substring(0, 80) + '...'
                                        : profile.bio}
                                </Card.Text>
                            )}

                            <Button variant="primary" size="sm">
                                View Profile
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
