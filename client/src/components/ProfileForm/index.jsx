import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
// import UpdatePasswordForm from '../UpdatePasswordForm';
import UpdateUserForm from '../UpdateUserForm';
import BioForm from '../BioForm';

export default function ProfileForm({ activeStyle = 'app-style1' }) {

    // State management for alert visibility
    const [showAlert, setShowAlert] = useState(false);

    // Form visibility states
    // const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
    const [showBioForm, setShowBioForm] = useState(false);


    return (
        <div className={`${activeStyle}-profile-form`}>
            <div className={`${activeStyle}-profile-form-header`}>
                <div className={`${activeStyle}-profile-form-body`}>                          
                    <Alert
                        dismissible
                        onClose={() => setShowAlert(false)}
                        show={showAlert}
                        variant="danger"
                    >
                        Something went wrong with your profile update!
                    </Alert>
                    <div className={`${activeStyle}-update-profile-form-controlls`}>
                        {/* <div className={`${activeStyle}-update-pw-btn`}>
                            <Button
                                type="button"
                                onClick={() => setShowPasswordForm((prev) => !prev)}
                                className={`${activeStyle}-update-pw-button${showPasswordForm ? ' active' : ''}`}
                            >
                                {showPasswordForm ? "Hide Password Form" : "Update your Password"}
                            </Button>
                            {showPasswordForm && <UpdatePasswordForm activeStyle={activeStyle} />}
                        </div> */}
                        {/* Toggle Update User Form */}
                        <div className={`${activeStyle}-update-user-info-btn`}>
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
                        </div>
                        <div className={`${activeStyle}-update-bio-btn`}>
                        {/* toggle Bio Form */}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};