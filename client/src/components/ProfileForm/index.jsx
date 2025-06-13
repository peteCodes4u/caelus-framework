import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import UpdatePasswordForm from '../UpdatePasswordForm';
import UpdateUserForm from '../UpdateUserForm';
import BioForm from '../BioForm';

export default function ProfileForm({ activeStyle = 'app-style1' }) {

    // State management for alert visibility
    const [showAlert, setShowAlert] = useState(false);

    // Form visibility states
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
    const [showBioForm, setShowBioForm] = useState(false);


    return (
        <div className={`${activeStyle}-profile-form`}>
            <div className={`${activeStyle}-prfile-form-header d-flex align-items-center justify-content-between mb-3`}>
                <div className={`${activeStyle}-profile-form-body`}>
                    <div className={`${activeStyle}-profile-form-card`}>                            <Alert
                        dismissible
                        onClose={() => setShowAlert(false)}
                        show={showAlert}
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
                                />
                            )}
                        </Form.Group>
                        {/* toggle Bio Form */}
                        <Form.Group>
                            <Button
                                type="button"
                                onClick={() => setShowBioForm((prev) => !prev)}
                                className={`${activeStyle}-bio-form-button${showBioForm ? ' active' : ''}`}
                            >
                                {showBioForm ? "Hide Bio Form" : "Update your Bio"}
                            </Button>
                            {showBioForm && (
                               <BioForm  activeStyle={activeStyle}/>
                            )}
                        </Form.Group>
                    </div>
                </div>
            </div>
        </div>
    );
};