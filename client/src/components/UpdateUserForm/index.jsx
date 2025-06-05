import { useState, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import { UPDATE_USER, VERIFY_PASSWORD } from '../../utils/mutations';

export default function UpdateUserForm({ activeStyle = 'app-style1' }) {
    const { loading, error: queryError, data: userData } = useQuery(QUERY_ME);
    const [updateUser, { error, data }] = useMutation(UPDATE_USER);
    const [showPasswordEnryField, setShowPasswordEnryField] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [verifyPassword] = useMutation(VERIFY_PASSWORD);
    const [userFormData, setUserFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (userData && userData.me) {
            setUserFormData((prev) => ({
                ...prev,
                name: userData.me.name || '',
                email: userData.me.email || '',
            }));
        }
    }, [userData]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (showPasswordEnryField) {
            const { data } = await verifyPassword({ variables: { password: userFormData.password } });
            if (!data.verifyPassword) {
                setShowAlert(true);
                return;
            }
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

    return (
        <Card className={`${activeStyle}-update-user-form`}>
            <Card onClick={handleFormSubmit}>
                <Card>
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
                    {/* Step 1: Show password field */}
                    <Button
                        type="button"
                        id="show-name-email-update-btn"
                        variant="primary"
                        onClick={() => setShowPasswordEnryField(true)}
                        disabled={showPasswordEnryField}
                    >
                        📧 Update username or email 📧
                    </Button>
                    {/* Step 2: Show password input and submit button */}
                    {showPasswordEnryField && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Your password"
                                    name="password"
                                    id="password"
                                    value={userFormData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Button
                                type="button"
                                variant="success"
                                disabled={!userFormData.password}
                                onClick={handleFormSubmit}
                            >
                                Confirm & Update
                            </Button>
                        </>
                    )}
                    {data ? (
                        <Alert variant="success">
                            Profile updated successfully!
                        </Alert>
                    ) : null}
                </Card>
            </Card>
        </Card>
    );
};