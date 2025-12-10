import { useState, useEffect } from 'react';
import GeneralForm from '../GeneralForm';
import { useMutation, useQuery } from '@apollo/client';
import { Card, Alert } from 'react-bootstrap';
import { UPDATE_PROFILE } from '../../utils/mutations';
import { QUERY_MY_PROFILE } from '../../utils/queries';

const biofields = [
    { label: "Location", name: "location", type: "text", placeholder: "your location", required: false, autoComplete: "on" },
    { label: "Bio", name: "bio", type: "textarea", placeholder: "Tell us about yourself", required: false, autoComplete: "off", rows: 5, cols: 40 },
    { label: "Link", name: "newLink", type: "text", placeholder: "Social Accounts / Website", required: false, autoComplete: "off" },
    { label: "Password", name: "password", type: "password", required: true, placeholder: "Enter your password" },
];

export default function BioForm({ activeStyle = 'app-style2', formClass = "BioForm" }) {

    const { data, loading, error } = useQuery(QUERY_MY_PROFILE);

    const [formData, setFormData] = useState({
        location: '',
        bio: '',
        password: '',
        newLink: ''
    });

    const [updateProfile] = useMutation(UPDATE_PROFILE);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (data && data.myProfile) {
            setFormData(prev => ({
                ...prev,
                location: data.myProfile.location || '',
                bio: data.myProfile.bio || ''
            }));
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user data.</p>;

    const handleUpdateProfile = async (formData) => {
        setSuccessMsg('');
        setErrorMsg('');

        if (!formData.password) {
            setErrorMsg('Password is required to update your profile.');
            return;
        }

        try {
            const { data } = await updateProfile({
                variables: {
                    password: formData.password,
                    location: formData.location === "" ? undefined : formData.location,
                    bio: formData.bio === "" ? undefined : formData.bio,
                    newLink: formData.newLink === "" ? undefined : formData.newLink
                }
            });

            if (!data.updateProfile) {
                setErrorMsg("Unexpected error.");
            } else if (!formData.location && !formData.bio && !formData.newLink) {
                setSuccessMsg("Profile created. You can now add more details anytime.");
            } else {
                setSuccessMsg("Your profile has been updated!");
            }

        } catch (err) {
            setErrorMsg(err.message || 'Failed to update profile.');
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
                    location: "",
                    bio: "",
                    newLink: "",
                    password: ""
                }}
            />

            {successMsg && <Alert variant="success">{successMsg}</Alert>}
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        </Card>
    );
}
