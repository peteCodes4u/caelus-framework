import { Form, Button, Alert, Card } from 'react-bootstrap';

export default function ForgotPasswordConfirm({ activeStyle = 'app-style1', handleFormSubmit, handleModalClose }) { 
    return (
        <div className={`${activeStyle}-forgot-pw-confrim-window`}>
            <div className={`${activeStyle}-forgot-pw-confrim-header d-flex align-items-center justify-content-between mb-3`}>
                <h4 className="mb-0">Click the button below to send a new password</h4>
                {typeof handleModalClose === "function" && (
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleModalClose}
                    ></button>
                )}
            </div>
            <div className={`${activeStyle}-forgot-pw-confrim-body`}>
                <Form onSubmit={handleFormSubmit}>
                    <Button
                        className="mb-0"
                        type="submit"
                        variant="success"
                    >
                        Send New Password
                    </Button>
                </Form>
                <div className="mt-3"></div>
            </div>
        </div>
    );
};