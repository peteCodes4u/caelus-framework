import { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import { UPDATE_USER, VERIFY_PASSWORD } from '../../utils/mutations';

export default function UpdateUserForm({ activeStyle = 'app-style1' }) {
    const { loading, error: queryError, data: userData } = useQuery(QUERY_ME);
    const [userFormData, setUserFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

        const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
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

    return (
        <Card className={`${activeStyle}-update-user-form`}>
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
        </Card>
    );
};