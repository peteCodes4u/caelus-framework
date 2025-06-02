import { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import UpdatePasswordForm from '../UpdatePasswordForm';
import Auth from '../../utils/auth';

export default function ProfileForm({ activeStyle = 'app-style1' }) {
    const { loading, error: queryError, data: userData } = useQuery(QUERY_ME);
    const [userFormData, setUserFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [updateUser, { error, data }] = useMutation(UPDATE_USER);
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        try {
            const { data } = await updateUser({ variables: { ...userFormData } });
            if (data && data.updateUser && data.updateUser.token) {
                Auth.login(data.updateUser.token);
            }
        } catch (e) {
            setShowAlert(true);
        }
        setValidated(true);
    };

    // Populate form fields when userData is loaded
    useEffect(() => {
        if (userData && userData.me) {
            setUserFormData((prev) => ({
                ...prev,
                name: userData.me.name || '',
                email: userData.me.email || '',
            }));
        }
    }, [userData]);

    return (
        <div className={`${activeStyle}-profile-form`}>
            <div className={`${activeStyle}-prfile-form-header d-flex align-items-center justify-content-between mb-3`}>
                <div className={`${activeStyle}-profile-form-body`}>
                    <Card className={`${activeStyle}-profile-form-card`}>
                        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                            <Alert
                                dismissible
                                onClose={() => setShowAlert(false)}
                                show={showAlert || !!error}
                                variant="danger"
                            >
                                Something went wrong with your profile update!
                            </Alert>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="username">Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Your username"
                                    name="name"
                                    id="name"
                                    value={userFormData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Your email"
                                    name="email"
                                    id="email"
                                    value={userFormData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" id="name-email-update-button" variant="primary">
                                📧 Update username or email 📧
                            </Button>
                            <br></br>
                            <br></br>
                            <Form.Group className="mb-3">
                                <Button
                                    type="button"
                                    onClick={() => setShowPasswordForm((prev) => !prev)}
                                >
                                    {showPasswordForm ? "Hide Password Form" : "Update your Password"}
                                </Button>
                                {showPasswordForm && < UpdatePasswordForm activeStyle={activeStyle} />}
                            </Form.Group>
                            {data ? (
                                <Alert variant="success">
                                    Profile updated successfully!
                                </Alert>
                            ) : null}
                        </Form>
                    </Card>

                </div>
            </div>
        </div>
    );
};