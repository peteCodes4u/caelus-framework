import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import GeneralForm from '../GeneralForm';

const signUpFields = [
  { label: "Username", name: "name", type: "text", required: true, placeholder: "Enter username" },
  { label: "Email", name: "email", type: "email", required: true, placeholder: "Enter email" },
  { label: "Password", name: "password", type: "password", required: true, placeholder: "Enter password" },
];

export default function SignUpForm({ activeStyle = 'app-style2', handleModalClose }) {
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleSignUp = async (formData) => {
    try {
      const { data } = await addUser({ variables: { ...formData } });
      Auth.login(data.addUser.token);
    } catch (e) {
      setShowAlert(true);
    }
  };

  return (
    <div className={`${activeStyle}-popup-window`}>
      <div className={`${activeStyle}-popup-header d-flex align-items-center justify-content-between mb-3`}>
        <h4 className="mb-0">Sign Up</h4>
        {typeof handleModalClose === "function" && (
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleModalClose}
          ></button>
        )}
      </div>
      <div className={`${activeStyle}-popup-body`}>
        <GeneralForm
          fields={signUpFields}
          onSubmit={handleSignUp}
          submitLabel="Sign Up"
        />
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert || !!error} variant='danger'>
          Something went wrong with your signup!
        </Alert>
        <Link to="/login">← Login</Link>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};