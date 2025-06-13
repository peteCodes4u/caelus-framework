// this is the error page that will be displayed when the user encounters an error. changes to the error page can be made here.
import { useRouteError } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ErrorPage() {

    const { error } = useRouteError();
    console.log(error);
    const activeStyle = localStorage.getItem('selectedStyle') || 'app-style1'

    return (       
        <>
        <Header activeStyle={activeStyle} />
        <center><div className={`${activeStyle}-error-page`}>
            <h1>👾 Uh Oh! Something went wrong... please refresh and try again! 👾</h1>
            <br />
            <div className="error-img">
                <img src="https://media.giphy.com/media/3o7TKSjBzVNGz8d1tC/giphy.gif" alt="error" />
            </div>
            <br />
            <p> 🖖 If this issue persists please see the detailed technical error below. Use this error as a reference when communicating with support thank you 👽 </p>
        <p>
        {(!error || !error.message)
            ? 'No error message available'
            : error.message}
        </p>
        </div></center>
        <Footer activeStyle={activeStyle} />
        </>
    );
};

