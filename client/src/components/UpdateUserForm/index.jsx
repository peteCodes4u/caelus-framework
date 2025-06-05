import { useEffect, useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER, VERIFY_PASSWORD } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

export default function UpdateUserForm({ activeStyle = 'app-style1', initialName = '', initialEmail = '' }) {
    const [formData, setFormData] = useState({
        name: initialName,
        email: initialEmail,
        password: '',
    });
    const [showPasswordField, setShowPasswordField] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [alertVariant, setAlertVariant] = useState('danger');
    const [updateUser] = useMutation(UPDATE_USER);
    const [verifyPassword] = useMutation(VERIFY_PASSWORD);
    const { loading, error: queryError, data: userData } = useQuery(QUERY_ME);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            name: initialName,
            email: initialEmail,
        }));
    }, [initialName, initialEmail]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleShowPassword = () => setShowPasswordField(true);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setShowAlert(false);

        // Show alert if password is empty
        if (!formData.password) {
            setAlertMsg('Password Entry Required');
            setAlertVariant('danger');
            setShowAlert(true);
            return;
        }

        // Verify password
        const { data: verifyData } = await verifyPassword({ variables: { password: formData.password } });
        if (!verifyData?.verifyPassword) {
            setAlertMsg('Password is incorrect.');
            setAlertVariant('danger');
            setShowAlert(true);
            return;
        }
        // Update user
        try {
            await updateUser({ variables: { name: formData.name, email: formData.email } });
            setAlertMsg('Profile updated successfully!');
            setAlertVariant('success');
            setShowAlert(true);
        } catch {
            setAlertMsg('Something went wrong with your profile update!');
            setAlertVariant('danger');
            setShowAlert(true);
        }
    };

    return (
        <div className={`${activeStyle}-update-user-form-form`}>
            <div className={`${activeStyle}-update-user-form-body`}>
                <Card className={`${activeStyle}-update-user-form`} onClick={handleFormSubmit}>
                    {showAlert && <Alert variant={alertVariant}>{alertMsg}</Alert>}
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    {!showPasswordField && (
                        <Button type="button" onClick={handleShowPassword}>
                            📧 Update username or email 📧
                        </Button>
                    )}
                    {showPasswordField && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Button type="button" variant="success" disabled={!formData.password}>
                                Confirm & Update
                            </Button>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
};