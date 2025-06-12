import ForgotPasswordConfirm from "../components/ForgotPasswordConfirm";

export default function ForgotPasswordPage({ activeStyle = 'app-style1' }) {
    return (
        <div className={`${activeStyle}-forgot-password-page`}>
            <div className="app-style3-popup-overlay">
                <div className="app-style3-popup-window">
                    <ForgotPasswordConfirm activeStyle="app-style3" />
                </div>
            </div>
        </div>
    );
};