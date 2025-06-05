import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from '../../utils/mutations';
import { useState } from 'react';
import { Button, Alert, Card } from 'react-bootstrap';

export default function ForgotPasswordConfirm({ activeStyle = 'app-style1', handleFormSubmit, handleModalClose, email }) {
    const [forgotPassword, { data, loading, error }] = useMutation(FORGOT_PASSWORD);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSendPassword = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');
        try {
            const { data } = await forgotPassword({ variables: { email } });
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
        <div className={`${activeStyle}-forgot-pw-confrim-window`}>
            <div className={`${activeStyle}-forgot-pw-confrim-body`}>
                <Card>
                    <div className={`${activeStyle}-forgot-pw-confrim-header d-flex align-items-center justify-content-between mb-3`}>
                        <p className="mb-0">Click the button below to send a new password</p>
                    </div>
                    <Button
                        className="mb-0"
                        type="button"
                        variant="success"
                        disabled={loading}
                        onClick={handleSendPassword}
                    >
                        Send New Password
                    </Button>
                </Card>
                {successMsg && <Alert variant="success" className="mt-3">{successMsg}</Alert>}
                {errorMsg && <Alert variant="danger" className="mt-3">{errorMsg}</Alert>}
            </div>
        </div>
    );
};