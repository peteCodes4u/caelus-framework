import LoginForm from "../components/LoginForm";
import { useStyle } from "../StyleContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { activeStyle } = useStyle();
    const navigate = useNavigate();
    return (
        <div className={`${activeStyle}-popup-overlay`}>
            <div className={`${activeStyle}-popup-window`}>
                <LoginForm
                    activeStyle={activeStyle}
                    handleModalClose={() => navigate('/')}
                />
            </div>
        </div>
    );
};
