import { useState } from 'react';
import GeneralForm from '../GeneralForm';
import { useMutation } from '@apollo/client';
import LinksForm from '../LinksForm';
import { Card, Button, Alert } from 'react-bootstrap';
import { UPDATE_PROFILE } from '../../utils/mutations';

const biofields = [
    { label: "Location", name: "location", type: "text", placeholder: "your location", required: false, autoComplete: "on" },
    { label: "Bio", name: "bio", type: "textarea", placeholder: "Tell us about yourself", required: false, autoComplete: "off", rows: 5, cols: 40 },
    { label: "Password", name: "password", type: "password", required: true, placeholder: "Enter your password" },

];

export default function BioForm({ activeStyle = 'app-style2', onSubmit = () => { }, initialValues = {}, formClass = "BioForm" }) {
    const [showLinksForm, setShowLinksForm] = useState(false);
    const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleUpdateProfile = async(formData) => {
        setSuccessMsg('');
        setErrorMsg('');
        if(!formData.password) {
            setErrorMsg('Password is required to update a user bio')
            return;
        } 
        try {
            const { data } = await updateProfile({
                variables: {
                    password: formData.password,
                    location: formData.location,
                    Bio: formData.Bio,
                }
            });
            if(data?.updateProfile?.success) {
                setSuccessMsg('Your profile has been updated successfully')
                } else {
                    setErrorMsg(data?.updateProfile.message && 'failed to update profile')
                } 
            } catch (err) {
                setErrorMsg('failed to update profile')
            }
    };
    
    return (
        <Card className={`${activeStyle}-bio-form`}>
            <GeneralForm
                fields={biofields}
                onSubmit={handleUpdateProfile}
                submitLabel="Publish Profile"
                formClass={formClass}
                initialValues={{
                    password: '',
                    location: '',
                    bio: '',
                    links: ''
                }}
            >
                {/* Toggle Links Form */}
                <Button
                    type="button"
                    className={`${activeStyle}-show-links-form-button mb-2`}
                    onClick={() => setShowLinksForm((prev) => !prev)}
                >
                    {showLinksForm ? "Hide Links" : "Add Links"}
                </Button>
                {showLinksForm && <LinksForm className={`${activeStyle}-links-form`} />}
            </GeneralForm>
                {successMsg && <Alert variant="success">{successMsg}</Alert>}
                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        </Card>
    );
};