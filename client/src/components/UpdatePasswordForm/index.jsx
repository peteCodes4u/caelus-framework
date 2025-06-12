import { useState } from 'react';
import { Alert, Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '../../utils/mutations';
import GeneralForm from '../GeneralForm';

// Update Password form configuration array
const updatePasswordFields = [
  { label: "Old Password", name: "oldPassword", type: "password", required: true, placeholder: "Enter old password" },
  { label: "New Password", name: "password", type: "password", required: true, placeholder: "Enter new password" },
  { label: "Confirm New Password", name: "confirmPassword", type: "password", required: true, placeholder: "Confirm new password" },
];

export default function UpdatePasswordForm({ activeStyle = 'app-style1' }) {
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD);

  const handleUpdatePassword = async (formData) => {
    setSuccessMsg('');
    setErrorMsg('');
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('New password and confirmation do not match.');
      return;
    }
    try {
      const { data } = await updatePassword({
        variables: {
          oldPassword: formData.oldPassword,
          password: formData.password
        }
      });
      if (data?.updatePassword?.success) {
        setSuccessMsg('Password updated successfully!');
      } else {
        setErrorMsg(data?.updatePassword?.message || 'Failed to update password.');
      }
    } catch (err) {
      setErrorMsg('Failed to update password.');
    }
  };

  return (
    <div className={`${activeStyle}-update-password-form`}>
      <div className={`${activeStyle}-update-password-form-body`}>
        <Card className={`${activeStyle}-update-password-form-card`}>
          <Alert variant="info">
            Please enter your new password below.
          </Alert>
          <GeneralForm
            fields={updatePasswordFields}
            onSubmit={handleUpdatePassword}
            submitLabel="🔐 Update Password 🔐"
            initialValues={{
              oldPassword: '',
              password: '',
              confirmPassword: ''
            }}
          />
          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        </Card>
      </div>
    </div>
  );
}