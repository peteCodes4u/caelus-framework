import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import GeneralForm from '../GeneralForm';

// Login form configuration array
const loginFields = [
  { label: "Email", name: "email", type: "text", required: true, placeholder: "Your email" },
  { label: "Password", name: "password", type: "password", required: true, placeholder: "Your password" },
];

export default function LoginForm({ activeStyle = 'app-style2', handleModalClose }) {
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleLogin = async (formData) => {
    try {
      const { data } = await login({ variables: { ...formData } });
      Auth.login(data.login.token);
    } catch (e) {
      setShowAlert(true);
    }
  };

  return (
    <div className={`${activeStyle}-popup-window`}>
      <div className={`${activeStyle}-popup-header d-flex align-items-center justify-content-between mb-3`}>
        <h4 className="mb-0">Login</h4>
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
          fields={loginFields}
          onSubmit={handleLogin}
          submitLabel="Login"
          initialValues={{ email: '', password: '' }}
          formClass="LoginForm"
        />
        {showAlert || error ? (
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert || !!error}
            variant="danger"
          >
            Something went wrong with your login credentials!
          </Alert>
        ) : null}
        <div className="mt-3">
          <Link to="/signup">← Go to Signup</Link>
          <br/>
          <Link to="/forgot-password">← Forgot Password</Link>
        </div>
      </div>
    </div>
  );
}