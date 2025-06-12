import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from '../../utils/mutations';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import GeneralForm from '../GeneralForm';

const forgotPasswordFields = [
    { label: "Email", name: "email", type: "email", required: true, placeholder: "Enter your email address" },
];

export default function ForgotPasswordConfirm({ activeStyle = 'app-style1' }) {
    const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);
    const [formEmail, setFormEmail] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleInputChange = (e) => setFormEmail(e.target.value);

    const handleSendPassword = async (formData) => {
        setSuccessMsg('');
        setErrorMsg('');
        try {
            const { data } = await forgotPassword({ variables: { email: formData.email } });
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
                    <GeneralForm 
                        fields={forgotPasswordFields}
                        onSubmit={handleSendPassword}
                        submitLabel="Send New Password"
                        initialValues={{ email: '' }}
                    />
                    {successMsg && <Alert variant="success" className="mt-3">{successMsg}</Alert>}
                    {errorMsg && <Alert variant="danger" className="mt-3">{errorMsg}</Alert>}
                </div>
            </div>
        </div>
    );
};