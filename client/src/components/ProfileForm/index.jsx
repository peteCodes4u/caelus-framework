import { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER, VERIFY_PASSWORD } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import UpdatePasswordForm from '../UpdatePasswordForm';
import UpdateUserForm from '../UpdateUserForm';

export default function ProfileForm({ activeStyle = 'app-style1' }) {
    const { loading, error: queryError, data: userData } = useQuery(QUERY_ME);
    const [userFormData, setUserFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [updateUser, { error, data }] = useMutation(UPDATE_USER);
    const [verifyPassword] = useMutation(VERIFY_PASSWORD);
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showPasswordEnryField, setShowPasswordEnryField] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showForgotPasswordConfirm, setShowForgotPasswordConfirm] = useState(false);
    const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);

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
                    <div className={`${activeStyle}-profile-form-card`}>                            <Alert
                        dismissible
                        onClose={() => setShowAlert(false)}
                        show={showAlert || !!error}
                        variant="danger"
                    >
                        Something went wrong with your profile update!
                    </Alert>
                        {/* Update password toggle */}
                        <Form.Group className="mb-3">
                            <Button
                                type="button"
                                onClick={() => setShowPasswordForm((prev) => !prev)}
                                className={`${activeStyle}-update-pw-button${showPasswordForm ? ' active' : ''}`}
                            >
                                {showPasswordForm ? "Hide Password Form" : "Update your Password"}
                            </Button>
                            {showPasswordForm && <UpdatePasswordForm activeStyle={activeStyle} />}
                        </Form.Group>
                        {/* Toggle Update User Form */}
                        <Form.Group>
                            <Button
                                type="button"
                                onClick={() => setShowUpdateUserForm((prev) => !prev)}
                                className={`${activeStyle}-update-user-button${showUpdateUserForm ? ' active' : ''}`}
                            >
                                {showUpdateUserForm ? "Hide Update User Form" : "Update User Info"}
                            </Button>
                            {showUpdateUserForm && (
                                <UpdateUserForm
                                    activeStyle={activeStyle}
                                    initialName={userFormData.name}
                                    initialEmail={userFormData.email}
                                />
                            )}
                        </Form.Group>
                        {data ? (
                            <Alert variant="success">
                                Profile updated successfully!
                            </Alert>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};