import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '../../utils/mutations';

export default function UpdatePasswordForm({ activeStyle = 'app-style1' }) {
    const [formData, setFormData] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: ''
    });
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD);

    const passwordsMatch =
        formData.password &&
        formData.confirmPassword &&
        formData.password === formData.confirmPassword;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');
        if (!passwordsMatch) return;
        try {
            const { data } = await updatePassword({
                variables: {
                    oldPassword: formData.oldPassword,
                    password: formData.password
                }
            });
            if (data?.updatePassword?.success) {
                setSuccessMsg('Password updated successfully!');
                setFormData({ oldPassword: '', password: '', confirmPassword: '' });
            } else {
                setErrorMsg(data?.updatePassword?.message || 'Failed to update password.');
            }
        } catch (err) {
            setErrorMsg('Failed to update password.');
        }
    };

    return (
        <div className={`${activeStyle}-update-password-form`}>
            <div className={`${activeStyle}-update-password-form-header d-flex align-items-center justify-content-between mb-3`}>
                <div className={`${activeStyle}-update-password-form-body`}>
                    <Card className={`${activeStyle}-update-password-form-card`}>
                        <Form noValidate onSubmit={handleSubmit}>
                            <Alert variant="info">
                                Please enter your new password below.
                            </Alert>
                            {successMsg && <Alert variant="success">{successMsg}</Alert>}
                            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control 
                                    type='password'
                                    placeholder='Old Password'
                                    name="oldPassword"
                                    value={formData.oldPassword}
                                    onChange={handleInputChange}
                                    required
                                />
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
                                    !passwordsMatch ||
                                    loading
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