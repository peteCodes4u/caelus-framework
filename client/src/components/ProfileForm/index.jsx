import { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER, VERIFY_PASSWORD } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import UpdatePasswordForm from '../UpdatePasswordForm';
import ForgotPasswordConfirm from '../ForgotPasswordConfirm';
import Auth from '../../utils/auth';
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
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);

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
                            {/* Update password toggle */}
                            <Form.Group className="mb-3">
                                <Button
                                    type="button"
                                    onClick={() => setShowPasswordForm((prev) => !prev)}
                                >
                                    {showPasswordForm ? "Hide Password Form" : "Update your Password"}
                                </Button>
                                {showPasswordForm && <UpdatePasswordForm activeStyle={activeStyle} />}
                            </Form.Group>
                            {/* forgot password toggle */}
                            <Form.Group className="mb-3">
                                <Button
                                    type="button"
                                    onClick={() => setShowForgotPasswordConfirm((prev) => !prev)}
                                >
                                    {showForgotPasswordConfirm ? "Hide Forgot Password" : "Forgot Password"}
                                </Button>
                                {showForgotPasswordConfirm && (
                                    <ForgotPasswordConfirm
                                        activeStyle={activeStyle}
                                        email={userFormData.email}
                                        handleModalClose={() => setShowForgotPasswordConfirm(false)}
                                    />
                                    
                                )}
                            </Form.Group>
                            {data ? (
                                <Alert variant="success">
                                    Profile updated successfully!
                                </Alert>
                            ) : null}
                        </Form>
                        <UpdateUserForm
                            activeStyle={activeStyle}
                            initialName={userFormData.name}
                            initialEmail={userFormData.email}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};