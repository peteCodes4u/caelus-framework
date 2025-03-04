// Footer Component used in the App.js file to display the footer of the website. this is where changes can be made to the footer of the website.
import { useLocation, useNavigate } from 'react-router-dom';

const footer = () => {

    // useLocation and useNavigate are used to get the current location and navigate to a new location respectively.
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <footer className="">
            <div className="container">
            {location.pathname !== '/' && (
                <button className="btn btn-primary" 
                onClick={() => navigate(-1)}
                >
                    &larr; Go Back
                </button>
            )}
            <h4>&copy; {new Date().getFullYear()} - Caleus Framework</h4>
            </div>
        </footer>
    );
};

export default footer;