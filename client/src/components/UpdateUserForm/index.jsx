import { useEffect, useState } from 'react';
import { Alert, Card } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER, VERIFY_PASSWORD } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import GeneralForm from '../GeneralForm';

const updateUserFields = [
    { label: "Username", name: "name", type: "text", required: true, placeholder: "Enter username" },
    { label: "Email", name: "email", type: "email", required: true, placeholder: "Enter email" },
    { label: "Password", name: "password", type: "password", required: true, placeholder: "Enter your password" },
];

export default function UpdateUserForm({ activeStyle = 'app-style1', initialName = '', initialEmail = '' }) {
    const [formData, setFormData] = useState({
        name: initialName,
        email: initialEmail,
        password: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [alertVariant, setAlertVariant] = useState('danger');
    const [updateUser] = useMutation(UPDATE_USER);
    const [verifyPassword] = useMutation(VERIFY_PASSWORD);
    
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            name: initialName,
            email: initialEmail,
        }));
    }, [initialName, initialEmail]);

    const handleUpdateUser = async (formData) => {
        setShowAlert(false);

        // Show alert if password is empty
        if (!formData.password) {
            setAlertMsg('Password Entry Required');
            setAlertVariant('danger');
            setShowAlert(true);
            return;
        }

        // Verify password
        const { data: verifyData } = await verifyPassword({ variables: { password: formData.password } });
        if (!verifyData?.verifyPassword) {
            setAlertMsg('Password is incorrect.');
            setAlertVariant('danger');
            setShowAlert(true);
            return;
        }
        // Update user
        try {
            await updateUser({ variables: { name: formData.name, email: formData.email } });
            setAlertMsg('Profile updated successfully!');
            setAlertVariant('success');
            setShowAlert(true);
        } catch {
            setAlertMsg('Something went wrong with your profile update!');
            setAlertVariant('danger');
            setShowAlert(true);
        }
    };

    return (
        <div className={`${activeStyle}-update-user-form-form`}>
            <div className={`${activeStyle}-update-user-form-body`}>
                <Card className={`${activeStyle}-update-user-form`}>
                    <GeneralForm
                        fields={updateUserFields}
                        onSubmit={handleUpdateUser}
                        submitLabel="Update Profile"
                        initialValues={{
                            name: initialName,
                            email: initialEmail,
                            password: ''
                        }}
                    />
                    {showAlert && <Alert variant={alertVariant}>{alertMsg}</Alert>}
                </Card>
            </div>
        </div>
    );
};