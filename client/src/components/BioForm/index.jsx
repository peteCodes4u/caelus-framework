import { useState, useEffect } from 'react';
import GeneralForm from '../GeneralForm';
import { useMutation, useQuery } from '@apollo/client';
import { Card, Alert, Button } from 'react-bootstrap';
import { UPDATE_PROFILE, DELETE_PROFILE_PW } from '../../utils/mutations';
import { QUERY_MY_PROFILE, QUERY_ME } from '../../utils/queries';

const biofields = [
    { label: "Location", name: "location", type: "text", placeholder: "your location", required: false, autoComplete: "on" },
    { label: "Bio", name: "bio", type: "textarea", placeholder: "Tell us about yourself", required: false, autoComplete: "off", rows: 5, cols: 40 },
    { label: "Link", name: "newLink", type: "text", placeholder: "Social Accounts / Website", required: false, autoComplete: "off" },
    { label: "Password", name: "password", type: "password", required: true, placeholder: "Enter your password" },
];

export default function BioForm({ activeStyle = 'app-style2', formClass = "BioForm" }) {

    const { data, loading, error } = useQuery(QUERY_MY_PROFILE);
    const { userData, userLoading, userError } = useQuery(QUERY_ME);
    const [formData, setFormData] = useState({
        location: '',
        bio: '',
        password: '',
        newLink: ''
    });

    const userId = userData?.me?._id;

    const [updateProfile] = useMutation(UPDATE_PROFILE);
    const [deleteProfile] = useMutation(DELETE_PROFILE_PW)
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

    const handleDeleteProfileWPassword = async () => {
        setSuccessMsg('');
        setErrorMsg('');

        if (!formData.password) {
            setErrorMsg('Password is required to delete your profile.');
            return;
        }

        try {
            const { data } = await deleteProfile({
                variables: {
                    password: formData.password
                },
                refetchQueries: [{ query: QUERY_MY_PROFILE }]
            });

            if (data?.deleteProfileWPassword) {
                setSuccessMsg("Your profile has been deleted.");
                setFormData({
                    location: "",
                    bio: "",
                    newLink: "",
                    password: ""
                });
            }
        } catch (err) {
            setErrorMsg(err.message || 'Failed to delete profile.');
        }
    };


    return (
        <Card className={`${activeStyle}-bio-form`}>
            <GeneralForm
                fields={biofields}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleUpdateProfile}
                submitLabel="Publish Profile"
                formClass={formClass}
                initialValues={{
                    location: "",
                    bio: "",
                    newLink: ""
                }}
            >
            <Button
                className='btn-danger'
                onClick={handleDeleteProfileWPassword}
            >delete profile
            </Button>
            </GeneralForm>
            {successMsg && <Alert variant="success">{successMsg}</Alert>}
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            <br />
        </Card>
    );
}
