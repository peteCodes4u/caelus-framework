import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function UpdatePasswordForm({ activeStyle = 'app-style1' }) {
    const [formData, setFormData] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: ''
    });

    // Check if new password and confirm password match
    const passwordsMatch =
        formData.password &&
        formData.confirmPassword &&
        formData.password === formData.confirmPassword;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className={`${activeStyle}-update-password-form`}>
            <div className={`${activeStyle}-update-password-form-header d-flex align-items-center justify-content-between mb-3`}>
                <div className={`${activeStyle}-update-password-form-body`}>
                    <Card className={`${activeStyle}-update-password-form-card`}>
                        <Form noValidate>
                            <Alert variant="info">
                                Please enter your new password below.
                            </Alert>
                            <Form.Group controlId="formBasicPassword">
                                {/* Old Password */}
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control 
                                    type='password'
                                    placeholder='Old Password'
                                    name="oldPassword"
                                    value={formData.oldPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                {/* Show New Password only if Old Password is entered */}
                                {formData.oldPassword && (
                                    <>
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter new password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </>
                                )}
                                {/* Show Confirm Password only if New Password is entered */}
                                {formData.oldPassword && formData.password && (
                                    <>
                                        <Form.Label>Confirm New Password</Form.Label>
                                        <Form.Control 
                                            type='password'
                                            placeholder='Confirm New Password'
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </>
                                )}
                                {/* Show error if passwords do not match */}
                                {formData.password && formData.confirmPassword && !passwordsMatch && (
                                    <Alert variant="danger" className="mt-2">
                                        New password and confirmation do not match.
                                    </Alert>
                                )}
                            </Form.Group>
                            <Button 
                                variant="primary" 
                                type="submit"
                                disabled={
                                    !formData.oldPassword ||
                                    !formData.password ||
                                    !formData.confirmPassword ||
                                    !passwordsMatch
                                }
                            >
                               🔐 Update Password 🔐
                            </Button>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
};