import SignupForm from "../components/SignupForm";
import { useStyle } from "../styleContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const { activeStyle } = useStyle();
    const navigate = useNavigate();
    return (
        <div className={`${activeStyle}-popup-overlay`}>
            <div className={`${activeStyle}-popup-window`}>
                <SignupForm 
                    activeStyle={activeStyle}
                    handleModalClose={() => navigate('/')}
                />
            </div>
        </div>
    );
};