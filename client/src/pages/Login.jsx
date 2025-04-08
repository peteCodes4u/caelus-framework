// this is the login page of the application changes to the login page can be made here

// this enables useState from react which is used to store the state of the application. The state of the application is used to store the user input from the login form
import { useState } from 'react';

// this enables link from react-router-dom which is used to navigate between pages in the application
import { Link } from 'react-router-dom';

// this enables the useMutation hook from apollo client which is used to make mutations to the server
import { useMutation } from '@apollo/client';

// this enables the LOGIN_USER mutation from the mutations folder which is used to login the user
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

// this is the login page of the application changes to the login page can be made here
const Login = (props) => {

    // this enables the useMutation hook from apollo client which is used to make mutations to the server
    const [login, { error, data }] = useMutation(LOGIN_USER);
    const [formState, setFormState] = useState({ email: '', password: '' });

    // this is the function that is used to handle the form submission. The function is used to login the user
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    // this is the function that is used to handle the form submission. The function is used to login the user
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                 variables: { ...formState } 
                });
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main>
            <section className="container">
                <h4>🌌 Login 🌌</h4>
                <section>
                    {data ? (
                        <p>
                            Success! You may now head <Link to="/">back to the homepage.</Link>
                        </p>
                    ) : (
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email address:</label>
                                <input
                                    className="form-input"
                                    placeholder="your email"
                                    name='email'
                                    type='email'
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="*******"
                                    name='password'
                                    type='password'
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                                    <button
                                        className=""
                                        style={{ cursor: 'pointer' }}
                                        type='submit'
                                    >
                                        🚀 Submit
                                    </button>
                                </div>
                        </form>
                    )}
                    
                    {error && (
                        <div>
                            {error.message}
                        </div>
                    )}
                    <div>
                        <Link to="/signup">← Go to Signup</Link>
                    </div>
                </section>
            </section>
        </main>

    );

};

export default Login;