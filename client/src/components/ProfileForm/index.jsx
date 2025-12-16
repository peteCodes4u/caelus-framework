import { useState } from 'react';
import { useStyle } from '../../styleContext';
import { Form, Button, Alert } from 'react-bootstrap';
import UpdateUserForm from '../UpdateUserForm';
import BioForm from '../BioForm';

export default function ProfileForm() {

    const {activeStyle} = useStyle();

    // State management for alert visibility
    const [showAlert, setShowAlert] = useState(false);

    // Form visibility states
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
                        <div className={`${activeStyle}-update-user-info-btn`}>
                            <Button
                                type="button"
                                onClick={() => setShowUpdateUserForm((prev) => !prev)}
                                className={`${activeStyle}-update-user-button${showUpdateUserForm ? ' active' : ''} btn-warning`}
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
                                className={`${activeStyle}-bio-form-button${showBioForm ? ' active' : ''} btn-warning`}
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