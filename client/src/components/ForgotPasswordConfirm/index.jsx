import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from '../../utils/mutations';
import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

export default function ForgotPasswordConfirm({ activeStyle = 'app-style1' }) {
    const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);
    const [formEmail, setFormEmail] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleInputChange = (e) => setFormEmail(e.target.value);

    const handleSendPassword = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');
        try {
            const { data } = await forgotPassword({ variables: { email: formEmail } });
            if (data?.forgotPassword?.success) {
                setSuccessMsg(data.forgotPassword.message);
            } else {
                setErrorMsg(data?.forgotPassword?.message || 'Failed to send new password.');
            }
        } catch (err) {
            setErrorMsg('Failed to send new password.');
        }
    };

    return (
        <div className="app-style3-popup-overlay">
            <div className="app-style3-popup-window">
                <div className={`${activeStyle}-popup-header d-flex align-items-center justify-content-between mb-3`}>
                    <h4 className='mb-0'>Forgot Password</h4>
                    <button
                        type="button"
                        className="btn-close app-style3-popup-close"
                        aria-label="Close"
                        onClick={() => window.location.href = '/'}
                    />
                </div>
                <div className={`${activeStyle}-popup-body`}>
                    <Form onSubmit={handleSendPassword}>
                        <Form.Group className="mb-3">
                            <Form.Label>Please enter your email address below:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder='Your email address'
                                name="email"
                                value={formEmail}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email address.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className={`${activeStyle}-forgot-pw-confrim-header d-flex align-items-center justify-content-between mb-3`}>
                            <p className="mb-0">Click the button below to send a new password</p>
                        </div>
                        <Button
                            className="mb-0"
                            type="submit"
                            variant="success"
                            disabled={loading}
                        >
                            Send New Password
                        </Button>
                    </Form>
                    {successMsg && <Alert variant="success" className="mt-3">{successMsg}</Alert>}
                    {errorMsg && <Alert variant="danger" className="mt-3">{errorMsg}</Alert>}
                </div>
            </div>
        </div>
    );
};